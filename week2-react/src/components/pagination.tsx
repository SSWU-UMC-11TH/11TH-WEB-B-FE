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
    <nav className="pagination" aria-label="영화 목록 페이지">
      <button
        type="button"
        className="pagination__arrow"
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage - 1)}
      >
        이전
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
        disabled={currentPage === totalPages}
        onClick={() => onChangePage(currentPage + 1)}
      >
        다음
      </button>
    </nav>
  );
}
