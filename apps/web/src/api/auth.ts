import { apiClient } from './client'

export interface AuthUser {
  id: string
  email: string
  name: string
  avatar: string
}

export const authApi = {
  register: async (data: { email: string; password: string; name: string }): Promise<{ user: AuthUser }> => {
    const res = await apiClient.post('/auth/register', data)
    return res.data
  },

  login: async (data: { email: string; password: string }): Promise<{ user: AuthUser }> => {
    const res = await apiClient.post('/auth/login', data)
    return res.data
  },

  getMe: async (): Promise<{ user: AuthUser }> => {
    const res = await apiClient.get('/auth/me')
    return res.data
  },

  logout: async () => {
    await apiClient.post('/auth/logout')
  },
}