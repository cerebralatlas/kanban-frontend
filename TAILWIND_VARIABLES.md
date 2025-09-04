# Notion 风格 Tailwind 变量使用指南

## 🎨 颜色系统

### 背景颜色

```html
<!-- 主背景 -->
<div class="bg-background-primary">主要背景 (白色)</div>
<div class="bg-background-secondary">次要背景 (浅灰)</div>
<div class="bg-background-tertiary">第三背景 (更浅灰)</div>
<div class="bg-background-hover">悬停背景</div>
<div class="bg-background-selected">选中背景</div>
```

### 文本颜色

```html
<p class="text-text-primary">主要文本</p>
<p class="text-text-secondary">次要文本</p>
<p class="text-text-tertiary">第三文本</p>
<p class="text-text-muted">静音文本</p>
<p class="text-text-white">白色文本</p>
```

### 边框颜色

```html
<div class="border border-border-light">浅边框</div>
<div class="border border-border-medium">中等边框</div>
<div class="border border-border-dark">深边框</div>
```

### 状态颜色 (标签、状态指示器)

```html
<!-- 红色状态 -->
<span class="bg-status-red-light text-status-red-text">紧急</span>
<span class="bg-status-red-medium text-status-red-dark">重要</span>

<!-- 绿色状态 -->
<span class="bg-status-green-light text-status-green-text">完成</span>
<span class="bg-status-green-medium text-status-green-dark">进行中</span>

<!-- 蓝色状态 -->
<span class="bg-status-blue-light text-status-blue-text">信息</span>

<!-- 黄色状态 -->
<span class="bg-status-yellow-light text-status-yellow-text">警告</span>

<!-- 其他颜色：orange, purple, pink, gray -->
```

### 卡片和组件颜色

```html
<div class="bg-card-background border-card-border shadow-card">标准卡片样式</div>

<div class="bg-card-background hover:bg-card-hover border-card-border shadow-card-hover">
  可悬停的卡片
</div>
```

### 侧边栏颜色

```html
<aside class="bg-sidebar-background shadow-sidebar">
  <div class="text-sidebar-text">侧边栏标题</div>
  <div class="text-sidebar-textMuted">侧边栏子文本</div>
  <button class="hover:bg-sidebar-hover active:bg-sidebar-active">侧边栏按钮</button>
</aside>
```

## 📝 字体系统

### 字体大小

```html
<p class="text-xs">超小文本 (11px)</p>
<p class="text-sm">小文本 (12px)</p>
<p class="text-base">基础文本 (14px)</p>
<p class="text-lg">大文本 (16px)</p>
<p class="text-xl">超大文本 (18px)</p>
<p class="text-2xl">标题 (20px)</p>
<p class="text-3xl">大标题 (24px)</p>
<p class="text-4xl">超大标题 (32px)</p>
```

### 字体族

```html
<p class="font-sans">默认字体 (系统字体)</p>
<code class="font-mono">等宽字体</code>
```

## 📐 间距和布局

### 自定义间距

```html
<!-- 小间距 -->
<div class="p-0.5">2px 内边距</div>
<div class="p-1.5">6px 内边距</div>
<div class="p-2.5">10px 内边距</div>

<!-- 大间距 -->
<div class="p-13">52px 内边距</div>
<div class="p-15">60px 内边距</div>
<div class="p-18">72px 内边距</div>
```

### 网格布局

```html
<!-- 看板布局 -->
<div class="grid grid-cols-kanban gap-6">
  <div>列1</div>
  <div>列2</div>
  <div>列3</div>
</div>

<!-- 侧边栏布局 -->
<div class="grid grid-cols-sidebar h-screen">
  <aside>侧边栏</aside>
  <main>主内容</main>
</div>
```

### 最大宽度

```html
<div class="max-w-sidebar">侧边栏宽度 (240px)</div>
<div class="max-w-content">内容区域宽度 (1200px)</div>
<div class="max-w-card">卡片宽度 (320px)</div>
```

### 最小高度

```html
<div class="min-h-card">卡片最小高度 (120px)</div>
<div class="min-h-column">列最小高度 (400px)</div>
```

## 🎭 阴影和圆角

### 阴影

```html
<div class="shadow-card">卡片阴影</div>
<div class="shadow-card-hover">卡片悬停阴影</div>
<div class="shadow-sidebar">侧边栏阴影</div>
```

### 圆角

```html
<div class="rounded-sm">2px 圆角</div>
<div class="rounded">3px 圆角 (默认)</div>
<div class="rounded-md">4px 圆角</div>
<div class="rounded-lg">6px 圆角</div>
<div class="rounded-xl">8px 圆角</div>
```

