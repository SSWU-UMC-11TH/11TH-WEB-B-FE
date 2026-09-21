import React from 'react'
import type { Movie } from '../types/movie'

interface Props {
  movies: Movie[]
  query: string
  onSelectMovie: (id: number) => void
}

export default function SearchResultsPage({ movies, query, onSelectMovie }: Props) {
  const q = query.trim().toLowerCase()
  const results = q ? movies.filter(m => m.title.toLowerCase().includes(q) || m.originalTitle.toLowerCase().includes(q)) : []

  return (
    <section className="container search-results">
      <div className="search-header">
        <h2>영화 검색</h2>
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
