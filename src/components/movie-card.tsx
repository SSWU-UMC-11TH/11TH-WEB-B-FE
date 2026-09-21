import type { Movie } from "../types/movie";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <article className="movie-card">
            <div className="poster-wrapper">
                <img
                    src={movie.posterPath}
                    alt={`${movie.title} 포스터`}
                    className="movie-poster"
                />

                <button type="button" className="bookmark-button">
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