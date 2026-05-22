import { apiClient } from './client'

export interface CardExample {
  sentence: string
  translation: string
}

export interface GeneratedCard {
  word: string
  translation: string
  explanation: string
  partOfSpeech: string
  level: string
  synonyms: string[]
  examples: CardExample[]
}

export const cardsApi = {
  generate: async (data: {
    words: string
    nativeLanguage: string
    targetLanguage: string
  }): Promise<{ cards: GeneratedCard[]; errors: any[] }> => {
    const res = await apiClient.post('/cards/generate', data)
    return res.data
  },

  save: async (data: {
    collectionId: string
    cards: GeneratedCard[]
  }): Promise<{ saved: number }> => {
    const res = await apiClient.post('/cards/save', data)
    return res.data
  },
}