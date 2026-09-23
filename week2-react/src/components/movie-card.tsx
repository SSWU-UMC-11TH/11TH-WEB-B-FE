import type { Movie } from "../types/movie";
import { BookmarkIcon, BookmarkOutlineIcon } from "./icons";
import "./movie-card.css";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
  onSelect: (movieId: number) => void;
}

export default function MovieCard({
  movie,
  onToggleBookmark,
  onSelect,
}: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="movie-card__poster">
        <img
          className="movie-card__image"
          src={movie.posterPath}
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
          {movie.isBookmarked ? (
            <BookmarkIcon className="movie-card__bookmark-icon" width={16} height={16} />
          ) : (
            <BookmarkOutlineIcon className="movie-card__bookmark-icon" width={16} height={16} />
          )}
        </button>
      </div>

      <div className="movie-card__info">
        <h3 className="movie-card__title">
          <button
            type="button"
            className="movie-card__select"
            aria-label={`${movie.title} 상세 보기`}
            onClick={() => onSelect(movie.id)}
          >
            {movie.title}
          </button>
        </h3>
        <p className="movie-card__release-date">{movie.releaseDate}</p>
      </div>
    </article>
  );
}
