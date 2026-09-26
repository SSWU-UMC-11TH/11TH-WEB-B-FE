import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import "./pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onChangePage,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="pagination" aria-label="페이지">
      <button
        type="button"
        className="pagination__arrow"
        aria-label="이전 페이지"
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage - 1)}
      >
        <ChevronLeftIcon width={16} height={16} />
      </button>

      <ul className="pagination__list">
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              className="pagination__page"
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
        className="pagination__arrow"
        aria-label="다음 페이지"
        disabled={currentPage === totalPages}
        onClick={() => onChangePage(currentPage + 1)}
      >
        <ChevronRightIcon width={16} height={16} />
      </button>
    </nav>
  );
}
