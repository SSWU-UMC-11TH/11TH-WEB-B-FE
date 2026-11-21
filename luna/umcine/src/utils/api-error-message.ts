import { HTTPError } from 'ky'

export function getApiErrorMessage(error: unknown) {
  if (error instanceof HTTPError) {
    const payload = error.data as { message?: string | string[]; error?: string } | undefined
    const message = payload?.message
    const text = Array.isArray(message) ? message.join(' ') : message
    return text || payload?.error || '요청 처리 중 오류가 발생했습니다.'
  }

  return error instanceof Error ? error.message : '요청 처리 중 오류가 발생했습니다.'
}
