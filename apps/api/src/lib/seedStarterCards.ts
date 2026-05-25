import { prisma } from './prisma'
import { STARTER_COLLECTIONS } from './starterCards'

export async function seedStarterCards(userId: string) {
  for (const col of STARTER_COLLECTIONS) {
    const collection = await prisma.collection.create({
      data: {
        name: col.name,
        emoji: col.emoji,
        userId,
      },
    })

    await prisma.card.createMany({
      data: col.cards.map((card) => ({
        ...card,
        collectionId: collection.id,
      })),
    })
  }
}