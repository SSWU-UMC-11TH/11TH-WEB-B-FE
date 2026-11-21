import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addFavorite, deleteFavorite, getFavorites, getFavoriteStatus } from '../api/members/favorites'
import { useAuthStore } from '../stores/auth-store'

export const favoritesQueryKey = ['favorites'] as const
const listKey = [...favoritesQueryKey, 'list'] as const
const statusKey = (movieId: number) => [...favoritesQueryKey, 'status', movieId] as const

export function useFavoritesQuery(enabled: boolean) {
  return useQuery({
    queryKey: listKey,
    queryFn: ({ signal }) => getFavorites(signal),
    enabled,
  })
}

export function useFavoriteStatusQuery(movieId: number, enabled: boolean) {
  return useQuery({
    queryKey: statusKey(movieId),
    queryFn: ({ signal }) => getFavoriteStatus(movieId, signal),
    enabled,
  })
}

export function useFavoriteMutation(movieId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (isFavorite: boolean) => {
      const { accessToken } = useAuthStore.getState()
      if (!accessToken) throw new Error('로그인이 필요합니다.')
      const favorite = isFavorite ? await addFavorite(movieId) : await deleteFavorite(movieId)
      return { accessToken, favorite }
    },
    onSuccess: async ({ accessToken, favorite }, isFavorite) => {
      const queryKey = statusKey(movieId)
      if (accessToken !== useAuthStore.getState().accessToken) return
      await Promise.all([
        queryClient.cancelQueries({ queryKey, exact: true }),
        queryClient.cancelQueries({ queryKey: listKey, exact: true }),
      ])
      if (accessToken !== useAuthStore.getState().accessToken) return

      queryClient.setQueryData(queryKey, isFavorite)
      queryClient.setQueryData(listKey, (current: Awaited<ReturnType<typeof getFavorites>> | undefined) => {
        if (!current) return undefined
        const otherFavorites = current.filter((item) => item.movieId !== movieId)
        return favorite ? [favorite, ...otherFavorites] : otherFavorites
      })
      return queryClient.invalidateQueries({ queryKey: listKey, exact: true })
    },
  })
}
