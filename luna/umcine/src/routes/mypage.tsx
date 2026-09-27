import { createFileRoute, Navigate, useNavigate } from '@tanstack/react-router'
import AccountLayout from '../components/layout/account-layout'
import { useAuth } from '../contexts/auth-context'
import { useMovies } from '../contexts/movies-context'
import MyPage from '../pages/my-page'

export const Route = createFileRoute('/mypage')({ component: MyPageRoute })

function MyPageRoute() {
  const { user } = useAuth()
  const { movies, toggleBookmark } = useMovies()
  const navigate = useNavigate()

  if (!user) return <Navigate to="/login" replace />

  return (
    <AccountLayout>
      <MyPage
        user={user}
        movies={movies}
        onEdit={() => void navigate({ to: '/mypage/edit' })}
        onSelectMovie={(id) => void navigate({ to: '/movies/$movieId', params: { movieId: String(id) } })}
        onToggleBookmark={toggleBookmark}
      />
    </AccountLayout>
  )
}
