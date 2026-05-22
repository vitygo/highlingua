import { apiClient } from './client'

export interface AuthUser {
  id: string
  email: string
  name: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: AuthUser
}

export const authApi = {
  register: async (data: {
    email: string
    password: string
    name: string
  }): Promise<AuthResponse> => {
    const res = await apiClient.post('/auth/register', data)
    return res.data
  },

  login: async (data: {
    email: string
    password: string
  }): Promise<AuthResponse> => {
    const res = await apiClient.post('/auth/login', data)
    return res.data
  },

  getMe: async (): Promise<{ user: AuthUser }> => {
    const res = await apiClient.get('/auth/me')
    return res.data
  },

  logout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  },
}