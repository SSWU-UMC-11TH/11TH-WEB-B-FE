import { useAuthStore } from "../stores/auth-store";
import { apiClient } from "./api-client";

// apiClient 설정을 이어받고, 요청마다 최신 토큰을 헤더에 넣어요.
export const authApi = apiClient.extend({
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const accessToken = useAuthStore.getState().accessToken;
        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      ({ response }) => {
        // 토큰이 만료되었거나 잘못되었으면 비워서 로그인 전 상태로 돌려요.
        if (response.status === 401) {
          useAuthStore.getState().setAccessToken(null);
        }
      },
    ],
  },
});
