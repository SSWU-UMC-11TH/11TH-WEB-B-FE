import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-7 border-t border-[#e6e9ee] bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-end px-5 py-[18px]">
        <div className="flex items-center gap-2">
          <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" aria-label="영화 데이터 출처 TMDB">
            <img src="/images/tmdb-logo.svg" alt="TMDB" className="size-6 shrink-0 object-contain" />
          </a>
          <div className="m-0 text-[12px] leading-none font-normal text-[#667085]">
            <span>This product uses the TMDB API but is not endorsed or certified by TMDB.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
