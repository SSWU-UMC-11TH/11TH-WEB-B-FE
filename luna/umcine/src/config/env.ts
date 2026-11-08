export const env = {
  tmdbApiBaseUrl: (import.meta.env.VITE_TMDB_API_BASE_URL || 'https://api.themoviedb.org/3').replace(/\/+$/, ''),
  tmdbAccessToken: import.meta.env.VITE_TMDB_ACCESS_TOKEN?.trim() || '',
}

export function requireTmdbToken() {
  if (!env.tmdbAccessToken) throw new Error('TMDB 환경 변수 VITE_TMDB_ACCESS_TOKEN을 설정해 주세요.')
  return env.tmdbAccessToken
}
