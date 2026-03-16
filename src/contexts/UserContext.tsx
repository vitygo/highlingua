import { createContext, useContext, useState, type ReactNode } from 'react'
import type { UserState } from '@/types'

const STORAGE_KEY = 'lq_user'

const DEFAULT: UserState = {
  name: 'Viktor',
  avatar: '🦁',
  level: 12,
  xp: 3100,
  maxXp: 5000,
  streak: 14,
  gems: 48,
  hearts: 5,
  accuracy: 87,
  totalLessons: 24,
  wordsLearned: 186,
  minutesToday: 22,
}

function loadUser(): UserState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT
    return { ...DEFAULT, ...JSON.parse(raw) }
  } catch {
    return DEFAULT
  }
}

type UserContextType = {
  user: UserState
  setUser: React.Dispatch<React.SetStateAction<UserState>>
  addXP: (n: number) => void
}

const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserState>(loadUser)

  const updateUser: typeof setUser = (action) => {
    setUser(prev => {
      const next = typeof action === 'function' ? action(prev) : action
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const addXP = (n: number) => {
    updateUser(prev => {
      const xp = prev.xp + n
      if (xp >= prev.maxXp) {
        return {
          ...prev,
          xp: xp - prev.maxXp,
          level: prev.level + 1,
          maxXp: Math.floor(prev.maxXp * 1.35),
        }
      }
      return { ...prev, xp }
    })
  }

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, addXP }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used inside UserProvider')
  return context
}