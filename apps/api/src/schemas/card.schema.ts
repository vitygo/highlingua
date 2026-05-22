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

export const createCardSchema = z.object({
  collectionId: z.string().min(1),
  word: z.string().min(1, 'Word is required'),
  translation: z.string().min(1, 'Translation is required'),
  explanation: z.string().default(''),
  partOfSpeech: z.string().default('noun'),
  level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']).default('A1'),
  synonyms: z.array(z.string()).default([]),
  examples: z.array(z.object({
    sentence: z.string(),
    translation: z.string(),
  })).default([]),
})

export const updateCardSchema = z.object({
  word: z.string().min(1).optional(),
  translation: z.string().min(1).optional(),
  explanation: z.string().optional(),
  partOfSpeech: z.string().optional(),
  level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']).optional(),
  synonyms: z.array(z.string()).optional(),
  examples: z.array(z.object({
    sentence: z.string(),
    translation: z.string(),
  })).optional(),
})

export type GenerateCardsInput = z.infer<typeof generateCardsSchema>
export type SaveCardsInput = z.infer<typeof saveCardsSchema>
export type CreateCardInput = z.infer<typeof createCardSchema>
export type UpdateCardInput = z.infer<typeof updateCardSchema>