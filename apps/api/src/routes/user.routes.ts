import { Router } from 'express'
import { updateProfile, changePassword } from '@/controllers/user.controller'
import { authMiddleware } from '@/middleware/auth.middleware'
import { validate } from '@/middleware/validate.middleware'
import { updateProfileSchema, changePasswordSchema } from '@/schemas/user.schema'

const router = Router()

router.use(authMiddleware)
router.put('/profile', validate(updateProfileSchema), updateProfile)
router.put('/password', validate(changePasswordSchema), changePassword)

export default router