import { z } from 'zod'

export const generateQuizSchema = z.object({
  collectionId: z.string().optional(),
  mode: z.enum(['multiple_choice', 'write_translation', 'fill_gap', 'word_order']),
  limit: z.number().min(1).max(20).default(10),
})

export type GenerateQuizInput = z.infer<typeof generateQuizSchema>