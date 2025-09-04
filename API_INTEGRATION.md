# 🔌 API 集成指南

详细的后端API集成方案，基于 **@tanstack/vue-query** 的现代化数据获取方案。

## 📡 后端API概览

### 基础信息

- **后端地址**: `http://localhost:3000`
- **API文档**: `http://localhost:3000/api-docs`
- **认证方式**: JWT Bearer Token
- **数据格式**: JSON
- **编码**: UTF-8

### 响应格式规范

```typescript
// 成功响应
interface SuccessResponse<T> {
  message: string;
  data?: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 错误响应
interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
}
```

## 🏗 现代化API客户端架构

### 1. HTTP 客户端配置 (基于 Fetch API)

```typescript
// src/api/client.ts
import { useAuthStore } from '@/stores/auth';

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number | boolean>;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private buildURL(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(endpoint, this.baseURL);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return url.toString();
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { method = 'GET', headers = {}, body, params } = config;
    
    // 获取认证token
    const authStore = useAuthStore();
    const token = authStore.token;

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }

    const url = this.buildURL(endpoint, params);
    
    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      // 处理认证错误
      if (response.status === 401) {
        authStore.logout();
        window.location.href = '/login';
        throw new Error('Unauthorized');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network request failed');
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body: data });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PATCH', body: data });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
);
```

### 2. TypeScript 类型定义

```typescript
// src/types/api.ts
export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  slug: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  owner?: User;
  userRole?: 'OWNER' | 'MEMBER' | 'VIEWER';
  _count?: {
    members: number;
    boards: number;
  };
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  workspaceId: string;
  role: 'OWNER' | 'MEMBER' | 'VIEWER';
  joinedAt: string;
  user: User;
}

export interface Board {
  id: string;
  name: string;
  description?: string;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
  workspace?: Workspace;
  userRole?: 'ADMIN' | 'MEMBER' | 'VIEWER';
  roleSource?: 'board' | 'workspace';
  _count?: {
    members: number;
    lists: number;
  };
}

export interface BoardMember {
  id: string;
  userId: string;
  boardId: string;
  role: 'ADMIN' | 'MEMBER' | 'VIEWER';
  joinedAt: string;
  user: User;
  source?: 'board' | 'workspace';
  effectiveRole?: string;
  inheritedFrom?: string;
}

export interface List {
  id: string;
  name: string;
  order: number;
  boardId: string;
  createdAt: string;
  updatedAt: string;
  board?: Board;
  _count?: {
    cards: number;
  };
}

export interface Card {
  id: string;
  title: string;
  description?: string;
  order: number;
  listId: string;
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
  list?: List;
  assignee?: User;
}

// API 请求/响应类型
export interface LoginRequest {
  identifier: string; // 邮箱或用户名
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  avatar?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  accessToken: string;
}

export interface CreateWorkspaceRequest {
  name: string;
  description?: string;
  slug: string;
}

export interface UpdateWorkspaceRequest {
  name?: string;
  description?: string;
  slug?: string;
}

export interface InviteMemberRequest {
  email: string;
  role: 'MEMBER' | 'VIEWER';
}

export interface UpdateMemberRequest {
  role: 'MEMBER' | 'VIEWER';
}

export interface CreateBoardRequest {
  name: string;
  description?: string;
}

export interface UpdateBoardRequest {
  name?: string;
  description?: string;
}

export interface AddBoardMemberRequest {
  userId: string;
  role: 'ADMIN' | 'MEMBER' | 'VIEWER';
}

export interface UpdateBoardMemberRequest {
  role: 'ADMIN' | 'MEMBER' | 'VIEWER';
}

export interface CreateListRequest {
  name: string;
}

export interface UpdateListRequest {
  name?: string;
}

export interface ReorderListsRequest {
  listIds: string[];
}

export interface CreateCardRequest {
  title: string;
  description?: string;
  assignToSelf?: boolean;
}

export interface UpdateCardRequest {
  title?: string;
  description?: string;
  assigneeId?: string;
}

export interface MoveCardRequest {
  targetListId: string;
  position?: number;
}

export interface AssignCardRequest {
  assigneeId?: string; // null 表示取消分配
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CardQuery extends PaginationQuery {
  assignedToMe?: boolean;
  unassigned?: boolean;
}
```

