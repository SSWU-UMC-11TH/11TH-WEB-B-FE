import { env, requireTmdbToken } from '../../config/env'
import type { MovieListResponse } from './models'

export async function getMoviesWithFetch(signal?: AbortSignal): Promise<MovieListResponse> {
  const response = await fetch(`${env.tmdbApiBaseUrl}/movie/popular?language=ko-KR`, {
    headers: { Authorization: `Bearer ${requireTmdbToken()}`, Accept: 'application/json' },
    signal,
  })
  if (!response.ok) throw new Error(`인기 영화 요청에 실패했습니다. (HTTP ${response.status})`)
  return response.json() as Promise<MovieListResponse>
}
