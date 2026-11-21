import { useMutation } from '@tanstack/react-query'
import { signupMember } from '../api/members/signup'

export function useSignupMutation() {
  return useMutation({ mutationFn: signupMember })
}
