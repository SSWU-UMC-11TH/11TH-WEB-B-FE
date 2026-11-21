import { authenticatedApiClient, unwrapResult, type ApiResponse } from '../api-client'

export interface MemberInfo {
  email: string
  nickname: string
  createdAt: string
}

interface UpdateMePayload {
  nickname: string
}

export async function getMe(signal: AbortSignal) {
  const response = await authenticatedApiClient.get('members/me', { signal }).json<ApiResponse<MemberInfo>>()
  return unwrapResult(response)
}

export async function updateMe(payload: UpdateMePayload) {
  const response = await authenticatedApiClient.patch('members/me', { json: payload }).json<ApiResponse<MemberInfo>>()
  return unwrapResult(response)
}
