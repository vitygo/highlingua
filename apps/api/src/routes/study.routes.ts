import { Router } from 'express'
import { authMiddleware } from '@/middleware/auth.middleware'
import { validate } from '@/middleware/validate.middleware'
import { rateCardSchema } from '@/schemas/study.schema'
import { getStudyCards, rateCard, getStats, getActivity } from '@/controllers/study.controller'
const router = Router()

router.use(authMiddleware)
router.get('/cards', getStudyCards)
router.post('/rate', validate(rateCardSchema), rateCard)
router.get('/stats', getStats)
router.get('/activity', getActivity)

export default router