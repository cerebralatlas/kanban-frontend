# 🎨 Kanban 前端开发文档

基于 Vue 3 + TypeScript + Pinia 构建的现代化看板管理系统前端。

## 📋 项目概述

这是一个企业级看板管理系统的前端应用，与 NestJS 后端完美集成，提供完整的团队协作和任务管理功能。

### ✨ 核心特性

- 🏢 **多工作区管理** - 支持创建和管理多个工作空间
- 👥 **团队协作** - 完整的成员管理和权限控制
- 📋 **看板管理** - 直观的任务看板和列表管理
- 🎯 **任务管理** - 卡片创建、分配、移动和跟踪
- 🔒 **权限系统** - 四层级权限继承和个人所有权
- 📱 **响应式设计** - 适配桌面和移动设备
- 🎨 **现代化UI** - 美观的用户界面和流畅的交互

## 🛠 技术栈

### 核心框架

- **Vue 3** - 组合式API，响应式系统
- **TypeScript** - 类型安全的JavaScript
- **Pinia** - 现代化的状态管理
- **Vue Router** - 单页应用路由

### 开发工具

- **Vite** - 快速的构建工具
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **Vitest** - 单元测试框架

### UI 组件库 (推荐)

- **Naive UI** - 企业级Vue组件库
- **Tailwind CSS** - 实用优先的CSS框架

### 数据处理

- **@tanstack/vue-query** - HTTP客户端
- **VueUse** - Vue组合式工具库
- **Day.js** - 轻量级日期处理库
- **vuedraggable@next** - 拖拽库

## 🏗 项目结构

```
frontend-kanban/
├── public/                 # 静态资源
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── api/               # API接口定义
│   │   ├── auth.ts        # 认证相关API
│   │   ├── workspaces.ts  # 工作区API
│   │   ├── boards.ts      # 看板API
│   │   ├── lists.ts       # 列表API
│   │   ├── cards.ts       # 卡片API
│   │   ├── client.ts      # HTTP客户端配置
│   │   └── types.ts       # API类型定义
│   ├── components/        # 可复用组件
│   │   ├── common/        # 通用组件
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppSidebar.vue
│   │   │   ├── LoadingSpinner.vue
│   │   │   └── ...
│   │   ├── auth/          # 认证组件
│   │   │   ├── LoginForm.vue
│   │   │   ├── RegisterForm.vue
│   │   │   └── ...
│   │   ├── workspace/     # 工作区组件
│   │   │   ├── WorkspaceCard.vue
│   │   │   ├── WorkspaceForm.vue
│   │   │   ├── MemberList.vue
│   │   │   └── ...
│   │   ├── board/         # 看板组件
│   │   │   ├── BoardCard.vue
│   │   │   ├── BoardForm.vue
│   │   │   ├── BoardHeader.vue
│   │   │   └── ...
│   │   ├── list/          # 列表组件
│   │   │   ├── ListColumn.vue
│   │   │   ├── ListForm.vue
│   │   │   └── ...
│   │   └── card/          # 卡片组件
│   │       ├── CardItem.vue
│   │       ├── CardForm.vue
│   │       ├── CardModal.vue
│   │       └── ...
│   ├── composables/       # 组合式函数
│   │   ├── useAuth.ts     # 认证逻辑
│   │   ├── useApi.ts      # API调用逻辑
│   │   ├── usePagination.ts
│   │   ├── useDebounce.ts
│   │   └── ...
│   ├── layouts/           # 布局组件
│   │   ├── DefaultLayout.vue
│   │   ├── AuthLayout.vue
│   │   └── ...
│   ├── router/            # 路由配置
│   │   ├── index.ts       # 主路由配置
│   │   ├── guards.ts      # 路由守卫
│   │   └── routes/        # 路由模块
│   │       ├── auth.ts
│   │       ├── workspace.ts
│   │       ├── board.ts
│   │       └── ...
│   ├── stores/            # Pinia状态管理
│   │   ├── auth.ts        # 认证状态
│   │   ├── workspace.ts   # 工作区状态
│   │   ├── board.ts       # 看板状态
│   │   ├── list.ts        # 列表状态
│   │   ├── card.ts        # 卡片状态
│   │   └── ui.ts          # UI状态
│   ├── types/             # TypeScript类型定义
│   │   ├── auth.ts        # 认证相关类型
│   │   ├── workspace.ts   # 工作区类型
│   │   ├── board.ts       # 看板类型
│   │   ├── list.ts        # 列表类型
│   │   ├── card.ts        # 卡片类型
│   │   └── common.ts      # 通用类型
│   ├── utils/             # 工具函数
│   │   ├── auth.ts        # 认证工具
│   │   ├── date.ts        # 日期工具
│   │   ├── validation.ts  # 验证工具
│   │   ├── storage.ts     # 存储工具
│   │   └── ...
│   ├── views/             # 页面组件
│   │   ├── auth/          # 认证页面
│   │   │   ├── LoginView.vue
│   │   │   ├── RegisterView.vue
│   │   │   └── ...
│   │   ├── workspace/     # 工作区页面
│   │   │   ├── WorkspaceListView.vue
│   │   │   ├── WorkspaceDetailView.vue
│   │   │   ├── WorkspaceSettingsView.vue
│   │   │   └── ...
│   │   ├── board/         # 看板页面
│   │   │   ├── BoardListView.vue
│   │   │   ├── BoardDetailView.vue
│   │   │   ├── BoardKanbanView.vue
│   │   │   └── ...
│   │   └── ...
│   ├── styles/            # 样式文件
│   │   ├── main.css       # 主样式
│   │   ├── variables.css  # CSS变量
│   │   ├── components.css # 组件样式
│   │   └── ...
│   ├── App.vue            # 根组件
│   └── main.ts            # 应用入口
├── tests/                 # 测试文件
│   ├── unit/             # 单元测试
│   ├── integration/      # 集成测试
│   └── ...
├── package.json          # 项目依赖
├── vite.config.ts        # Vite配置
├── tsconfig.json         # TypeScript配置
├── eslint.config.ts      # ESLint配置
└── README.md             # 项目说明
```

