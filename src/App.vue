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
  darkTheme,
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

<!-- Notion 风格全局样式 -->
<style>
/* Notion 风格过渡动画 */
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-250 ease-notion;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  @apply transition-all duration-250 ease-notion;
}

.slide-up-enter-from {
  @apply translate-y-1 opacity-0;
}

.slide-up-leave-to {
  @apply -translate-y-1 opacity-0;
}

/* Notion 风格滑动动画 */
.slide-down-enter-active,
.slide-down-leave-active {
  @apply transition-all duration-250 ease-notion;
}

.slide-down-enter-from {
  @apply -translate-y-1 opacity-0;
}

.slide-down-leave-to {
  @apply translate-y-1 opacity-0;
}

/* Notion 风格缩放动画 */
.scale-enter-active,
.scale-leave-active {
  @apply transition-all duration-150 ease-notion;
}

.scale-enter-from {
  @apply scale-95 opacity-0;
}

.scale-leave-to {
  @apply scale-95 opacity-0;
}
</style>
