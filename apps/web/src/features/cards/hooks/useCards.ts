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

export function useCollectionCards(id: string) {
  return useQuery({
    queryKey: ['collections', id, 'cards'],
    queryFn: () => collectionsApi.getCards(id),
    enabled: !!id,
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

export function useDeleteCollection() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: collectionsApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
      toast.success('Collection deleted!')
    },
    onError: () => toast.error('Failed to delete collection'),
  })
}

export function useDeleteCard() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (cardId: string) =>
      collectionsApi.deleteCard(cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
      toast.success('Card deleted!')
    },
    onError: () => toast.error('Failed to delete card'),
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