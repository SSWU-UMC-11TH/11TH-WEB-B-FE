import { isHTTPError } from "ky";
import { authApi } from "../auth-api";
import type { ApiResponse } from "../api-response";

export interface Favorite {
  favoriteId: number;
  movieId: number;
  createdAt: string;
}

export interface FavoriteStatus {
  movieId: number;
  isFavorite: boolean;
}

// GET /favorites: 내 즐겨찾기 목록
export async function getFavorites(): Promise<Favorite[]> {
  const response = await authApi.get("favorites").json<ApiResponse<Favorite[]>>();
  return response.result;
}

// GET /favorites/{movieId}: 이 영화를 즐겨찾기했는지
export async function getFavoriteStatus(movieId: number): Promise<FavoriteStatus> {
  try {
    const response = await authApi
      .get(`favorites/${movieId}`)
      .json<ApiResponse<FavoriteStatus>>();
    return response.result;
  } catch (error) {
    // 즐겨찾기하지 않은 영화를 404로 응답해도 "즐겨찾기 안 함"으로 처리해요.
    if (isHTTPError(error) && error.response.status === 404) {
      return { movieId, isFavorite: false };
    }
    throw error;
  }
}

// POST /favorites
export function addFavorite(movieId: number) {
  return authApi.post("favorites", { json: { movieId } }).json<ApiResponse<Favorite>>();
}

// DELETE /favorites/{movieId}
export function removeFavorite(movieId: number) {
  return authApi.delete(`favorites/${movieId}`).json<ApiResponse<null>>();
}