## 🔌 后端API集成

### API 基础配置

后端服务地址：`http://localhost:3000`  
API文档：`http://localhost:3000/api-docs`

### 主要API端点

#### 认证相关 (`/auth`)

- `POST /auth/register` - 用户注册
- `POST /auth/login` - 用户登录
- `GET /auth/profile` - 获取用户信息

#### 工作区管理 (`/workspaces`)

- `POST /workspaces` - 创建工作区
- `GET /workspaces` - 获取工作区列表
- `GET /workspaces/:id` - 获取工作区详情
- `PATCH /workspaces/:id` - 更新工作区
- `DELETE /workspaces/:id` - 删除工作区

#### 工作区成员管理

- `POST /workspaces/:id/members` - 邀请成员
- `GET /workspaces/:id/members` - 获取成员列表
- `PATCH /workspaces/:id/members/:userId` - 更新成员角色
- `DELETE /workspaces/:id/members/:userId` - 移除成员

#### 看板管理 (`/boards`)

- `POST /workspaces/:workspaceId/boards` - 创建看板
- `GET /workspaces/:workspaceId/boards` - 获取看板列表
- `GET /boards/:id` - 获取看板详情
- `PATCH /boards/:id` - 更新看板
- `DELETE /boards/:id` - 删除看板

#### 看板成员管理

- `POST /boards/:id/members` - 添加看板成员
- `GET /boards/:id/members` - 获取看板成员
- `PATCH /boards/:id/members/:userId` - 更新成员角色
- `DELETE /boards/:id/members/:userId` - 移除成员

#### 列表管理 (`/lists`)

- `POST /boards/:boardId/lists` - 创建列表
- `GET /boards/:boardId/lists` - 获取列表
- `GET /lists/:id` - 获取列表详情
- `PATCH /lists/:id` - 更新列表
- `DELETE /lists/:id` - 删除列表
- `PATCH /boards/:boardId/lists/reorder` - 重排序列表

#### 卡片管理 (`/cards`)

- `POST /lists/:listId/cards` - 创建卡片
- `GET /lists/:listId/cards` - 获取卡片列表
- `GET /cards/:id` - 获取卡片详情
- `PATCH /cards/:id` - 更新卡片
- `DELETE /cards/:id` - 删除卡片
- `PATCH /cards/:id/move` - 移动卡片
- `PATCH /cards/:id/assign` - 分配卡片

### 权限系统

#### 工作区角色

- **OWNER** - 工作区所有者，拥有所有权限
- **MEMBER** - 工作区成员，可以创建和编辑内容
- **VIEWER** - 工作区访客，只能查看内容

#### 看板角色

- **ADMIN** - 看板管理员，可以管理看板和成员
- **MEMBER** - 看板成员，可以编辑内容
- **VIEWER** - 看板访客，只能查看内容

#### 权限继承规则

1. 工作区 OWNER → 自动继承所有看板的 ADMIN 权限
2. 工作区 MEMBER → 自动继承所有看板的 MEMBER 权限
3. 工作区 VIEWER → 自动继承所有看板的 VIEWER 权限
4. 看板直接权限 > 工作区继承权限（权限覆盖）
5. 卡片分配者拥有对分配给自己卡片的特殊编辑权限

