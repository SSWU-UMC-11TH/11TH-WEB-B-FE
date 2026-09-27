import { Link } from "@tanstack/react-router";

export function Header() {
    return (
        <header className="h-[78px] border-b border-[#e5e7eb] bg-white">
            <div className="mx-auto flex h-full max-w-[1080px] items-center px-4">
                <div className="mr-[45px] flex items-center gap-2">
                    <img
                        src="/icons/movie.svg"
                        alt=""
                        className="h-7 w-7"
                    />
                    <strong className="text-xl">UMCine</strong>
                </div>

                <nav className="flex items-center gap-8 text-sm">
                    <Link
                        to="/"
                        className="font-bold underline underline-offset-[5px]"
                    >
                        영화
                    </Link>

                    <Link
                        to="/search"
                        className="cursor-pointer"
                    >
                        검색
                    </Link>

                    <span className="cursor-pointer">
                        내 정보
                    </span>
                </nav>

                <div className="ml-auto flex items-center gap-3">
                    <button
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#e5e7eb] bg-white"
                        type="button"
                    >
                        <img
                            src="/icons/search.svg"
                            alt="검색"
                            className="h-5 w-5"
                        />
                    </button>

                    <button
                        className="h-10 cursor-pointer rounded-[7px] border-0 bg-[#4f6ee8] px-[18px] font-bold text-white"
                        type="button"
                    >
                        로그인
                    </button>
                </div>
            </div>
        </header>
    );
}