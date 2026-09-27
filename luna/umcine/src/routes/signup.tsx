import { createFileRoute, useNavigate } from '@tanstack/react-router'
import AccountLayout from '../components/layout/account-layout'
import SignupPage from '../pages/signup-page'

export const Route = createFileRoute('/signup')({ component: SignupRoute })

function SignupRoute() {
  const navigate = useNavigate()
  return (
    <AccountLayout>
      <SignupPage onLogin={() => void navigate({ to: '/login' })} />
    </AccountLayout>
  )
}
