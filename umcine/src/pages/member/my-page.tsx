import { Link } from "@tanstack/react-router";
import { ProfileAvatar } from "../../components/member/profile-avatar";
import { BookmarkedMovies } from "../../components/movies/bookmarked-movies";
import { useProfileStore } from "../../stores/profile-store";

export function MyPage() {
  const profile = useProfileStore((state) => state.profile);

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
            <ProfileAvatar imageDataUrl={profile.imageDataUrl} />

            <dl className="grid min-w-0 flex-1 gap-5 sm:grid-cols-2 sm:gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
              <div className="min-w-0">
                <dt className="mb-1.5 text-xs text-[#969da8]">닉네임</dt>
                <dd className="break-words text-base font-bold text-[#17191e]">{profile.nickname}</dd>
              </div>
              <div className="min-w-0">
                <dt className="mb-1.5 text-xs text-[#969da8]">이메일</dt>
                <dd className="break-all text-base font-bold text-[#17191e]">{profile.email}</dd>
              </div>
            </dl>
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
