# 🚀 快速开始指南

5分钟内启动你的看板系统前端开发！

## 📋 开发前检查清单

### ✅ 环境准备
- [ ] Node.js >= 20.19.0 (`node --version`)
- [ ] pnpm >= 8.0.0 (`pnpm --version`)
- [ ] 后端服务运行在 `http://localhost:3000`
- [ ] 可访问后端API文档 `http://localhost:3000/api-docs`

### ✅ 项目状态检查
- [ ] 前端项目已初始化 (Vue 3 + TypeScript + Pinia)
- [ ] 基础配置已完成 (Vite + ESLint + Prettier)

## 🏗 第一步：安装现代化依赖

```bash
# 进入前端项目目录
cd frontend-kanban

# 安装核心依赖
pnpm add @tanstack/vue-query pinia vue-router @vueuse/core dayjs

# 安装UI组件库 (Naive UI - 现代化选择)
pnpm add naive-ui

# 安装拖拽库
pnpm add vuedraggable@next

# 安装开发依赖
pnpm add -D @types/node vitest jsdom @vue/test-utils

# 安装样式库 (可选但推荐)
pnpm add tailwindcss @tailwindcss/forms autoprefixer postcss
```

## ⚙️ 第二步：基础配置

### 1. 更新 Vite 配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```

### 2. 创建环境变量文件

```bash
# 创建开发环境配置
cat > .env.development << EOF
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_TITLE=Kanban Development
VITE_APP_DEBUG=true
EOF
```

### 3. 创建目录结构

```bash
# 创建核心目录
mkdir -p src/{api,components,composables,layouts,router,stores,types,utils,views,styles}
mkdir -p src/components/{common,auth,workspace,board,list,card}
mkdir -p src/views/{auth,workspace,board}
mkdir -p tests/{unit,integration}
```

## 🔌 第三步：创建API客户端

### 1. 现代化HTTP客户端配置 (基于Fetch API)

```typescript
// src/api/client.ts
import { useAuthStore } from '@/stores/auth'

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  body?: any
  params?: Record<string, string | number | boolean>
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private buildURL(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(endpoint, this.baseURL)
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }
    
    return url.toString()
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { method = 'GET', headers = {}, body, params } = config
    
    // 获取认证token
    const authStore = useAuthStore()
    const token = authStore.token

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    }

    if (token) {
      requestHeaders.Authorization = \`Bearer \${token}\`
    }

    const url = this.buildURL(endpoint, params)
    
    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      })

      // 处理认证错误
      if (response.status === 401) {
        authStore.logout()
        window.location.href = '/login'
        throw new Error('Unauthorized')
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || \`HTTP \${response.status}: \${response.statusText}\`)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Network request failed')
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params })
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body: data })
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PATCH', body: data })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const apiClient = new ApiClient(
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
)
```

### 2. 基础类型定义

```typescript
// src/types/api.ts
export interface User {
  id: string
  email: string
  username: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  identifier: string // 邮箱或用户名
  password: string
}

export interface RegisterRequest {
  email: string
  username: string
  password: string
  avatar?: string
}

export interface AuthResponse {
  message: string
  user: User
  accessToken: string
}
```

### 3. 认证API服务

```typescript
// src/api/auth.ts
import { apiClient } from './client'
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types/api'

export const authApi = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    return apiClient.post('/auth/login', data)
  },

  async register(data: RegisterRequest): Promise<{ message: string; user: User }> {
    return apiClient.post('/auth/register', data)
  },

  async getProfile(): Promise<{ message: string; user: User }> {
    return apiClient.get('/auth/profile')
  },
}
```

## 🏪 第四步：状态管理

### 1. 认证Store

```typescript
// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '@/api/auth'
import type { User, LoginRequest, RegisterRequest } from '@/types/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const isLoading = ref(false)

  const isLoggedIn = computed(() => !!token.value && !!user.value)

  async function login(credentials: LoginRequest) {
    try {
      isLoading.value = true
      const response = await authApi.login(credentials)
      
      user.value = response.user
      token.value = response.accessToken
      localStorage.setItem('auth_token', response.accessToken)
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  async function register(userData: RegisterRequest) {
    try {
      isLoading.value = true
      const response = await authApi.register(userData)
      
      // 注册成功后自动登录
      await login({
        identifier: userData.email,
        password: userData.password,
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
  }

  return {
    user: readonly(user),
    token: readonly(token),
    isLoading: readonly(isLoading),
    isLoggedIn,
    login,
    register,
    logout,
  }
})
```

## 🧩 第五步：创建基础组件

### 1. 登录表单组件

