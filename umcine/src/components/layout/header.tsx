import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { memberQueries } from "../../api/members/member-queries";
import { useLogout } from "../../hooks/use-logout";
import { useAuthStore } from "../../stores/auth-store";
import { MovieIcon, SearchIcon } from "../icons";

const linkClass = "text-sm text-[#606774] transition-colors hover:text-[#17191e]";
const activeClass = "font-bold text-[#17191e]";

export function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);
  // 토큰이 있을 때만 내 정보를 조회해요. 401이면 authApi가 토큰을 비워 로그인 버튼으로 바뀌어요.
  const meQuery = useQuery({
    ...memberQueries.me(),
    enabled: Boolean(accessToken),
  });
  const logout = useLogout();

  return (
    <header className="border-b border-[#e9ecef] bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-x-4 gap-y-3 px-6 py-4 md:gap-x-10 md:px-20 md:py-6">
        <Link to="/" className="flex shrink-0 items-center gap-2 text-lg font-bold text-[#17191e]">
          <MovieIcon width={20} height={20} />
          UMCine
        </Link>

        <nav className="order-last flex w-full items-center gap-4 sm:order-none sm:w-auto">
          <Link to="/" className={linkClass} activeProps={{ className: activeClass }}>
            영화
          </Link>
          <Link to="/search" className={linkClass} activeProps={{ className: activeClass }}>
            검색
          </Link>
          <Link
            to="/mypage"
            className={linkClass}
            activeProps={{ className: `${activeClass} underline underline-offset-4` }}
          >
            내 정보
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
          {!accessToken ? (
            <Link
              to="/login"
              className="flex h-10 shrink-0 items-center justify-center rounded-lg bg-[#2563eb] px-4 text-sm font-bold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
            >
              로그인
            </Link>
          ) : meQuery.isLoading ? (
            <span
              role="status"
              aria-label="내 정보를 불러오는 중"
              className="h-10 w-24 animate-pulse rounded-lg bg-gray-200"
            />
          ) : (
            <>
              {meQuery.data && (
                <span className="hidden text-sm font-bold text-[#17191e] sm:inline">
                  {meQuery.data.nickname}님
                </span>
              )}
              <button
                type="button"
                onClick={logout}
                className="flex h-10 shrink-0 items-center justify-center rounded-lg border border-[#e3e6eb] bg-white px-4 text-sm font-bold text-[#17191e] transition-colors hover:bg-[#f8f9fa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
