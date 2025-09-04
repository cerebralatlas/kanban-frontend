<template>
  <div class="min-h-screen flex items-center justify-center relative gradient-bg overflow-hidden">
    <div class="flex max-w-5xl w-full mx-8 glass-effect rounded-3xl shadow-strong overflow-hidden">
      <div class="flex-1 p-12 flex flex-col justify-center green-gradient text-white text-center">
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

      <div class="flex-1 p-8 flex items-center justify-center">
        <RegisterForm />
      </div>
    </div>

    <!-- 背景动画 -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 animate-pulse"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RegisterForm from '@/components/auth/RegisterForm.vue'
</script>

<!-- 响应式设计使用 Tailwind CSS -->
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

  .space-y-4 > * {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
