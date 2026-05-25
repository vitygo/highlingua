import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '@/lib/tokens'

export interface AuthRequest extends Request {
  userId?: string
}

export function authMiddleware(
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): void {
  const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1]

  if (!token) {
    res.status(401).json({ error: 'Not authenticated' })
    return
  }

  try {
    const payload = verifyAccessToken(token)
    req.userId = payload.userId
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}