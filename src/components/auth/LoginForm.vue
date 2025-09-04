<template>
  <div class="max-w-md mx-auto p-8 notion-card">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-semibold text-text-primary mb-2">登录到 Kanban</h2>
      <p class="text-sm text-text-secondary">使用您的账户登录</p>
    </div>

    <n-form
      ref="formRef"
      :model="form"
      :rules="rules"
      size="large"
      @keydown.enter="handleSubmit"
    >
      <n-form-item path="emailOrUsername" label="邮箱或用户名">
        <n-input
          v-model:value="form.emailOrUsername"
          placeholder="请输入邮箱或用户名"
          :disabled="isLoginLoading"
          clearable
        />
      </n-form-item>

      <n-form-item path="password" label="密码">
        <n-input
          v-model:value="form.password"
          type="password"
          placeholder="请输入密码"
          :disabled="isLoginLoading"
          show-password-on="mousedown"
        />
      </n-form-item>

      <n-form-item>
        <div class="flex justify-between items-center w-full">
          <n-checkbox v-model:checked="rememberMe">
            记住我
          </n-checkbox>
          <n-button text type="primary" class="text-sm text-status-blue-text hover:text-status-blue-dark">
            忘记密码？
          </n-button>
        </div>
      </n-form-item>

      <n-form-item>
        <n-button
          type="primary"
          size="large"
          :loading="isLoginLoading"
          :disabled="!form.emailOrUsername || !form.password"
          @click="handleSubmit"
          block
        >
          {{ isLoginLoading ? '登录中...' : '登录' }}
        </n-button>
      </n-form-item>
    </n-form>

    <div class="text-center mt-6 pt-6 border-t border-border-light">
      <p class="text-sm text-text-secondary">
        还没有账户？
        <router-link to="/register" class="text-status-blue-text hover:text-status-blue-dark font-medium hover:underline transition-colors duration-150 ease-notion">
          立即注册
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { NForm, NFormItem, NInput, NButton, NCheckbox } from 'naive-ui'
import { useAuth } from '@/composables/useAuth'
import type { LoginRequest } from '@/types/api'

const { login, isLoginLoading } = useAuth()

const formRef = ref()
const rememberMe = ref(false)

const form = reactive<LoginRequest>({
  emailOrUsername: '',
  password: '',
})

const rules = {
  emailOrUsername: [
    {
      required: true,
      message: '请输入邮箱或用户名',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
}

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    await login(form)

    // 处理记住我功能
    if (rememberMe.value) {
      localStorage.setItem('remember_user', form.emailOrUsername)
    } else {
      localStorage.removeItem('remember_user')
    }
  } catch (error) {
    console.error('Login form validation failed:', error)
  }
}

// 初始化时检查是否有记住的用户
const rememberedUser = localStorage.getItem('remember_user')
if (rememberedUser) {
  form.emailOrUsername = rememberedUser
  rememberMe.value = true
}
</script>

<!-- Tailwind CSS 样式已内联到模板中 -->
