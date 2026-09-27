import React from 'react'

type Page =
  | 'movies'
  | 'search'
  | 'search-results'
  | 'movie-detail'
  | 'login'
  | 'signup'
  | 'mypage'
  | 'mypage-edit'

interface HeaderProps {
  currentPage?: Page
  onNavigate?: (page: Page) => void
  user?: { email: string; nickname: string } | null
}

export default function Header({
  currentPage = 'movies',
  onNavigate,
  user,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <button
            type="button"
            className="brand"
            onClick={() => onNavigate?.('movies')}
            aria-label="UMCine 영화 목록으로 이동"
          >
            <img
              src="/icons/span.mark.svg"
              alt=""
              className="brand-mark"
            />

            <img
              src="/icons/UMCine.svg"
              alt="UMCine"
              className="brand-word"
            />
          </button>

          <nav className="main-nav" aria-label="주요 메뉴">
            <button
              type="button"
              className={`nav-item ${
                currentPage === 'movies' ? 'active' : ''
              }`}
              onClick={() => onNavigate?.('movies')}
            >
              영화
            </button>

            <button
              type="button"
              className={`nav-item ${
                currentPage === 'search' ||
                currentPage === 'search-results'
                  ? 'active'
                  : ''
              }`}
              onClick={() => onNavigate?.('search')}
            >
              검색
            </button>

            <button
              type="button"
              className={`nav-item ${
                currentPage === 'mypage' ||
                currentPage === 'mypage-edit'
                  ? 'active'
                  : ''
              }`}
              onClick={() => onNavigate?.('mypage')}
            >
              내 정보
            </button>
          </nav>
        </div>

        <div className="header-right">
          <button
            type="button"
            className="icon-btn"
            aria-label="영화 검색"
            onClick={() => onNavigate?.('search')}
          >
            <img src="/icons/search.svg" alt="" />
          </button>

          <button
            type="button"
            className="login-btn"
            onClick={() => onNavigate?.(user ? 'mypage' : 'login')}
          >
            {user ? '마이페이지' : '로그인'}
          </button>
        </div>
      </div>
    </header>
  )
}