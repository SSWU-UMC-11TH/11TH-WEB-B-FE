import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from '@tanstack/react-router'
import { movieDetailQueryOptions } from '../../api/movies/query-options'
import FavoriteButton from '../../components/movies/favorite-button'
import MovieImage from '../../components/movies/movie-image'
import MovieRating from '../../components/movies/movie-rating'
import RequestStatus from '../../components/movies/request-status'
import type { MovieDetail as Movie } from '../../api/movies/models'
import { getMovieErrorMessage } from '../../utils/movie-error-message'

interface Props {
  movie: Movie
}

export default function MovieDetailPage() {
  const { movieId: movieIdParam } = useParams({ from: '/movies/$movieId' })
  const movieId = Number(movieIdParam)
  const isValid = Number.isInteger(movieId) && movieId > 0
  const movieDetailQuery = useQuery(movieDetailQueryOptions(movieId))

  if (!isValid) {
    return <main><RequestStatus error="잘못된 영화 ID입니다. 양의 정수를 입력해 주세요." /></main>
  }

  if (movieDetailQuery.isError) {
    return <main><RequestStatus error={getMovieErrorMessage(movieDetailQuery.error, '영화 상세 정보를 불러오지 못했습니다.')} /></main>
  }

  if (movieDetailQuery.isPending) {
    return <main><RequestStatus /></main>
  }

  return (
    <main>
      <MovieDetailView key={movieDetailQuery.data.id} movie={movieDetailQuery.data} />
    </main>
  )
}

export function MovieDetailView({ movie }: Props) {
  return (
    <section className="mx-auto w-full max-w-[1440px]">
      <div className="relative h-[360px] w-full">
        <MovieImage backdrop path={movie.backdrop_path} alt={movie.title} className="h-[360px] w-full object-cover object-center saturate-[0.95]" />
        <Link
          to="/"
          className="absolute top-7 left-5 rounded-none border-0 bg-transparent p-0 font-[Arial] text-[14px] font-semibold leading-[normal] text-white no-underline min-[1024px]:left-20"
        >
          &lt; 영화 목록
        </Link>
        <div className="absolute bottom-7 left-5 max-w-[calc(100%-40px)] text-white min-[1024px]:left-20 min-[1024px]:max-w-[60%]">
          <h2 className="m-0 text-[28px] leading-none font-extrabold min-[640px]:text-[36px]">{movie.title}</h2>
          <div>
            {movie.original_title}
          </div>

          <div>
            {movie.release_date}
            {'  '}
            {movie.genres.map((genre) => genre.name).join(' · ')}
            {'  '}
            {movie.runtime ? `${movie.runtime}분` : '상영 시간 정보 없음'}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-8 px-5 pt-5 pb-8 min-[640px]:grid-cols-[210px_minmax(0,1fr)] min-[1024px]:px-20 min-[1200px]:grid-cols-[210px_minmax(0,1fr)_320px]">
        <aside>
          <MovieImage className="aspect-[2/3] w-[210px] max-w-full rounded-lg object-cover" path={movie.poster_path} alt={movie.title} />
        </aside>

        <div className="min-w-0">
          <h2 className="mt-0 mb-[14px] text-[20px] leading-[1.4] font-bold text-[#17191e]">{movie.tagline}</h2>
          <p className="m-0 text-[14px] leading-[1.8] text-[#667085]">{movie.overview}</p>
          <FavoriteButton movieId={movie.id} />
        </div>

        <aside className="w-full border-t border-[#e5e7eb] pt-8 min-[640px]:col-span-2 min-[1200px]:col-span-1 min-[1200px]:w-80 min-[1200px]:border-t-0 min-[1200px]:border-l min-[1200px]:pt-0 min-[1200px]:pl-8">
          <MovieRating movieId={movie.id} />
        </aside>
      </div>
    </section>
  )
}
