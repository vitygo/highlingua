import { Response } from 'express'
import { AuthRequest } from '@/middleware/auth.middleware'
import { prisma } from '@/lib/prisma'
import { CreateCollectionInput } from '@/schemas/collection.schema'

export async function getCollections(req: AuthRequest, res: Response): Promise<void> {
  try {
    const collections = await prisma.collection.findMany({
      where: { userId: req.userId! },
      include: { _count: { select: { cards: true } } },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ collections })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function createCollection(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { name, emoji } = req.body as CreateCollectionInput
    const collection = await prisma.collection.create({
      data: { name, emoji, userId: req.userId! },
    })
    res.status(201).json({ collection })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function deleteCollection(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params
    await prisma.collection.deleteMany({
      where: { id, userId: req.userId! },
    })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}