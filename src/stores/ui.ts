import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  // 主题状态
  const isDarkMode = ref(false)

  // 侧边栏状态
  const isSidebarOpen = ref(true)

  // 移动端菜单状态
  const isMobileMenuOpen = ref(false)

  // 全局加载状态
  const globalLoading = ref(false)

  // 通知状态
  const notifications = ref<Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message?: string
    duration?: number
  }>>([])

  // 操作
  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('dark-mode', isDarkMode.value.toString())
  }

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  function setGlobalLoading(loading: boolean) {
    globalLoading.value = loading
  }

  function addNotification(notification: Omit<typeof notifications.value[0], 'id'>) {
    const id = Date.now().toString()
    notifications.value.push({ ...notification, id })

    // 自动移除通知
    const duration = notification.duration || 5000
    setTimeout(() => {
      removeNotification(id)
    }, duration)
  }

  function removeNotification(id: string) {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  // 初始化
  function initialize() {
    const savedDarkMode = localStorage.getItem('dark-mode')
    if (savedDarkMode) {
      isDarkMode.value = savedDarkMode === 'true'
    }
  }

  return {
    // 状态
    isDarkMode: readonly(isDarkMode),
    isSidebarOpen: readonly(isSidebarOpen),
    isMobileMenuOpen: readonly(isMobileMenuOpen),
    globalLoading: readonly(globalLoading),
    notifications: readonly(notifications),

    // 操作
    toggleDarkMode,
    toggleSidebar,
    toggleMobileMenu,
    setGlobalLoading,
    addNotification,
    removeNotification,
    initialize,
  }
})