## 🌐 API 服务层

### 1. Vue Query 配置

```typescript
// src/api/query-client.ts
import { QueryClient } from '@tanstack/vue-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // 不重试认证错误
        if (error?.message === 'Unauthorized') return false;
        // 最多重试2次
        return failureCount < 2;
      },
      staleTime: 5 * 60 * 1000, // 5分钟
      gcTime: 10 * 60 * 1000, // 10分钟 (原 cacheTime)
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});
```

### 2. 认证服务与 Composables

```typescript
// src/api/auth.ts
import { apiClient } from './client';
import type { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  User 
} from '@/types/api';

export const authApi = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    return apiClient.post('/auth/login', data);
  },

  async register(data: RegisterRequest): Promise<{ message: string; user: User }> {
    return apiClient.post('/auth/register', data);
  },

  async getProfile(): Promise<{ message: string; user: User }> {
    return apiClient.get('/auth/profile');
  },
};

// src/composables/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { authApi } from '@/api/auth';
import { useAuthStore } from '@/stores/auth';
import type { LoginRequest, RegisterRequest } from '@/types/api';

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const authStore = useAuthStore();

  // 获取用户信息
  const {
    data: user,
    isLoading: isProfileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: () => authApi.getProfile(),
    enabled: !!authStore.token,
    select: (data) => data.user,
  });

  // 登录
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data) => {
      authStore.setAuth(data.user, data.accessToken);
      queryClient.setQueryData(['auth', 'profile'], { user: data.user });
      router.push('/workspaces');
    },
    onError: (error: any) => {
      console.error('Login failed:', error);
    },
  });

  // 注册
  const registerMutation = useMutation({
    mutationFn: (userData: RegisterRequest) => authApi.register(userData),
    onSuccess: async (_, variables) => {
      // 注册成功后自动登录
      await loginMutation.mutateAsync({
        identifier: variables.email,
        password: variables.password,
      });
    },
  });

  // 登出
  const logout = () => {
    authStore.logout();
    queryClient.clear(); // 清除所有缓存
    router.push('/login');
  };

  return {
    // 状态
    user,
    isProfileLoading,
    profileError,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,

    // 操作
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout,
  };
}
```

### 3. 工作区服务与 Composables

