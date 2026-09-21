import React, { useState } from 'react'
import type { Movie } from '../types/movie'

interface Props {
  movie: Movie
  onBack: () => void
  onToggleBookmark: (id: number) => void
}

export default function MovieDetailPage({ movie, onBack, onToggleBookmark }: Props) {
  const [rating, setRating] = useState<number>(0)

  return (
    <section className="movie-detail">
      <div className="backdrop">
        <img src={movie.backdropPath} alt={movie.title} className="backdrop-img" />
        <button className="back-link" onClick={onBack}>&lt; 영화 목록</button>
        <div className="backdrop-meta">
          <h2 className="detail-title">{movie.title}</h2>
          <div className="detail-sub">{movie.originalTitle} · {movie.releaseDate} · {movie.runtime}</div>
        </div>
      </div>

      <div className="detail-body container">
        <aside className="detail-left">
          <img className="detail-poster" src={movie.posterPath} alt={movie.title} />
        </aside>

        <div className="detail-center">
          <h2 className="tagline">{movie.tagline}</h2>
          <p className="overview">{movie.overview}</p>
          <button className={`bookmark-btn ${movie.isBookmarked ? 'active' : ''}`} onClick={() => onToggleBookmark(movie.id)}>
            <img src={movie.isBookmarked ? '/icons/bookmark.svg' : '/icons/bookmark-outline.svg'} alt="bookmark" />
            즐겨찾기
          </button>
        </div>

        <aside className="detail-right">
          <div className="my-rating">
            <div className="my-rating-title">내 평점</div>
            <div className="stars">
              {[1,2,3,4,5].map((n) => (
                <button key={n} className={`star-btn ${rating>=n? 'active':''}`} onClick={() => setRating(n)}>
                  <img src={rating>=n? '/icons/star.svg' : '/icons/star-outline.svg'} alt={`star-${n}`} />
                </button>
              ))}
            </div>
            <textarea className="review" placeholder="후기를 남겨보세요" />
            <button className="black-btn">평점 저장</button>
          </div>
        </aside>
      </div>
    </section>
  )
}
