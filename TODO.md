# 📋 前端开发待办事项清单

基于后端 API 的完整前端开发计划，按优先级和依赖关系组织。

## 🎯 项目当前状态

### ✅ 已完成基础设置

- [x] Vue 3 + TypeScript 项目初始化
- [x] Vite 构建配置
- [x] ESLint + Prettier 代码规范
- [x] 基础项目结构

### 📊 开发进度概览

- **Phase 1**: 基础架构 (8/8) ✅ **已完成**
- **Phase 2**: 认证系统 (6/6) ✅ **已完成**  
- **Phase 3**: 工作区管理 (0/8) 🔴
- **Phase 4**: 看板管理 (0/10) 🔴
- **Phase 5**: 列表和卡片 (0/12) 🔴
- **Phase 6**: 高级功能 (0/8) 🔴

---

## ✅ Phase 1: 基础架构搭建 (优先级: 🔥 HIGH) - 已完成

### 📦 依赖安装和配置

- [x] **安装现代化核心依赖**

  ```bash
  pnpm add @tanstack/vue-query pinia vue-router @vueuse/core dayjs
  pnpm add -D @types/node vitest jsdom @vue/test-utils
  ```

- [x] **安装Naive UI组件库**

  ```bash
  pnpm add naive-ui vfonts
  ```

- [x] **安装样式相关**

  ```bash
  pnpm add tailwindcss @tailwindcss/forms @tailwindcss/typography
  pnpm add -D autoprefixer postcss
  ```

- [x] **安装拖拽库**

  ```bash
  pnpm add vuedraggable@next
  ```

### ⚙️ 基础配置

- [x] **Tailwind CSS 配置**
  - [x] 创建 `tailwind.config.js`
  - [x] 配置 PostCSS
  - [x] 设置基础样式变量

- [x] **Vite 配置优化**
  - [x] 配置路径别名 (`@/` -> `src/`)
  - [x] 配置环境变量
  - [x] 配置代理转发到后端

- [x] **TypeScript 配置增强**
  - [x] 配置严格模式
  - [x] 配置路径映射
  - [x] 添加全局类型声明

### 🗂 项目结构创建

- [x] **创建核心目录结构**

  ```bash
  mkdir -p src/{api,components,composables,layouts,router,stores,types,utils,views,styles}
  mkdir -p src/components/{common,auth,workspace,board,list,card}
  mkdir -p src/views/{auth,workspace,board}
  mkdir -p tests/{unit,integration}
  ```

---

## ✅ Phase 2: 认证系统 (优先级: 🔥 HIGH) - 已完成

### 🌐 API 客户端设置

- [x] **现代化HTTP客户端配置 (`src/api/client.ts`)**
  - [x] 创建基于Fetch API的客户端
  - [x] 配置请求/响应处理
  - [x] 实现 JWT token 自动添加
  - [x] 实现错误处理和重试逻辑

- [x] **Vue Query 配置 (`src/api/query-client.ts`)**
  - [x] 配置QueryClient实例
  - [x] 设置缓存策略
  - [x] 配置重试逻辑

- [x] **认证 API (`src/api/auth.ts`)**
  - [x] `register(data)` - 用户注册
  - [x] `login(data)` - 用户登录  
  - [x] `getProfile()` - 获取用户信息

### 🏪 简化的状态管理 (Pinia + Vue Query)

- [x] **认证 Store (`src/stores/auth.ts`) - 简化版**
  - [x] 用户状态管理 (user, token, isLoggedIn)
  - [x] 登录/登出操作
  - [x] token 持久化存储

- [x] **UI状态 Store (`src/stores/ui.ts`)**
  - [x] 主题状态管理
  - [x] 侧边栏状态
  - [x] 通知系统

- [x] **认证 Composables (`src/composables/useAuth.ts`)**
  - [x] 使用Vue Query管理认证相关数据获取
  - [x] 登录/注册mutation
  - [x] 用户信息query

### 🧩 认证组件

- [x] **登录表单 (`src/components/auth/LoginForm.vue`) - 使用Naive UI**
  - [x] 邮箱/用户名 + 密码表单
  - [x] Naive UI表单验证
  - [x] 加载状态和错误处理
  - [x] "记住我" 功能