```typescript
// src/api/workspaces.ts
import { apiClient } from './client';
import type {
  Workspace,
  WorkspaceMember,
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
  InviteMemberRequest,
  UpdateMemberRequest,
  PaginationQuery
} from '@/types/api';

export const workspacesApi = {
  async getWorkspaces(query?: PaginationQuery): Promise<{
    message: string;
    data: Workspace[];
    pagination: any;
  }> {
    return apiClient.get('/workspaces', query);
  },

  async getWorkspace(id: string): Promise<{
    message: string;
    workspace: Workspace & {
      members: WorkspaceMember[];
      boards: any[];
    };
  }> {
    return apiClient.get(`/workspaces/${id}`);
  },

  async createWorkspace(data: CreateWorkspaceRequest): Promise<{
    message: string;
    workspace: Workspace;
  }> {
    return apiClient.post('/workspaces', data);
  },

  async updateWorkspace(id: string, data: UpdateWorkspaceRequest): Promise<{
    message: string;
    workspace: Workspace;
  }> {
    return apiClient.patch(`/workspaces/${id}`, data);
  },

  async deleteWorkspace(id: string): Promise<{ message: string }> {
    return apiClient.delete(`/workspaces/${id}`);
  },

  async inviteMember(id: string, data: InviteMemberRequest): Promise<{
    message: string;
    member: WorkspaceMember;
  }> {
    return apiClient.post(`/workspaces/${id}/members`, data);
  },

  async getMembers(id: string, query?: PaginationQuery): Promise<{
    message: string;
    data: WorkspaceMember[];
    pagination: any;
  }> {
    return apiClient.get(`/workspaces/${id}/members`, query);
  },

  async updateMember(id: string, userId: string, data: UpdateMemberRequest): Promise<{
    message: string;
    member: WorkspaceMember;
  }> {
    return apiClient.patch(`/workspaces/${id}/members/${userId}`, data);
  },

  async removeMember(id: string, userId: string): Promise<{ message: string }> {
    return apiClient.delete(`/workspaces/${id}/members/${userId}`);
  },
};

// src/composables/useWorkspaces.ts
import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  useInfiniteQuery 
} from '@tanstack/vue-query';
import { computed } from 'vue';
import { workspacesApi } from '@/api/workspaces';
import type { 
  PaginationQuery, 
  CreateWorkspaceRequest, 
  UpdateWorkspaceRequest,
  InviteMemberRequest,
  UpdateMemberRequest 
} from '@/types/api';

export function useWorkspaces(query?: PaginationQuery) {
  const queryClient = useQueryClient();

  // 获取工作区列表
  const {
    data: workspacesData,
    isLoading: isWorkspacesLoading,
    error: workspacesError,
    refetch: refetchWorkspaces,
  } = useQuery({
    queryKey: ['workspaces', query],
    queryFn: () => workspacesApi.getWorkspaces(query),
  });

  const workspaces = computed(() => workspacesData.value?.data || []);
  const pagination = computed(() => workspacesData.value?.pagination);

  // 创建工作区
  const createWorkspaceMutation = useMutation({
    mutationFn: (data: CreateWorkspaceRequest) => workspacesApi.createWorkspace(data),
    onSuccess: () => {
      // 刷新工作区列表
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
  });

  // 更新工作区
  const updateWorkspaceMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWorkspaceRequest }) =>
      workspacesApi.updateWorkspace(id, data),
    onSuccess: (_, { id }) => {
      // 更新缓存
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', id] });
    },
  });

  // 删除工作区
  const deleteWorkspaceMutation = useMutation({
    mutationFn: (id: string) => workspacesApi.deleteWorkspace(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
  });

  return {
    // 数据
    workspaces,
    pagination,
    
    // 状态
    isWorkspacesLoading,
    workspacesError,
    isCreating: createWorkspaceMutation.isPending,
    isUpdating: updateWorkspaceMutation.isPending,
    isDeleting: deleteWorkspaceMutation.isPending,
    
    // 操作
    refetchWorkspaces,
    createWorkspace: createWorkspaceMutation.mutateAsync,
    updateWorkspace: updateWorkspaceMutation.mutateAsync,
    deleteWorkspace: deleteWorkspaceMutation.mutateAsync,
  };
}

export function useWorkspace(id: string) {
  const queryClient = useQueryClient();

  // 获取单个工作区
  const {
    data: workspaceData,
    isLoading: isWorkspaceLoading,
    error: workspaceError,
  } = useQuery({
    queryKey: ['workspace', id],
    queryFn: () => workspacesApi.getWorkspace(id),
    enabled: !!id,
  });

  const workspace = computed(() => workspaceData.value?.workspace);

  // 邀请成员
  const inviteMemberMutation = useMutation({
    mutationFn: (data: InviteMemberRequest) => workspacesApi.inviteMember(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace', id] });
      queryClient.invalidateQueries({ queryKey: ['workspace-members', id] });
    },
  });

  // 更新成员角色
  const updateMemberMutation = useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UpdateMemberRequest }) =>
      workspacesApi.updateMember(id, userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace', id] });
      queryClient.invalidateQueries({ queryKey: ['workspace-members', id] });
    },
  });

  // 移除成员
  const removeMemberMutation = useMutation({
    mutationFn: (userId: string) => workspacesApi.removeMember(id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace', id] });
      queryClient.invalidateQueries({ queryKey: ['workspace-members', id] });
    },
  });

  return {
    // 数据
    workspace,
    
    // 状态
    isWorkspaceLoading,
    workspaceError,
    isInviting: inviteMemberMutation.isPending,
    isUpdatingMember: updateMemberMutation.isPending,
    isRemovingMember: removeMemberMutation.isPending,
    
    // 操作
    inviteMember: inviteMemberMutation.mutateAsync,
    updateMember: updateMemberMutation.mutateAsync,
    removeMember: removeMemberMutation.mutateAsync,
  };
}
```

### 3. 看板服务

