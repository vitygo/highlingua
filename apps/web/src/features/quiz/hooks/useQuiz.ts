import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { quizApi } from '@/api/quiz'

export function useGenerateQuiz() {
  return useMutation({
    mutationFn: quizApi.generate,
    onError: () => toast.error('Failed to generate quiz'),
  })
}