import { apiClient } from './client'

export interface StudyCard {
  id: string
  word: string
  translation: string
  explanation: string
  partOfSpeech: string
  level: string
  synonyms: string[]
  examples: { sentence: string; translation: string }[]
  collectionId: string
  nextReviewAt: string
  repetitions: number
  easeFactor: number
}

export interface StudyStats {
    totalCards: number
    learnedCards: number
    collections: number
    accuracy: number
    dueCards: number
    streak: number
    collectionsData?: {
        id: string
        name: string
        emoji: string
        total: number
        learned: number
      }[]
  }

export const studyApi = {
  getCards: async (collectionId?: string): Promise<{ cards: StudyCard[] }> => {
    const params = collectionId ? `?collectionId=${collectionId}` : ''
    const res = await apiClient.get(`/study/cards${params}`)
    return res.data
  },

  rateCard: async (data: {
    cardId: string
    rating: 'easy' | 'hard' | 'repeat'
  }): Promise<{ success: boolean; nextReviewAt: string; interval: number }> => {
    const res = await apiClient.post('/study/rate', data)
    return res.data
  },

  getStats: async (): Promise<StudyStats> => {
    const res = await apiClient.get('/study/stats')
    return res.data
  },
}