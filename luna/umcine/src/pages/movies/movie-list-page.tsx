import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { moviesListQueryOptions } from '../../api/movies/query-options'
import RequestStatus from '../../components/movies/request-status'
import MovieGrid from '../../components/movies/movie-grid'
import Pagination from '../../components/movies/pagination'

export default function MovieListPage() {
  const [page, setPage] = React.useState(1)
  const moviesQuery = useQuery(moviesListQueryOptions(page))

  const movies = moviesQuery.data?.results ?? []
  const totalPages = moviesQuery.data?.total_pages ?? 1

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-7">
      <h1 className="mt-3 mb-5 text-[24px] font-extrabold">영화 목록</h1>

      {moviesQuery.isPending && <RequestStatus />}
      {moviesQuery.isError && <RequestStatus error={moviesQuery.error instanceof Error ? moviesQuery.error.message : '영화 목록을 불러오지 못했습니다.'} />}

      {moviesQuery.isSuccess && movies.length === 0 && <p className="p-10 text-center text-[#6b7280]">표시할 영화가 없어요.</p>}
      {moviesQuery.isSuccess && movies.length > 0 && <MovieGrid movies={movies} />}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  )
}
