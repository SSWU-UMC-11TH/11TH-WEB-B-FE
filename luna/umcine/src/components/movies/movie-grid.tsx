import React from 'react'
import type { Movie } from '../../types/movie'
import MovieCard from './movie-card'

interface MovieGridProps {
  movies: Movie[]
  onToggleBookmark: (movieId: number) => void
  onSelectMovie?: (movieId: number) => void
}

export default function MovieGrid({
  movies,
  onToggleBookmark = () => undefined,
  onSelectMovie,
}: MovieGridProps) {
  if (!movies || movies.length === 0) {
    return <div className="p-10 text-center text-[#6b7280]">표시할 영화가 없어요.</div>
  }

  return (
    <section className="my-2 grid grid-cols-1 gap-6 min-[421px]:grid-cols-2 min-[641px]:grid-cols-3 min-[901px]:grid-cols-4 min-[1201px]:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleBookmark={onToggleBookmark}
          onSelect={onSelectMovie}
        />
      ))}
    </section>
  )
}
