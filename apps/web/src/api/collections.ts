import { apiClient } from './client'

export interface Collection {
  id: string
  name: string
  emoji: string
  userId: string
  createdAt: string
  _count: { cards: number }
}

export const collectionsApi = {
  getAll: async (): Promise<{ collections: Collection[] }> => {
    const res = await apiClient.get('/collections')
    return res.data
  },

  create: async (data: { name: string; emoji: string }): Promise<{ collection: Collection }> => {
    const res = await apiClient.post('/collections', data)
    return res.data
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/collections/${id}`)
  },
}