<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <div id="app">
            <router-view />
            <NotificationContainer />
          </div>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import {
  NConfigProvider,
  NGlobalStyle,
  NLoadingBarProvider,
  NDialogProvider,
  NNotificationProvider,
  darkTheme
} from 'naive-ui'
import { useUIStore } from '@/stores/ui'
import { useAuth } from '@/composables/useAuth'
import NotificationContainer from './components/common/NotificationContainer.vue'

const uiStore = useUIStore()
const { initializeAuth } = useAuth()

// 主题配置
const theme = computed(() => {
  return uiStore.isDarkMode ? darkTheme : null
})

// 应用启动时初始化
onMounted(async () => {
  // 初始化UI状态
  uiStore.initialize()

  // 初始化认证状态
  await initializeAuth()
})
</script>

<!-- 全局样式在 main.css 中定义 -->
<style>
/* 全局过渡动画 */
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-300 ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  @apply transition-all duration-300 ease-in-out;
}

.slide-up-enter-from {
  @apply translate-y-5 opacity-0;
}

.slide-up-leave-to {
  @apply -translate-y-5 opacity-0;
}
</style>
