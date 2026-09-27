import type { ReactNode } from 'react'
import '../../App.css'

export default function AccountLayout({ children }: { children: ReactNode }) {
  return <main className="account-page">{children}</main>
}
