import ky from 'ky'
import { env } from '../config/env'
import { useAuthStore } from '../stores/auth-store'

export const apiClient = ky.create({
  baseUrl: `${env.apiBaseUrl}/`,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  timeout: 10000,
  retry: 0,
})

export const authenticatedApiClient = apiClient.extend({
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const { accessToken } = useAuthStore.getState()
        if (accessToken) request.headers.set('Authorization', `Bearer ${accessToken}`)
      },
    ],
    afterResponse: [
      ({ request, response }) => {
        const { accessToken, setAccessToken } = useAuthStore.getState()
        if (response.status === 401 && accessToken && request.headers.get('Authorization') === `Bearer ${accessToken}`) {
          setAccessToken(null)
        }
      },
    ],
  },
})

export interface ApiResponse<T> {
  isSuccess: boolean
  code: string
  message: string
  result: T
}

export function unwrapResult<T>(response: ApiResponse<T>): T {
  if (!response.isSuccess) throw new Error(response.message)
  return response.result
}
