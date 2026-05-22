import { apiClient } from './client'

export const userApi = {
  updateProfile: async (data: { name?: string; avatar?: string }) => {
    const res = await apiClient.put('/user/profile', data)
    return res.data
  },

  changePassword: async (data: {
    currentPassword: string
    newPassword: string
  }) => {
    const res = await apiClient.put('/user/password', data)
    return res.data
  },
}