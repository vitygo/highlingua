import { Router } from 'express'
import { getCollections, createCollection, deleteCollection } from '@/controllers/collections.controller'
import { authMiddleware } from '@/middleware/auth.middleware'
import { validate } from '@/middleware/validate.middleware'
import { createCollectionSchema } from '@/schemas/collection.schema'

const router = Router()

router.use(authMiddleware)
router.get('/', getCollections)
router.post('/', validate(createCollectionSchema), createCollection)
router.delete('/:id', deleteCollection)

export default router