import { queryOptions } from "@tanstack/react-query";
import { getMovieDetail } from "./get-movie-detail";
import { getMovies } from "./get-movies";
import { searchMovies } from "./search-movies";

const THIRTY_SECONDS = 30 * 1000;

// 영화 query의 key와 요청 함수를 한곳에 모아요.
// 화면에서는 movieQueries.list(page)처럼 불러 쓰고, 요청 여부(enabled)만 화면에서 정해요.
export const movieQueries = {
  all: () => ["movies"] as const,

  list: (page: number) =>
    queryOptions({
      queryKey: [...movieQueries.all(), "list", { page }],
      queryFn: () => getMovies({ page }),
    }),

  search: (query: string) =>
    queryOptions({
      queryKey: [...movieQueries.all(), "search", { query }],
      queryFn: () => searchMovies({ query }),
    }),

  detail: (movieId: number) =>
    queryOptions({
      queryKey: [...movieQueries.all(), "detail", movieId],
      queryFn: () => getMovieDetail(movieId),
      // 전역 기본값(1분) 대신 30초가 지나면 stale로 바꿔요.
      staleTime: THIRTY_SECONDS,
    }),
};
