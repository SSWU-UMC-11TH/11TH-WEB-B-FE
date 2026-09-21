import React from 'react'
import type { Movie } from '../types/movie'

interface Props {
  movies: Movie[]
  query: string
  onSelectMovie: (id: number) => void
}

import { useState } from 'react'

export default function SearchResultsPage({ movies, query, onSelectMovie }: Props) {
  const [q, setQ] = useState(query)
  const qTrim = q.trim().toLowerCase()
  const results = qTrim ? movies.filter(m => m.title.toLowerCase().includes(qTrim) || m.originalTitle.toLowerCase().includes(qTrim)) : []

  return (
    <section className="container search-results">
      <div className="search-header">
        <h2>영화 검색</h2>
      </div>

      <div className="search-top">
        <div className="search-toolbar">
          <div className="input-wrap toolbar-input">
            <img src="/icons/search.svg" alt="search" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={query || '검색어를 입력하세요'} />
            <button className="icon-btn clear-btn" onClick={() => setQ('')} aria-label="clear">
              <img src="/icons/close.svg" alt="close" />
            </button>
            <button className="primary search-black" onClick={() => { /* explicit search */ }}>다시 검색</button>
          </div>
        </div>
        <div className="search-meta">'{query}' 검색 결과 · {results.length}편</div>
      </div>

      <div className="results-grid">
        {results.map(r => (
          <div key={r.id} className="result-item" onClick={() => onSelectMovie(r.id)}>
            <img className="result-poster" src={r.posterPath} alt={r.title} />
            <div className="result-body">
              <div className="result-title">{r.title}</div>
              <div className="result-sub">{r.originalTitle} · {r.releaseDate}</div>
              <p className="result-overview">{r.overview}</p>
            </div>
            <img src="/icons/arrow-right.svg" alt="go" className="result-arrow" />
          </div>
        ))}
        {results.length === 0 && <div className="no-movies">검색 결과가 없습니다.</div>}
      </div>
    </section>
  )
}
