import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";
import {
  ChevronLeftIcon,
  BookmarkIcon,
  BookmarkOutlineIcon,
  StarIcon,
  StarOutlineIcon,
} from "../../components/icons";
import { cn } from "../../utils/cn";

const RATING_COUNT = 5;

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  const [isBookmarked, setIsBookmarked] = useState(movie?.isBookmarked ?? false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  if (!movie) {
    return (
      <main className="mx-auto w-full max-w-[1440px] px-6 py-20 text-center text-[#606774] md:px-20">
        영화를 찾을 수 없어요.
      </main>
    );
  }

  function handleSaveRating() {
    if (rating === 0) return;
    // TODO: 실제 평점 저장 API 연동은 이후 주차에서 이어가요.
    console.log("평점 저장:", { movieId: movie!.id, rating, review });
  }

  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-10 md:px-20">
      {/* 히어로 영역은 본문 좌우 여백을 상쇄해 화면 끝까지 채워요. */}
      <section
        className="relative -mx-6 aspect-[1440/360] overflow-hidden bg-[#17191e] bg-cover bg-center md:-mx-20"
        style={{ backgroundImage: `url(${movie.backdropPath})` }}
      >
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
          <p className="text-sm text-white/75">{movie.originalTitle}</p>
          <p className="flex flex-wrap items-center gap-2 text-[13px] font-bold text-white/90">
            <span>{movie.releaseDate}</span>
            <span className="text-white/50" aria-hidden="true">·</span>
            <span>{movie.genres.join(" · ")}</span>
            <span className="text-white/50" aria-hidden="true">·</span>
            <span>{movie.runtime}</span>
          </p>
        </div>
      </section>

      <div className="grid items-start gap-8 pt-8 lg:grid-cols-[200px_1fr_360px]">
        <div className="flex max-w-[220px] flex-col gap-3 lg:-mt-[17px] lg:max-w-none">
          <img
            className="block h-[286px] w-[200px] rounded-[10px] bg-[#f6f7f9] object-cover"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
        </div>

        <div className="flex flex-col items-start gap-3">
          <h2 className="text-[21px] font-bold leading-none tracking-[-0.63px] text-[#17191e]">
            {movie.tagline}
          </h2>
          <p className="whitespace-pre-line text-sm leading-6 text-[#606774]">
            {movie.overview}
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
            onClick={() => setIsBookmarked((current) => !current)}
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
