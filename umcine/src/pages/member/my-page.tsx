import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { memberQueries } from "../../api/members/member-queries";
import { ProfileAvatar } from "../../components/member/profile-avatar";
import { BookmarkedMovies } from "../../components/movies/bookmarked-movies";
import { useProfileStore } from "../../stores/profile-store";

export function MyPage() {
  // 닉네임과 이메일은 서버 데이터라 헤더와 같은 query key로 가져와요. 헤더에서 이미 받았다면 캐시를 써요.
  const meQuery = useQuery(memberQueries.me());
  // 프로필 이미지는 서버 API가 없어서 기존처럼 브라우저에 저장한 값을 써요.
  const imageDataUrl = useProfileStore((state) => state.profile.imageDataUrl);

  return (
    <>
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-6 pb-12 pt-6 md:px-20">
        <div className="mb-7 flex items-center justify-between gap-4">
          <h1 className="text-[32px] font-bold leading-tight tracking-[-1.2px] text-[#17191e]">
            내 정보
          </h1>
          <Link
            to="/mypage/edit"
            className="flex h-10 shrink-0 items-center rounded-lg bg-[#2563eb] px-4 text-sm font-bold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
          >
            정보 수정
          </Link>
        </div>

        <section aria-labelledby="profile-title" className="border-y border-[#e3e6eb] py-3">
          <h2 id="profile-title" className="text-lg font-bold text-[#17191e]">
            기본 정보
          </h2>

          <div className="flex flex-col gap-6 pb-0 pt-4 sm:flex-row sm:items-center sm:gap-7">
            <ProfileAvatar imageDataUrl={imageDataUrl} />

            {meQuery.isPending ? (
              <p role="status" className="text-sm text-[#606774]">내 정보를 불러오는 중이에요.</p>
            ) : meQuery.isError ? (
              <div className="flex flex-wrap items-center gap-3">
                <p role="alert" className="text-sm text-[#606774]">내 정보를 불러오지 못했어요.</p>
                <button
                  type="button"
                  onClick={() => meQuery.refetch()}
                  className="text-sm font-bold text-[#2563eb] hover:underline"
                >
                  다시 시도
                </button>
              </div>
            ) : (
              <dl className="grid min-w-0 flex-1 gap-5 sm:grid-cols-2 sm:gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <div className="min-w-0">
                  <dt className="mb-1.5 text-xs text-[#969da8]">닉네임</dt>
                  <dd className="break-words text-base font-bold text-[#17191e]">{meQuery.data.nickname}</dd>
                </div>
                <div className="min-w-0">
                  <dt className="mb-1.5 text-xs text-[#969da8]">이메일</dt>
                  <dd className="break-all text-base font-bold text-[#17191e]">{meQuery.data.email}</dd>
                </div>
              </dl>
            )}
          </div>
        </section>

        <section aria-labelledby="bookmarks-title" className="mt-7">
          <h2 id="bookmarks-title" className="mb-4 text-lg font-bold text-[#17191e]">
            내 즐겨찾기
          </h2>
          <BookmarkedMovies />
        </section>
      </main>

      <footer className="border-t border-[#e3e6eb] bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-end gap-2 px-6 py-5 text-xs text-[#606774] md:px-20">
          <span className="shrink-0 bg-gradient-to-r from-[#90cea1] to-[#01b4e4] bg-clip-text font-extrabold tracking-wider text-transparent">
            TMDB
          </span>
          <p>
            This product uses the TMDB API but is not endorsed or certified by{" "}
            <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" className="underline underline-offset-2">
              TMDB
            </a>.
          </p>
        </div>
      </footer>
    </>
  );
}
