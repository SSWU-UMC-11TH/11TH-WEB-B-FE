import { apiClient, unwrapResult, type ApiResponse } from '../api-client'

interface LoginPayload {
  email: string
  password: string
}

interface LoginResult {
  nickname: string
  accessToken: string
}

export async function loginMember({ email, password }: LoginPayload) {
  const response = await apiClient.post('auth/login', {
    json: { email: email.trim(), password },
  }).json<ApiResponse<LoginResult>>()
  return unwrapResult(response)
}
