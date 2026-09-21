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
    onNavigate?: (p: Page) => void
}

export default function Header({ currentPage = 'movies', onNavigate }: HeaderProps) {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-left">
                    <div className="logo" onClick={() => onNavigate?.('movies')}>
                        <img src="/icons/movie.svg" alt="movie" />
                        <span>UMCine</span>
                    </div>

                    <nav className="main-nav">
                        <button className={`nav-item ${currentPage === 'movies' ? 'active' : ''}`} onClick={() => onNavigate?.('movies')}>
                            영화
                        </button>
                        <button className={`nav-item ${currentPage === 'search' ? 'active' : ''}`} onClick={() => onNavigate?.('search')}>
                            검색
                        </button>
                        <button className={`nav-item ${currentPage === 'mypage' ? 'active' : ''}`} onClick={() => onNavigate?.('mypage')}>
                            내 정보
                        </button>
                    </nav>
                </div>

                <div className="header-right">
                    <button className="icon-btn" aria-label="검색" onClick={() => onNavigate?.('search')}>
                        <img src="/icons/search.svg" alt="search" />
                    </button>
                    <button className="login-btn" onClick={() => onNavigate?.('login')}>로그인</button>
                </div>
            </div>
        </header>
    )
}