```typescript
// src/api/boards.ts
import { apiClient } from './client';
import type {
  Board,
  BoardMember,
  CreateBoardRequest,
  UpdateBoardRequest,
  AddBoardMemberRequest,
  UpdateBoardMemberRequest,
  PaginationQuery
} from '@/types/api';

export const boardsApi = {
  async getBoards(workspaceId: string, query?: PaginationQuery): Promise<{
    message: string;
    data: Board[];
    pagination: any;
  }> {
    return apiClient.get(`/workspaces/${workspaceId}/boards`, { params: query });
  },

  async getBoard(id: string): Promise<{
    message: string;
    board: Board & {
      allMembers: BoardMember[];
      lists: any[];
    };
  }> {
    return apiClient.get(`/boards/${id}`);
  },

  async createBoard(workspaceId: string, data: CreateBoardRequest): Promise<{
    message: string;
    board: Board;
  }> {
    return apiClient.post(`/workspaces/${workspaceId}/boards`, data);
  },

  async updateBoard(id: string, data: UpdateBoardRequest): Promise<{
    message: string;
    board: Board;
  }> {
    return apiClient.patch(`/boards/${id}`, data);
  },

  async deleteBoard(id: string): Promise<{ message: string }> {
    return apiClient.delete(`/boards/${id}`);
  },

  async addMember(id: string, data: AddBoardMemberRequest): Promise<{
    message: string;
    member: BoardMember;
  }> {
    return apiClient.post(`/boards/${id}/members`, data);
  },

  async getMembers(id: string, query?: PaginationQuery): Promise<{
    message: string;
    data: {
      directMembers: BoardMember[];
      allMembers: BoardMember[];
    };
    pagination: any;
  }> {
    return apiClient.get(`/boards/${id}/members`, { params: query });
  },

  async updateMember(id: string, userId: string, data: UpdateBoardMemberRequest): Promise<{
    message: string;
    member: BoardMember;
  }> {
    return apiClient.patch(`/boards/${id}/members/${userId}`, data);
  },

  async removeMember(id: string, userId: string): Promise<{ message: string }> {
    return apiClient.delete(`/boards/${id}/members/${userId}`);
  },
};
```

### 4. 列表和卡片服务

```typescript
// src/api/lists.ts
import { apiClient } from './client';
import type {
  List,
  CreateListRequest,
  UpdateListRequest,
  ReorderListsRequest
} from '@/types/api';

export const listsApi = {
  async getLists(boardId: string): Promise<{
    message: string;
    data: List[];
  }> {
    return apiClient.get(`/boards/${boardId}/lists`);
  },

  async getList(id: string): Promise<{
    message: string;
    list: List;
  }> {
    return apiClient.get(`/lists/${id}`);
  },

  async createList(boardId: string, data: CreateListRequest): Promise<{
    message: string;
    list: List;
  }> {
    return apiClient.post(`/boards/${boardId}/lists`, data);
  },

  async updateList(id: string, data: UpdateListRequest): Promise<{
    message: string;
    list: List;
  }> {
    return apiClient.patch(`/lists/${id}`, data);
  },

  async deleteList(id: string): Promise<{ message: string }> {
    return apiClient.delete(`/lists/${id}`);
  },

  async reorderLists(boardId: string, data: ReorderListsRequest): Promise<{
    message: string;
    lists: List[];
  }> {
    return apiClient.patch(`/boards/${boardId}/lists/reorder`, data);
  },
};

// src/api/cards.ts
import { apiClient } from './client';
import type {
  Card,
  CreateCardRequest,
  UpdateCardRequest,
  MoveCardRequest,
  AssignCardRequest,
  CardQuery
} from '@/types/api';

export const cardsApi = {
  async getCards(listId: string, query?: CardQuery): Promise<{
    message: string;
    data: Card[];
    pagination?: any;
  }> {
    return apiClient.get(`/lists/${listId}/cards`, { params: query });
  },

  async getCard(id: string): Promise<{
    message: string;
    card: Card;
  }> {
    return apiClient.get(`/cards/${id}`);
  },

  async createCard(listId: string, data: CreateCardRequest): Promise<{
    message: string;
    card: Card;
  }> {
    return apiClient.post(`/lists/${listId}/cards`, data);
  },

  async updateCard(id: string, data: UpdateCardRequest): Promise<{
    message: string;
    card: Card;
  }> {
    return apiClient.patch(`/cards/${id}`, data);
  },

  async deleteCard(id: string): Promise<{ message: string }> {
    return apiClient.delete(`/cards/${id}`);
  },

  async moveCard(id: string, data: MoveCardRequest): Promise<{
    message: string;
    card: Card;
  }> {
    return apiClient.patch(`/cards/${id}/move`, data);
  },

  async assignCard(id: string, data: AssignCardRequest): Promise<{
    message: string;
    card: Card;
  }> {
    return apiClient.patch(`/cards/${id}/assign`, data);
  },
};
```

