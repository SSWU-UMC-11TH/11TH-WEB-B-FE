import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import MyPage from '../pages/mypage/mypage-page'

export const Route = createFileRoute('/mypage')({
  component: MyPageRoute,
})

function MyPageRoute() {
  const location = useLocation()

  if (location.pathname === '/mypage') {
    return <MyPage />
  }

  return <Outlet />
}
