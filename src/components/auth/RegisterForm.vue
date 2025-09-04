<template>
  <div class="max-w-md mx-auto p-8 bg-white rounded-xl shadow-soft">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-2">创建 Kanban 账户</h2>
      <p class="text-sm text-gray-600">填写信息以创建您的账户</p>
    </div>

    <n-form
      ref="formRef"
      :model="form"
      :rules="rules"
      size="large"
      @keydown.enter="handleSubmit"
    >
      <n-form-item path="email" label="邮箱">
        <n-input
          v-model:value="form.email"
          placeholder="请输入邮箱地址"
          :disabled="isRegisterLoading"
          clearable
        />
      </n-form-item>

      <n-form-item path="username" label="用户名">
        <n-input
          v-model:value="form.username"
          placeholder="请输入用户名"
          :disabled="isRegisterLoading"
          clearable
        />
      </n-form-item>

      <n-form-item path="password" label="密码">
        <n-input
          v-model:value="form.password"
          type="password"
          placeholder="请输入密码"
          :disabled="isRegisterLoading"
          show-password-on="mousedown"
          @input="updatePasswordStrength"
        />
        <div class="mt-2 flex items-center gap-2">
          <div class="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full transition-all duration-300 rounded-full"
              :class="{
                'bg-red-500': passwordStrength.class === 'weak',
                'bg-yellow-500': passwordStrength.class === 'medium',
                'bg-green-500': passwordStrength.class === 'strong'
              }"
              :style="{ width: passwordStrength.width }"
            ></div>
          </div>
          <span
            class="text-xs font-medium"
            :class="{
              'text-red-500': passwordStrength.class === 'weak',
              'text-yellow-500': passwordStrength.class === 'medium',
              'text-green-500': passwordStrength.class === 'strong'
            }"
          >
            {{ passwordStrength.text }}
          </span>
        </div>
      </n-form-item>

      <n-form-item path="confirmPassword" label="确认密码">
        <n-input
          v-model:value="form.confirmPassword"
          type="password"
          placeholder="请再次输入密码"
          :disabled="isRegisterLoading"
          show-password-on="mousedown"
        />
      </n-form-item>

      <n-form-item path="avatar" label="头像 (可选)">
        <n-input
          v-model:value="form.avatar"
          placeholder="请输入头像URL"
          :disabled="isRegisterLoading"
          clearable
        />
      </n-form-item>

      <n-form-item>
        <n-checkbox v-model:checked="agreeToTerms" :disabled="isRegisterLoading">
          <span class="text-sm">
            我同意
            <n-button text type="primary" size="small" class="mx-1">
              用户协议
            </n-button>
            和
            <n-button text type="primary" size="small" class="mx-1">
              隐私政策
            </n-button>
          </span>
        </n-checkbox>
      </n-form-item>

      <n-form-item>
        <n-button
          type="primary"
          size="large"
          :loading="isRegisterLoading"
          :disabled="!canSubmit"
          @click="handleSubmit"
          block
        >
          {{ isRegisterLoading ? '注册中...' : '创建账户' }}
        </n-button>
      </n-form-item>
    </n-form>

    <div class="text-center mt-6 pt-6 border-t border-gray-200">
      <p class="text-sm text-gray-600">
        已有账户？
        <router-link to="/login" class="text-green-600 hover:text-green-700 font-medium hover:underline">
          立即登录
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { NForm, NFormItem, NInput, NButton, NCheckbox } from 'naive-ui'
import { useAuth } from '@/composables/useAuth'
import type { RegisterRequest } from '@/types/api'

const { register, isRegisterLoading } = useAuth()

const formRef = ref()
const agreeToTerms = ref(false)

const form = reactive<RegisterRequest & { confirmPassword: string }>({
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  avatar: '',
})

const passwordStrength = ref({
  width: '0%',
  text: '',
  class: '',
})

const rules = {
  email: [
    {
      required: true,
      message: '请输入邮箱地址',
      trigger: 'blur',
    },
    {
      type: 'email' as const,
      message: '请输入有效的邮箱地址',
      trigger: 'blur',
    },
  ],
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 30,
      message: '用户名长度应为 3-30 个字符',
      trigger: 'blur',
    },
    {
      pattern: /^[a-zA-Z0-9_-]+$/,
      message: '用户名只能包含字母、数字、下划线和短横线',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      min: 8,
      message: '密码长度至少为 8 个字符',
      trigger: 'blur',
    },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      message: '密码必须包含大小写字母、数字和特殊字符',
      trigger: 'blur',
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: '请确认密码',
      trigger: 'blur',
    },
    {
      validator: (_rule: unknown, value: string) => {
        return value === form.password
      },
      message: '两次输入的密码不一致',
      trigger: 'blur',
    },
  ],
  avatar: [
    {
      pattern: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
      message: '头像必须是有效的图片URL',
      trigger: 'blur',
    },
  ],
}

const canSubmit = computed(() => {
  return form.email &&
         form.username &&
         form.password &&
         form.confirmPassword &&
         form.password === form.confirmPassword &&
         agreeToTerms.value
})

const updatePasswordStrength = () => {
  const password = form.password
  let score = 0

  if (password.length >= 8) score += 1
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[@$!%*?&]/.test(password)) score += 1

  switch (score) {
    case 0:
    case 1:
      passwordStrength.value = {
        width: '20%',
        text: '弱',
        class: 'weak',
      }
      break
    case 2:
    case 3:
      passwordStrength.value = {
        width: '60%',
        text: '中等',
        class: 'medium',
      }
      break
    case 4:
    case 5:
      passwordStrength.value = {
        width: '100%',
        text: '强',
        class: 'strong',
      }
      break
    default:
      passwordStrength.value = {
        width: '0%',
        text: '',
        class: '',
      }
  }
}

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()

    const { confirmPassword, ...registerData } = form
    // confirmPassword is only used for validation, not sent to API
    console.debug('Form validation passed, confirmPassword matches:', confirmPassword === form.password)
    await register(registerData)
  } catch (error) {
    console.error('Register form validation failed:', error)
  }
}
</script>

<!-- Tailwind CSS 样式已内联到模板中 -->
