import type { Movie } from "../types/movie";
import "./movie-card.css";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="movie-card__poster">
        <img
          className="movie-card__image"
          src={movie.posterUrl}
          alt={`${movie.title} 포스터`}
          loading="lazy"
        />
        <button
          type="button"
          className="movie-card__bookmark"
          aria-pressed={movie.isBookmarked}
          aria-label={
            movie.isBookmarked
              ? `${movie.title} 북마크 해제`
              : `${movie.title} 북마크 추가`
          }
          onClick={() => onToggleBookmark(movie.id)}
        >
          <svg
            className="movie-card__bookmark-icon"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path
              d="M6.5 3.5h11a1 1 0 0 1 1 1v16l-6.5-3.9-6.5 3.9v-16a1 1 0 0 1 1-1Z"
              fill={movie.isBookmarked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__release-date">{movie.releaseDate}</p>
      </div>
    </article>
  );
}
