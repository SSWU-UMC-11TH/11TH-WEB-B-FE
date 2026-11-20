import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteQueries } from "../api/favorites/favorite-queries";
import { addFavorite, removeFavorite } from "../api/favorites/favorites";

interface ToggleFavoriteVariables {
  movieId: number;
  isFavorite: boolean; // 요청 전 상태
}

export function useToggleFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ movieId, isFavorite }: ToggleFavoriteVariables) => {
      if (isFavorite) {
        await removeFavorite(movieId);
      } else {
        await addFavorite(movieId);
      }
    },
    onSuccess: (_response, { movieId, isFavorite }) => {
      // 이 영화의 즐겨찾기 여부는 결과가 확실하므로 캐시를 바로 바꿔요.
      queryClient.setQueryData(favoriteQueries.status(movieId).queryKey, {
        movieId,
        isFavorite: !isFavorite,
      });
      // 목록은 정렬, 추가 시각 등 서버가 정하는 값이 있어서 다시 조회해요.
      queryClient.invalidateQueries({ queryKey: favoriteQueries.list().queryKey });
    },
    onError: (_error, { isFavorite }) => {
      alert(
        isFavorite
          ? "즐겨찾기 해제에 실패했어요. 다시 시도해 주세요."
          : "즐겨찾기 추가에 실패했어요. 다시 시도해 주세요.",
      );
    },
  });
}
