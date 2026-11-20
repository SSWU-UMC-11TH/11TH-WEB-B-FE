import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { favoriteQueries } from "../api/favorites/favorite-queries";
import { memberQueries } from "../api/members/member-queries";
import { useAuthStore } from "../stores/auth-store";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return () => {
    setAccessToken(null);
    // 다른 계정으로 로그인했을 때 이전 사람의 정보가 보이지 않도록 캐시를 지워요.
    queryClient.removeQueries({ queryKey: memberQueries.all() });
    queryClient.removeQueries({ queryKey: favoriteQueries.all() });
    navigate({ to: "/" });
  };
}
