<template>
  <div class="min-h-screen flex items-center justify-center relative gradient-bg overflow-hidden">
    <div class="flex max-w-4xl w-full mx-8 glass-effect rounded-3xl shadow-strong overflow-hidden">
      <div class="flex-1 p-12 flex flex-col justify-center green-gradient text-white text-center">
        <div class="flex items-center justify-center gap-4 mb-6">
          <div class="text-5xl">📋</div>
          <h1 class="text-4xl font-bold tracking-tight">Kanban</h1>
        </div>
        <p class="text-lg opacity-90 leading-relaxed">
          现代化的团队协作看板管理系统
        </p>
      </div>

      <div class="flex-1 p-8 flex items-center justify-center">
        <LoginForm />
      </div>
    </div>

    <!-- 背景动画 -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 animate-pulse"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<!-- 响应式设计使用 Tailwind CSS -->
<style scoped>
/* 移动端响应式调整 */
@media (max-width: 768px) {
  .flex {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .mx-8 {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  .rounded-3xl {
    border-radius: 0;
  }

  .p-12 {
    padding: 1.5rem;
  }

  .text-4xl {
    font-size: 1.75rem;
  }

  .text-5xl {
    font-size: 2rem;
  }
}
</style>
