import { useEffect, useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { MovieGrid } from "../../components/movies/movie-grid";

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
        if (!ignore) setMovies(response.results);
      } catch {
        if (!ignore) setErrorMessage("영화 목록을 불러오지 못했어요.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovies();

    // 이전 요청의 결과가 늦게 도착해도 상태를 바꾸지 못하게 해요.
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main className="mx-auto w-full max-w-[1440px] flex-1 px-6 pb-10 pt-6 md:px-20 md:pt-[30px]">
      <h1 className="mb-7 text-[38px] font-bold leading-[44px] tracking-[-1.71px] text-[#17191e]">
        영화 목록
      </h1>
      {isLoading ? (
        <p className="py-16 text-center text-[#8b929c]">
          영화 목록을 불러오는 중이에요.
        </p>
      ) : errorMessage ? (
        <p className="py-16 text-center text-[#8b929c]" role="alert">
          {errorMessage}
        </p>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </main>
  );
}
