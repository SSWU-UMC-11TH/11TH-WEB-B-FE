interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const visiblePageCount = Math.min(totalPages, 5);

    return (
        <nav className="mt-8 flex justify-center gap-2">
            {Array.from({ length: visiblePageCount }, (_, index) => {
                const page = index + 1;

                return (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        disabled={page === currentPage}
                        className="rounded border border-gray-300 px-3 py-2 disabled:bg-gray-200"
                    >
                        {page}
                    </button>
                );
            })}
        </nav>
    );
}