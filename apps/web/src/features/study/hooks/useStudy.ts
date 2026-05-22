import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { studyApi } from '@/api/study'

export function useStudyCards(collectionId?: string) {
  return useQuery({
    queryKey: ['study', 'cards', collectionId],
    queryFn: () => studyApi.getCards(collectionId),
  })
}

export function useStudyStats() {
  return useQuery({
    queryKey: ['study', 'stats'],
    queryFn: studyApi.getStats,
  })
}

export function useRateCard() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: studyApi.rateCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study'] })
    },
    onError: () => toast.error('Failed to rate card'),
  })
}