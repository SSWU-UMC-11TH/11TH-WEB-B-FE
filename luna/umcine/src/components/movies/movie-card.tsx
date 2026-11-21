import React from 'react'
import MovieImage from './movie-image'
import { Link } from '@tanstack/react-router'
import type { MovieSummary as Movie } from '../../api/movies/models'
import FavoriteButton from './favorite-button'

interface MovieCardProps {
  movie: Movie
  onSelect?: (movieId: number) => void
}

export default function MovieCard({
  movie,
  onSelect,
}: MovieCardProps) {
  return (
    <article className="overflow-visible rounded-lg bg-transparent">
      <div className="relative">
        {onSelect ? (
          <MovieImage className="poster block aspect-[2/3] w-full cursor-pointer rounded-lg object-cover max-[640px]:h-[260px] max-[420px]:h-[420px]" path={movie.poster_path} alt={movie.title} onClick={() => onSelect(movie.id)} />
        ) : (
          <Link className="text-inherit no-underline" to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
            <MovieImage className="poster block aspect-[2/3] w-full rounded-lg object-cover max-[640px]:h-[260px] max-[420px]:h-[420px]" path={movie.poster_path} alt={movie.title} />
          </Link>
        )}
        <FavoriteButton movieId={movie.id} compactPosition="top-3 right-3" />
      </div>
      <div className="movie-info py-[10px]">
        <h3 className="movie-title mt-[6px] mb-1 cursor-pointer text-[15px] font-bold text-[#0f172a]">
          {onSelect ? (
            <span onClick={() => onSelect(movie.id)}>{movie.title}</span>
          ) : (
            <Link className="text-inherit no-underline" to="/movies/$movieId" params={{ movieId: String(movie.id) }}>{movie.title}</Link>
          )}
        </h3>
        <div className="movie-release text-[13px] text-[#6b7280]">{movie.release_date}</div>
      </div>
    </article>
  )
}
