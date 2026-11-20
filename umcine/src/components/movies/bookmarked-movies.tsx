import { Link } from "@tanstack/react-router";
import { isHTTPError } from "ky";
import { useEffect, useState } from "react";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { useBookmarkStore } from "../../stores/bookmark-store";
import { MovieGrid } from "./movie-grid";
import { Pagination } from "./pagination";

const PAGE_SIZE = 10;

export function BookmarkedMovies() {
  const movieIds = useBookmarkStore((state) => state.bookmarkedMovieIds);
  const removeBookmark = useBookmarkStore((state) => state.removeBookmark);
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [unavailableMovieIds, setUnavailableMovieIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const totalPages = Math.max(1, Math.ceil(movieIds.length / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
      return;
    }

    let ignore = false;

    async function loadBookmarks() {
      setMovies([]);
      setUnavailableMovieIds([]);
      setErrorMessage(null);

      if (movieIds.length === 0) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        // 즐겨찾기가 없으면 TMDB 설정 없이도 기본 정보를 볼 수 있어요.
        const { getMovieDetail } = await import("../../api/movies/get-movie-detail");
        const start = (currentPage - 1) * PAGE_SIZE;
        const pageMovieIds = movieIds.slice(start, start + PAGE_SIZE);
        const results = await Promise.allSettled(
          pageMovieIds.map(getMovieDetail),
        );

        if (ignore) return;

        const loadedMovies: TmdbMovieListItem[] = [];
        const unavailableIds: number[] = [];
        let hasRetryableFailure = false;

        results.forEach((result, index) => {
          if (result.status === "fulfilled") {
            loadedMovies.push({
              ...result.value,
              genre_ids: result.value.genres.map((genre) => genre.id),
            });
          } else if (isHTTPError(result.reason) && result.reason.response.status === 404) {
            // 존재하지 않는 영화는 재시도 안내 대신 개별 정리를 제공해요.
            unavailableIds.push(pageMovieIds[index]);
          } else {
            hasRetryableFailure = true;
          }
        });

        setMovies(loadedMovies);
        setUnavailableMovieIds(unavailableIds);
        if (hasRetryableFailure) {
          setErrorMessage(
            loadedMovies.length > 0
              ? "일부 즐겨찾기 영화를 불러오지 못했어요. 다시 시도해 주세요."
              : "즐겨찾기 영화를 불러오지 못했어요. 다시 시도해 주세요.",
          );
        }
      } catch {
        if (!ignore) {
          setErrorMessage("즐겨찾기 영화를 불러오지 못했어요. 다시 시도해 주세요.");
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadBookmarks();

    return () => {
      ignore = true;
    };
  }, [movieIds, currentPage, totalPages, retryCount]);

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

  return (
    <div aria-busy={isLoading}>
      {isLoading ? (
        <p role="status" className="py-16 text-center text-sm text-[#606774]">
          즐겨찾기 영화를 불러오는 중이에요.
        </p>
      ) : (
        <>
          {errorMessage && (
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3 py-6">
              <p role="alert" className="text-sm text-[#606774]">{errorMessage}</p>
              <button
                type="button"
                onClick={() => setRetryCount((prev) => prev + 1)}
                className="text-sm font-bold text-[#2563eb] hover:underline"
              >
                다시 시도
              </button>
            </div>
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
                    onClick={() => removeBookmark(movieId)}
                    aria-label={`영화 ${movieId} 즐겨찾기에서 제거`}
                    className="rounded-md px-2 py-1 text-sm font-bold text-[#2563eb] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
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

      <Pagination
        currentPage={Math.min(currentPage, totalPages)}
        totalPages={totalPages}
        onChangePage={setCurrentPage}
      />
    </div>
  );
}
