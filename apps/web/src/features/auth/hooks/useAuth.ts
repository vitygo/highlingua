import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { authApi } from '@/api/auth'
import { useAuthStore } from '@/store/authStore'

export function useLogin() {
  const setUser = useAuthStore((s) => s.setUser)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setUser(data.user)
      toast.success('Welcome back!')
      navigate('/dashboard')
    },
    onError: () => {
      toast.error('Invalid email or password')
    },
  })
}

export function useRegister() {
  const setUser = useAuthStore((s) => s.setUser)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setUser(data.user)
      toast.success('Account created!')
      navigate('/dashboard')
    },
    onError: () => {
      toast.error('Registration failed')
    },
  })
}