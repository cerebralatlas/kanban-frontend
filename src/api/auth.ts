import { apiClient } from './client'
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ProfileResponse
} from '@/types/api'

export const authApi = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    return apiClient.post('/auth/login', data)
  },

  async register(data: RegisterRequest): Promise<{ message: string; user: any }> {
    return apiClient.post('/auth/register', data)
  },

  async getProfile(): Promise<ProfileResponse> {
    return apiClient.get('/auth/profile')
  },
}