- [x] **注册表单 (`src/components/auth/RegisterForm.vue`) - 使用Naive UI**
  - [x] 完整注册表单 (邮箱、用户名、密码、确认密码)
  - [x] 实时验证反馈
  - [x] 密码强度指示器

### 📱 认证页面

- [x] **登录页面 (`src/views/auth/LoginView.vue`)**
  - [x] 响应式布局设计
  - [x] 集成登录表单
  - [x] 导航到注册页面

- [x] **注册页面 (`src/views/auth/RegisterView.vue`)**
  - [x] 响应式布局设计
  - [x] 集成注册表单
  - [x] 注册成功后自动登录

### 🛡 路由守卫

- [x] **认证守卫 (`src/router/guards.ts`)**
  - [x] 检查用户登录状态
  - [x] 保护需要认证的路由
  - [x] 重定向未认证用户到登录页

---

## 🏢 Phase 3: 工作区管理 (优先级: 🔶 MEDIUM)

### 🌐 工作区 API

- [ ] **工作区 API (`src/api/workspaces.ts`)**
  - [ ] `getWorkspaces(query)` - 获取工作区列表
  - [ ] `getWorkspace(id)` - 获取工作区详情
  - [ ] `createWorkspace(data)` - 创建工作区
  - [ ] `updateWorkspace(id, data)` - 更新工作区
  - [ ] `deleteWorkspace(id)` - 删除工作区
  - [ ] `inviteMember(workspaceId, data)` - 邀请成员
  - [ ] `getMembers(workspaceId, query)` - 获取成员列表
  - [ ] `updateMember(workspaceId, userId, data)` - 更新成员角色
  - [ ] `removeMember(workspaceId, userId)` - 移除成员

### 🏪 工作区状态管理 (Vue Query优先)

- [ ] **工作区 Composables (`src/composables/useWorkspaces.ts`)**
  - [ ] 使用Vue Query管理工作区数据
  - [ ] 工作区列表query
  - [ ] 工作区CRUD mutations
  - [ ] 成员管理mutations
  - [ ] 缓存优化和乐观更新

### 🧩 工作区组件

- [ ] **工作区卡片 (`src/components/workspace/WorkspaceCard.vue`)**
  - [ ] 显示工作区基本信息
  - [ ] 成员数量和看板数量
  - [ ] 用户角色标识
  - [ ] 快速操作按钮

- [ ] **工作区表单 (`src/components/workspace/WorkspaceForm.vue`)**
  - [ ] 创建/编辑工作区表单
  - [ ] 名称、描述、slug 字段
  - [ ] 实时验证和错误处理

- [ ] **成员列表 (`src/components/workspace/MemberList.vue`)**
  - [ ] 显示所有成员
  - [ ] 角色标识和权限显示
  - [ ] 成员操作 (更新角色、移除)

- [ ] **成员邀请 (`src/components/workspace/MemberInvite.vue`)**
  - [ ] 邀请新成员表单
  - [ ] 邮箱搜索和验证
  - [ ] 角色选择

### 📱 工作区页面

- [ ] **工作区列表 (`src/views/workspace/WorkspaceListView.vue`)**
  - [ ] 响应式网格布局
  - [ ] 搜索和筛选功能
  - [ ] 分页处理
  - [ ] 创建工作区按钮

- [ ] **工作区详情 (`src/views/workspace/WorkspaceDetailView.vue`)**
  - [ ] 工作区信息展示
  - [ ] 看板列表
  - [ ] 成员管理面板
  - [ ] 权限控制显示

- [ ] **工作区设置 (`src/views/workspace/WorkspaceSettingsView.vue`)**
  - [ ] 基本信息编辑
  - [ ] 成员管理
  - [ ] 危险操作 (删除工作区)

---

## 📋 Phase 4: 看板管理 (优先级: 🔶 MEDIUM)

### 🌐 看板 API