## 🏪 状态管理集成

## 🏪 简化的状态管理 (Pinia + Vue Query)

由于使用了 Vue Query，我们的 Pinia Store 变得更加简洁，主要用于管理认证状态和全局UI状态。

### 1. 认证 Store (简化版)

```typescript
// src/stores/auth.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/types/api';

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('auth_token'));

  // 计算属性
  const isLoggedIn = computed(() => !!token.value);

  // 操作
  function setAuth(userData: User, accessToken: string) {
    user.value = userData;
    token.value = accessToken;
    localStorage.setItem('auth_token', accessToken);
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('auth_token');
  }

  return {
    // 状态
    user: readonly(user),
    token: readonly(token),
    
    // 计算属性
    isLoggedIn,
    
    // 操作
    setAuth,
    logout,
  };
});
```

### 2. UI 状态 Store

```typescript
// src/stores/ui.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUIStore = defineStore('ui', () => {
  // 主题状态
  const isDarkMode = ref(false);
  
  // 侧边栏状态
  const isSidebarOpen = ref(true);
  
  // 移动端菜单状态
  const isMobileMenuOpen = ref(false);
  
  // 全局加载状态
  const globalLoading = ref(false);
  
  // 通知状态
  const notifications = ref<Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
  }>>([]);

  // 操作
  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('dark-mode', isDarkMode.value.toString());
  }

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
  }

  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  }

  function setGlobalLoading(loading: boolean) {
    globalLoading.value = loading;
  }

  function addNotification(notification: Omit<typeof notifications.value[0], 'id'>) {
    const id = Date.now().toString();
    notifications.value.push({ ...notification, id });
    
    // 自动移除通知
    const duration = notification.duration || 5000;
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  }

  function removeNotification(id: string) {
    const index = notifications.value.findIndex(n => n.id === id);
    if (index > -1) {
      notifications.value.splice(index, 1);
    }
  }

  // 初始化
  function initialize() {
    const savedDarkMode = localStorage.getItem('dark-mode');
    if (savedDarkMode) {
      isDarkMode.value = savedDarkMode === 'true';
    }
  }

  return {
    // 状态
    isDarkMode: readonly(isDarkMode),
    isSidebarOpen: readonly(isSidebarOpen),
    isMobileMenuOpen: readonly(isMobileMenuOpen),
    globalLoading: readonly(globalLoading),
    notifications: readonly(notifications),
    
    // 操作
    toggleDarkMode,
    toggleSidebar,
    toggleMobileMenu,
    setGlobalLoading,
    addNotification,
    removeNotification,
    initialize,
  };
});
```

### 2. 工作区 Store

