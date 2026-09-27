import { useState } from "react";

import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { movies as initialMovies } from "../../data/movies";

export function MovieListPage() {
    const [movies, setMovies] = useState(initialMovies);

    function handleToggleBookmark(movieId: number) {
        setMovies((currentMovies) =>
            currentMovies.map((movie) =>
                movie.id === movieId
                    ? { ...movie, isBookmarked: !movie.isBookmarked }
                    : movie,
            ),
        );
    }

    return (
        <div className="flex min-h-screen flex-col">
            <main className="mx-auto w-full max-w-[1080px] flex-1 px-4 pt-7 pb-[60px]">
                <h1 className="mb-[22px] text-[32px] leading-[1.2]">영화 목록</h1>

                <MovieGrid
                    movies={movies}
                    onToggleBookmark={handleToggleBookmark}
                />

                <Pagination />
            </main>

            <footer className="flex min-h-12 items-center justify-center gap-[7px] border-t border-[#e5e7eb] bg-white text-[11px] text-[#7b8190]">
                <img src="/images/logos/tmdb-logo.svg" alt="TMDB" className="h-auto w-[25px]" />
                <span>
                    This product uses the TMDB API but is not endorsed or certified by
                    TMDB.
                </span>
            </footer>
        </div>
    );
}