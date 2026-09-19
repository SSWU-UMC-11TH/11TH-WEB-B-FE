import type { Tab } from "../types/tab";
import "./header.css";

interface HeaderProps {
  currentTab: Tab;
  onChangeTab: (tab: Tab) => void;
}

const NAV_ITEMS: { label: string; tab: Tab }[] = [
  { label: "영화", tab: "movies" },
  { label: "검색", tab: "search" },
];

export default function Header({ currentTab, onChangeTab }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <button
            type="button"
            className="header__logo"
            onClick={() => onChangeTab("movies")}
          >
            <img
              className="header__logo-image"
              src="/logo.png"
              alt=""
              width={32}
              height={32}
            />
            <span className="header__logo-text">UMCine</span>
          </button>

          <nav>
            <ul className="header__nav-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.tab}>
                  <button
                    type="button"
                    className="header__nav-link"
                    aria-current={currentTab === item.tab ? "page" : undefined}
                    onClick={() => onChangeTab(item.tab)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                {/* 내 정보 화면은 아직 시안이 없어 탭만 표시해요. */}
                <button type="button" className="header__nav-link" disabled>
                  내 정보
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header__right">
          <button
            type="button"
            className="header__search"
            aria-label="검색"
            onClick={() => onChangeTab("search")}
          >
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