```typescript
// src/stores/workspace.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { workspacesApi } from '@/api/workspaces';
import type { 
  Workspace, 
  WorkspaceMember, 
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
  PaginationQuery 
} from '@/types/api';

export const useWorkspaceStore = defineStore('workspace', () => {
  // 状态
  const workspaces = ref<Workspace[]>([]);
  const currentWorkspace = ref<Workspace | null>(null);
  const members = ref<WorkspaceMember[]>([]);
  const isLoading = ref(false);
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // 计算属性
  const currentUserRole = computed(() => {
    return currentWorkspace.value?.userRole;
  });

  const canManageWorkspace = computed(() => {
    return currentUserRole.value === 'OWNER';
  });

  const canInviteMembers = computed(() => {
    return currentUserRole.value === 'OWNER';
  });

  // 操作
  async function fetchWorkspaces(query?: PaginationQuery) {
    try {
      isLoading.value = true;
      const response = await workspacesApi.getWorkspaces(query);
      
      workspaces.value = response.data;
      pagination.value = response.pagination;
      
      return response;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchWorkspace(id: string) {
    try {
      isLoading.value = true;
      const response = await workspacesApi.getWorkspace(id);
      
      currentWorkspace.value = response.workspace;
      members.value = response.workspace.members;
      
      return response.workspace;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  async function createWorkspace(data: CreateWorkspaceRequest) {
    try {
      isLoading.value = true;
      const response = await workspacesApi.createWorkspace(data);
      
      // 添加到列表
      workspaces.value.unshift(response.workspace);
      
      return response.workspace;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateWorkspace(id: string, data: UpdateWorkspaceRequest) {
    try {
      isLoading.value = true;
      const response = await workspacesApi.updateWorkspace(id, data);
      
      // 更新列表中的项目
      const index = workspaces.value.findIndex(w => w.id === id);
      if (index !== -1) {
        workspaces.value[index] = { ...workspaces.value[index], ...response.workspace };
      }
      
      // 更新当前工作区
      if (currentWorkspace.value?.id === id) {
        currentWorkspace.value = { ...currentWorkspace.value, ...response.workspace };
      }
      
      return response.workspace;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteWorkspace(id: string) {
    try {
      isLoading.value = true;
      await workspacesApi.deleteWorkspace(id);
      
      // 从列表中移除
      const index = workspaces.value.findIndex(w => w.id === id);
      if (index !== -1) {
        workspaces.value.splice(index, 1);
      }
      
      // 清除当前工作区
      if (currentWorkspace.value?.id === id) {
        currentWorkspace.value = null;
      }
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  // 重置状态
  function reset() {
    workspaces.value = [];
    currentWorkspace.value = null;
    members.value = [];
    pagination.value = {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    };
  }

  return {
    // 状态
    workspaces: readonly(workspaces),
    currentWorkspace: readonly(currentWorkspace),
    members: readonly(members),
    isLoading: readonly(isLoading),
    pagination: readonly(pagination),
    
    // 计算属性
    currentUserRole,
    canManageWorkspace,
    canInviteMembers,
    
    // 操作
    fetchWorkspaces,
    fetchWorkspace,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    reset,
  };
});
```

## 🔧 环境配置

### 1. Vite 配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  define: {
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false,
  },
});
```

### 2. 环境变量

```env
# .env.development
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_TITLE=Kanban Development
VITE_APP_DEBUG=true

# .env.production  
VITE_API_BASE_URL=https://api.yourkanban.com
VITE_APP_TITLE=Kanban
VITE_APP_DEBUG=false
```

## 🚀 现代化使用示例

### 1. 使用 Vue Query Composables

```vue
<!-- src/views/workspace/WorkspaceListView.vue -->
<template>
  <div class="workspace-list">
    <!-- 加载状态 -->
    <div v-if="isWorkspacesLoading" class="loading">
      <n-spin size="large" />
      <p>加载工作区中...</p>
    </div>
    
    <!-- 错误状态 -->
    <div v-else-if="workspacesError" class="error">
      <n-alert type="error" :title="workspacesError.message" />
      <n-button @click="refetchWorkspaces" class="mt-4">
        重新加载
      </n-button>
    </div>
    
    <!-- 工作区列表 -->
    <div v-else class="workspace-content">
      <div class="workspace-header">
        <h1>我的工作区</h1>
        <n-button 
          type="primary" 
          @click="showCreateModal = true"
          :loading="isCreating"
        >
          创建工作区
        </n-button>
      </div>
      
      <div class="workspace-grid">
        <WorkspaceCard
          v-for="workspace in workspaces"
          :key="workspace.id"
          :workspace="workspace"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>
      
      <!-- 分页 -->
      <n-pagination
        v-if="pagination"
        :page="pagination.page"
        :page-count="pagination.totalPages"
        :page-size="pagination.limit"
        @update:page="handlePageChange"
      />
    </div>
    
    <!-- 创建工作区模态框 -->
    <WorkspaceCreateModal
      v-model:show="showCreateModal"
      @success="handleCreateSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useWorkspaces } from '@/composables/useWorkspaces';