- [ ] **看板 API (`src/api/boards.ts`)**
  - [ ] `getBoards(workspaceId, query)` - 获取看板列表
  - [ ] `getBoard(id)` - 获取看板详情
  - [ ] `createBoard(workspaceId, data)` - 创建看板
  - [ ] `updateBoard(id, data)` - 更新看板
  - [ ] `deleteBoard(id)` - 删除看板
  - [ ] `addBoardMember(boardId, data)` - 添加看板成员
  - [ ] `getBoardMembers(boardId, query)` - 获取看板成员
  - [ ] `updateBoardMember(boardId, userId, data)` - 更新成员角色
  - [ ] `removeBoardMember(boardId, userId)` - 移除成员

### 🏪 看板状态管理

- [ ] **看板 Store (`src/stores/board.ts`)**
  - [ ] 看板列表状态
  - [ ] 当前看板状态
  - [ ] 看板成员状态
  - [ ] CRUD 操作方法
  - [ ] 权限状态管理

### 🧩 看板组件

- [ ] **看板卡片 (`src/components/board/BoardCard.vue`)**
  - [ ] 看板基本信息显示
  - [ ] 列表数量和成员数量
  - [ ] 用户角色和权限显示
  - [ ] 快速操作菜单

- [ ] **看板表单 (`src/components/board/BoardForm.vue`)**
  - [ ] 创建/编辑看板表单
  - [ ] 名称和描述字段
  - [ ] 表单验证

- [ ] **看板头部 (`src/components/board/BoardHeader.vue`)**
  - [ ] 看板标题和描述
  - [ ] 成员头像列表
  - [ ] 操作按钮 (设置、邀请成员等)

- [ ] **看板成员管理 (`src/components/board/BoardMemberManagement.vue`)**
  - [ ] 直接成员和继承成员区分显示
  - [ ] 权限来源标识
  - [ ] 成员角色操作

### 📱 看板页面

- [ ] **看板列表 (`src/views/board/BoardListView.vue`)**
  - [ ] 工作区内的看板展示
  - [ ] 网格或列表视图切换
  - [ ] 搜索和排序功能

- [ ] **看板详情 (`src/views/board/BoardDetailView.vue`)**
  - [ ] 看板信息概览
  - [ ] 成员和权限显示
  - [ ] 快速导航到看板视图

- [ ] **看板设置 (`src/views/board/BoardSettingsView.vue`)**
  - [ ] 看板基本信息编辑
  - [ ] 成员权限管理
  - [ ] 危险操作区域

### 🎨 看板视图

- [ ] **看板主视图 (`src/views/board/BoardKanbanView.vue`)**
  - [ ] 响应式看板布局
  - [ ] 列表横向滚动
  - [ ] 拖拽功能集成

---

## 🗂 Phase 5: 列表和卡片管理 (优先级: 🔶 MEDIUM)

### 🌐 列表和卡片 API

- [ ] **列表 API (`src/api/lists.ts`)**
  - [ ] `getLists(boardId)` - 获取列表
  - [ ] `getList(id)` - 获取列表详情
  - [ ] `createList(boardId, data)` - 创建列表
  - [ ] `updateList(id, data)` - 更新列表
  - [ ] `deleteList(id)` - 删除列表
  - [ ] `reorderLists(boardId, data)` - 重排序列表

- [ ] **卡片 API (`src/api/cards.ts`)**
  - [ ] `getCards(listId, query)` - 获取卡片列表
  - [ ] `getCard(id)` - 获取卡片详情
  - [ ] `createCard(listId, data)` - 创建卡片
  - [ ] `updateCard(id, data)` - 更新卡片
  - [ ] `deleteCard(id)` - 删除卡片
  - [ ] `moveCard(id, data)` - 移动卡片
  - [ ] `assignCard(id, data)` - 分配卡片

### 🏪 列表和卡片状态管理

- [ ] **列表 Store (`src/stores/list.ts`)**
  - [ ] 列表数据状态
  - [ ] 列表操作方法
  - [ ] 排序状态管理

- [ ] **卡片 Store (`src/stores/card.ts`)**
  - [ ] 卡片数据状态
  - [ ] 卡片操作方法
  - [ ] 拖拽状态管理
  - [ ] 分配状态管理

