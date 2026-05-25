import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '@/lib/tokens'
import { RegisterInput, LoginInput } from '@/schemas/auth.schema'
import { seedStarterCards } from '@/lib/seedStarterCards'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
}

const ACCESS_MAX_AGE = 15 * 60 * 1000
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60 * 1000

function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
  res.cookie('accessToken', accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: ACCESS_MAX_AGE,
  })
  res.cookie('refreshToken', refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: REFRESH_MAX_AGE,
  })
}

function clearAuthCookies(res: Response) {
  res.clearCookie('accessToken', COOKIE_OPTIONS)
  res.clearCookie('refreshToken', COOKIE_OPTIONS)
}

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
      data: { email, password: hashedPassword, name, avatar: 'lingo' },
    })

    await seedStarterCards(user.id)

    const accessToken = signAccessToken(user.id)
    const refreshToken = signRefreshToken(user.id)

    setAuthCookies(res, accessToken, refreshToken)

    res.status(201).json({
      user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar },
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

    setAuthCookies(res, accessToken, refreshToken)

    res.json({
      user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar },
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function refresh(req: Request, res: Response): Promise<void> {
  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
      res.status(401).json({ error: 'No refresh token' })
      return
    }

    const payload = verifyRefreshToken(refreshToken)
    const user = await prisma.user.findUnique({ where: { id: payload.userId } })

    if (!user) {
      res.status(401).json({ error: 'User not found' })
      return
    }

    const newAccessToken = signAccessToken(user.id)
    const newRefreshToken = signRefreshToken(user.id)

    setAuthCookies(res, newAccessToken, newRefreshToken)

    res.json({ success: true })
  } catch {
    clearAuthCookies(res)
    res.status(401).json({ error: 'Invalid refresh token' })
  }
}

export async function getMe(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, avatar: true, createdAt: true },
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

export async function logout(req: Request, res: Response): Promise<void> {
  clearAuthCookies(res)
  res.json({ success: true })
}