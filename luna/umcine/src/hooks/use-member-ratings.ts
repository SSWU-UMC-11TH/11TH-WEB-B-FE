import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createRating, deleteRating, getMemberRatings, updateRating, type Rating, type RatingInput } from '../api/members/ratings'
import { useAuthStore } from '../stores/auth-store'
import { getTokenMemberId } from '../utils/get-token-member-id'

export const ratingsQueryKey = ['ratings', 'member'] as const
const memberKey = (memberId: string) => [...ratingsQueryKey, memberId] as const

export type RatingChange =
  | { type: 'create'; movieId: number; input: RatingInput }
  | { type: 'update'; ratingId: number; input: RatingInput }
  | { type: 'delete'; ratingId: number }

export function useMemberRatingsQuery(memberId: string) {
  return useQuery({
    queryKey: memberKey(memberId),
    queryFn: ({ signal }) => getMemberRatings(memberId, signal),
  })
}

export function useRatingMutation(memberId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (change: RatingChange) => {
      const { accessToken } = useAuthStore.getState()
      if (!accessToken || getTokenMemberId(accessToken) !== memberId) throw new Error('로그인이 필요합니다.')

      switch (change.type) {
        case 'create':
          return { accessToken, rating: await createRating({ movieId: change.movieId, ...change.input }) }
        case 'update':
          return { accessToken, rating: await updateRating(change.ratingId, change.input) }
        case 'delete':
          return { accessToken, rating: await deleteRating(change.ratingId) }
      }
    },
    onSuccess: async ({ accessToken, rating }, change) => {
      if (accessToken !== useAuthStore.getState().accessToken) return
      const queryKey = memberKey(memberId)
      await queryClient.cancelQueries({ queryKey, exact: true })
      if (accessToken !== useAuthStore.getState().accessToken) return

      queryClient.setQueryData(queryKey, (current: Rating[] | undefined) => {
        if (!current) return undefined
        if (change.type === 'delete') return current.filter(({ ratingId }) => ratingId !== change.ratingId)
        if (!rating) return current
        if (change.type === 'create') return [rating, ...current.filter(({ ratingId }) => ratingId !== rating.ratingId)]
        return current.map((item) => item.ratingId === rating.ratingId ? rating : item)
      })
      return queryClient.invalidateQueries({ queryKey, exact: true })
    },
  })
}
