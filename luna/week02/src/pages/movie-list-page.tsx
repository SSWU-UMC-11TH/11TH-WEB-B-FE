import React from 'react'
import type { Movie } from '../types/movie'
import MovieGrid from '../components/movie-grid'
import Pagination from '../components/pagination'

interface Props {
  movies: Movie[]
  onToggleBookmark: (id: number) => void
  onSelectMovie: (id: number) => void
}

export default function MovieListPage({ movies, onToggleBookmark, onSelectMovie }: Props) {
  return (
    <section className="container">
      <h1 className="page-title">영화 목록</h1>
      <MovieGrid movies={movies} onToggleBookmark={onToggleBookmark} />
      <Pagination />
    </section>
  )
}
