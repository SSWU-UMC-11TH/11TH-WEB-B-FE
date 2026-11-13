import React from 'react'
import { Link } from '@tanstack/react-router'
import { useQueries } from '@tanstack/react-query'
import { movieDetailQueryOptions } from '../../api/movies/query-options'
import MovieImage from '../../components/movies/movie-image'
import { useBookmarkStore } from '../../stores/bookmark-store'
import { useUserProfileStore } from '../../stores/user-profile-store'

export default function MyPage() {
  const { nickname, email } = useUserProfileStore()
  const bookmarkedMovieIds = useBookmarkStore((state) => state.bookmarkedMovieIds)

  const [page, setPage] = React.useState(1)
  const totalPages = Math.max(1, Math.ceil(bookmarkedMovieIds.length / 5))
  const currentPage = Math.min(page, totalPages)
  const visibleIds = bookmarkedMovieIds.slice((currentPage - 1) * 5, currentPage * 5)
  const movieQueries = useQueries({ queries: visibleIds.map(movieDetailQueryOptions) })

  return (
    <main className="account-page profile-page">
      <section className="profile-layout">
        <div className="profile-heading">
          <h1 className="text-[40px] font-bold tracking-[-0.03em] text-[#111827]">내 정보</h1>
          <Link
            to="/mypage/edit"
            className="inline-flex h-11 items-center justify-center rounded-[10px] bg-[#2563eb] px-5 text-[14px] font-semibold text-white no-underline transition hover:bg-[#1d4ed8]"
          >
            정보 수정
          </Link>
        </div>

        <div className="pt-8">
          <div className="mb-8">
            <p className="mb-5 text-[16px] font-semibold text-[#111827]">기본 정보</p>

            <div className="flex items-center gap-6 border-t border-[#e5e7eb] pt-6">
              <div className="flex size-[64px] items-center justify-center rounded-full bg-[#dfe4ea] text-[26px] font-bold text-[#374151]">
                <img src="/icons/person.svg" alt="" className="profile-person" />
              </div>

              <div className="grid w-full max-w-[520px] grid-cols-[140px_1fr] items-center gap-y-4 text-[16px]">
                <span className="text-[#6b7280]">닉네임</span>
                <span className="font-semibold text-[#111827]">{nickname}</span>

                <span className="text-[#6b7280]">이메일</span>
                <span className="font-semibold text-[#111827]">{email}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-5 text-[16px] font-semibold text-[#111827]">내 즐겨찾기</p>

            {bookmarkedMovieIds.length === 0 ? (
              <div className="flex min-h-[220px] items-center justify-center rounded-[16px] border border-dashed border-[#dfe4ea] bg-white text-center text-[15px] text-[#6b7280]">
                아직 즐겨찾기한 영화가 없어요.
              </div>
            ) : (
              <>
                <div className="favorite-grid">
                  {movieQueries.map((query, index) => (
                    <article key={visibleIds[index]}>
                      {query.data ? (
                        <Link to="/movies/$movieId" params={{ movieId: String(query.data.id) }} className="text-inherit no-underline">
                          <MovieImage path={query.data.poster_path} alt={query.data.title} className="block" />
                          <h3>{query.data.title}</h3>
                          <p>{query.data.release_date?.replaceAll('-', '.')}</p>
                        </Link>
                      ) : (
                        <div className="flex h-[274px] items-center justify-center rounded-[10px] bg-[#e3e5e9] text-sm" role="status">
                          {query.isError ? <button onClick={() => void query.refetch()}>다시 불러오기</button> : '불러오는 중…'}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
                <nav className="favorites-pagination" aria-label="즐겨찾기 페이지">
                  <button aria-label="이전 페이지" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}><img src="/icons/chevron-left.svg" alt="" /></button>
                  <button aria-current="page">{currentPage}</button>
                  <button aria-label="다음 페이지" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}><img src="/icons/chevron-right.svg" alt="" /></button>
                </nav>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
