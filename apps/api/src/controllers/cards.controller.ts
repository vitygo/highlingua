import { Response } from 'express'
import { AuthRequest } from '@/middleware/auth.middleware'
import { prisma } from '@/lib/prisma'
import { GenerateCardsInput, SaveCardsInput } from '@/schemas/card.schema'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

const PROMPT_TEMPLATE = (word: string, native: string, target: string) => `
You are a language learning assistant.
Generate a flashcard in valid JSON for the word: "${word}"
Native language: ${native}
Target language: ${target}

Return ONLY a valid JSON object, no markdown, no backticks, no explanation.

{
  "word": "string",
  "translation": "string",
  "explanation": "string (short, beginner friendly, in ${native})",
  "partOfSpeech": "string",
  "level": "A1|A2|B1|B2|C1|C2",
  "synonyms": ["string", "string"],
  "examples": [
    { "sentence": "string (in ${target})", "translation": "string (in ${native})" },
    { "sentence": "string (in ${target})", "translation": "string (in ${native})" }
  ]
}
`


async function generateSingleCard(
    word: string,
    nativeLanguage: string,
    targetLanguage: string
  ) {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: PROMPT_TEMPLATE(word.trim(), nativeLanguage, targetLanguage) }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1024,
        },
      }),
    })
  
    if (!response.ok) {
      const errText = await response.text()
      console.error('Gemini API error:', response.status, errText)
      throw new Error(`Gemini API error: ${response.status}`)
    }
  
    const data = await response.json() as any
    
  
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  
  
    if (!text) throw new Error('No response from Gemini')
  
    const clean = text.replace(/```json|```/g, '').trim()

    return JSON.parse(clean)
  }

export async function generateCards(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { words, nativeLanguage, targetLanguage } = req.body as GenerateCardsInput

    const wordList = words
      .split(',')
      .map((w: string) => w.trim())
      .filter((w: string) => w.length > 0)
      .slice(0, 10)

    if (wordList.length === 0) {
      res.status(400).json({ error: 'No valid words provided' })
      return
    }

    const cards = []
    const errors = []

    for (const word of wordList) {
      try {
        const card = await generateSingleCard(word, nativeLanguage, targetLanguage)
        cards.push(card)
      } catch (err) {
        errors.push({ word, error: 'Failed to generate' })
      }
    }

    res.json({ cards, errors })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function saveCards(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { collectionId, cards } = req.body as SaveCardsInput
    const userId = req.userId!

    const collection = await prisma.collection.findFirst({
      where: { id: collectionId, userId },
    })

    if (!collection) {
      res.status(404).json({ error: 'Collection not found' })
      return
    }

    const saved = await prisma.$transaction(
      cards.map((card) =>
        prisma.card.create({
          data: {
            word: card.word,
            translation: card.translation,
            explanation: card.explanation,
            partOfSpeech: card.partOfSpeech,
            level: card.level,
            synonyms: JSON.stringify(card.synonyms),
            examples: JSON.stringify(card.examples),
            collectionId,
          },
        })
      )
    )

    res.status(201).json({ saved: saved.length })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}