import { Router } from 'express'
import { register, login, refresh, getMe, logout } from '@/controllers/auth.controller'
import { validate } from '@/middleware/validate.middleware'
import { authMiddleware } from '@/middleware/auth.middleware'
import { registerSchema, loginSchema, refreshSchema } from '@/schemas/auth.schema'


const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.post('/refresh', validate(refreshSchema), refresh)
router.post('/logout', logout)
router.get('/me', authMiddleware, getMe)

export default router