import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '@/lib/tokens'
import { RegisterInput, LoginInput } from '@/schemas/auth.schema'

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, name } = req.body as RegisterInput

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      res.status(409).json({ error: 'Email already in use' })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    })

    const accessToken = signAccessToken(user.id)
    const refreshToken = signRefreshToken(user.id)

    res.status(201).json({
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, name: user.name },
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body as LoginInput

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const accessToken = signAccessToken(user.id)
    const refreshToken = signRefreshToken(user.id)

    res.json({
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, name: user.name },
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function refresh(req: Request, res: Response): Promise<void> {
  try {
    const { refreshToken } = req.body

    const payload = verifyRefreshToken(refreshToken)
    const user = await prisma.user.findUnique({ where: { id: payload.userId } })

    if (!user) {
      res.status(401).json({ error: 'User not found' })
      return
    }

    const accessToken = signAccessToken(user.id)
    const newRefreshToken = signRefreshToken(user.id)

    res.json({ accessToken, refreshToken: newRefreshToken })
  } catch {
    res.status(401).json({ error: 'Invalid refresh token' })
  }
}

export async function getMe(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, createdAt: true },
    })

    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.json({ user })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}