```vue
<!-- src/components/auth/LoginForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <h2>登录</h2>
    
    <div class="form-group">
      <label for="identifier">邮箱或用户名</label>
      <input
        id="identifier"
        v-model="form.identifier"
        type="text"
        required
        :disabled="isLoading"
      />
    </div>

    <div class="form-group">
      <label for="password">密码</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        required
        :disabled="isLoading"
      />
    </div>

    <button type="submit" :disabled="isLoading">
      {{ isLoading ? '登录中...' : '登录' }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  identifier: '',
  password: '',
})

const error = ref<string | null>(null)
const { isLoading } = storeToRefs(authStore)

const handleSubmit = async () => {
  try {
    error.value = null
    await authStore.login(form.value)
    router.push('/workspaces')
  } catch (err: any) {
    error.value = err.response?.data?.message || '登录失败'
  }
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
}
</style>
```

### 2. 登录页面

```vue
<!-- src/views/auth/LoginView.vue -->
<template>
  <div class="login-view">
    <div class="container">
      <LoginForm />
      
      <p class="register-link">
        还没有账户？
        <router-link to="/register">立即注册</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<style scoped>
.login-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.register-link {
  text-align: center;
  margin-top: 1rem;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
```

## 🛣 第六步：路由配置

### 1. 创建路由配置

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register', 
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/workspaces',
    name: 'Workspaces',
    component: () => import('@/views/workspace/WorkspaceListView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    redirect: '/workspaces'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login')
  } else if (!to.meta.requiresAuth && authStore.isLoggedIn) {
    next('/workspaces')
  } else {
    next()
  }
})

export default router
```

## 🎨 第七步：主应用配置

### 1. 更新主应用文件 (支持Vue Query + Naive UI)

```typescript
// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from '@/api/query-client'
import router from './router'
import App from './App.vue'

// Naive UI 样式
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

const app = createApp(App)

// 注册插件
app.use(createPinia())
app.use(VueQueryPlugin, {
  queryClient,
})
app.use(router)

app.mount('#app')
```

### 2. Vue Query 客户端配置

```typescript
// src/api/query-client.ts
import { QueryClient } from '@tanstack/vue-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // 不重试认证错误
        if (error?.message === 'Unauthorized') return false
        // 最多重试2次
        return failureCount < 2
      },
      staleTime: 5 * 60 * 1000, // 5分钟
      gcTime: 10 * 60 * 1000, // 10分钟
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
})
```

### 2. 更新根组件

```vue
<!-- src/App.vue -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// 应用启动时检查认证状态
onMounted(async () => {
  if (authStore.token && !authStore.user) {
    try {
      await authStore.fetchProfile()
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      authStore.logout()
    }
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
}

#app {
  min-height: 100vh;
}
</style>
```

### 3. 基础样式

```css
/* src/styles/main.css */
:root {
  --primary-color: #007bff;
  --primary-hover: #0056b3;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
  --gray-100: #f8f9fa;
  --gray-200: #e9ecef;
  --gray-300: #dee2e6;
  --gray-500: #6c757d;
  --gray-800: #343a40;
  --gray-900: #212529;
}

.btn {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.15s ease-in-out;
}

.btn-primary {
  color: #fff;
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background-color: var(--primary-hover);
  border-color: var(--primary-hover);
}

.card {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 1rem;
  border-bottom: 1px solid var(--gray-200);
  font-weight: 600;
}

.card-body {
  padding: 1rem;
}
```

## ✅ 第八步：测试运行

### 1. 启动开发服务器

```bash
# 确保后端服务正在运行
cd ../nest-kanban
pnpm run start:dev

# 在新终端启动前端
cd ../frontend-kanban
pnpm dev
```

### 2. 验证功能

- [ ] 访问 `http://localhost:5173`
- [ ] 应该自动重定向到登录页面
- [ ] 尝试注册新用户
- [ ] 尝试登录
- [ ] 检查浏览器开发者工具中的网络请求

### 3. 调试技巧

```bash
# 查看API请求
# 在浏览器开发者工具 -> Network 选项卡

# 查看Vue组件状态
# 安装Vue DevTools扩展

# 查看控制台错误
# 开发者工具 -> Console 选项卡
```

## 🎯 下一步开发计划

现在你已经有了一个可运行的基础架构！接下来按照 `TODO.md` 中的计划继续开发：

1. **完善认证系统** - 添加注册页面和表单验证
2. **工作区管理** - 实现工作区的CRUD操作
3. **看板管理** - 添加看板功能
4. **拖拽功能** - 实现卡片和列表的拖拽

## 🆘 常见问题

### Q: CORS错误怎么办？
A: 确保后端已启动，并且Vite代理配置正确。

### Q: 401认证错误？
A: 检查JWT token是否正确存储和发送。

### Q: 组件导入错误？
A: 检查路径别名配置和文件路径。

### Q: 样式不生效？
A: 检查CSS导入和组件作用域。

---

🎉 **恭喜！你的看板系统前端开发环境已就绪！**

现在你可以开始愉快地开发你的现代化看板管理系统了！🚀
