import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export function setupAuthGuard() {
  return (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const authStore = useAuthStore()

    // 检查路由是否需要认证
    const requiresAuth = to.meta.requiresAuth !== false

    if (requiresAuth && !authStore.isLoggedIn) {
      // 需要认证但未登录，重定向到登录页
      next({
        path: '/login',
        query: { redirect: to.fullPath }, // 保存原始路径用于登录后重定向
      })
    } else if (!requiresAuth && authStore.isLoggedIn) {
      // 不需要认证但已登录（如登录页），重定向到工作区
      next('/workspaces')
    } else {
      // 其他情况正常通过
      next()
    }
  }
}
