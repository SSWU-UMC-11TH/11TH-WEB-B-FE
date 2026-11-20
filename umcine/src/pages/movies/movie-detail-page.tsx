import type { ReactNode } from "react";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { favoriteQueries } from "../../api/favorites/favorite-queries";
import { movieQueries } from "../../api/movies/movie-queries";
import {
  ChevronLeftIcon,
  BookmarkIcon,
  BookmarkOutlineIcon,
} from "../../components/icons";
import { MyRatingPanel } from "../../components/movies/my-rating-panel";
import { cn } from "../../utils/cn";
import { formatReleaseDate } from "../../utils/movies/format-release-date";
import { formatRuntime } from "../../utils/movies/format-runtime";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";
import { useToggleFavoriteMutation } from "../../hooks/use-toggle-favorite-mutation";
import { useAuthStore } from "../../stores/auth-store";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

  // 영화 번호를 key에 넣어 영화마다 캐시를 따로 저장하고, 올바른 번호일 때만 요청해요.
  const movieDetailQuery = useQuery({
    ...movieQueries.detail(parsedMovieId),
    enabled: isValidMovieId,
  });

  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  // 이 영화의 즐겨찾기 여부(GET /favorites/{movieId})는 로그인했을 때만 조회해요.
  const favoriteStatusQuery = useQuery({
    ...favoriteQueries.status(parsedMovieId),
    enabled: isValidMovieId && Boolean(accessToken),
  });
  const toggleFavoriteMutation = useToggleFavoriteMutation();
  const isBookmarked = Boolean(accessToken && favoriteStatusQuery.data?.isFavorite);
  const isFavoriteBusy =
    (Boolean(accessToken) && favoriteStatusQuery.isLoading) || toggleFavoriteMutation.isPending;

  function handleToggleFavorite() {
    if (!accessToken) {
      alert("로그인 후 즐겨찾기할 수 있어요.");
      navigate({ to: "/login" });
      return;
    }
    if (isFavoriteBusy) return;
    // 성공하면 이 영화의 상태 캐시는 직접 바꾸고, 즐겨찾기 목록은 다시 조회해요.
    toggleFavoriteMutation.mutate({ movieId: parsedMovieId, isFavorite: isBookmarked });
  }

  // 잘못된 번호면 요청하지 않아도 isPending이 참이라, 로딩보다 먼저 확인해요.
  if (!isValidMovieId) {
    return <DetailMessage>올바르지 않은 영화 번호예요.</DetailMessage>;
  }

  if (movieDetailQuery.isPending) {
    return <DetailMessage>영화 정보를 불러오는 중이에요.</DetailMessage>;
  }

  if (movieDetailQuery.isError) {
    return (
      <DetailMessage>
        {getMovieDetailErrorMessage(movieDetailQuery.error)}
      </DetailMessage>
    );
  }

  const movie = movieDetailQuery.data;

  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

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
              "flex h-[42px] items-center justify-center gap-2 self-start rounded-lg px-5 text-sm font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60",
              isBookmarked
                ? "bg-blue-600 enabled:hover:bg-blue-700"
                : "bg-[#606774] enabled:hover:bg-[#4b515c]",
            )}
            aria-pressed={isBookmarked}
            aria-busy={isFavoriteBusy}
            disabled={isFavoriteBusy}
            onClick={handleToggleFavorite}
          >
            {isBookmarked ? (
              <BookmarkIcon width={16} height={16} />
            ) : (
              <BookmarkOutlineIcon width={16} height={16} />
            )}
            {isBookmarked ? "즐겨찾기 완료" : "즐겨찾기"}
          </button>
        </div>

        <MyRatingPanel movieId={parsedMovieId} />
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
