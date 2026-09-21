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
    user?: { email: string; nickname: string } | null
}

export default function Header({ currentPage = 'movies', onNavigate, user }: HeaderProps) {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-left">
                    <div className="brand" onClick={() => onNavigate?.('movies')}>
                        <img src="/icons/span.mark.svg" alt="mark" className="brand-mark" />
                        <img src="/icons/UMCine.svg" alt="UMCine" className="brand-word" />
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
                    <button className="login-btn" onClick={() => onNavigate?.(user ? 'mypage' : 'login')}>{user ? '마이페이지' : '로그인'}</button>
                </div>
            </div>
        </header>
    )
}
