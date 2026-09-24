import React, { useState } from 'react'
import type { Movie } from '../types/movie'
import MovieCard from '../components/movie-card'

interface Props {
  user: { email: string; nickname: string } | null
  movies: Movie[]
  onEdit: () => void
  onSelectMovie: (id: number) => void
  onToggleBookmark: (id: number) => void
}

export default function MyPage({
  user,
  movies,
  onEdit,
  onSelectMovie,
  onToggleBookmark,
}: Props) {
  const bookmarks = movies.filter((movie) => movie.isBookmarked)

  const [page, setPage] = useState(1)

  const pageCount = Math.max(1, Math.ceil(bookmarks.length / 3))
  const currentPage = Math.min(page, pageCount)

  const currentBookmarks = bookmarks.slice(
    (currentPage - 1) * 3,
    currentPage * 3,
  )

  return (
    <section className="container my-page">
      <div className="my-header">
        <h2>내 정보</h2>

        <button
          type="button"
          className="edit-profile-btn"
          onClick={onEdit}
        >
          정보 수정
        </button>
      </div>

      <div className="divider" />

      <h3>기본 정보</h3>

      <div className="profile-row">
        <div className="avatar">
          <img src="/icons/person.svg" alt="프로필" />
        </div>

        <div className="info-block">
          <span className="label">닉네임</span>
          <div className="value">{user?.nickname ?? ''}</div>
        </div>

        <div className="info-block">
          <span className="label">이메일</span>
          <div className="value">{user?.email ?? ''}</div>
        </div>
      </div>

      <div className="divider" />

      <h3>내 즐겨찾기</h3>

      <div className="favorites">
        {currentBookmarks.length > 0 ? (
          currentBookmarks.map((movie) => (
            <div className="favorite-card" key={movie.id}>
              <MovieCard
                movie={movie}
                onToggleBookmark={onToggleBookmark}
                onSelect={() => onSelectMovie(movie.id)}
              />
            </div>
          ))
        ) : (
          <div>즐겨찾기가 없습니다.</div>
        )}
      </div>

      <nav
        className="favorites-pagination"
        aria-label="즐겨찾기 페이지"
      >
        <button
          type="button"
          aria-label="이전 페이지"
          disabled={currentPage === 1}
          onClick={() => setPage(currentPage - 1)}
        >
          &lt;
        </button>

        {Array.from({ length: pageCount }, (_, index) => index + 1).map(
          (number) => (
            <button
              type="button"
              key={number}
              aria-current={number === currentPage ? 'page' : undefined}
              onClick={() => setPage(number)}
            >
              {number}
            </button>
          ),
        )}

        <button
          type="button"
          aria-label="다음 페이지"
          disabled={currentPage === pageCount}
          onClick={() => setPage(currentPage + 1)}
        >
          &gt;
        </button>
      </nav>
    </section>
  )
}