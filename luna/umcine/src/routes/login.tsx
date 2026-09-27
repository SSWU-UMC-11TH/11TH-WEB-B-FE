import { createFileRoute, useNavigate } from '@tanstack/react-router'
import AccountLayout from '../components/layout/account-layout'
import { useAuth } from '../contexts/auth-context'
import LoginPage from '../pages/login-page'

export const Route = createFileRoute('/login')({ component: LoginRoute })

function LoginRoute() {
  const { login } = useAuth()
  const navigate = useNavigate()

  return (
    <AccountLayout>
      <LoginPage
        onLogin={(user) => {
          login(user)
          void navigate({ to: '/mypage' })
        }}
        onSignup={() => void navigate({ to: '/signup' })}
      />
    </AccountLayout>
  )
}
