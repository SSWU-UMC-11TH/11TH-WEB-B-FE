import { create } from "zustand";

interface ProfileStore {
  imageDataUrl: string | null;
  saveImage: (imageDataUrl: string | null) => void;
}

const STORAGE_KEY = "umcine-profile-store";

// 닉네임과 이메일은 서버(GET /members/me)가 원본이라 query 캐시에서 관리해요.
// 프로필 이미지는 서버 API가 없어서 브라우저에만 저장해요.
function loadImage(): string | null {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (
      stored &&
      typeof stored === "object" &&
      "imageDataUrl" in stored &&
      typeof stored.imageDataUrl === "string"
    ) {
      return stored.imageDataUrl;
    }
  } catch {
    // 저장 공간에 접근할 수 없거나 데이터가 손상되면 기본 이미지로 열어요.
  }
  return null;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  imageDataUrl: loadImage(),
  saveImage: (imageDataUrl) => {
    // 저장 실패 시 조회 화면의 이미지까지 바뀌지 않도록 저장부터 완료해요.
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ imageDataUrl }));
    set({ imageDataUrl });
  },
}));
