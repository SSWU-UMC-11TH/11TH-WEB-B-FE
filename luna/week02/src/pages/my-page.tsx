import React from 'react'
import type { Movie } from '../types/movie'
import MovieCard from '../components/movie-card'

interface Props {
  user: { email: string; nickname: string } | null
  movies: Movie[]
  onEdit: () => void
  onSelectMovie: (id: number) => void
}

export default function MyPage({ user, movies, onEdit, onSelectMovie }: Props) {
  const bookmarks = movies.filter(m => m.isBookmarked)
  return (
    <section className="container my-page">
      <div className="my-header">
        <h2>내 정보</h2>
        <button className="small" onClick={onEdit}>정보 수정</button>
      </div>

      <div className="divider" />

      <div className="profile-info-grid">
        <div className="profile">
          <div className="profile-icon"><img src="/icons/person.svg" alt="profile" /></div>
        </div>

        <div className="info-block">
          <span className="label">닉네임</span>
          <div className="value">{user?.nickname ?? 'gs0428'}</div>
        </div>

        <div className="info-block">
          <span className="label">이메일</span>
          <div className="value">{user?.email ?? 'gwangsoo@cinemalab.kr'}</div>
        </div>
      </div>

      <div className="divider" />

      <h3>내 즐겨찾기</h3>
      <div className="favorites">
        {bookmarks.length ? bookmarks.slice(0,3).map(m => (
          <div key={m.id} onClick={() => onSelectMovie(m.id)} style={{width:220}}>
            <MovieCard movie={m} onToggleBookmark={() => {}} onSelect={() => onSelectMovie(m.id)} />
          </div>
        )) : <div>즐겨찾기가 없습니다.</div>}
      </div>
    </section>
  )
}
