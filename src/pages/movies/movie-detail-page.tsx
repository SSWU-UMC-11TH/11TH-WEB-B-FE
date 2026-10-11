import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookmarkButton } from "../../components/bookmark-button";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import {
    getTmdbBackdropUrl,
    getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";

export function MovieDetailPage() {
    const { movieId } = useParams({ from: "/movies/$movieId" });
    const parsedMovieId = Number(movieId);

    const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        setMovie(null);
        setErrorMessage(null);

        if (!Number.isInteger(parsedMovieId) || parsedMovieId <= 0) {
            setIsLoading(false);
            setErrorMessage("올바르지 않은 영화 번호예요.");
            return;
        }

        setIsLoading(true);

        async function loadMovieDetail() {
            try {
                const response = await getMovieDetail(parsedMovieId);

                if (!ignore) {
                    setMovie(response);
                }
            } catch (error) {
                if (!ignore) {
                    setErrorMessage(getMovieDetailErrorMessage(error));
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        }

        loadMovieDetail();

        return () => {
            ignore = true;
        };
    }, [parsedMovieId]);

    if (isLoading) {
        return <main>영화 정보를 불러오는 중이에요.</main>;
    }

    if (errorMessage) {
        return <main>{errorMessage}</main>;
    }

    if (!movie) {
        return <main>영화 정보를 불러오지 못했어요.</main>;
    }

    const posterUrl = getTmdbPosterUrl(movie.poster_path);
    const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);

    const runtimeText =
        typeof movie.runtime === "number"
            ? `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`
            : "상영 시간 정보가 없어요.";

    return (
        <main>
            {backdropUrl && (
                <img
                    src={backdropUrl}
                    alt=""
                    aria-hidden="true"
                />
            )}

            <Link to="/">영화 목록</Link>

            <div className="relative inline-block">
                {posterUrl ? (
                    <img
                        src={posterUrl}
                        alt={`${movie.title} 포스터`}
                    />
                ) : (
                    <div>이미지 없음</div>
                )}

                <BookmarkButton movieId={movie.id} />
            </div>

            <h1>{movie.title}</h1>
            <p>{movie.original_title}</p>
            <p>{movie.release_date}</p>
            <p>{movie.genres.map((genre) => genre.name).join(" · ")}</p>
            <p>{runtimeText}</p>

            {movie.tagline && <h2>{movie.tagline}</h2>}

            <p>{movie.overview}</p>
        </main>
    );
}


//이전 코드
/* import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";
import { BookmarkButton } from "../../components/bookmark-button";

export function MovieDetailPage() {
    const { movieId } = useParams({ from: "/movies/$movieId" });

    const movie = movies.find(
        (item) => item.id === Number(movieId),
    );

    if (!movie) {
        return <main>영화를 찾을 수 없어요.</main>;
    }

    return (
        <main>
            <img
                src={movie.backdropPath}
                alt=""
                aria-hidden="true"
            />

            <Link to="/">영화 목록</Link>

            <div className="relative inline-block">
                <img
                    src={movie.posterPath}
                    alt={`${movie.title} 포스터`}
                />

                <BookmarkButton movieId={movie.id} />
            </div>

            <h1>{movie.title}</h1>
            <p>{movie.originalTitle}</p>
            <p>{movie.releaseDate}</p>
            <p>{movie.genres.join(" · ")}</p>
            <p>{movie.runtime}</p>
            <h2>{movie.tagline}</h2>
            <p>{movie.overview}</p>
        </main>
    );
} */