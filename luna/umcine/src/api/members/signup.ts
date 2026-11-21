import { apiClient } from '../api-client'

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

export interface SignupResponse {
  isSuccess: boolean
  code: string
  message: string
  result: SignupResult
}

export async function signupMember(payload: SignupPayload) {
  return apiClient.post('members', {
    json: {
      email: payload.email.trim(),
      nickname: payload.nickname.replace(/\s+/g, ''),
      password: payload.password,
    },
  }).json<SignupResponse>()
}
