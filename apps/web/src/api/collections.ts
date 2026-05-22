import { apiClient } from './client'

export interface Collection {
  id: string
  name: string
  emoji: string
  userId: string
  createdAt: string
  _count: { cards: number }
}

export interface Card {
  id: string
  word: string
  translation: string
  explanation: string
  partOfSpeech: string
  level: string
  synonyms: string[]
  examples: { sentence: string; translation: string }[]
  collectionId: string
  createdAt: string
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

  getCards: async (id: string): Promise<{ cards: Card[] }> => {
    const res = await apiClient.get(`/collections/${id}/cards`)
    return res.data
  },

  deleteCard: async (cardId: string): Promise<void> => {
    await apiClient.delete(`/collections/cards/${cardId}`)
  },
}