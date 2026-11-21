import { createFileRoute, Navigate, Outlet, redirect } from '@tanstack/react-router'
import { useMeQuery } from '../../hooks/use-me-query'
import { useAuthStore } from '../../stores/auth-store'
import { getApiErrorMessage } from '../../utils/api-error-message'

export const Route = createFileRoute('/(account)/_authenticated')({
  beforeLoad: () => {
    if (!useAuthStore.getState().accessToken) throw redirect({ to: '/login', replace: true })
  },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const member = useMeQuery()

  if (!accessToken) return <Navigate to="/login" replace />
  if (member.data) return <Outlet />

  return (
    <main className="account-page profile-page">
      <section className="profile-layout">
        {member.isError ? (
          <>
            <p role="alert">{getApiErrorMessage(member.error)}</p>
            <button type="button" className="text-[#2563eb]" onClick={() => void member.refetch()}>다시 불러오기</button>
          </>
        ) : (
          <p role="status">내 정보를 불러오는 중이에요.</p>
        )}
      </section>
    </main>
  )
}
