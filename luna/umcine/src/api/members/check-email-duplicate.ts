import { apiClient } from '../api-client'

export interface EmailDuplicateCheckResponse {
  available: boolean
}

export async function checkEmailDuplicate(email: string) {
  const normalizedEmail = email.trim()

  return apiClient.get(`members/email/${encodeURIComponent(normalizedEmail)}`).json<EmailDuplicateCheckResponse>()
}
