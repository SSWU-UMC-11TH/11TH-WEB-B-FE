import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { BookmarkIcon, BookmarkOutlineIcon } from "../icons";
import { cn } from "../../utils/cn";
import { formatReleaseDate } from "../../utils/movies/format-release-date";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { useFavoriteButton } from "../../hooks/use-favorite-button";

interface MovieCardProps {
  movie: TmdbMovieListItem;
}

export function MovieCard({ movie }: MovieCardProps) {
  // 북마크는 서버 즐겨찾기(GET /favorites) 기준으로 표시하고, 누르면 추가·삭제 요청을 보내요.
  const { isFavorite: isBookmarked, toggle, isPending } = useFavoriteButton(movie.id);
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  return (
    <article className="relative flex flex-col gap-1">
      <div className="relative aspect-[241.6/274] overflow-hidden rounded-lg bg-[#e9ecef]">
        {posterUrl ? (
          <img
            className="block h-full w-full object-cover"
            src={posterUrl}
            alt={`${movie.title} 포스터`}
            loading="lazy"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-xs text-[#969da8]">
            이미지 없음
          </div>
        )}
        <button
          type="button"
          className={cn(
            "absolute right-[11px] top-[10px] z-10 grid h-8 w-8 place-items-center rounded-lg transition-colors enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
            isBookmarked
              ? "bg-blue-600 text-white"
              : "bg-white text-[#17191e]",
          )}
          aria-pressed={isBookmarked}
          aria-label={
            isBookmarked
              ? `${movie.title} 북마크 해제`
              : `${movie.title} 북마크 추가`
          }
          aria-busy={isPending}
          disabled={isPending}
          onClick={toggle}
        >
          {isBookmarked ? (
            <BookmarkIcon width={16} height={16} />
          ) : (
            <BookmarkOutlineIcon width={16} height={16} />
          )}
        </button>
      </div>

      <div className="flex flex-col gap-1">
        {/* after:inset-0으로 링크의 클릭 영역을 카드 전체로 넓혀요. */}
        <h3 className="text-base font-bold leading-5 text-[#17191e]">
          <Link
            to="/movies/$movieId"
            params={{ movieId: String(movie.id) }}
            className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-blue-600"
          >
            {movie.title}
          </Link>
        </h3>
        <p className="text-xs leading-4 text-[#969da8]">{formatReleaseDate(movie.release_date)}</p>
      </div>
    </article>
  );
}
