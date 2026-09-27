import { createContext, useContext, useState, type ReactNode } from 'react'

export interface AuthUser {
  email: string
  nickname: string
}

const AuthContext = createContext<{
  user: AuthUser | null
  login: (user: AuthUser) => void
  logout: () => void
  updateUser: (updates: Partial<AuthUser>) => void
} | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  function login(nextUser: AuthUser) {
    setUser(nextUser)
  }

  function logout() {
    setUser(null)
  }

  function updateUser(updates: Partial<AuthUser>) {
    setUser((current) => current ? { ...current, ...updates } : null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
