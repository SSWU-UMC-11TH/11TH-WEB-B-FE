import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ratingQueries } from "../api/ratings/rating-queries";
import {
  createRating,
  deleteRating,
  updateRating,
  type Rating,
} from "../api/ratings/ratings";

// 평점 등록, 수정, 삭제 모두 결과를 정확히 알 수 있어서 내 평점 목록 캐시를 직접 바꿔요.
export function useRatingMutations(memberId: number | null) {
  const queryClient = useQueryClient();

  function updateCache(updater: (ratings: Rating[]) => Rating[]) {
    if (memberId === null) return;
    queryClient.setQueryData(ratingQueries.byMember(memberId).queryKey, (ratings) =>
      ratings ? updater(ratings) : ratings,
    );
  }

  const createMutation = useMutation({
    mutationFn: createRating,
    onSuccess: (response) => {
      updateCache((ratings) => [...ratings, response.result]);
      alert("평점을 저장했어요.");
    },
    onError: () => alert("평점 저장에 실패했어요. 다시 시도해 주세요."),
  });

  const updateMutation = useMutation({
    mutationFn: updateRating,
    onSuccess: (response) => {
      updateCache((ratings) =>
        ratings.map((rating) =>
          rating.ratingId === response.result.ratingId ? response.result : rating,
        ),
      );
      alert("평점을 수정했어요.");
    },
    onError: () => alert("평점 수정에 실패했어요. 다시 시도해 주세요."),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRating,
    onSuccess: (_response, ratingId) => {
      updateCache((ratings) => ratings.filter((rating) => rating.ratingId !== ratingId));
      alert("평점을 삭제했어요.");
    },
    onError: () => alert("평점 삭제에 실패했어요. 다시 시도해 주세요."),
  });

  const isPending =
    createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return { createMutation, updateMutation, deleteMutation, isPending };
}
