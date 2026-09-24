import React from 'react'

export default function Pagination() {
  return (
    <div className="pagination">
      <button className="page-num">&lt;</button>
      <div className="page-num">1</div>
      <div className="page-num">2</div>
      <div className="page-num">3</div>
      <button className="page-num">&gt;</button>
    </div>
  )
}
