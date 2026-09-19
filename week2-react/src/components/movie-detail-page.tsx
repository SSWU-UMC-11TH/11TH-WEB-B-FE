import { useState } from "react";
import type { Movie } from "../types/movie";
import "./movie-detail-page.css";

interface MovieDetailPageProps {
  movie: Movie;
  onBack: () => void;
  onToggleBookmark: (movieId: number) => void;
}

function formatRuntime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${hours}시간 ${rest}분`;
}

const RATING_COUNT = 5;

export default function MovieDetailPage({
  movie,
  onBack,
  onToggleBookmark,
}: MovieDetailPageProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const genres = movie.genres ?? [];
  const posterUrl = movie.detailPosterUrl ?? movie.posterUrl;
  const hasBakedHero = Boolean(movie.backdropUrl);

  function handleSaveRating() {
    // TODO: 실제 평점 저장 API 연동은 이후 주차에서 이어가요.
    console.log("평점 저장:", { movieId: movie.id, rating, review });
  }

  return (
    <section className="detail-page">
      <div
        className="detail-page__hero"
        style={
          movie.backdropUrl
            ? { backgroundImage: `url(${movie.backdropUrl})` }
            : undefined
        }
      >
        {!hasBakedHero && (
          <img
            className="detail-page__hero-fallback"
            src={movie.posterUrl}
            alt=""
            aria-hidden="true"
          />
        )}
        {!hasBakedHero && <div className="detail-page__hero-overlay" />}

        {/*
          hasBakedHero(=Figma에서 받은 히어로 이미지)일 때는 "‹ 영화 목록"과 제목,
          장르 같은 글자가 이미 이미지 안에 그려져 있어요. 그 위에 같은 내용을
          좌표로 다시 그리면 위치가 살짝 어긋나 겹쳐 보이니, 이 경우엔 화면에는
          아무것도 그리지 않는 투명한 클릭 영역만 두고, 실제 글자는 스크린리더용으로만 남겨요.
        */}
        <button
          type="button"
          className={
            hasBakedHero ? "detail-page__back detail-page__back--hidden" : "detail-page__back"
          }
          onClick={onBack}
          aria-label="영화 목록으로 돌아가기"
        >
          {!hasBakedHero && (
            <>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path
                  d="m14.5 5-7 7 7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              영화 목록
            </>
          )}
        </button>

        {hasBakedHero ? (
          <h1 className="detail-page__title detail-page__title--hidden">
            {movie.title}
          </h1>
        ) : (
          <div className="detail-page__hero-info">
            <h1 className="detail-page__title">{movie.title}</h1>
            {movie.originalTitle && (
              <p className="detail-page__original-title">{movie.originalTitle}</p>
            )}
            <p className="detail-page__meta">
              <span>{movie.releaseDate}</span>
              {genres.length > 0 && (
                <>
                  <span className="detail-page__meta-dot" aria-hidden="true">
                    ·
                  </span>
                  <span>{genres.join(" · ")}</span>
                </>
              )}
              {movie.runtimeMinutes != null && (
                <>
                  <span className="detail-page__meta-dot" aria-hidden="true">
                    ·
                  </span>
                  <span>{formatRuntime(movie.runtimeMinutes)}</span>
                </>
              )}
            </p>
          </div>
        )}
      </div>

      <div className="detail-page__body">
        <div className="detail-page__poster-card">
          <img
            className="detail-page__poster"
            src={posterUrl}
            alt={`${movie.title} 포스터`}
          />
        </div>

        <div className="detail-page__content">
          <h2 className="detail-page__tagline">
            {movie.tagline ?? movie.title}
          </h2>
          <p className="detail-page__synopsis">
            {movie.synopsis ?? "상세 설명을 준비하고 있어요."}
          </p>
          <button
            type="button"
            className="detail-page__bookmark-button"
            aria-pressed={movie.isBookmarked}
            onClick={() => onToggleBookmark(movie.id)}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="M6.5 3.5h11a1 1 0 0 1 1 1v16l-6.5-3.9-6.5 3.9v-16a1 1 0 0 1 1-1Z"
                fill={movie.isBookmarked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
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
                  <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                    <path
                      d="m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.9 6.4 20.1l1.4-6.3-4.8-4.3 6.4-.6L12 3Z"
                      fill={isFilled ? "#f5c518" : "#606774"}
                    />
                  </svg>
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
