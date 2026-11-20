import { queryOptions } from "@tanstack/react-query";
import { getMe } from "./me";

const FIVE_MINUTES = 5 * 60 * 1000;

export const memberQueries = {
  all: () => ["members"] as const,

  // 내 정보는 자주 바뀌지 않아서 5분 동안 최신으로 봐요.
  me: () =>
    queryOptions({
      queryKey: [...memberQueries.all(), "me"],
      queryFn: getMe,
      staleTime: FIVE_MINUTES,
      // 401로 토큰을 비운 뒤 같은 요청을 다시 보내지 않도록 재시도를 꺼요.
      retry: false,
    }),
};
