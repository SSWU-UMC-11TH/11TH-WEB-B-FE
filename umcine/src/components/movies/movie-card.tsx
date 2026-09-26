import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { BookmarkIcon, BookmarkOutlineIcon } from "../icons";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="relative flex flex-col gap-1">
      <div className="relative aspect-[241.6/274] overflow-hidden rounded-lg bg-[#e9ecef]">
        <img
          className="block h-full w-full object-cover"
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
          loading="lazy"
        />
        <button
          type="button"
          className={cn(
            "absolute right-[11px] top-[10px] z-10 grid h-8 w-8 place-items-center rounded-lg transition-colors hover:opacity-90",
            movie.isBookmarked
              ? "bg-blue-600 text-white"
              : "bg-white text-[#17191e]",
          )}
          aria-pressed={movie.isBookmarked}
          aria-label={
            movie.isBookmarked
              ? `${movie.title} 북마크 해제`
              : `${movie.title} 북마크 추가`
          }
          onClick={() => onToggleBookmark(movie.id)}
        >
          {movie.isBookmarked ? (
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
        <p className="text-xs leading-4 text-[#969da8]">{movie.releaseDate}</p>
      </div>
    </article>
  );
}
