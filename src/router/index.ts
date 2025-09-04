import { createRouter, createWebHistory } from 'vue-router'
import { setupAuthGuard } from './guards'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      requiresAuth: false,
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: {
      requiresAuth: false,
      title: '注册'
    }
  },
  {
    path: '/workspaces',
    name: 'Workspaces',
    component: () => import('@/views/workspace/WorkspaceListView.vue'),
    meta: {
      requiresAuth: true,
      title: '工作区'
    }
  },
  {
    path: '/',
    redirect: '/workspaces'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: '页面不存在'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 设置认证守卫
router.beforeEach(setupAuthGuard())

// 设置页面标题
router.afterEach((to) => {
  const title = to.meta.title as string
  if (title) {
    document.title = `${title} - Kanban`
  } else {
    document.title = 'Kanban'
  }
})

export default router
