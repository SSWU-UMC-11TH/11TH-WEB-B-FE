import type { Tab } from "../types/tab";
import { SearchIcon } from "./icons";
import "./header.css";

interface HeaderProps {
  currentTab: Tab;
  onChangeTab: (tab: Tab) => void;
}

const NAV_ITEMS: { label: string; tab: Tab }[] = [
  { label: "영화", tab: "movies" },
  { label: "검색", tab: "search" },
  { label: "내 정보", tab: "profile" },
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
              {NAV_ITEMS.map((item) => {
                // 영화 상세 화면(detail)은 "영화" 탭에서 들어간 화면이라 함께 활성으로 봐요.
                const isActive =
                  item.tab === "movies"
                    ? currentTab === "movies" || currentTab === "detail"
                    : item.tab === "profile"
                      ? currentTab === "profile" || currentTab === "profile-edit"
                      : currentTab === item.tab;

                return (
                  <li key={item.tab}>
                    <button
                      type="button"
                      className="header__nav-link"
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => onChangeTab(item.tab)}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
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
            <SearchIcon width={18} height={18} />
          </button>

          <button
            type="button"
            className="header__login"
            onClick={() => onChangeTab("login")}
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}
