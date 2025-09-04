<template>
  <div class="min-h-screen flex items-center justify-center relative notion-gradient-bg overflow-hidden">
    <div class="flex max-w-5xl w-full mx-8 notion-glass rounded-2xl notion-shadow-strong overflow-hidden">
      <div class="flex-1 p-12 flex flex-col justify-center notion-success-gradient text-text-white text-center">
        <div class="flex items-center justify-center gap-4 mb-6">
          <div class="text-5xl">📋</div>
          <h1 class="text-4xl font-bold tracking-tight">Kanban</h1>
        </div>
        <p class="text-lg opacity-90 leading-relaxed mb-8">
          加入我们，开始您的高效团队协作之旅
        </p>
        <div class="space-y-4">
          <div class="flex items-center justify-center gap-3 text-base opacity-90">
            <span class="text-xl">✨</span>
            <span>直观的看板管理</span>
          </div>
          <div class="flex items-center justify-center gap-3 text-base opacity-90">
            <span class="text-xl">👥</span>
            <span>团队协作</span>
          </div>
          <div class="flex items-center justify-center gap-3 text-base opacity-90">
            <span class="text-xl">📊</span>
            <span>项目跟踪</span>
          </div>
        </div>
      </div>

      <div class="flex-1 p-8 flex items-center justify-center bg-background-primary">
        <RegisterForm />
      </div>
    </div>

    <!-- Notion 风格背景 -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-status-blue-light/30 to-status-purple-light/30 animate-fade-in"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RegisterForm from '@/components/auth/RegisterForm.vue'
</script>

<!-- Notion 风格响应式设计 -->
<style scoped>
/* 移动端响应式调整 */
@media (max-width: 768px) {
  .flex {
    flex-direction: column;
  }

  .space-y-4 > * {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  
  .notion-success-gradient {
    @apply rounded-t-2xl;
  }
  
  .bg-background-primary {
    @apply rounded-b-2xl;
  }
}

@media (max-width: 480px) {
  .mx-8 {
    @apply mx-2;
  }

  .rounded-2xl {
    @apply rounded-lg;
  }

  .p-12 {
    @apply p-6;
  }

  .text-4xl {
    @apply text-2xl;
  }

  .text-5xl {
    @apply text-3xl;
  }
  
  .p-8 {
    @apply p-4;
  }

  .space-y-4 > * {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
