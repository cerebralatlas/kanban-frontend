import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { User } from '@/types/api'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth_token'))

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)

  // 操作
  function setAuth(userData: User, accessToken: string) {
    user.value = userData
    token.value = accessToken
    localStorage.setItem('auth_token', accessToken)
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
  }

  return {
    // 状态
    user: readonly(user),
    token: readonly(token),

    // 计算属性
    isLoggedIn,

    // 操作
    setAuth,
    logout,
  }
})
