import { z } from 'zod'

export const createCollectionSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  emoji: z.string().default('📚'),
})

export type CreateCollectionInput = z.infer<typeof createCollectionSchema>