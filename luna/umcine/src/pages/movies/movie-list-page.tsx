import React from 'react'
import { getMovies } from '../../api/movies'
import { useMovieRequest } from '../../hooks/use-movie-request'
import RequestStatus from '../../components/movies/request-status'
import MovieGrid from '../../components/movies/movie-grid'
import Pagination from '../../components/movies/pagination'

export default function MovieListPage() {
  const state = useMovieRequest('popular', getMovies)
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-7">
      <h1 className="mt-3 mb-5 text-[24px] font-extrabold">영화 목록</h1>
      {state.status === 'loading' && <RequestStatus />}
      {state.status === 'error' && <RequestStatus error={state.error} />}
      {state.status === 'success' && <MovieGrid movies={state.data.results} />}
      <Pagination />
    </section>
  )
}
