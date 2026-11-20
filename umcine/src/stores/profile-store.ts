import { create } from "zustand";

interface Profile {
  nickname: string;
  email: string;
  imageDataUrl: string | null;
}

interface ProfileStore {
  profile: Profile;
  saveProfile: (changes: Pick<Profile, "nickname" | "imageDataUrl">) => void;
}

const STORAGE_KEY = "umcine-profile-store";

// 회원 API 연결 전까지 디자인의 예시 정보를 초기값으로 사용해요.
const DEFAULT_PROFILE: Profile = {
  nickname: "gs0428",
  email: "gwangsoo@cinemalab.kr",
  imageDataUrl: null,
};

function loadProfile(): Profile {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (
      stored &&
      typeof stored === "object" &&
      "nickname" in stored && typeof stored.nickname === "string" &&
      "email" in stored && typeof stored.email === "string" &&
      "imageDataUrl" in stored &&
      (stored.imageDataUrl === null || typeof stored.imageDataUrl === "string")
    ) {
      return {
        nickname: stored.nickname,
        email: stored.email,
        imageDataUrl: stored.imageDataUrl,
      };
    }
  } catch {
    // 저장 공간에 접근할 수 없거나 데이터가 손상되면 기본 정보로 열어요.
  }
  return DEFAULT_PROFILE;
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profile: loadProfile(),
  saveProfile: (changes) => {
    const profile = { ...get().profile, ...changes, nickname: changes.nickname.trim() };
    // 저장 실패 시 조회 화면의 정보까지 바뀌지 않도록 저장부터 완료해요.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    set({ profile });
  },
}));
