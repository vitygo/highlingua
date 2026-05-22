import { Router } from 'express'
import { generateQuiz } from '@/controllers/quiz.controller'
import { authMiddleware } from '@/middleware/auth.middleware'
import { validate } from '@/middleware/validate.middleware'
import { generateQuizSchema } from '@/schemas/quiz.schema'

const router = Router()

router.use(authMiddleware)
router.post('/generate', validate(generateQuizSchema), generateQuiz)

export default router