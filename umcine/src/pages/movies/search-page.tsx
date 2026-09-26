import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { allMovies } from "../../data/movies";
import { SearchIcon, CloseIcon, ArrowRightIcon } from "../../components/icons";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const searchResults = normalizedQuery
    ? allMovies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  // 검색어가 없을 때는 입력창만 크게 보여 줘요.
  if (!normalizedQuery) {
    return (
      <main className="flex flex-col items-center px-6 pt-20 text-center md:pt-[140px]">
        <h1 className="mb-9 text-[32px] font-bold tracking-[-1.2px] text-[#17191e] md:text-[46px] md:leading-[52.44px] md:tracking-[-2.3px]">
          어떤 영화를 찾고 있나요?
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex h-[74px] w-full max-w-[790px] items-center gap-3.5 rounded-xl border-2 border-[#17191e] bg-white pl-[21px] pr-[17px] shadow-[0_12px_34px_0_rgba(17,19,24,0.08)]"
        >
          <SearchIcon className="shrink-0 text-[#969da8]" width={20} height={20} />
          <input
            className="h-full flex-1 border-none bg-transparent text-base text-[#17191e] outline-none placeholder:text-[#b0b6bf]"
            aria-label="검색어"
            placeholder="예: 스파이더맨"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button
            type="submit"
            className="h-[46px] shrink-0 rounded-lg bg-[#17191e] px-6 text-sm font-bold text-white transition-colors hover:bg-[#303540]"
          >
            검색
          </button>
        </form>

        <p className="mt-6 text-sm text-[#969da8]">검색어를 입력해 주세요.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-10 pt-8 md:px-20">
      <h1 className="mb-6 text-[28px] font-bold tracking-[-1px] text-[#17191e]">
        영화 검색
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex h-14 w-full items-center gap-3 rounded-xl border border-[#e3e6eb] bg-white px-4 focus-within:border-[#17191e]"
      >
        <SearchIcon className="shrink-0 text-[#969da8]" width={18} height={18} />
        <input
          className="h-full flex-1 border-none bg-transparent text-[15px] text-[#17191e] outline-none"
          aria-label="검색어"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        {searchText.length > 0 && (
          <button
            type="button"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[#969da8] hover:bg-[#f1f3f5]"
            aria-label="검색어 지우기"
            onClick={() => setSearchText("")}
          >
            <CloseIcon width={16} height={16} />
          </button>
        )}
        <button
          type="submit"
          className="h-9 shrink-0 rounded-lg bg-[#17191e] px-4 text-sm font-bold text-white transition-colors hover:bg-[#303540]"
        >
          다시 검색
        </button>
      </form>

      <div className="mb-6 mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-xl font-bold text-[#17191e]">
          ‘{query}’ 검색 결과
        </h2>
        <p className="text-sm text-[#969da8]">영화 {searchResults.length}편</p>
      </div>

      {searchResults.length === 0 ? (
        <p className="py-16 text-center text-[#8b929c]">검색 결과가 없어요.</p>
      ) : (
        <ul className="grid list-none grid-cols-1 gap-x-10 gap-y-6 p-0 lg:grid-cols-2">
          {searchResults.map((movie) => (
            <li
              key={movie.id}
              className="flex gap-4 border-b border-[#ebedf0] pb-6 last:border-b-0 last:pb-0"
            >
              <img
                className="h-[190px] w-[126px] shrink-0 rounded-lg bg-[#e9ecef] object-cover"
                src={movie.posterPath}
                alt={`${movie.title} 포스터`}
              />

              <div className="flex min-w-0 flex-col gap-1.5">
                <h3 className="text-lg font-bold text-[#17191e]">{movie.title}</h3>
                <p className="flex items-center gap-1.5 text-[13px] text-[#969da8]">
                  <span className="truncate">{movie.originalTitle}</span>
                  <span className="text-[#c9ced6]" aria-hidden="true">·</span>
                  <span className="shrink-0">{movie.releaseDate}</span>
                </p>
                <p className="mb-0.5 mt-1 line-clamp-2 text-sm leading-relaxed text-[#606774]">
                  {movie.overview}
                </p>
                <Link
                  to="/movies/$movieId"
                  params={{ movieId: String(movie.id) }}
                  className="mt-1 flex items-center gap-1 self-start text-xs font-extrabold leading-none text-[#2563eb] hover:underline"
                >
                  상세 보기
                  <ArrowRightIcon width={14} height={14} />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
