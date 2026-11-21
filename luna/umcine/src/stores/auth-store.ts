import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  accessToken: string | null
  setAccessToken: (accessToken: string | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    { name: 'umcine-auth', partialize: ({ accessToken }) => ({ accessToken }) },
  ),
)
