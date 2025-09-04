<template>
  <teleport to="body">
    <transition-group
      name="notification"
      tag="div"
      class="fixed top-4 right-4 z-tooltip flex flex-col gap-3 max-w-sm pointer-events-none"
    >
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="flex items-start gap-3 p-4 notion-card border-l-4 cursor-pointer pointer-events-auto transition-all duration-250 ease-notion hover:-translate-x-1 min-w-80"
        :class="{
          'border-l-status-green-dark': notification.type === 'success',
          'border-l-status-red-dark': notification.type === 'error',
          'border-l-status-yellow-dark': notification.type === 'warning',
          'border-l-status-blue-dark': notification.type === 'info'
        }"
        @click="removeNotification(notification.id)"
      >
        <div class="text-xl leading-none mt-0.5 flex-shrink-0">
          {{ getNotificationIcon(notification.type) }}
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-semibold text-text-primary mb-1 leading-tight">
            {{ notification.title }}
          </h4>
          <p v-if="notification.message" class="text-xs text-text-secondary leading-tight">
            {{ notification.message }}
          </p>
        </div>
        <button
          class="text-xl text-text-muted hover:text-text-secondary leading-none flex-shrink-0 transition-colors duration-150 ease-notion"
          @click.stop="removeNotification(notification.id)"
        >
          ×
        </button>
      </div>
    </transition-group>
  </teleport>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUIStore } from '@/stores/ui'

const uiStore = useUIStore()
const { notifications } = storeToRefs(uiStore)

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success':
      return '✅'
    case 'error':
      return '❌'
    case 'warning':
      return '⚠️'
    case 'info':
      return 'ℹ️'
    default:
      return 'ℹ️'
  }
}

const removeNotification = (id: string) => {
  uiStore.removeNotification(id)
}
</script>

<!-- Notion 风格动画和响应式设计 -->
<style scoped>
/* Notion 风格通知动画 */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.notification-move {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 移动端响应式 */
@media (max-width: 480px) {
  .fixed.top-4.right-4 {
    top: 0.5rem;
    right: 0.5rem;
    left: 0.5rem;
    max-width: none;
  }

  .min-w-80 {
    min-width: auto;
  }
}
</style>
