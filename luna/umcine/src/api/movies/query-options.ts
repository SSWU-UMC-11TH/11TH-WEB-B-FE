import { queryOptions } from '@tanstack/react-query'
import { getMovieDetail, getMovies, searchMovies } from '.'

export const moviesListQueryOptions = (page: number) =>
  queryOptions({
    queryKey: ['movies', 'list', { page }],
    queryFn: () => getMovies({ page }),
  })

export const movieSearchQueryOptions = (query: string) => {
  const normalizedQuery = query.trim()

  return queryOptions({
    queryKey: ['movies', 'search', { query: normalizedQuery }],
    queryFn: () => searchMovies({ query: normalizedQuery }),
    enabled: normalizedQuery.length > 0,
  })
}

export const movieDetailQueryOptions = (movieId: number) =>
  queryOptions({
    queryKey: ['movies', 'detail', movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled: Number.isInteger(movieId) && movieId > 0,
    staleTime: 30 * 1000,
  })
