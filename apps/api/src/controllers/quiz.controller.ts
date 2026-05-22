import { Response } from 'express'
import { AuthRequest } from '@/middleware/auth.middleware'
import { prisma } from '@/lib/prisma'
import { GenerateQuizInput } from '@/schemas/quiz.schema'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export async function generateQuiz(req: AuthRequest, res: Response): Promise<void> {
  try {
    const userId = req.userId!
    const { collectionId, mode, limit } = req.body as GenerateQuizInput

    const where: any = { collection: { userId } }
    if (collectionId) where.collectionId = collectionId

    const allCards = await prisma.card.findMany({ where })

    if (allCards.length < 2) {
      res.status(400).json({ error: 'Need at least 2 cards to start a quiz' })
      return
    }

    const cards = shuffle(allCards).slice(0, limit)

    const questions = cards.map((card) => {
      const synonyms: string[] = JSON.parse(card.synonyms)
      const examples: { sentence: string; translation: string }[] = JSON.parse(card.examples)

      if (mode === 'multiple_choice') {
        const wrongCards = shuffle(allCards.filter(c => c.id !== card.id)).slice(0, 3)
        const options = shuffle([
          card.translation,
          ...wrongCards.map(c => c.translation),
        ])
        return {
          id: card.id,
          mode,
          question: card.word,
          correctAnswer: card.translation,
          options,
          level: card.level,
          partOfSpeech: card.partOfSpeech,
        }
      }

      if (mode === 'write_translation') {
        return {
          id: card.id,
          mode,
          question: card.word,
          correctAnswer: card.translation,
          hint: card.explanation,
          level: card.level,
          partOfSpeech: card.partOfSpeech,
        }
      }

      if (mode === 'fill_gap') {
        const example = examples[0]
        if (!example) {
          return {
            id: card.id,
            mode: 'write_translation',
            question: card.word,
            correctAnswer: card.translation,
            hint: card.explanation,
            level: card.level,
            partOfSpeech: card.partOfSpeech,
          }
        }
        const gapped = example.sentence.replace(
          new RegExp(`\\b${card.word}\\b`, 'gi'),
          '___'
        )
        const wrongCards = shuffle(allCards.filter(c => c.id !== card.id)).slice(0, 3)
        const options = shuffle([card.word, ...wrongCards.map(c => c.word)])
        return {
          id: card.id,
          mode,
          question: gapped,
          translation: example.translation,
          correctAnswer: card.word,
          options,
          level: card.level,
          partOfSpeech: card.partOfSpeech,
        }
      }

      if (mode === 'word_order') {
        const example = examples[0]
        if (!example) {
          return {
            id: card.id,
            mode: 'write_translation',
            question: card.word,
            correctAnswer: card.translation,
            hint: card.explanation,
            level: card.level,
            partOfSpeech: card.partOfSpeech,
          }
        }
        const words = example.sentence.split(' ')
        const shuffled = shuffle(words)
        return {
          id: card.id,
          mode,
          question: example.translation,
          correctAnswer: example.sentence,
          words: shuffled,
          level: card.level,
          partOfSpeech: card.partOfSpeech,
        }
      }

      return null
    }).filter(Boolean)

    res.json({ questions })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}