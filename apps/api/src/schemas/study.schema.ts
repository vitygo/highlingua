import { z } from 'zod'

export const rateCardSchema = z.object({
  cardId: z.string(),
  rating: z.enum(['easy', 'hard', 'repeat']),
})

export type RateCardInput = z.infer<typeof rateCardSchema>