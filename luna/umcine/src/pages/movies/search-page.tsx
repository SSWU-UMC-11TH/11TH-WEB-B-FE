import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { movies } from '../../data/movies'
import { useBookmarkStore } from '../../stores/bookmark-store'

export default function SearchPage() {
  const { query } = useSearch({ from: '/search' })
  const navigate = useNavigate({ from: '/search' })
  const [q, setQ] = useState(query ?? '')
  const bookmarkedMovieIds = useBookmarkStore((state) => state.bookmarkedMovieIds)
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark)

  useEffect(() => {
    setQ(query ?? '')
  }, [query])

  const normalizedQuery = (query ?? '').trim().toLowerCase()
  const results = normalizedQuery ? movies.filter((movie) =>
    movie.title.toLowerCase().includes(normalizedQuery) ||
    movie.originalTitle.toLowerCase().includes(normalizedQuery),
  ) : []

  function submit(event: React.FormEvent) {
    event.preventDefault()
    void navigate({ to: '/search', search: { query: q.trim() || undefined } })
  }

  return (
    <main>
      <section className="mx-auto max-w-[1200px] px-5 py-7">
        <div className="flex items-center justify-between"><h1 className="my-[0.67em] text-[32px] font-bold">영화 검색</h1></div>
        <div className="mt-3 block w-full">
          <form className="w-full flex-1" onSubmit={submit}>
            <div className="flex h-[54px] w-full items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white py-[6px] pr-[10px] pl-4 sm:gap-3">
              <img className="inline-block w-5 shrink-0" src="/icons/search.svg" alt="" />
              <input className="min-w-0 flex-1 border-0 bg-white font-[Arial] text-[16px] leading-[normal] text-black outline-none placeholder:text-[#757575]" aria-label="검색어" value={q} onChange={(event) => setQ(event.target.value)} placeholder="예: 스파이더맨" />
              <button type="button" className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#eef2f6] bg-white" aria-label="검색어 지우기" onClick={() => {
                setQ('')
                void navigate({ to: '/search', search: {} })
              }}><img className="size-[18px]" src="/icons/close.svg" alt="" /></button>
              <button type="submit" className="h-10 min-w-[64px] shrink-0 rounded-lg border-0 bg-[#17191e] px-3 py-0 font-[Arial] text-[13.3333px] font-bold leading-[normal] whitespace-nowrap text-white sm:min-w-[86px] sm:px-4">검색</button>
            </div>
          </form>
          <div className="mt-[14px] flex flex-wrap items-center justify-between gap-2 border-b border-[#e5e7eb] pb-[14px]" aria-live="polite">
            {normalizedQuery ? <><strong className="text-[16px] font-bold text-[#17191e] break-words">'{query?.trim()}' 검색 결과</strong><span className="text-[12px] text-[#98a2b3]">영화 {results.length}개</span></> : <p className="my-4">검색어를 입력해 주세요.</p>}
          </div>
        </div>
        <div className="mt-[18px] grid grid-cols-1 items-start gap-x-10 gap-y-0 min-[901px]:grid-cols-2">
          {results.map((movie) => {
            const isBookmarked = bookmarkedMovieIds.includes(movie.id)

            return (
              <div key={movie.id} className="relative flex w-full items-start gap-3 rounded-none border-0 border-b border-[#e5e7eb] bg-transparent py-5 text-inherit sm:gap-[18px]">
                <Link className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-inherit no-underline" to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
                  <img className="h-36 w-24 shrink-0 self-start rounded-lg object-cover sm:h-48 sm:w-32" src={movie.posterPath} alt={movie.title} />
                  <div className="flex min-w-0 flex-1 flex-col break-words">
                    <div className="font-bold">{movie.title}</div>
                    <div className="mt-[6px] text-[13px] text-[#6b7280]">{movie.originalTitle} · {movie.releaseDate}</div>
                    <p className="mt-2 mb-[13px] text-[13px] text-[#6b7280]">{movie.overview}</p>
                    <span className="mt-3 inline-flex cursor-pointer items-center gap-[6px] border-0 bg-transparent p-0 text-[13px] leading-none font-bold whitespace-nowrap text-[#2563eb]">상세 보기<img className="size-[14px]" src="/icons/arrow-right.svg" alt="" /></span>
                  </div>
                </Link>
                <button
                  type="button"
                  className={`absolute top-5 right-0 flex size-[34px] cursor-pointer items-center justify-center rounded-lg border px-[6px] py-[7.5px] ${isBookmarked ? 'border-[#2563eb] bg-[#2563eb]' : 'border-white bg-[rgba(23,25,30,0.8)]'}`}
                  aria-pressed={isBookmarked}
                  aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    toggleBookmark(movie.id)
                  }}
                >
                  <img className="block h-[19px] w-[22px] brightness-0 invert" src={isBookmarked ? '/icons/bookmark.svg' : '/icons/bookmark-outline.svg'} alt="bookmark" />
                </button>
              </div>
            )
          })}
          {normalizedQuery && results.length === 0 && <p className="my-4 p-10 text-center text-[#6b7280]">검색 결과가 없어요.</p>}
        </div>
      </section>
    </main>
  )
}

interface Props {
  onSearch: (q: string) => void
}

// App.tsx의 2주차 구현을 참고용으로 보존합니다. 라우터에서는 사용하지 않습니다.
export function LegacySearchPage({ onSearch }: Props) {
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
