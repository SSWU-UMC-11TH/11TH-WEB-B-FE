import { useState } from "react";
import "./search-page.css";

interface SearchPageProps {
  onSearch: (keyword: string) => void;
}

export default function SearchPage({ onSearch }: SearchPageProps) {
  const [keyword, setKeyword] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSearch(keyword.trim());
  }

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
