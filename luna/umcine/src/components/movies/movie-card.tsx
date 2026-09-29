import React from 'react'
import { Link } from '@tanstack/react-router'
import type { Movie } from '../../types/movie'
import { cn } from '../../utils/cn'

interface MovieCardProps {
  movie: Movie
  onToggleBookmark?: (movieId: number) => void
  onSelect?: (movieId: number) => void
}

export default function MovieCard({
  movie,
  onSelect,
}: MovieCardProps) {
  const bookmarkIcon = movie.isBookmarked ? '/icons/bookmark.svg' : '/icons/bookmark-outline.svg'
  const btnClass = cn(
    'absolute top-3 right-3 flex size-[34px] cursor-pointer items-center justify-center rounded-lg border px-[6px] py-[7.5px]',
    movie.isBookmarked ? 'border-[#2563eb] bg-[#2563eb]' : 'border-white bg-[rgba(23,25,30,0.8)]',
  )

  return (
    <article className="overflow-visible rounded-lg bg-transparent">
      <div className="relative">
        {onSelect ? (
          <img className="poster block aspect-[2/3] w-full cursor-pointer rounded-lg object-cover max-[640px]:h-[260px] max-[420px]:h-[420px]" src={movie.posterPath} alt={movie.title} onClick={() => onSelect(movie.id)} />
        ) : (
          <Link className="text-inherit no-underline" to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
            <img className="poster block aspect-[2/3] w-full rounded-lg object-cover max-[640px]:h-[260px] max-[420px]:h-[420px]" src={movie.posterPath} alt={movie.title} />
          </Link>
        )}
        <span
          className={btnClass}
          aria-pressed={movie.isBookmarked}
          aria-label={movie.isBookmarked ? '북마크 해제' : '북마크 추가'}
        >
          <img className="block h-[19px] w-[22px] brightness-0 invert" src={bookmarkIcon} alt="bookmark" />
        </span>
      </div>
      <div className="movie-info py-[10px]">
        <h3 className="movie-title mt-[6px] mb-1 cursor-pointer text-[15px] font-bold text-[#0f172a]">
          {onSelect ? (
            <span onClick={() => onSelect(movie.id)}>{movie.title}</span>
          ) : (
            <Link className="text-inherit no-underline" to="/movies/$movieId" params={{ movieId: String(movie.id) }}>{movie.title}</Link>
          )}
        </h3>
        <div className="movie-release text-[13px] text-[#6b7280]">{movie.releaseDate}</div>
      </div>
    </article>
  )
}
