<template>
  <div class="min-h-screen bg-background-secondary">
    <div class="max-w-6xl mx-auto p-8">
      <header class="flex justify-between items-center mb-8 pb-4 border-b border-border-light">
        <div>
          <h1 class="text-3xl font-bold text-text-primary mb-2">我的工作区</h1>
          <p class="text-text-secondary">管理您的团队工作空间</p>
        </div>
        <div>
          <n-button type="primary" @click="logout" class="notion-button-primary">
            退出登录
          </n-button>
        </div>
      </header>

      <div class="flex justify-center">
        <div class="notion-card max-w-2xl w-full">
          <div class="text-center p-8">
            <h2 class="text-2xl font-semibold text-status-green-text mb-4">🎉 认证系统已就绪！</h2>
            <p class="text-lg text-text-primary mb-8">您已成功登录到 Kanban 系统</p>

            <div class="flex flex-col items-center gap-3 mb-8">
              <div
                class="bg-status-green-light text-status-green-text px-4 py-2 rounded-lg font-medium"
              >
                欢迎，{{ user?.username }}！
              </div>
              <p class="text-sm text-text-muted">{{ user?.email }}</p>
            </div>

            <div class="text-left max-w-md mx-auto">
              <h3 class="text-lg font-semibold text-text-primary mb-4">接下来：</h3>
              <ul class="space-y-2 text-text-secondary">
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-status-blue-dark rounded-full"></span>
                  实现工作区管理功能
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-status-blue-dark rounded-full"></span>
                  添加看板和任务管理
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-status-blue-dark rounded-full"></span>
                  完善团队协作功能
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useAuth } from '@/composables/useAuth'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const { logout } = useAuth()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>

<!-- Notion 风格响应式设计 -->
<style scoped>
/* 移动端响应式调整 */
@media (max-width: 768px) {
  .flex.justify-between {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .text-3xl {
    @apply text-2xl;
  }

  .p-8 {
    @apply p-4;
  }
}

@media (max-width: 480px) {
  .max-w-6xl {
    @apply max-w-full;
  }

  .p-8 {
    @apply p-3;
  }

  .text-3xl {
    @apply text-xl;
  }

  .text-lg {
    @apply text-base;
  }
}
</style>
