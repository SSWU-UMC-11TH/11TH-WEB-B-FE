import { authenticatedApiClient, unwrapResult, type ApiResponse } from '../api-client'

interface Favorite {
  favoriteId: number
  movieId: number
  createdAt: string
}

export async function getFavorites(signal: AbortSignal) {
  const response = await authenticatedApiClient.get('favorites', { signal }).json<ApiResponse<Favorite[]>>()
  return unwrapResult(response)
}

export async function getFavoriteStatus(movieId: number, signal: AbortSignal) {
  const response = await authenticatedApiClient.get(`favorites/${movieId}`, { signal }).json<ApiResponse<{ isFavorite: boolean }>>()
  return unwrapResult(response).isFavorite
}

export async function addFavorite(movieId: number) {
  const response = await authenticatedApiClient.post('favorites', { json: { movieId } }).json<ApiResponse<Favorite>>()
  return unwrapResult(response)
}

export async function deleteFavorite(movieId: number) {
  const response = await authenticatedApiClient.delete(`favorites/${movieId}`).json<ApiResponse<null>>()
  return unwrapResult(response)
}
