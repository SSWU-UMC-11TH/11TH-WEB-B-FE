import { Link } from "@tanstack/react-router";
import { MovieIcon } from "../icons";

const linkClass = "text-sm text-[#606774] transition-colors hover:text-[#17191e]";
const activeClass = "font-bold text-[#17191e]";

export function Header() {
  return (
    <header className="border-b border-[#e9ecef] bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-6 px-6 py-4 md:px-20">
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
      </div>
    </header>
  );
}
