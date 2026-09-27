import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
    movie: Movie;
    onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({
    movie,
    onToggleBookmark,
}: MovieCardProps) {
    return (
        <article className="min-w-0">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[9px] bg-[#ddd]">
                <Link
                    to="/movies/$movieId"
                    params={{ movieId: String(movie.id) }}
                    className="block h-full w-full"
                >
                    <img
                        src={movie.posterPath}
                        alt={`${movie.title} 포스터`}
                        className="block h-full w-full object-cover"
                    />
                </Link>

                <button
                    type="button"
                    className={cn(
                        "absolute right-[9px] top-[9px] flex h-8 w-8 cursor-pointer items-center justify-center rounded-[7px] border-0 p-[5px]",
                        movie.isBookmarked
                            ? "bg-blue-600"
                            : "bg-[rgba(20,20,20,0.75)]",
                    )}
                    aria-pressed={movie.isBookmarked}
                    onClick={() => onToggleBookmark(movie.id)}
                >
                    <img
                        src={
                            movie.isBookmarked
                                ? "/icons/bookmark.svg"
                                : "/icons/bookmark-outline.svg"
                        }
                        alt=""
                        className="h-full w-full"
                    />
                </button>
            </div>

            <h2 className="mt-2 mb-1 truncate text-[13px] leading-[1.35]">
                {movie.title}
            </h2>

            <p className="m-0 text-xs text-[#9499a3]">
                {movie.releaseDate}
            </p>
        </article>
    );
}