import { Response } from 'express'
import { AuthRequest } from '@/middleware/auth.middleware'
import { prisma } from '@/lib/prisma'
import { UpdateProfileInput, ChangePasswordInput } from '@/schemas/user.schema'
import bcrypt from 'bcryptjs'

export async function updateProfile(req: AuthRequest, res: Response): Promise<void> {
  try {
    const userId = req.userId!
    const { name, avatar } = req.body as UpdateProfileInput

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(avatar && { avatar }),
      },
      select: { id: true, email: true, name: true, avatar: true },
    })

    res.json({ user })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function changePassword(req: AuthRequest, res: Response): Promise<void> {
  try {
    const userId = req.userId!
    const { currentPassword, newPassword } = req.body as ChangePasswordInput

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) {
      res.status(400).json({ error: 'Current password is incorrect' })
      return
    }

    const hashed = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    })

    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}