import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { favoriteQueries } from "../api/favorites/favorite-queries";
import { useAuthStore } from "../stores/auth-store";
import { useToggleFavoriteMutation } from "./use-toggle-favorite-mutation";

// 목록, 검색 카드처럼 영화가 여러 개인 화면에서 쓰는 즐겨찾기 버튼 로직이에요.
// 카드마다 요청하지 않도록 즐겨찾기 목록(GET /favorites) 하나로 여부를 판단해요.
export function useFavoriteButton(movieId: number) {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const favoriteListQuery = useQuery({
    ...favoriteQueries.list(),
    enabled: Boolean(accessToken),
  });
  const toggleFavoriteMutation = useToggleFavoriteMutation();

  const isFavorite = Boolean(
    accessToken && favoriteListQuery.data?.some((favorite) => favorite.movieId === movieId),
  );

  function toggle() {
    if (!accessToken) {
      alert("로그인 후 즐겨찾기할 수 있어요.");
      navigate({ to: "/login" });
      return;
    }
    if (toggleFavoriteMutation.isPending) return;
    toggleFavoriteMutation.mutate({ movieId, isFavorite });
  }

  return { isFavorite, toggle, isPending: toggleFavoriteMutation.isPending };
}
