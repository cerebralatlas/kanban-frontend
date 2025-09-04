<template>
  <div class="min-h-screen flex items-center justify-center gradient-bg">
    <div class="text-center p-8">
      <div class="bg-white p-12 rounded-3xl shadow-strong max-w-lg">
        <div class="text-6xl mb-4">🔍</div>
        <h1 class="text-8xl font-bold text-gray-800 mb-0 leading-none">404</h1>
        <h2 class="text-2xl text-gray-600 mb-4">页面未找到</h2>
        <p class="text-gray-500 leading-relaxed mb-8">
          抱歉，您访问的页面不存在或已被移除。
        </p>

        <div class="flex gap-4 justify-center">
          <n-button type="primary" @click="goHome" size="large" class="px-6">
            返回首页
          </n-button>
          <n-button @click="goBack" size="large" class="px-6">
            返回上页
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<!-- 响应式设计使用 Tailwind CSS -->
<style scoped>
/* 移动端响应式调整 */
@media (max-width: 480px) {
  .p-8 {
    padding: 1rem;
  }

  .p-12 {
    padding: 2rem;
  }

  .text-8xl {
    font-size: 4rem;
  }

  .flex.gap-4 {
    flex-direction: column;
  }
}
</style>
