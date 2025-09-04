<template>
  <teleport to="body">
    <transition-group
      name="notification"
      tag="div"
      class="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm pointer-events-none"
    >
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="flex items-start gap-3 p-4 bg-white rounded-lg shadow-lg border-l-4 cursor-pointer pointer-events-auto transition-all duration-300 hover:-translate-x-1 hover:shadow-xl min-w-80"
        :class="{
          'border-l-green-500': notification.type === 'success',
          'border-l-red-500': notification.type === 'error',
          'border-l-yellow-500': notification.type === 'warning',
          'border-l-blue-500': notification.type === 'info'
        }"
        @click="removeNotification(notification.id)"
      >
        <div class="text-xl leading-none mt-0.5 flex-shrink-0">
          {{ getNotificationIcon(notification.type) }}
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-semibold text-gray-800 mb-1 leading-tight">
            {{ notification.title }}
          </h4>
          <p v-if="notification.message" class="text-xs text-gray-600 leading-tight">
            {{ notification.message }}
          </p>
        </div>
        <button
          class="text-xl text-gray-400 hover:text-gray-600 leading-none flex-shrink-0 transition-colors"
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

<!-- Tailwind CSS 动画和响应式设计 -->
<style scoped>
/* 通知动画 */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
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
  transition: transform 0.3s ease;
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
