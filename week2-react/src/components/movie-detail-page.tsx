import { useState } from "react";
import type { Movie } from "../types/movie";
import {
  ChevronLeftIcon,
  BookmarkIcon,
  BookmarkOutlineIcon,
  StarIcon,
  StarOutlineIcon,
} from "./icons";
import "./movie-detail-page.css";

interface MovieDetailPageProps {
  movie: Movie;
  onBack: () => void;
  onToggleBookmark: (movieId: number) => void;
}

const RATING_COUNT = 5;

export default function MovieDetailPage({
  movie,
  onBack,
  onToggleBookmark,
}: MovieDetailPageProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  function handleSaveRating() {
    // TODO: 실제 평점 저장 API 연동은 이후 주차에서 이어가요.
    console.log("평점 저장:", { movieId: movie.id, rating, review });
  }

  return (
    <section className="detail-page">
      <div
        className="detail-page__hero"
        style={{ backgroundImage: `url(${movie.backdropPath})` }}
      >
        <div className="detail-page__hero-overlay" />

        <button
          type="button"
          className="detail-page__back"
          onClick={onBack}
        >
          <ChevronLeftIcon width={16} height={16} />
          영화 목록
        </button>

        <div className="detail-page__hero-info">
          <h1 className="detail-page__title">{movie.title}</h1>
          <p className="detail-page__original-title">{movie.originalTitle}</p>
          <p className="detail-page__meta">
            <span>{movie.releaseDate}</span>
            <span className="detail-page__meta-dot" aria-hidden="true">
              ·
            </span>
            <span>{movie.genres.join(" · ")}</span>
            <span className="detail-page__meta-dot" aria-hidden="true">
              ·
            </span>
            <span>{movie.runtime}</span>
          </p>
        </div>
      </div>

      <div className="detail-page__body">
        <div className="detail-page__poster-card">
          <img
            className="detail-page__poster"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
        </div>

        <div className="detail-page__content">
          <h2 className="detail-page__tagline">{movie.tagline}</h2>
          <p className="detail-page__synopsis">{movie.overview}</p>
          <button
            type="button"
            className="detail-page__bookmark-button"
            aria-pressed={movie.isBookmarked}
            onClick={() => onToggleBookmark(movie.id)}
          >
            {movie.isBookmarked ? (
              <BookmarkIcon width={16} height={16} />
            ) : (
              <BookmarkOutlineIcon width={16} height={16} />
            )}
            {movie.isBookmarked ? "즐겨찾기 완료" : "즐겨찾기"}
          </button>
        </div>

        <div className="detail-page__rating-card">
          <h3 className="detail-page__rating-title">내 평점</h3>
          <p className="detail-page__rating-helper">
            별점은 필수, 후기는 선택이에요.
          </p>

          <div className="detail-page__stars" role="radiogroup" aria-label="별점">
            {Array.from({ length: RATING_COUNT }, (_, index) => {
              const value = index + 1;
              const isFilled = value <= rating;
              return (
                <button
                  key={value}
                  type="button"
                  className="detail-page__star"
                  role="radio"
                  aria-checked={rating === value}
                  aria-label={`${value}점`}
                  onClick={() => setRating(value)}
                >
                  {isFilled ? (
                    <StarIcon width={26} height={26} style={{ color: "#f5c518" }} />
                  ) : (
                    <StarOutlineIcon width={26} height={26} style={{ color: "#606774" }} />
                  )}
                </button>
              );
            })}
          </div>

          <textarea
            className="detail-page__review"
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            value={review}
            onChange={(event) => setReview(event.target.value)}
          />

          <button
            type="button"
            className="detail-page__save-button"
            onClick={handleSaveRating}
          >
            평점 저장
          </button>
        </div>
      </div>
    </section>
  );
}
