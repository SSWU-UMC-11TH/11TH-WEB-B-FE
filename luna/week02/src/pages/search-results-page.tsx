import React, { useState } from 'react'
import type { Movie } from '../types/movie'

interface Props {
  movies: Movie[]
  query: string
  onSelectMovie: (id: number) => void
}

export default function SearchResultsPage({
  movies,
  query,
  onSelectMovie,
}: Props) {
  const [q, setQ] = useState(query)
  const [searchQuery, setSearchQuery] = useState(query)

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const results = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : []

  const handleSearch = () => {
    setSearchQuery(q.trim())
  }

  const handleClear = () => {
    setQ('')
    setSearchQuery('')
  }

  return (
    <section className="container search-results">
      <div className="search-header">
        <h2>영화 검색</h2>
      </div>

      <div className="search-top">
        <div className="search-toolbar">
          <div className="toolbar-input input-wrap">
            <img src="/icons/search.svg" alt="" />

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              placeholder="검색어를 입력하세요"
            />

            <button
              type="button"
              className="icon-btn clear-btn"
              onClick={handleClear}
              aria-label="검색어 지우기"
            >
              <img src="/icons/close.svg" alt="" />
            </button>

            <button
              type="button"
              className="primary search-black"
              onClick={handleSearch}
            >
              다시 검색
            </button>
          </div>
        </div>

        <div className="search-summary">
          <strong>'{searchQuery}' 검색 결과</strong>
          <span>영화 {results.length}편 · 1페이지</span>
        </div>
      </div>

      <div className="results-grid">
        {results.map((movie) => (
          <div
            key={movie.id}
            className="result-item"
            onClick={() => onSelectMovie(movie.id)}
          >
            <img
              className="result-poster"
              src={movie.posterPath}
              alt={movie.title}
            />

            <div className="result-body">
              <div className="result-title">{movie.title}</div>

              <div className="result-sub">
                {movie.originalTitle} · {movie.releaseDate}
              </div>

              <p className="result-overview">{movie.overview}</p>

              <button
                type="button"
                className="result-detail-link"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectMovie(movie.id)
                }}
              >
                상세 보기
                <img src="/icons/arrow-right.svg" alt="" />
              </button>
            </div>
          </div>
        ))}

        {results.length === 0 && (
          <div className="no-movies">검색 결과가 없습니다.</div>
        )}
      </div>
    </section>
  )
}