import { useUIStore } from '@/stores/ui';
import WorkspaceCard from '@/components/workspace/WorkspaceCard.vue';
import WorkspaceCreateModal from '@/components/workspace/WorkspaceCreateModal.vue';
import type { Workspace } from '@/types/api';

// 响应式查询参数
const query = ref({
  page: 1,
  limit: 12,
  search: '',
});

// 使用工作区 composable
const {
  workspaces,
  pagination,
  isWorkspacesLoading,
  workspacesError,
  isCreating,
  isDeleting,
  refetchWorkspaces,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
} = useWorkspaces(query);

const uiStore = useUIStore();
const showCreateModal = ref(false);

// 处理分页
const handlePageChange = (page: number) => {
  query.value.page = page;
};

// 处理编辑
const handleEdit = async (workspace: Workspace) => {
  try {
    await updateWorkspace({
      id: workspace.id,
      data: { name: '新名称' } // 实际应该打开编辑模态框
    });
    uiStore.addNotification({
      type: 'success',
      title: '更新成功',
      message: '工作区已更新',
    });
  } catch (error: any) {
    uiStore.addNotification({
      type: 'error',
      title: '更新失败',
      message: error.message,
    });
  }
};

// 处理删除
const handleDelete = async (workspace: Workspace) => {
  try {
    await deleteWorkspace(workspace.id);
    uiStore.addNotification({
      type: 'success',
      title: '删除成功',
      message: '工作区已删除',
    });
  } catch (error: any) {
    uiStore.addNotification({
      type: 'error',
      title: '删除失败',
      message: error.message,
    });
  }
};

// 处理创建成功
const handleCreateSuccess = () => {
  showCreateModal.value = false;
  uiStore.addNotification({
    type: 'success',
    title: '创建成功',
    message: '工作区已创建',
  });
};
</script>

<style scoped>
.workspace-list {
  padding: 24px;
}

.workspace-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.workspace-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.error {
  text-align: center;
  padding: 24px;
}
</style>
```

### 2. 创建工作区模态框组件

```vue
<!-- src/components/workspace/WorkspaceCreateModal.vue -->
<template>
  <n-modal v-model:show="showModal" preset="dialog">
    <template #header>
      <div>创建工作区</div>
    </template>
    
    <n-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-placement="left"
      label-width="auto"
    >
      <n-form-item path="name" label="工作区名称">
        <n-input
          v-model:value="form.name"
          placeholder="请输入工作区名称"
          :disabled="isCreating"
        />
      </n-form-item>
      
      <n-form-item path="slug" label="工作区标识">
        <n-input
          v-model:value="form.slug"
          placeholder="请输入工作区标识"
          :disabled="isCreating"
        />
      </n-form-item>
      
      <n-form-item path="description" label="描述">
        <n-input
          v-model:value="form.description"
          type="textarea"
          placeholder="请输入工作区描述（可选）"
          :disabled="isCreating"
        />
      </n-form-item>
    </n-form>
    
    <template #action>
      <n-space>
        <n-button @click="handleCancel" :disabled="isCreating">
          取消
        </n-button>
        <n-button
          type="primary"
          @click="handleSubmit"
          :loading="isCreating"
        >
          创建
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useWorkspaces } from '@/composables/useWorkspaces';
import type { CreateWorkspaceRequest } from '@/types/api';

interface Props {
  show: boolean;
}

interface Emits {
  (e: 'update:show', value: boolean): void;
  (e: 'success'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const showModal = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value),
});

const { createWorkspace, isCreating } = useWorkspaces();

const formRef = ref();
const form = ref<CreateWorkspaceRequest>({
  name: '',
  slug: '',
  description: '',
});

const rules = {
  name: [
    { required: true, message: '请输入工作区名称', trigger: 'blur' },
    { min: 2, max: 50, message: '名称长度应为 2-50 个字符', trigger: 'blur' },
  ],
  slug: [
    { required: true, message: '请输入工作区标识', trigger: 'blur' },
    { 
      pattern: /^[a-z0-9-]+$/, 
      message: '标识只能包含小写字母、数字和连字符', 
      trigger: 'blur' 
    },
  ],
};

