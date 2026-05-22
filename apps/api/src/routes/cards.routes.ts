import { Router } from 'express'
import { generateCards, saveCards, createCard, updateCard } from '@/controllers/cards.controller'
import { authMiddleware } from '@/middleware/auth.middleware'
import { validate } from '@/middleware/validate.middleware'
import { generateCardsSchema, saveCardsSchema, createCardSchema, updateCardSchema } from '@/schemas/card.schema'
import rateLimit from 'express-rate-limit'

const generateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 20,
  message: { error: 'Daily generation limit reached. Try again tomorrow.' },
  standardHeaders: true,
  legacyHeaders: false,
})

const router = Router()

router.use(authMiddleware)
router.post('/generate', generateLimiter, validate(generateCardsSchema), generateCards)
router.post('/save', validate(saveCardsSchema), saveCards)
router.post('/', validate(createCardSchema), createCard)
router.put('/:cardId', validate(updateCardSchema), updateCard)

export default router