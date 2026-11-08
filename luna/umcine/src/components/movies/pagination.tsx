import React from 'react'
import { cn } from '../../utils/cn'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const pageClass = 'rounded-lg border border-[#e9eef3] bg-white px-3 py-2 text-[14px]'
  const safeTotalPages = Math.max(1, totalPages)
  const normalizedPage = Math.min(Math.max(page, 1), safeTotalPages)

  const visiblePages = Array.from({ length: Math.min(5, safeTotalPages) }, (_, index) => {
    const start = Math.max(1, normalizedPage - 2)
    return start + index
  }).filter((pageNumber) => pageNumber <= safeTotalPages)

  const goToPage = (nextPage: number) => {
    const clampedPage = Math.min(Math.max(nextPage, 1), safeTotalPages)
    onPageChange(clampedPage)
  }

  return (
    <div className="my-[18px] flex items-center justify-center gap-2">
      <button
        type="button"
        className={cn(pageClass, 'font-[Arial] leading-[normal]', normalizedPage === 1 && 'cursor-not-allowed opacity-50')}
        onClick={() => goToPage(normalizedPage - 1)}
        disabled={normalizedPage === 1}
      >
        &lt;
      </button>

      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={cn(
            pageClass,
            'font-[Arial] leading-[normal]',
            pageNumber === normalizedPage && 'border-[#2563eb] bg-[#2563eb] text-white'
          )}
          onClick={() => goToPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        className={cn(pageClass, 'font-[Arial] leading-[normal]', normalizedPage === safeTotalPages && 'cursor-not-allowed opacity-50')}
        onClick={() => goToPage(normalizedPage + 1)}
        disabled={normalizedPage === safeTotalPages}
      >
        &gt;
      </button>
    </div>
  )
}
