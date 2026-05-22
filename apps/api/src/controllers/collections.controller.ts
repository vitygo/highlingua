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

export async function getCollectionCards(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params
    const collection = await prisma.collection.findFirst({
      where: { id, userId: req.userId! },
    })
    if (!collection) {
      res.status(404).json({ error: 'Collection not found' })
      return
    }
    const cards = await prisma.card.findMany({
      where: { collectionId: id },
      orderBy: { createdAt: 'desc' },
    })
    const parsed = cards.map((card) => ({
      ...card,
      synonyms: JSON.parse(card.synonyms),
      examples: JSON.parse(card.examples),
    }))
    res.json({ cards: parsed })
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

export async function deleteCard(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { cardId } = req.params
    const card = await prisma.card.findFirst({
      where: { id: cardId },
      include: { collection: true },
    })
    if (!card || card.collection.userId !== req.userId!) {
      res.status(404).json({ error: 'Card not found' })
      return
    }
    await prisma.card.delete({ where: { id: cardId } })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}