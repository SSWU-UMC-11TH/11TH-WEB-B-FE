export default function Header() {
    return (
        <header className="header">
            <div className="header-inner">
                <div className="logo">
                    <img src="/icons/movie.svg" alt="" />
                    <strong>UMCine</strong>
                </div>

                <nav className="nav">
                    <span className="active">영화</span>
                    <span>검색</span>
                    <span>내 정보</span>
                </nav>

                <div className="header-actions">
                    <button className="search-button" type="button">
                        <img src="/icons/search.svg" alt="검색" />
                    </button>

                    <button className="login-button" type="button">
                        로그인
                    </button>
                </div>
            </div>
        </header>
    );
}