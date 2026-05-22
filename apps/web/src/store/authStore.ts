import { create } from 'zustand'
import { authApi, AuthUser } from '@/api/auth'

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: AuthUser) => void
  updateUser: (data: Partial<AuthUser>) => void
  logout: () => void
  initAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: true }),

  updateUser: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),

  logout: () => {
    authApi.logout()
    set({ user: null, isAuthenticated: false })
  },

  initAuth: async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      set({ isLoading: false })
      return
    }
    try {
      const { user } = await authApi.getMe()
      set({ user, isAuthenticated: true, isLoading: false })
    } catch {
      authApi.logout()
      set({ user: null, isAuthenticated: false, isLoading: false })
    }
  },
}))