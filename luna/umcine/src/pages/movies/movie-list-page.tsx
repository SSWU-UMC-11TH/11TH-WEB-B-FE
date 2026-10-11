import React from 'react'
import type { Movie } from '../../types/movie'
import MovieGrid from '../../components/movies/movie-grid'
import Pagination from '../../components/movies/pagination'

interface Props {
  movies: Movie[]
  onSelectMovie?: (id: number) => void
}

export default function MovieListPage({
  movies,
  onSelectMovie,
}: Props) {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-7">
      <h1 className="mt-3 mb-5 text-[24px] font-extrabold">영화 목록</h1>
      <MovieGrid
        movies={movies}
        onSelectMovie={onSelectMovie}
      />
      <Pagination />
    </section>
  )
}
