<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto p-8">
      <header class="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">我的工作区</h1>
          <p class="text-gray-600">管理您的团队工作空间</p>
        </div>
        <div>
          <n-button type="primary" @click="logout" class="px-6 py-2">
            退出登录
          </n-button>
        </div>
      </header>

      <div class="flex justify-center">
        <n-card class="max-w-2xl w-full">
          <div class="text-center p-8">
            <h2 class="text-2xl font-semibold text-green-600 mb-4">🎉 认证系统已就绪！</h2>
            <p class="text-lg text-gray-700 mb-8">您已成功登录到 Kanban 系统</p>

            <div class="flex flex-col items-center gap-3 mb-8">
              <n-tag type="success" size="large" class="px-4 py-2">
                欢迎，{{ user?.username }}！
              </n-tag>
              <p class="text-sm text-gray-500">{{ user?.email }}</p>
            </div>

            <div class="text-left max-w-md mx-auto">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">接下来：</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                  实现工作区管理功能
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                  添加看板和任务管理
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                  完善团队协作功能
                </li>
              </ul>
            </div>
          </div>
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NCard, NTag } from 'naive-ui'
import { useAuth } from '@/composables/useAuth'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const { logout } = useAuth()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>

<!-- 响应式设计使用 Tailwind CSS -->
<style scoped>
/* 移动端响应式调整 */
@media (max-width: 768px) {
  .flex.justify-between {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .text-3xl {
    font-size: 1.5rem;
  }

  .p-8 {
    padding: 1rem;
  }
}
</style>
