import { Response } from 'express'
import { AuthRequest } from '@/middleware/auth.middleware'
import { prisma } from '@/lib/prisma'
import { RateCardInput } from '@/schemas/study.schema'

export async function getStudyCards(req: AuthRequest, res: Response): Promise<void> {
  try {
    const userId = req.userId!
    const { collectionId } = req.query

    const where: any = {
      collection: { userId },
    }

    if (collectionId) {
      where.collectionId = collectionId
    }

    const cards = await prisma.card.findMany({
      where,
      include: {
        progress: {
          where: { userId },
        },
      },
      orderBy: { createdAt: 'asc' },
    })

    const studyCards = cards.map((card) => {
      const progress = card.progress[0]
      return {
        id: card.id,
        word: card.word,
        translation: card.translation,
        explanation: card.explanation,
        partOfSpeech: card.partOfSpeech,
        level: card.level,
        synonyms: JSON.parse(card.synonyms),
        examples: JSON.parse(card.examples),
        collectionId: card.collectionId,
        nextReviewAt: progress?.nextReviewAt ?? new Date(),
        repetitions: progress?.repetitions ?? 0,
        easeFactor: progress?.easeFactor ?? 2.5,
      }
    })

    res.json({ cards: studyCards })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function rateCard(req: AuthRequest, res: Response): Promise<void> {
  try {
    const userId = req.userId!
    const { cardId, rating } = req.body as RateCardInput

    const existing = await prisma.cardProgress.findUnique({
      where: { cardId_userId: { cardId, userId } },
    })

    let easeFactor = existing?.easeFactor ?? 2.5
    let interval = existing?.interval ?? 1
    let repetitions = existing?.repetitions ?? 0

    if (rating === 'easy') {
      repetitions += 1
      if (repetitions === 1) interval = 1
      else if (repetitions === 2) interval = 3
      else interval = Math.round(interval * easeFactor)
      easeFactor = Math.max(1.3, easeFactor + 0.1)
    } else if (rating === 'hard') {
      repetitions += 1
      interval = Math.max(1, Math.round(interval * 1.2))
      easeFactor = Math.max(1.3, easeFactor - 0.15)
    } else {
      repetitions = 0
      interval = 1
      easeFactor = Math.max(1.3, easeFactor - 0.2)
    }

    const nextReviewAt = new Date()
    nextReviewAt.setDate(nextReviewAt.getDate() + interval)

    await prisma.cardProgress.upsert({
      where: { cardId_userId: { cardId, userId } },
      create: {
        cardId,
        userId,
        easeFactor,
        interval,
        repetitions,
        nextReviewAt,
        lastRating: rating,
      },
      update: {
        easeFactor,
        interval,
        repetitions,
        nextReviewAt,
        lastRating: rating,
      },
    })

    await prisma.studySession.create({
      data: {
        userId,
        correct: rating !== 'repeat' ? 1 : 0,
        incorrect: rating === 'repeat' ? 1 : 0,
      },
    })

    res.json({ success: true, nextReviewAt, interval })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getStats(req: AuthRequest, res: Response): Promise<void> {
  try {
    const userId = req.userId!

    const totalCards = await prisma.card.count({
      where: { collection: { userId } },
    })

    const learnedCards = await prisma.cardProgress.count({
      where: { userId, repetitions: { gte: 3 } },
    })

    const collections = await prisma.collection.count({
      where: { userId },
    })

    const sessions = await prisma.studySession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })

    const totalCorrect = sessions.reduce((sum, s) => sum + s.correct, 0)
    const totalIncorrect = sessions.reduce((sum, s) => sum + s.incorrect, 0)
    const accuracy = totalCorrect + totalIncorrect > 0
      ? Math.round((totalCorrect / (totalCorrect + totalIncorrect)) * 100)
      : 0

    const dueCards = await prisma.cardProgress.count({
      where: {
        userId,
        nextReviewAt: { lte: new Date() },
      },
    })

    res.json({
      totalCards,
      learnedCards,
      collections,
      accuracy,
      dueCards,
    })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}