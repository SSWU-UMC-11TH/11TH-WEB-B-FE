import React, { useState } from 'react'

interface Props {
  onSearch: (q: string) => void
}

export default function SearchPage({ onSearch }: Props) {
  const [q, setQ] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    onSearch(q)
  }

  return (
    <section className="search-page">
      <div className="search-box">
        <h1>어떤 영화를 찾고 있나요?</h1>
        <form onSubmit={submit} className="search-form">
          <div className="input-wrap">
            <img src="/icons/search.svg" alt="search" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="예: 스파이더맨" />
          </div>
          <button className="primary" type="submit">검색</button>
        </form>
      </div>
    </section>
  )
}
