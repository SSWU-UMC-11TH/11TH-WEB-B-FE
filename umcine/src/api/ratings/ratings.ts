import { apiClient } from "../api-client";
import { authApi } from "../auth-api";
import type { ApiResponse } from "../api-response";

export interface Rating {
  ratingId: number;
  movieId: number;
  score: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRatingRequest {
  movieId: number;
  score: number;
  comment?: string;
}

export interface UpdateRatingRequest {
  score: number;
  comment?: string;
}

// GET /members/{memberId}/ratings: 공개 API라 토큰 없이 요청해요.
// 목록을 그대로 주는 서버와 result로 감싸 주는 서버를 모두 처리해요.
export async function getMemberRatings(memberId: number): Promise<Rating[]> {
  const body = await apiClient
    .get(`members/${memberId}/ratings`)
    .json<Rating[] | ApiResponse<Rating[]>>();
  return Array.isArray(body) ? body : body.result;
}

// POST /ratings
export function createRating(body: CreateRatingRequest) {
  return authApi.post("ratings", { json: body }).json<ApiResponse<Rating>>();
}

// PATCH /ratings/{ratingId}
export function updateRating({ ratingId, ...body }: UpdateRatingRequest & { ratingId: number }) {
  return authApi.patch(`ratings/${ratingId}`, { json: body }).json<ApiResponse<Rating>>();
}

// DELETE /ratings/{ratingId}
export function deleteRating(ratingId: number) {
  return authApi.delete(`ratings/${ratingId}`).json<ApiResponse<null>>();
}
