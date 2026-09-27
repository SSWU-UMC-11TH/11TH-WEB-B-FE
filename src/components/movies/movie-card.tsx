import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";

interface MovieCardProps {
    movie: Movie;
    onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({
    movie,
    onToggleBookmark,
}: MovieCardProps) {
    return (
        <article className="movie-card">
            <div className="poster-wrapper">

                <Link
                    to="/movies/$movieId"
                    params={{ movieId: String(movie.id) }}
                >
                    <img src={movie.posterPath} alt={`${movie.title} 포스터`} />
                </Link>

                <button
                    type="button"
                    className="bookmark-button"
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
                    />
                </button>
            </div>

            <h2>{movie.title}</h2>
            <p>{movie.releaseDate}</p>
        </article>
    );
}