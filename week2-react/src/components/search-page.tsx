import { useState } from "react";
import { spiderManSearchResults } from "../data/search-movies";
import type { SearchMovie } from "../data/search-movies";
import "./search-page.css";

interface SearchPageProps {
  onSelectMovie?: (movie: SearchMovie) => void;
}

export default function SearchPage({ onSelectMovie }: SearchPageProps) {
  const [keyword, setKeyword] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState<string | null>(null);

  const results = submittedKeyword
    ? spiderManSearchResults.filter((movie) =>
        `${movie.title} ${movie.originalTitle}`
          .toLowerCase()
          .includes(submittedKeyword.toLowerCase()),
      )
    : [];

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = keyword.trim();
    if (trimmed.length === 0) return;
    setSubmittedKeyword(trimmed);
  }

  function handleClear() {
    setKeyword("");
  }

  function handleSelect(movie: SearchMovie) {
    // TODO: 검색 결과의 상세 화면 연동은 이후 주차에서 이어가요.
    if (onSelectMovie) {
      onSelectMovie(movie);
    } else {
      console.log("상세 보기:", movie.title);
    }
  }

  if (submittedKeyword === null) {
    return (
      <section className="search-page">
        <h1 className="search-page__title">어떤 영화를 찾고 있나요?</h1>

        <form className="search-page__form" onSubmit={handleSubmit}>
          <svg
            className="search-page__icon"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="m16.5 16.5 4.5 4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <input
            className="search-page__input"
            type="text"
            placeholder="예: 스파이더맨"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            aria-label="영화 제목 검색"
          />

          <button type="submit" className="search-page__button">
            검색
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="search-results">
      <h1 className="search-results__title">영화 검색</h1>

      <form className="search-results__bar" onSubmit={handleSubmit}>
        <svg
          className="search-results__bar-icon"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          aria-hidden="true"
        >
          <circle
            cx="11"
            cy="11"
            r="7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="m16.5 16.5 4.5 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <input
          className="search-results__bar-input"
          type="text"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          aria-label="영화 제목 검색"
        />

        {keyword.length > 0 && (
          <button
            type="button"
            className="search-results__clear"
            aria-label="검색어 지우기"
            onClick={handleClear}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="m6 6 12 12M18 6 6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}

        <button type="submit" className="search-results__submit">
          다시 검색
        </button>
      </form>

      <div className="search-results__summary">
        <p className="search-results__keyword">
          '{submittedKeyword}' 검색 결과
        </p>
        <p className="search-results__count">
          영화 {results.length}편 · 1페이지
        </p>
      </div>

      {results.length === 0 ? (
        <p className="search-results__empty">검색 결과가 없어요.</p>
      ) : (
        <ul className="search-results__grid">
          {results.map((movie) => (
            <li key={movie.id} className="search-result-card">
              <img
                className="search-result-card__poster"
                src={movie.posterUrl}
                alt={`${movie.title} 포스터`}
              />
              <div className="search-result-card__info">
                <h2 className="search-result-card__title">{movie.title}</h2>
                <p className="search-result-card__meta">
                  <span>{movie.originalTitle}</span>
                  <span className="search-result-card__meta-dot" aria-hidden="true">
                    ·
                  </span>
                  <span>{movie.releaseDate}</span>
                </p>
                <p className="search-result-card__synopsis">{movie.synopsis}</p>
                <button
                  type="button"
                  className="search-result-card__link"
                  onClick={() => handleSelect(movie)}
                >
                  상세 보기 →
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
