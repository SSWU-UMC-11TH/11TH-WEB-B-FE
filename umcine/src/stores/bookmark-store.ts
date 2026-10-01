import { create } from "zustand";

interface BookmarkStore {
  bookmarkedMovieIds: number[];
  toggleBookmark: (movieId: number) => void;
}

// 목록, 검색, 상세 화면이 같은 북마크 상태를 보도록 컴포넌트 바깥의 store에서 관리해요.
export const useBookmarkStore = create<BookmarkStore>((set) => ({
  bookmarkedMovieIds: [],
  toggleBookmark: (movieId) =>
    set((state) => ({
      bookmarkedMovieIds: state.bookmarkedMovieIds.includes(movieId)
        ? state.bookmarkedMovieIds.filter((id) => id !== movieId)
        : [...state.bookmarkedMovieIds, movieId],
    })),
}));
