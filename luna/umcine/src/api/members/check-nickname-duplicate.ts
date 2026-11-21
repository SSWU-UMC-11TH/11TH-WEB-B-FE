import { apiClient } from '../api-client'

export interface NicknameDuplicateCheckResponse {
  available: boolean
}

export async function checkNicknameDuplicate(nickname: string) {
  const normalizedNickname = nickname.replace(/\s+/g, '')

  return apiClient.get(`members/nickname/${encodeURIComponent(normalizedNickname)}`).json<NicknameDuplicateCheckResponse>()
}
