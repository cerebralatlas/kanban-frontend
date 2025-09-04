<template>
  <div class="min-h-screen flex items-center justify-center notion-gradient-bg">
    <div class="text-center p-8">
      <div class="notion-card p-12 max-w-lg">
        <div class="text-6xl mb-4">🔍</div>
        <h1 class="text-8xl font-bold text-text-primary mb-0 leading-none">404</h1>
        <h2 class="text-2xl text-text-secondary mb-4">页面未找到</h2>
        <p class="text-text-muted leading-relaxed mb-8">
          抱歉，您访问的页面不存在或已被移除。
        </p>

        <div class="flex gap-4 justify-center">
          <n-button type="primary" @click="goHome" size="large" class="notion-button-primary">
            返回首页
          </n-button>
          <n-button @click="goBack" size="large" class="notion-button-secondary">
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

<!-- Notion 风格响应式设计 -->
<style scoped>
/* 移动端响应式调整 */
@media (max-width: 480px) {
  .p-8 {
    @apply p-4;
  }

  .p-12 {
    @apply p-8;
  }

  .text-8xl {
    @apply text-6xl;
  }

  .flex.gap-4 {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .max-w-lg {
    @apply max-w-sm;
  }
}
</style>
