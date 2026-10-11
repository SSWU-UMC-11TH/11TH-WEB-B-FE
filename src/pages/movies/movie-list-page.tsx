import { useEffect, useState } from "react";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";

export function MovieListPage() {
    const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        async function loadMovies() {
            setIsLoading(true);
            setErrorMessage(null);

            try {
                const response = await getMovies({ page: 1 });

                if (!ignore) {
                    setMovies(response.results);
                }
            } catch {
                if (!ignore) {
                    setErrorMessage("영화 목록을 불러오지 못했어요.");
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        }

        loadMovies();

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <div className="flex min-h-screen flex-col">
            <main className="mx-auto w-full max-w-[1080px] flex-1 px-4 pt-7 pb-[60px]">
                <h1 className="mb-[22px] text-[32px] leading-[1.2]">
                    영화 목록
                </h1>

                {isLoading ? (
                    <p>영화 목록을 불러오는 중이에요.</p>
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : movies.length === 0 ? (
                    <p>조건에 맞는 영화가 없어요.</p>
                ) : (
                    <>
                        <MovieGrid movies={movies} />
                        <Pagination />
                    </>
                )}
            </main>

            <footer className="flex min-h-12 items-center justify-center gap-[7px] border-t border-[#e5e7eb] bg-white text-[11px] text-[#7b8190]">
                <img
                    src="/images/logos/tmdb-logo.svg"
                    alt="TMDB"
                    className="h-auto w-[25px]"
                />
                <span>
                    This product uses the TMDB API but is not endorsed or certified by
                    TMDB.
                </span>
            </footer>
        </div>
    );
}





//api 호출 전
/* import { useEffect, useState } from "react";

import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
// import { movies as initialMovies } from "../../data/movies";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";

export function MovieListPage() {
    
    return (
        <div className="flex min-h-screen flex-col">
            <main className="mx-auto w-full max-w-[1080px] flex-1 px-4 pt-7 pb-[60px]">
                <h1 className="mb-[22px] text-[32px] leading-[1.2]">
                    영화 목록
                </h1>

                <MovieGrid
                    movies={initialMovies}
                />

                <Pagination />
            </main>

            <footer className="flex min-h-12 items-center justify-center gap-[7px] border-t border-[#e5e7eb] bg-white text-[11px] text-[#7b8190]">
                <img
                    src="/images/logos/tmdb-logo.svg"
                    alt="TMDB"
                    className="h-auto w-[25px]"
                />
                <span>
                    This product uses the TMDB API but is not endorsed or certified by
                    TMDB.
                </span>
            </footer>
        </div>
    );
} */