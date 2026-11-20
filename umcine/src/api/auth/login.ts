import { apiClient } from "../api-client";
import type { ApiResponse } from "../api-response";

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = ApiResponse<{
  nickname: string;
  accessToken: string;
}>;

// 로그인은 토큰이 없어도 되므로 apiClient로 요청해요.
export function login(body: LoginRequest) {
  return apiClient.post("auth/login", { json: body }).json<LoginResponse>();
}