### 🧩 列表组件

- [ ] **列表列 (`src/components/list/ListColumn.vue`)**
  - [ ] 列表标题和卡片计数
  - [ ] 卡片容器 (支持拖拽)
  - [ ] 添加卡片按钮
  - [ ] 列表操作菜单

- [ ] **列表表单 (`src/components/list/ListForm.vue`)**
  - [ ] 创建/编辑列表表单
  - [ ] 列表名称验证

### 🧩 卡片组件

- [ ] **卡片项 (`src/components/card/CardItem.vue`)**
  - [ ] 卡片标题和描述预览
  - [ ] 分配者头像
  - [ ] 拖拽手柄
  - [ ] 快速操作按钮

- [ ] **卡片表单 (`src/components/card/CardForm.vue`)**
  - [ ] 创建/编辑卡片表单
  - [ ] 标题、描述字段
  - [ ] 分配者选择

- [ ] **卡片模态框 (`src/components/card/CardModal.vue`)**
  - [ ] 卡片详细信息显示
  - [ ] 内联编辑功能
  - [ ] 分配和移动操作
  - [ ] 删除确认

### 🎯 拖拽功能 (使用 vuedraggable@next)

- [ ] **拖拽系统集成**
  - [ ] 配置vuedraggable@next
  - [ ] 卡片在列表内拖拽排序
  - [ ] 卡片跨列表拖拽移动
  - [ ] 列表拖拽排序
  - [ ] 拖拽状态视觉反馈

- [ ] **拖拽优化**
  - [ ] 拖拽性能优化
  - [ ] 移动端拖拽支持
  - [ ] 拖拽撤销功能
  - [ ] 与Vue Query的乐观更新集成

---

## ✨ Phase 6: 高级功能和优化 (优先级: 🔷 LOW)

### 🔍 搜索功能

- [ ] **全局搜索**
  - [ ] 搜索组件开发
  - [ ] 搜索结果页面
  - [ ] 搜索历史记录

- [ ] **高级筛选**
  - [ ] 按分配者筛选
  - [ ] 按日期范围筛选
  - [ ] 按状态筛选

### 📊 数据可视化

- [ ] **统计面板**
  - [ ] 工作区统计图表
  - [ ] 看板进度统计
  - [ ] 用户活动统计

- [ ] **图表组件**
  - [ ] 安装图表库 (Chart.js 或 ECharts)
  - [ ] 进度条组件
  - [ ] 饼图和柱状图

### 🎨 主题和个性化

- [ ] **主题系统**
  - [ ] 深色/浅色主题切换
  - [ ] 主题色彩定制
  - [ ] 用户偏好存储

- [ ] **个性化设置**
  - [ ] 用户头像上传
  - [ ] 界面布局偏好
  - [ ] 通知设置

### 📱 移动端优化

- [ ] **响应式优化**
  - [ ] 移动端看板布局
  - [ ] 触摸手势支持
  - [ ] 移动端导航菜单

- [ ] **PWA 功能**
  - [ ] Service Worker 配置
  - [ ] 离线功能支持
  - [ ] 应用安装提示

### ⚡ 性能优化

- [ ] **代码优化**
  - [ ] 组件懒加载
  - [ ] 虚拟滚动实现
  - [ ] Bundle 分析和优化

- [ ] **缓存策略**
  - [ ] API 响应缓存
  - [ ] 图片懒加载
  - [ ] 本地存储优化

---

## 🧪 Phase 7: 测试和质量保证 (优先级: 🔷 LOW)

### 🧪 单元测试

- [ ] **组件测试**
  - [ ] 认证组件测试
  - [ ] 工作区组件测试
  - [ ] 看板组件测试
  - [ ] 卡片组件测试

- [ ] **工具函数测试**
  - [ ] API 客户端测试
  - [ ] 工具函数测试
  - [ ] 验证函数测试

### 🔗 集成测试

- [ ] **API 集成测试**
  - [ ] 认证流程测试
  - [ ] CRUD 操作测试
  - [ ] 权限验证测试

