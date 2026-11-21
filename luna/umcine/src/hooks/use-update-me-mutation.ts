import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateMe } from '../api/members/me'
import { useAuthStore } from '../stores/auth-store'
import { meQueryKey } from './use-me-query'

export function useUpdateMeMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateMe,
    onMutate: () => useAuthStore.getState().accessToken,
    onSuccess: async (member, _payload, accessToken) => {
      if (!accessToken || accessToken !== useAuthStore.getState().accessToken) return
      await queryClient.cancelQueries({ queryKey: meQueryKey })
      if (accessToken === useAuthStore.getState().accessToken) {
        queryClient.setQueryData(meQueryKey, member)
      }
    },
  })
}