## 🎨 UI/UX 设计指南

### 设计原则

- **简洁明了** - 界面清晰，操作直观
- **一致性** - 保持设计和交互的一致性
- **可访问性** - 支持键盘导航和屏幕阅读器
- **响应式** - 适配不同屏幕尺寸
- **性能优先** - 优化加载速度和交互响应

### 色彩规范

```css
:root {
  /* 主色调 */
  --primary-50: #eff6ff;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;

  /* 辅助色 */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-500: #6b7280;
  --gray-900: #111827;

  /* 状态色 */
  --success-500: #10b981;
  --warning-500: #f59e0b;
  --error-500: #ef4444;
}
```

### 组件规范

- **按钮** - 统一的按钮样式和交互状态
- **表单** - 一致的表单控件和验证样式
- **卡片** - 统一的卡片容器和阴影效果
- **模态框** - 标准的对话框和覆盖层样式

## 🔒 认证与安全

### JWT Token 管理

- 使用 localStorage 存储访问令牌
- 实现 token 自动刷新机制
- 处理 token 过期和无效情况

### 路由守卫

- 保护需要认证的路由
- 检查用户权限和访问级别
- 处理未授权访问

### 安全最佳实践

- 输入验证和清理
- XSS 防护
- CSRF 防护
- 敏感数据处理

## 📱 响应式设计

### 断点规范

```css
/* 移动设备 */
@media (max-width: 640px) { ... }

/* 平板设备 */
@media (min-width: 641px) and (max-width: 1024px) { ... }

/* 桌面设备 */
@media (min-width: 1025px) { ... }
```

### 适配策略

- 移动优先的设计方法
- 灵活的网格布局系统
- 自适应的组件尺寸
- 触摸友好的交互元素

## ⚡ 性能优化

### 代码分割

- 路由级别的懒加载
- 组件级别的动态导入
- 第三方库的按需加载

### 缓存策略

- API 响应缓存
- 静态资源缓存
- 组件状态缓存

### 优化技巧

- 虚拟滚动处理大量数据
- 防抖和节流优化用户输入
- 图片懒加载和压缩
- Bundle 分析和优化

## 🧪 测试策略

### 单元测试

- 组件逻辑测试
- 工具函数测试
- 状态管理测试

### 集成测试

- API 集成测试
- 组件交互测试
- 用户流程测试

### E2E 测试

- 关键用户场景
- 跨浏览器兼容性
- 性能测试

## 🚀 部署和发布

### 构建配置

```bash
# 开发环境
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

### 环境变量

```env
# .env.development
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_TITLE=Kanban Development

# .env.production
VITE_API_BASE_URL=https://api.yourkanban.com
VITE_APP_TITLE=Kanban
```

### 部署选项

- **Vercel** - 零配置部署
- **Netlify** - 静态站点托管
- **AWS S3 + CloudFront** - 企业级部署
- **Docker** - 容器化部署

## 📚 开发指南

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 Vue 3 组合式 API 最佳实践
- 使用 ESLint 和 Prettier 保持代码质量
- 编写清晰的注释和文档

### Git 工作流

- 功能分支开发
- 代码审查机制
- 自动化测试集成
- 语义化版本发布

### 调试技巧

- Vue DevTools 使用
- 网络请求调试
- 性能分析工具
- 错误追踪和日志

## 🔧 开发环境设置

### 前置要求

- Node.js >= 20.19.0 或 >= 22.12.0
- pnpm >= 8.0.0
- Git

### 快速开始

```bash
# 克隆项目
git clone <repository-url>
cd frontend-kanban

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 打开浏览器访问 http://localhost:5173
```

### IDE 配置

推荐使用 VS Code 并安装以下扩展：

- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- ESLint
- Prettier
- Auto Rename Tag
- Bracket Pair Colorizer

## 📖 学习资源

### 官方文档

- [Vue 3 官方文档](https://vuejs.org/)
- [Pinia 状态管理](https://pinia.vuejs.org/)
- [Vue Router 路由](https://router.vuejs.org/)
- [Vite 构建工具](https://vitejs.dev/)

### 社区资源

- [Vue 3 最佳实践](https://vuejs.org/guide/best-practices/)
- [TypeScript Vue 指南](https://vuejs.org/guide/typescript/overview.html)
- [组合式 API 指南](https://vuejs.org/guide/extras/composition-api-faq.html)

---

**最后更新：** 2025-01-15  
**版本：** 1.0.0  
**维护者：** 前端开发团队
