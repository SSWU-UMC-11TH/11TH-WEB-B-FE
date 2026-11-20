import { useQueries, useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { isHTTPError } from "ky";
import { useState } from "react";
import { favoriteQueries } from "../../api/favorites/favorite-queries";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { movieQueries } from "../../api/movies/movie-queries";
import { useToggleFavoriteMutation } from "../../hooks/use-toggle-favorite-mutation";
import { MovieGrid } from "./movie-grid";
import { Pagination } from "./pagination";

const PAGE_SIZE = 10;

export function BookmarkedMovies() {
  // 즐겨찾기한 영화 번호는 서버(GET /favorites)에서 가져와요.
  const favoriteListQuery = useQuery(favoriteQueries.list());
  const toggleFavoriteMutation = useToggleFavoriteMutation();
  const [currentPage, setCurrentPage] = useState(1);

  const movieIds = favoriteListQuery.data?.map((favorite) => favorite.movieId) ?? [];
  const totalPages = Math.max(1, Math.ceil(movieIds.length / PAGE_SIZE));
  // 마지막 페이지의 영화를 모두 해제하면 앞 페이지를 보여 줘요.
  const page = Math.min(currentPage, totalPages);
  const start = (page - 1) * PAGE_SIZE;
  const pageMovieIds = movieIds.slice(start, start + PAGE_SIZE);

  // 영화 정보는 TMDB 상세 query를 재사용해서, 상세 화면에서 본 영화는 캐시로 바로 보여 줘요.
  const movieDetailQueries = useQueries({
    queries: pageMovieIds.map((movieId) => ({
      ...movieQueries.detail(movieId),
      // 없는 영화(404)는 다시 요청해도 결과가 같으니 재시도하지 않아요.
      retry: (failureCount: number, error: Error) =>
        !(isHTTPError(error) && error.response.status === 404) && failureCount < 3,
    })),
  });

  if (favoriteListQuery.isPending) {
    return <StatusMessage>즐겨찾기 목록을 불러오는 중이에요.</StatusMessage>;
  }

  if (favoriteListQuery.isError) {
    return (
      <RetryMessage onRetry={() => favoriteListQuery.refetch()}>
        즐겨찾기 목록을 불러오지 못했어요.
      </RetryMessage>
    );
  }

  if (movieIds.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-[#606774]">아직 즐겨찾기한 영화가 없어요.</p>
        <Link to="/" className="mt-3 inline-block text-sm font-bold text-[#2563eb] hover:underline">
          영화 둘러보기
        </Link>
      </div>
    );
  }

  const isLoadingMovies = movieDetailQueries.some((query) => query.isPending);
  const movies: TmdbMovieListItem[] = [];
  const unavailableMovieIds: number[] = [];
  let hasRetryableFailure = false;

  movieDetailQueries.forEach((query, index) => {
    if (query.data) {
      movies.push({
        ...query.data,
        genre_ids: query.data.genres.map((genre) => genre.id),
      });
    } else if (isHTTPError(query.error) && query.error.response.status === 404) {
      unavailableMovieIds.push(pageMovieIds[index]);
    } else if (query.isError) {
      hasRetryableFailure = true;
    }
  });

  function retryFailedMovies() {
    movieDetailQueries.forEach((query) => {
      if (query.isError) query.refetch();
    });
  }

  return (
    <div aria-busy={isLoadingMovies}>
      {isLoadingMovies ? (
        <StatusMessage>즐겨찾기 영화를 불러오는 중이에요.</StatusMessage>
      ) : (
        <>
          {hasRetryableFailure && (
            <RetryMessage onRetry={retryFailedMovies}>
              {movies.length > 0
                ? "일부 즐겨찾기 영화를 불러오지 못했어요."
                : "즐겨찾기 영화를 불러오지 못했어요."}
            </RetryMessage>
          )}
          {unavailableMovieIds.length > 0 && (
            <ul
              aria-label="조회할 수 없는 즐겨찾기"
              className="mb-6 flex list-none flex-col gap-3 p-0"
            >
              {unavailableMovieIds.map((movieId) => (
                <li
                  key={movieId}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#e3e6eb] bg-white p-4"
                >
                  <div>
                    <p className="text-sm font-bold text-[#17191e]">현재 조회할 수 없는 영화예요.</p>
                    <p className="mt-1 text-xs text-[#606774]">
                      영화 번호 {movieId} · 저장한 영화의 정보를 찾을 수 없어요.
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={toggleFavoriteMutation.isPending}
                    onClick={() => toggleFavoriteMutation.mutate({ movieId, isFavorite: true })}
                    aria-label={`영화 ${movieId} 즐겨찾기에서 제거`}
                    className="rounded-md px-2 py-1 text-sm font-bold text-[#2563eb] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    즐겨찾기에서 제거
                  </button>
                </li>
              ))}
            </ul>
          )}
          {movies.length > 0 && <MovieGrid movies={movies} />}
        </>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onChangePage={setCurrentPage} />
    </div>
  );
}

function StatusMessage({ children }: { children: string }) {
  return (
    <p role="status" className="py-16 text-center text-sm text-[#606774]">
      {children}
    </p>
  );
}

function RetryMessage({ children, onRetry }: { children: string; onRetry: () => void }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-3 py-6">
      <p role="alert" className="text-sm text-[#606774]">
        {children} 다시 시도해 주세요.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="text-sm font-bold text-[#2563eb] hover:underline"
      >
        다시 시도
      </button>
    </div>
  );
}
