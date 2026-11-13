import { create } from 'zustand'

interface UserProfileState {
  nickname: string
  email: string
  setNickname: (nickname: string) => void
  setEmail: (email: string) => void
}

export const useUserProfileStore = create<UserProfileState>((set) => ({
  nickname: 'UMC 사용자',
  email: 'umcuser@example.com',
  setNickname: (nickname) => set({ nickname }),
  setEmail: (email) => set({ email }),
}))
