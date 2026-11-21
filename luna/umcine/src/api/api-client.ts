import ky from 'ky'
import { env } from '../config/env'

export const apiClient = ky.create({
  baseUrl: `${env.apiBaseUrl}/`,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  timeout: 10000,
  retry: 0,
})