- [ ] **用户流程测试**
  - [ ] 登录注册流程
  - [ ] 工作区创建流程
  - [ ] 看板管理流程

### 🎭 E2E 测试

- [ ] **关键场景测试**
  - [ ] 完整的用户工作流
  - [ ] 跨浏览器兼容性
  - [ ] 移动端测试

---

## 📅 开发时间估算

| Phase | 功能模块 | 预估工时 | 依赖关系 |
|-------|----------|----------|----------|
| 1 | 基础架构 | 1-2 天 | 无 |
| 2 | 认证系统 | 2-3 天 | Phase 1 |
| 3 | 工作区管理 | 3-4 天 | Phase 2 |
| 4 | 看板管理 | 3-4 天 | Phase 3 |
| 5 | 列表和卡片 | 4-5 天 | Phase 4 |
| 6 | 高级功能 | 3-5 天 | Phase 5 |
| 7 | 测试和质量 | 2-3 天 | 所有 Phase |

**总预估时间：18-26 天** (按每天 6-8 小时计算)

---

## 🎯 开发优先级指南

### 🔥 立即开始 (Phase 1-2)

1. **基础架构搭建** - 为后续开发奠定基础
2. **认证系统** - 用户登录是所有功能的前提

### 🔶 核心功能 (Phase 3-5)

3. **工作区管理** - 团队协作的基础
4. **看板管理** - 项目管理的核心
5. **列表和卡片** - 任务管理的具体实现

### 🔷 增值功能 (Phase 6-7)

6. **高级功能** - 提升用户体验
7. **测试和优化** - 保证代码质量

---

## 📝 开发注意事项

### 🎯 开发原则

- **渐进式开发** - 每个 Phase 都能独立运行
- **组件复用** - 最大化组件的可复用性
- **类型安全** - 充分利用 TypeScript 的类型系统
- **用户体验** - 优先考虑用户交互体验
- **性能优先** - 关注应用性能和加载速度

### 🔧 技术要求

- 所有组件都要有 TypeScript 类型定义
- 使用 Vue 3 组合式 API
- 遵循 Vue 3 最佳实践
- 实现响应式设计
- 编写必要的单元测试

### 📋 完成标准

- [ ] 功能正常运行
- [ ] 响应式设计适配
- [ ] TypeScript 类型检查通过
- [ ] ESLint 代码检查通过
- [ ] 基本的单元测试覆盖

---

## 🚀 快速开始指南

### 1. 环境准备

```bash
# 确保 Node.js 版本正确
node --version  # >= 20.19.0

# 确保 pnpm 已安装
pnpm --version  # >= 8.0.0
```

### 2. 依赖安装

```bash
# 安装核心依赖
pnpm add axios pinia vue-router @vueuse/core dayjs

# 选择并安装 UI 库 (推荐 Element Plus)
pnpm add element-plus @element-plus/icons-vue

# 安装开发依赖
pnpm add -D @types/node vitest jsdom @vue/test-utils
```

### 3. 基础配置

- [ ] 配置 Vite 代理到后端 `http://localhost:3000`
- [ ] 设置路径别名 `@/` 指向 `src/`
- [ ] 创建环境变量文件

### 4. 开始开发

```bash
# 启动开发服务器
pnpm dev

# 在新终端启动后端服务
cd ../nest-kanban
pnpm run start:dev
```

---

**最后更新：** 2025-01-15  
**状态：** 🚀 **准备开始开发！**  
**当前 Phase：** Phase 1 - 基础架构搭建  
**下一步：** 安装依赖并配置基础架构

### 🎊 **开发路线图已就绪！**

这个待办事项清单为你提供了：

- ✅ **完整的开发计划** - 从基础架构到高级功能
- ✅ **详细的任务分解** - 每个功能都有具体的实现步骤  
- ✅ **优先级指导** - 明确的开发顺序和重要性
- ✅ **时间估算** - 合理的工期预期
- ✅ **技术指导** - 具体的技术选型和实现建议

按照这个计划，你可以系统性地构建一个功能完整、用户友好的现代化看板管理系统前端！🎯
