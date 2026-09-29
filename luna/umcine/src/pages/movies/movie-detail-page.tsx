import React, { useState } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { movies } from '../../data/movies'
import type { Movie } from '../../types/movie'
import { cn } from '../../utils/cn'

interface Props {
  movie: Movie
  onBack: () => void
  onToggleBookmark: (id: number) => void
}

export default function MovieDetailPage() {
  const { movieId } = useParams({ from: '/movies/$movieId' })
  const navigate = useNavigate()
  const movie = movies.find((movie) => movie.id === Number(movieId))

  if (!movie) return <main className="mx-auto w-full max-w-[1200px] px-5 py-7">영화를 찾을 수 없어요.</main>

  return (
    <main>
      <MovieDetailView
        key={movie.id}
        movie={movie}
        onBack={() => void navigate({ to: '/' })}
        onToggleBookmark={() => undefined}
      />
    </main>
  )
}

export function MovieDetailView({
  movie,
  onBack,
  onToggleBookmark = () => undefined,
}: Props) {
  const [rating, setRating] = useState<number>(0)

  return (
    <section className="mx-auto w-full max-w-[1440px]">
      <div className="relative h-[360px] w-full">
        <img src={movie.backdropPath} alt={movie.title} className="h-[360px] w-full object-cover object-center saturate-[0.95]" />
        <button className="absolute top-7 left-5 rounded-none border-0 bg-transparent p-0 font-[Arial] text-[14px] font-semibold leading-[normal] text-white min-[1024px]:left-20" onClick={onBack}>&lt; 영화 목록</button>
        <div className="absolute bottom-7 left-5 max-w-[calc(100%-40px)] text-white min-[1024px]:left-20 min-[1024px]:max-w-[60%]">
          <h2 className="m-0 text-[28px] leading-none font-extrabold min-[640px]:text-[36px]">{movie.title}</h2>
          <div>
            {movie.originalTitle}
          </div>

          <div>
            {movie.releaseDate}
            {'  '}
            {movie.genres.join(' · ')}
            {'  '}
            {movie.runtime}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-8 px-5 pt-5 pb-8 min-[640px]:grid-cols-[210px_minmax(0,1fr)] min-[1024px]:px-20 min-[1200px]:grid-cols-[210px_minmax(0,1fr)_320px]">
        <aside>
          <img className="aspect-[2/3] w-[210px] max-w-full rounded-lg object-cover" src={movie.posterPath} alt={movie.title} />
        </aside>

        <div className="min-w-0">
          <h2 className="mt-0 mb-[14px] text-[20px] leading-[1.4] font-bold text-[#17191e]">{movie.tagline}</h2>
          <p className="m-0 text-[14px] leading-[1.8] text-[#667085]">{movie.overview}</p>
          <button
            className="static mt-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-[6px] border-0 bg-[#2563eb] px-4 py-[10px] font-[Arial] text-[14px] font-bold leading-[normal] text-white"
            aria-pressed={movie.isBookmarked}
            onClick={() => onToggleBookmark(movie.id)}
          >
            <img
              className="size-[18px] brightness-0 invert"
              src={movie.isBookmarked ? '/icons/bookmark.svg' : '/icons/bookmark-outline.svg'}
              alt=""
            />
            즐겨찾기
          </button>
        </div>

        <aside className="w-full border-t border-[#e5e7eb] pt-8 min-[640px]:col-span-2 min-[1200px]:col-span-1 min-[1200px]:w-80 min-[1200px]:border-t-0 min-[1200px]:border-l min-[1200px]:pt-0 min-[1200px]:pl-8">
          <div>
            <div>내 평점</div>
            <div className="mt-2 mb-[10px] text-[12px] text-[#98a2b3]">별점은 필수, 후기는 선택이에요.</div>
            <div className="mb-[10px] flex gap-[6px]">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} className="flex size-[34px] items-center justify-center rounded-[7px] border border-[#e5e7eb] bg-white p-0" aria-pressed={rating >= n} onClick={() => setRating(n)}>
                  <img className={cn('size-5', rating >= n && 'filter-none')} src={rating >= n ? '/icons/star.svg' : '/icons/star-outline.svg'} alt={`star-${n}`} />
                </button>
              ))}
            </div>
            <textarea className="mt-[10px] inline-block h-[88px] w-full resize-none rounded-lg border border-[#e5e7eb] bg-white p-3 align-baseline text-[13.3333px] text-black [font-family:inherit] placeholder:text-[#757575]" placeholder="영화를 보고 느낀 점을 남겨보세요." />
            <button className="mt-[10px] w-full rounded-[7px] border-0 bg-[#17191e] p-[11px] font-[Arial] text-[13.3333px] font-bold leading-[normal] text-white">평점 저장</button>
          </div>
        </aside>
      </div>
    </section>
  )
}
