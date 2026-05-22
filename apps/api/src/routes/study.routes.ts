import { Router } from 'express'
import { getStudyCards, rateCard, getStats } from '@/controllers/study.controller'
import { authMiddleware } from '@/middleware/auth.middleware'
import { validate } from '@/middleware/validate.middleware'
import { rateCardSchema } from '@/schemas/study.schema'

const router = Router()

router.use(authMiddleware)
router.get('/cards', getStudyCards)
router.post('/rate', validate(rateCardSchema), rateCard)
router.get('/stats', getStats)

export default router