import ky from 'ky'
import { env, requireTmdbToken } from '../config/env'

export const tmdbClient = ky.create({
  baseUrl: `${env.tmdbApiBaseUrl}/`,
  headers: { Accept: 'application/json' },
  searchParams: { language: 'ko-KR' },
  timeout: 10000,
  retry: 0,
  hooks: {
    beforeRequest: [({ request }) => {
      request.headers.set('Authorization', `Bearer ${requireTmdbToken()}`)
    }],
  },
})
