import { apiClient, unwrapResult, type ApiResponse } from '../api-client'

export interface SignupPayload {
  email: string
  nickname: string
  password: string
}

export interface SignupResult {
  memberId: number
  email: string
  nickname: string
}

export async function signupMember(payload: SignupPayload) {
  const response = await apiClient.post('members', {
    json: {
      email: payload.email.trim(),
      nickname: payload.nickname.replace(/\s+/g, ''),
      password: payload.password,
    },
  }).json<ApiResponse<SignupResult>>()
  return unwrapResult(response)
}
