import { Router } from 'express'
import {
  getCollections,
  getCollectionCards,
  createCollection,
  deleteCollection,
  deleteCard,
} from '@/controllers/collections.controller'
import { authMiddleware } from '@/middleware/auth.middleware'
import { validate } from '@/middleware/validate.middleware'
import { createCollectionSchema } from '@/schemas/collection.schema'

const router = Router()

router.use(authMiddleware)
router.get('/', getCollections)
router.post('/', validate(createCollectionSchema), createCollection)
router.get('/:id/cards', getCollectionCards)
router.delete('/:id', deleteCollection)
router.delete('/cards/:cardId', deleteCard)

export default router