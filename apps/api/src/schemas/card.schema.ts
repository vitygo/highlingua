import { z } from 'zod'

export const generateCardsSchema = z.object({
  words: z.string().min(1, 'Words are required'),
  nativeLanguage: z.string().min(1, 'Native language is required'),
  targetLanguage: z.string().min(1, 'Target language is required'),
})

export const saveCardsSchema = z.object({
  collectionId: z.string().min(1, 'Collection ID is required'),
  cards: z.array(z.object({
    word: z.string(),
    translation: z.string(),
    explanation: z.string(),
    partOfSpeech: z.string(),
    level: z.string(),
    synonyms: z.array(z.string()),
    examples: z.array(z.object({
      sentence: z.string(),
      translation: z.string(),
    })),
  })),
})

export type GenerateCardsInput = z.infer<typeof generateCardsSchema>
export type SaveCardsInput = z.infer<typeof saveCardsSchema>