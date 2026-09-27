import { createFileRoute, Navigate, useNavigate } from '@tanstack/react-router'
import AccountLayout from '../components/layout/account-layout'
import { useAuth } from '../contexts/auth-context'
import MyPageEdit from '../pages/my-page-edit'

// Trailing underscore keeps this screen outside the /mypage component layout.
export const Route = createFileRoute('/mypage_/edit')({ component: MyPageEditRoute })

function MyPageEditRoute() {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()

  if (!user) return <Navigate to="/login" replace />

  return (
    <AccountLayout>
      <MyPageEdit
        user={user}
        onSave={(updates) => {
          updateUser(updates)
          void navigate({ to: '/mypage' })
        }}
      />
    </AccountLayout>
  )
}
