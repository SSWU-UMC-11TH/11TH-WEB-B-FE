import { tmdbClient } from '../tmdb-client'
import type { MovieDetail, MovieListResponse, MovieSearchResponse } from './models'

export function getMovies(signal?: AbortSignal) {
  return tmdbClient.get('movie/popular', { signal }).json<MovieListResponse>()
}

export function searchMovies(query: string, signal?: AbortSignal) {
  return tmdbClient.get('search/movie', {
    searchParams: { query: query.trim(), include_adult: false }, signal,
  }).json<MovieSearchResponse>()
}

export function isValidMovieId(movieId: string) {
  return /^[1-9]\d*$/.test(movieId) && Number.isSafeInteger(Number(movieId))
}

export function getMovieDetail(movieId: string, signal?: AbortSignal) {
  if (!isValidMovieId(movieId)) throw new Error('잘못된 영화 ID입니다. 양의 정수를 입력해 주세요.')
  return tmdbClient.get(`movie/${movieId}`, { signal }).json<MovieDetail>()
}
