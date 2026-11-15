import { Link } from "@tanstack/react-router";
import { MovieIcon, SearchIcon } from "../icons";

const linkClass = "text-sm text-[#606774] transition-colors hover:text-[#17191e]";
const activeClass = "font-bold text-[#17191e]";

export function Header() {
  return (
    <header className="border-b border-[#e9ecef] bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-4 px-6 py-4 md:gap-10 md:px-20 md:py-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-[#17191e]">
          <MovieIcon width={20} height={20} />
          UMCine
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/" className={linkClass} activeProps={{ className: activeClass }}>
            영화
          </Link>
          <Link to="/search" className={linkClass} activeProps={{ className: activeClass }}>
            검색
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link
            to="/search"
            aria-label="영화 검색"
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-[#e3e6eb] text-[#606774] transition-colors hover:bg-[#f8f9fa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] sm:flex"
          >
            <SearchIcon width={22} height={22} />
          </Link>
          <Link
            to="/login"
            className="flex h-10 shrink-0 items-center justify-center rounded-lg bg-[#2563eb] px-4 text-sm font-bold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}
