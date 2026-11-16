import { tmdbClient } from '../tmdb-client'
import type { MovieDetail, MovieListResponse, MovieSearchResponse } from './models'

interface GetMoviesOptions {
  page?: number
  signal?: AbortSignal
}

interface SearchMoviesOptions {
  query: string
  signal?: AbortSignal
}

export function getMovies(pageOrOptions?: number | GetMoviesOptions, signal?: AbortSignal) {
  const options = typeof pageOrOptions === 'number'
    ? { page: pageOrOptions, signal }
    : pageOrOptions ?? {}

  const { page = 1, signal: requestSignal } = options

  return tmdbClient.get('movie/popular', {
    searchParams: { page },
    signal: requestSignal,
  }).json<MovieListResponse>()
}

export function searchMovies(queryOrOptions: string | SearchMoviesOptions, signal?: AbortSignal) {
  const options = typeof queryOrOptions === 'string'
    ? { query: queryOrOptions, signal }
    : queryOrOptions

  const trimmedQuery = options.query.trim()

  return tmdbClient.get('search/movie', {
    searchParams: { query: trimmedQuery, include_adult: false },
    signal: options.signal,
  }).json<MovieSearchResponse>()
}

export function isValidMovieId(movieId: string | number) {
  const value = String(movieId)
  return /^[1-9]\d*$/.test(value) && Number.isSafeInteger(Number(value))
}

export function getMovieDetail(movieId: string | number, signal?: AbortSignal) {
  const normalizedMovieId = String(movieId)
  if (!isValidMovieId(normalizedMovieId)) throw new Error('잘못된 영화 ID입니다. 양의 정수를 입력해 주세요.')
  return tmdbClient.get(`movie/${normalizedMovieId}`, { signal }).json<MovieDetail>()
}
