import { apiClient } from './client'

export interface QuizQuestion {
  id: string
  mode: 'multiple_choice' | 'write_translation' | 'fill_gap' | 'word_order'
  question: string
  correctAnswer: string
  options?: string[]
  words?: string[]
  translation?: string
  hint?: string
  level: string
  partOfSpeech: string
}

export const quizApi = {
  generate: async (data: {
    collectionId?: string
    mode: string
    limit?: number
  }): Promise<{ questions: QuizQuestion[] }> => {
    const res = await apiClient.post('/quiz/generate', data)
    return res.data
  },
}