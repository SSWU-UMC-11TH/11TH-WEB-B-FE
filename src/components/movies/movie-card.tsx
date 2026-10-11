import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
    movie: TmdbMovieListItem;
}

export default function MovieCard({
    movie,
}: MovieCardProps) {
    const posterUrl = getTmdbPosterUrl(movie.poster_path);

    return (
        <article className="min-w-0">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[9px] bg-[#ddd]">
                <Link
                    to="/movies/$movieId"
                    params={{ movieId: String(movie.id) }}
                    className="block h-full w-full"
                >
                    {posterUrl ? (
                        <img
                            src={posterUrl}
                            alt={`${movie.title} 포스터`}
                            className="block h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-[#777]">
                            이미지 없음
                        </div>
                    )}
                </Link>

                <BookmarkButton movieId={movie.id} />
            </div>

            <h2 className="mt-2 mb-1 truncate text-[13px] leading-[1.35]">
                {movie.title}
            </h2>

            <p className="m-0 text-xs text-[#9499a3]">
                {movie.release_date}
            </p>
        </article>
    );
}

//이전 코드
/* import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({
    movie,
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

                <BookmarkButton movieId={movie.id} />

            </div>

            <h2 className="mt-2 mb-1 truncate text-[13px] leading-[1.35]">
                {movie.title}
            </h2>

            <p className="m-0 text-xs text-[#9499a3]">
                {movie.releaseDate}
            </p>
        </article>
    );
} */