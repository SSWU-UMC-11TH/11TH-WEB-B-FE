import "./header.css";

const NAV_ITEMS = [
  { label: "영화", isActive: true },
  { label: "검색", isActive: false },
  { label: "내 정보", isActive: false },
];

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <a className="header__logo" href="/">
            <img
              className="header__logo-image"
              src="/logo.png"
              alt=""
              width={32}
              height={32}
            />
            <span className="header__logo-text">UMCine</span>
          </a>

          <nav>
            <ul className="header__nav-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    className="header__nav-link"
                    href="/"
                    aria-current={item.isActive ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="header__right">
          <button type="button" className="header__search" aria-label="검색">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <circle
                cx="11"
                cy="11"
                r="6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="m16 16 4.5 4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button type="button" className="header__login">
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}
