import React from 'react'
import type { Movie } from '../types/movie'
import MovieCard from './movie-card'

interface MovieGridProps {
  movies: Movie[]
  onToggleBookmark: (movieId: number) => void
  onSelectMovie?: (movieId: number) => void
}

export default function MovieGrid({ movies, onToggleBookmark, onSelectMovie }: MovieGridProps) {
  if (!movies || movies.length === 0) {
    return <div className="no-movies">표시할 영화가 없어요.</div>
  }

  return (
    <section className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleBookmark={onToggleBookmark}
          onSelect={() => onSelectMovie?.(movie.id)}
        />
      ))}
    </section>
  )
}
