import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import { cn } from "../../utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

const MAX_VISIBLE_PAGES = 5;

const buttonClass =
  "flex h-9 min-w-9 items-center justify-center rounded-lg border border-[#e3e6eb] bg-white px-[10px] text-sm text-[#606774] transition-colors";

export function Pagination({
  currentPage,
  totalPages,
  onChangePage,
}: PaginationProps) {
  // 전체 페이지가 많아도 현재 페이지 주변의 번호만 보여 줘요.
  const visibleCount = Math.min(MAX_VISIBLE_PAGES, totalPages);
  const firstPage = Math.min(
    Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2)),
    totalPages - visibleCount + 1,
  );
  const pages = Array.from({ length: visibleCount }, (_, index) => firstPage + index);

  return (
    <nav className="flex items-center justify-center gap-3 pb-2 pt-10" aria-label="페이지">
      <button
        type="button"
        className={cn(
          buttonClass,
          "hover:not-disabled:bg-[#f1f3f5] hover:not-disabled:text-[#17191e] disabled:cursor-not-allowed disabled:opacity-40",
        )}
        aria-label="이전 페이지"
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage - 1)}
      >
        <ChevronLeftIcon width={16} height={16} />
      </button>

      <ul className="flex list-none items-center gap-1.5 p-0">
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              className={cn(
                buttonClass,
                page === currentPage
                  ? "border-[#17191e] bg-[#17191e] font-bold text-white"
                  : "hover:bg-[#f1f3f5] hover:text-[#17191e]",
              )}
              aria-current={page === currentPage ? "page" : undefined}
              onClick={() => onChangePage(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={cn(
          buttonClass,
          "hover:not-disabled:bg-[#f1f3f5] hover:not-disabled:text-[#17191e] disabled:cursor-not-allowed disabled:opacity-40",
        )}
        aria-label="다음 페이지"
        disabled={currentPage === totalPages}
        onClick={() => onChangePage(currentPage + 1)}
      >
        <ChevronRightIcon width={16} height={16} />
      </button>
    </nav>
  );
}
