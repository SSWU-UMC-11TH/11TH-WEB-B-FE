import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../api/movies/get-movies";
import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";

// TMDB는 total_pages가 더 커도 500페이지까지만 요청할 수 있어요.
const TMDB_MAX_PAGE = 500;

export function MovieListPage() {
  const [page, setPage] = useState(1);

  // page를 key에 넣어 페이지마다 캐시를 따로 저장해요.
  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  });

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = Math.min(moviesQuery.data?.total_pages ?? 0, TMDB_MAX_PAGE);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <main className="mx-auto w-full max-w-[1440px] flex-1 px-6 pb-10 pt-6 md:px-20 md:pt-[30px]">
      <h1 className="mb-7 text-[38px] font-bold leading-[44px] tracking-[-1.71px] text-[#17191e]">
        영화 목록
      </h1>
      {moviesQuery.isPending ? (
        <p className="py-16 text-center text-[#8b929c]">
          영화 목록을 불러오는 중이에요.
        </p>
      ) : moviesQuery.isError ? (
        <p className="py-16 text-center text-[#8b929c]" role="alert">
          영화 목록을 불러오지 못했어요.
        </p>
      ) : (
        <>
          <MovieGrid movies={movies} />
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onChangePage={handlePageChange}
            />
          )}
        </>
      )}
    </main>
  );
}
