import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginMember } from '../api/members/login'
import { useAuthStore } from '../stores/auth-store'
import { meQueryKey } from './use-me-query'

export function useLoginMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: loginMember,
    onSuccess: ({ accessToken }) => {
      useAuthStore.getState().setAccessToken(accessToken)
      void queryClient.invalidateQueries({ queryKey: meQueryKey })
    },
  })
}
