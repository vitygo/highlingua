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

    if (allCards.length < 1) {
      res.status(400).json({ error: 'Need at least 1 card to start a quiz' })
      return
    }

    const cards = shuffle(allCards).slice(0, limit)

    const getMultipleChoice = (card: any) => {
      const wrongCards = shuffle(allCards.filter(c => c.id !== card.id)).slice(0, 3)
      const options = shuffle([
        card.translation,
        ...wrongCards.map((c: any) => c.translation),
      ])
      return {
        id: card.id,
        mode: 'multiple_choice' as const,
        question: card.word,
        correctAnswer: card.translation,
        options,
        level: card.level,
        partOfSpeech: card.partOfSpeech,
      }
    }

    const questions = cards.map((card) => {
      const examples: { sentence: string; translation: string }[] = JSON.parse(card.examples)
      const hasExample = examples.length > 0 && examples[0]?.sentence?.trim().length > 0

      if (mode === 'multiple_choice') {
        return getMultipleChoice(card)
      }

      if (mode === 'write_translation') {
        return {
          id: card.id,
          mode: 'write_translation' as const,
          question: card.word,
          correctAnswer: card.translation,
          hint: card.explanation,
          level: card.level,
          partOfSpeech: card.partOfSpeech,
        }
      }

      if (mode === 'fill_gap') {
        if (!hasExample) return getMultipleChoice(card)

        const example = examples[0]
        const targetWord = card.word.toLowerCase().trim()

        const sentenceWords = example.sentence.split(' ')
        const gappedWords = sentenceWords.map((w: string) => {
          const clean = w.toLowerCase().replace(/[^a-zA-Zа-яА-ЯіїєёІЇЄЁ]/g, '')
          return clean === targetWord ? '___' : w
        })

        const gapped = gappedWords.join(' ')

        if (!gapped.includes('___')) return getMultipleChoice(card)

        const wrongCards = shuffle(allCards.filter(c => c.id !== card.id)).slice(0, 3)
        const options = shuffle([card.word, ...wrongCards.map((c: any) => c.word)])

        return {
          id: card.id,
          mode: 'fill_gap' as const,
          question: gapped,
          translation: example.translation,
          correctAnswer: card.word,
          options,
          level: card.level,
          partOfSpeech: card.partOfSpeech,
        }
      }

      if (mode === 'word_order') {
        if (!hasExample) return getMultipleChoice(card)

        const example = examples[0]
        const words = example.sentence.trim().split(/\s+/)

        if (words.length < 2) return getMultipleChoice(card)

        const shuffled = shuffle(words)
        return {
          id: card.id,
          mode: 'word_order' as const,
          question: example.translation,
          correctAnswer: example.sentence,
          words: shuffled,
          level: card.level,
          partOfSpeech: card.partOfSpeech,
        }
      }

      return getMultipleChoice(card)
    })

    res.json({ questions })
  } catch (err) {
    console.error('Quiz error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}