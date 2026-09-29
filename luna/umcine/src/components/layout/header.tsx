import React from 'react'
import { Link } from '@tanstack/react-router'
import { cn } from '../../utils/cn'

const menuClass = 'cursor-pointer border-0 bg-transparent p-0 font-umcine text-[14px] leading-none no-underline'
const activeMenuClass = 'font-bold text-[#1d2025] underline decoration-[#1d2025] decoration-1 underline-offset-4'
const inactiveMenuClass = 'font-semibold text-[#667085]'

export default function Header() {
  return (
    <header className="border-b border-[#e6e9ee] bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 p-4 min-[641px]:px-6 min-[641px]:py-5">
        <div className="flex flex-wrap items-center gap-4 min-[641px]:gap-9">
          <Link
            to="/"
            className="m-0 flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-inherit no-underline"
            aria-label="UMCine 영화 목록으로 이동"
          >
            <img src="/icons/span.mark.svg" alt="" className="size-6" />
            <img src="/icons/UMCine.svg" alt="UMCine" className="h-6 w-auto" />
          </Link>

          <nav className="flex items-center gap-5" aria-label="주요 메뉴">
            <Link
              to="/"
              activeProps={{ className: cn(menuClass, activeMenuClass) }}
              inactiveProps={{ className: cn(menuClass, inactiveMenuClass) }}
              activeOptions={{ exact: true }}
            >
              영화
            </Link>

            <Link
              to="/search"
              search={{}}
              activeProps={{ className: cn(menuClass, activeMenuClass) }}
              inactiveProps={{ className: cn(menuClass, inactiveMenuClass) }}
              activeOptions={{ includeSearch: false }}
            >
              검색
            </Link>

            <span className={cn(menuClass, inactiveMenuClass)}>내 정보</span>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/search"
            search={{}}
            className="flex size-11 items-center justify-center rounded-[10px] border border-[#e6e9ee] bg-white no-underline"
            aria-label="영화 검색"
          >
            <img className="size-[18px]" src="/icons/search.svg" alt="" />
          </Link>

          <span className="rounded-[10px] border-0 bg-[#2563eb] px-[18px] py-2 font-[Arial] text-[13.3333px] font-semibold leading-[normal] text-white">
            로그인
          </span>
        </div>
      </div>
    </header>
  )
}
