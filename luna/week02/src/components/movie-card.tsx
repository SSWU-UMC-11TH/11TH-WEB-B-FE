import React from 'react'
import type { Movie } from '../types/movie'

interface MovieCardProps {
  movie: Movie
  onToggleBookmark: (movieId: number) => void
  onSelect?: (movieId: number) => void
}

export default function MovieCard({ movie, onToggleBookmark, onSelect }: MovieCardProps) {
  const bookmarkIcon = movie.isBookmarked ? '/icons/bookmark.svg' : '/icons/bookmark-outline.svg'
  const btnClass = movie.isBookmarked ? 'bookmark-btn active' : 'bookmark-btn'

  return (
    <article className="movie-card">
      <div className="poster-wrap">
        <img className="poster" src={movie.posterPath} alt={movie.title} onClick={() => onSelect?.(movie.id)} />
        <button
          className={btnClass}
          aria-label={movie.isBookmarked ? '북마크 해제' : '북마크 추가'}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img src={bookmarkIcon} alt="bookmark" />
        </button>
      </div>
      <div className="movie-info">
        <h3 className="movie-title" onClick={() => onSelect?.(movie.id)}>{movie.title}</h3>
        <div className="movie-release">{movie.releaseDate}</div>
      </div>
    </article>
  )
}
