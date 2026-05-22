import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { cardsApi, GeneratedCard } from '@/api/cards'
import { collectionsApi } from '@/api/collections'

export function useCollections() {
  return useQuery({
    queryKey: ['collections'],
    queryFn: collectionsApi.getAll,
  })
}

export function useCreateCollection() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: collectionsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
      toast.success('Collection created!')
    },
    onError: () => toast.error('Failed to create collection'),
  })
}

export function useGenerateCards() {
  return useMutation({
    mutationFn: cardsApi.generate,
    onError: () => toast.error('Failed to generate cards. Try again.'),
  })
}

export function useSaveCards() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: cardsApi.save,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
      toast.success(`${data.saved} cards saved!`)
    },
    onError: () => toast.error('Failed to save cards'),
  })
}