## ✨ 动画和过渡

### 动画

```html
<div class="animate-fade-in">淡入动画</div>
<div class="animate-slide-up">向上滑动</div>
<div class="animate-slide-down">向下滑动</div>
<div class="animate-scale-in">缩放进入</div>
```

### 过渡

```html
<div class="transition-all duration-150 ease-notion">Notion 风格过渡</div>
<div class="transition-all duration-250">250ms 过渡</div>
```

## 🔢 层级管理

### Z-index

```html
<div class="z-dropdown">下拉菜单 (1000)</div>
<div class="z-modal">模态框 (1050)</div>
<div class="z-tooltip">工具提示 (1070)</div>
```

## 🎯 完整的看板卡片示例

```html
<div
  class="bg-card-background border border-card-border rounded-lg p-4 shadow-card hover:shadow-card-hover transition-all duration-150 ease-notion max-w-card"
>
  <!-- 卡片头部 -->
  <div class="flex items-center justify-between mb-3">
    <h3 class="text-base font-medium text-text-primary">任务标题</h3>
    <span class="bg-status-blue-light text-status-blue-text px-2 py-1 rounded text-xs">
      进行中
    </span>
  </div>

  <!-- 卡片内容 -->
  <p class="text-sm text-text-secondary mb-4 leading-relaxed">这是任务的详细描述内容...</p>

  <!-- 卡片底部 -->
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <span class="text-xs text-text-muted">截止日期:</span>
      <span class="text-xs text-text-secondary">2024-01-15</span>
    </div>
    <button
      class="text-xs text-status-blue-text hover:text-status-blue-dark transition-colors duration-150"
    >
      编辑
    </button>
  </div>
</div>
```

## 🎨 侧边栏示例

```html
<aside class="bg-sidebar-background shadow-sidebar w-full max-w-sidebar h-screen p-4">
  <!-- 侧边栏头部 -->
  <div class="mb-6">
    <h2 class="text-lg font-medium text-sidebar-text">项目看板</h2>
    <p class="text-sm text-sidebar-textMuted mt-1">管理你的任务</p>
  </div>

  <!-- 导航菜单 -->
  <nav class="space-y-1">
    <a
      href="#"
      class="flex items-center px-3 py-2 text-sm text-sidebar-text hover:bg-sidebar-hover rounded transition-colors duration-150"
    >
      <span>📋</span>
      <span class="ml-3">所有任务</span>
    </a>
    <a
      href="#"
      class="flex items-center px-3 py-2 text-sm text-sidebar-text bg-sidebar-active rounded"
    >
      <span>🚀</span>
      <span class="ml-3">我的项目</span>
    </a>
    <a
      href="#"
      class="flex items-center px-3 py-2 text-sm text-sidebar-text hover:bg-sidebar-hover rounded transition-colors duration-150"
    >
      <span>⚡</span>
      <span class="ml-3">快速访问</span>
    </a>
  </nav>
</aside>
```

## 📱 响应式看板布局示例

```html
<div class="min-h-screen bg-background-secondary">
  <!-- 顶部导航 -->
  <header class="bg-background-primary border-b border-border-light px-6 py-4">
    <h1 class="text-2xl font-medium text-text-primary">项目看板</h1>
  </header>

  <!-- 主要布局 -->
  <div class="grid grid-cols-sidebar">
    <!-- 侧边栏 -->
    <aside class="bg-sidebar-background shadow-sidebar">
      <!-- 侧边栏内容 -->
    </aside>

    <!-- 主内容区域 -->
    <main class="p-6">
      <!-- 看板列 -->
      <div class="grid grid-cols-kanban gap-6">
        <div class="bg-background-primary rounded-lg p-4 min-h-column">
          <h3 class="text-lg font-medium text-text-primary mb-4">待办事项</h3>
          <!-- 卡片列表 -->
          <div class="space-y-3">
            <!-- 卡片项目 -->
          </div>
        </div>

        <div class="bg-background-primary rounded-lg p-4 min-h-column">
          <h3 class="text-lg font-medium text-text-primary mb-4">进行中</h3>
          <!-- 卡片列表 -->
        </div>

        <div class="bg-background-primary rounded-lg p-4 min-h-column">
          <h3 class="text-lg font-medium text-text-primary mb-4">已完成</h3>
          <!-- 卡片列表 -->
        </div>
      </div>
    </main>
  </div>
</div>
```

这些变量提供了完整的 Notion 风格设计系统，让你可以轻松创建一致且美观的看板界面！
