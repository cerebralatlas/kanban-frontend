import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { authApi } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'
import type { LoginRequest, RegisterRequest } from '@/types/api'

export function useAuth() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const authStore = useAuthStore()
  const uiStore = useUIStore()

  // 获取用户信息
  const {
    data: user,
    isLoading: isProfileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: () => authApi.getProfile(),
    enabled: !!authStore.token,
    select: (data) => data.user,
    retry: false, // 不重试，避免token过期时反复请求
  })

  // 登录
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data) => {
      authStore.setAuth(data.user, data.accessToken)
      queryClient.setQueryData(['auth', 'profile'], { user: data.user })

      uiStore.addNotification({
        type: 'success',
        title: '登录成功',
        message: `欢迎回来，${data.user.username}！`,
      })

      router.push('/workspaces')
    },
    onError: (error: any) => {
      uiStore.addNotification({
        type: 'error',
        title: '登录失败',
        message: error.message || '请检查您的用户名和密码',
      })
    },
  })

  // 注册
  const registerMutation = useMutation({
    mutationFn: (userData: RegisterRequest) => authApi.register(userData),
    onSuccess: async (_, variables) => {
      uiStore.addNotification({
        type: 'success',
        title: '注册成功',
        message: '账户创建成功，正在为您登录...',
      })

      // 注册成功后自动登录
      await loginMutation.mutateAsync({
        emailOrUsername: variables.email,
        password: variables.password,
      })
    },
    onError: (error: any) => {
      uiStore.addNotification({
        type: 'error',
        title: '注册失败',
        message: error.message || '注册过程中发生错误',
      })
    },
  })

  // 登出
  const logout = () => {
    authStore.logout()
    queryClient.clear() // 清除所有缓存

    uiStore.addNotification({
      type: 'info',
      title: '已退出登录',
      message: '感谢使用，期待您的再次访问！',
    })

    router.push('/login')
  }

  // 初始化认证状态
  const initializeAuth = async () => {
    if (authStore.token && !authStore.user) {
      try {
        const profileData = await authApi.getProfile()
        authStore.setAuth(profileData.user, authStore.token)
      } catch (error) {
        console.error('Failed to initialize auth:', error)
        authStore.logout()
      }
    }
  }

  return {
    // 状态
    user,
    isProfileLoading,
    profileError,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,

    // 操作
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout,
    initializeAuth,
  }
}
