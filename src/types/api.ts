// 用户相关类型
export interface User {
  id: string
  email: string
  username: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

// 认证请求类型
export interface LoginRequest {
  emailOrUsername: string // 邮箱或用户名
  password: string
}

export interface RegisterRequest {
  email: string
  username: string
  password: string
  avatar?: string
}

// 认证响应类型
export interface AuthResponse {
  message: string
  user: User
  accessToken: string
}

export interface ProfileResponse {
  message: string
  user: User
}

// 通用响应类型
export interface ApiResponse<T = any> {
  message: string
  data?: T
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// 错误响应类型
export interface ApiError {
  statusCode: number
  message: string | string[]
  error: string
  timestamp: string
  path: string
}

// 分页查询类型
export interface PaginationQuery {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
