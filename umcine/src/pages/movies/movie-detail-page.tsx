import { useEffect, useState, type ReactNode } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import {
  ChevronLeftIcon,
  BookmarkIcon,
  BookmarkOutlineIcon,
  StarIcon,
  StarOutlineIcon,
} from "../../components/icons";
import { cn } from "../../utils/cn";
import { formatReleaseDate } from "../../utils/movies/format-release-date";
import { formatRuntime } from "../../utils/movies/format-runtime";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";
import { useBookmarkStore } from "../../stores/bookmark-store";

const RATING_COUNT = 5;

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(parsedMovieId),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadMovie() {
      setMovie(null);
      setErrorMessage(null);

      // 유효하지 않은 영화 번호라면 요청하지 않아요.
      if (!isValidMovieId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const response = await getMovieDetail(parsedMovieId);
        if (!ignore) setMovie(response);
      } catch (error) {
        if (!ignore) setErrorMessage(getMovieDetailErrorMessage(error));
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovie();

    return () => {
      ignore = true;
    };
  }, [parsedMovieId, isValidMovieId]);

  if (!isValidMovieId) {
    return <DetailMessage>올바르지 않은 영화 번호예요.</DetailMessage>;
  }

  if (isLoading) {
    return <DetailMessage>영화 정보를 불러오는 중이에요.</DetailMessage>;
  }

  if (errorMessage || !movie) {
    return (
      <DetailMessage>
        {errorMessage ?? "영화 정보를 불러오지 못했어요."}
      </DetailMessage>
    );
  }

  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  function handleSaveRating() {
    if (rating === 0) return;
    // TODO: 실제 평점 저장 API 연동은 이후 주차에서 이어가요.
    console.log("평점 저장:", { movieId: parsedMovieId, rating, review });
  }

  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-10 md:px-20">
      {/* 히어로 영역은 본문 좌우 여백을 상쇄해 화면 끝까지 채워요. */}
      <section className="relative -mx-6 aspect-[1440/360] overflow-hidden bg-[#606774] md:-mx-20">
        {backdropUrl ? (
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={backdropUrl}
            alt=""
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-sm text-white/70">
            이미지 없음
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />

        <Link
          to="/"
          className="absolute left-6 top-6 flex items-center gap-1.5 text-sm font-semibold text-white"
        >
          <ChevronLeftIcon width={16} height={16} />
          영화 목록
        </Link>

        <div className="absolute bottom-7 left-6 right-6 flex flex-col gap-1.5">
          <h1 className="text-[32px] font-extrabold tracking-[-0.02em] text-white">
            {movie.title}
          </h1>
          <p className="text-sm text-white/75">{movie.original_title}</p>
          <p className="flex flex-wrap items-center gap-2 text-[13px] font-bold text-white/90">
            <span>{formatReleaseDate(movie.release_date)}</span>
            <span className="text-white/50" aria-hidden="true">·</span>
            <span>{movie.genres.map((genre) => genre.name).join(", ")}</span>
            <span className="text-white/50" aria-hidden="true">·</span>
            <span>{formatRuntime(movie.runtime)}</span>
          </p>
        </div>
      </section>

      <div className="grid items-start gap-8 pt-8 lg:grid-cols-[200px_1fr_360px]">
        <div className="flex max-w-[220px] flex-col gap-3 lg:-mt-[17px] lg:max-w-none">
          {posterUrl ? (
            <img
              className="block h-[286px] w-[200px] rounded-[10px] bg-[#f6f7f9] object-cover"
              src={posterUrl}
              alt={`${movie.title} 포스터`}
            />
          ) : (
            <div className="grid h-[286px] w-[200px] place-items-center rounded-[10px] bg-[#e9ecef] text-xs text-[#969da8]">
              이미지 없음
            </div>
          )}
        </div>

        <div className="flex flex-col items-start gap-3">
          {movie.tagline && (
            <h2 className="text-[21px] font-bold leading-none tracking-[-0.63px] text-[#17191e]">
              {movie.tagline}
            </h2>
          )}
          <p className="whitespace-pre-line text-sm leading-6 text-[#606774]">
            {movie.overview || "줄거리 정보가 없어요."}
          </p>
          <button
            type="button"
            className={cn(
              "flex h-[42px] items-center justify-center gap-2 self-start rounded-lg px-5 text-sm font-bold text-white transition-colors",
              isBookmarked
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-[#606774] hover:bg-[#4b515c]",
            )}
            aria-pressed={isBookmarked}
            onClick={() => toggleBookmark(parsedMovieId)}
          >
            {isBookmarked ? (
              <BookmarkIcon width={16} height={16} />
            ) : (
              <BookmarkOutlineIcon width={16} height={16} />
            )}
            {isBookmarked ? "즐겨찾기 완료" : "즐겨찾기"}
          </button>
        </div>

        <div className="flex flex-col gap-1 border-[#e3e6eb] lg:border-l lg:pl-8">
          <h3 className="text-lg font-bold leading-none text-[#17191e]">내 평점</h3>
          <p className="mb-2 text-[13px] text-[#969da8]">
            별점은 필수, 후기는 선택이에요.
          </p>

          <div className="mb-2 flex gap-2" role="radiogroup" aria-label="별점">
            {Array.from({ length: RATING_COUNT }, (_, index) => {
              const value = index + 1;
              return (
                <button
                  key={value}
                  type="button"
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-lg border border-[#e3e6eb] bg-white px-1.5 py-px transition-colors hover:border-[#c9ced6]"
                  role="radio"
                  aria-checked={rating === value}
                  aria-label={`${value}점`}
                  onClick={() => setRating(value)}
                >
                  {value <= rating ? (
                    <StarIcon width={26} height={26} className="text-[#f5c518]" />
                  ) : (
                    <StarOutlineIcon width={26} height={26} className="text-[#606774]" />
                  )}
                </button>
              );
            })}
          </div>

          <textarea
            className="h-[102px] w-full resize-none rounded-lg border border-[#e3e6eb] bg-white px-3 pb-[18px] pt-4 text-sm text-[#17191e] placeholder:text-[#b0b6bf]"
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            value={review}
            onChange={(event) => setReview(event.target.value)}
          />

          <button
            type="button"
            className="mt-3 h-[42px] rounded-lg border border-white bg-[#17191e] px-4 text-sm font-bold text-white transition-colors enabled:hover:bg-[#303540] disabled:cursor-not-allowed disabled:opacity-40"
            onClick={handleSaveRating}
            disabled={rating === 0}
          >
            평점 저장
          </button>
        </div>
      </div>
    </main>
  );
}

function DetailMessage({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 py-20 text-center text-[#606774] md:px-20">
      {children}
    </main>
  );
}