const handleSubmit = async () => {
  try {
    await formRef.value?.validate();
    await createWorkspace(form.value);
    
    // 重置表单
    form.value = { name: '', slug: '', description: '' };
    
    emit('success');
  } catch (error) {
    console.error('Form validation or creation failed:', error);
  }
};

const handleCancel = () => {
  form.value = { name: '', slug: '', description: '' };
  showModal.value = false;
};
</script>
```

### 3. 拖拽功能示例 (使用 vuedraggable@next)

```vue
<!-- src/components/board/KanbanBoard.vue -->
<template>
  <div class="kanban-board">
    <div class="board-header">
      <h2>{{ board?.name }}</h2>
      <n-button @click="createList">添加列表</n-button>
    </div>
    
    <div class="lists-container">
      <draggable
        v-model="lists"
        group="lists"
        item-key="id"
        class="lists-wrapper"
        @end="handleListReorder"
      >
        <template #item="{ element: list }">
          <div class="list-column">
            <div class="list-header">
              <h3>{{ list.name }}</h3>
              <span class="card-count">{{ list._count?.cards || 0 }}</span>
            </div>
            
            <draggable
              v-model="list.cards"
              group="cards"
              item-key="id"
              class="cards-container"
              @end="(evt) => handleCardMove(evt, list.id)"
            >
              <template #item="{ element: card }">
                <CardItem
                  :card="card"
                  @edit="editCard"
                  @delete="deleteCard"
                />
              </template>
            </draggable>
            
            <n-button @click="() => createCard(list.id)" class="add-card-btn">
              添加卡片
            </n-button>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import draggable from 'vuedraggable';
import { useBoard } from '@/composables/useBoard';
import { useLists } from '@/composables/useLists';
import { useCards } from '@/composables/useCards';
import CardItem from '@/components/card/CardItem.vue';

interface Props {
  boardId: string;
}

const props = defineProps<Props>();

const { board } = useBoard(props.boardId);
const { lists, reorderLists } = useLists(props.boardId);
const { createCard, moveCard, deleteCard } = useCards();

// 处理列表重排序
const handleListReorder = async (evt: any) => {
  const { oldIndex, newIndex } = evt;
  if (oldIndex !== newIndex) {
    const listIds = lists.value.map(list => list.id);
    await reorderLists({ listIds });
  }
};

// 处理卡片移动
const handleCardMove = async (evt: any, targetListId: string) => {
  const { item, to, newIndex } = evt;
  const cardId = item.dataset.cardId;
  
  if (cardId) {
    await moveCard({
      id: cardId,
      data: {
        targetListId,
        position: newIndex,
      },
    });
  }
};

// 其他操作方法...
const createList = () => {
  // 创建列表逻辑
};

const editCard = (card: any) => {
  // 编辑卡片逻辑
};
</script>

<style scoped>
.kanban-board {
  height: 100vh;
  padding: 16px;
  overflow: hidden;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.lists-container {
  height: calc(100vh - 100px);
  overflow-x: auto;
  overflow-y: hidden;
}

.lists-wrapper {
  display: flex;
  gap: 16px;
  height: 100%;
  padding-bottom: 16px;
}

.list-column {
  min-width: 300px;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.cards-container {
  flex: 1;
  overflow-y: auto;
  min-height: 100px;
}

.add-card-btn {
  margin-top: 8px;
  width: 100%;
}
</style>
```

## 📝 最佳实践

### 1. 错误处理

- 统一的错误响应处理
- 用户友好的错误提示
- 网络错误重试机制

### 2. 加载状态

- 全局加载状态管理
- 组件级加载指示器
- 骨架屏加载效果

### 3. 缓存策略

- API响应缓存
- 分页数据管理
- 乐观更新

### 4. 类型安全

- 完整的TypeScript类型定义
- API响应类型验证
- 运行时类型检查

---

**最后更新：** 2025-01-15  
**状态：** ✅ **API集成方案已完成**  
**下一步：** 开始实施Phase 1基础架构搭建
