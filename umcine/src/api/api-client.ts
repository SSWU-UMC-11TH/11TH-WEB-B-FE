import ky from "ky";
import { env } from "../config/env";

// 인증이 필요 없는 UMCine 서버 요청에 사용해요.
export const apiClient = ky.create({
  baseUrl: `${env.apiBaseUrl}/`,
  timeout: 10000,
  retry: 0,
});
