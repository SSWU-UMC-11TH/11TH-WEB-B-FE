import React from 'react'
import { cn } from '../../utils/cn'

export default function Pagination() {
  const pageClass = 'rounded-lg border border-[#e9eef3] bg-white px-3 py-2 text-[14px]'
  return (
    <div className="my-[18px] flex items-center justify-center gap-2">
      <button className={cn(pageClass, 'font-[Arial] leading-[normal]')}>&lt;</button>
      <div className={pageClass}>1</div>
      <div className={pageClass}>2</div>
      <div className={pageClass}>3</div>
      <button className={cn(pageClass, 'font-[Arial] leading-[normal]')}>&gt;</button>
    </div>
  )
}
