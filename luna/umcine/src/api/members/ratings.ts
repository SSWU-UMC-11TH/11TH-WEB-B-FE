import { apiClient, authenticatedApiClient, unwrapResult, type ApiResponse } from '../api-client'

export interface Rating {
  ratingId: number
  movieId: number
  score: number
  comment: string | null
  createdAt: string
  updatedAt: string
}

export interface RatingInput {
  score: number
  comment?: string
}

export function getMemberRatings(memberId: string, signal: AbortSignal) {
  return apiClient.get(`members/${memberId}/ratings`, { signal }).json<Rating[]>()
}

export async function createRating(input: RatingInput & { movieId: number }) {
  const response = await authenticatedApiClient.post('ratings', { json: input }).json<ApiResponse<Rating>>()
  return unwrapResult(response)
}

export async function updateRating(ratingId: number, input: RatingInput) {
  const response = await authenticatedApiClient.patch(`ratings/${ratingId}`, { json: input }).json<ApiResponse<Rating>>()
  return unwrapResult(response)
}

export async function deleteRating(ratingId: number) {
  const response = await authenticatedApiClient.delete(`ratings/${ratingId}`).json<ApiResponse<null>>()
  return unwrapResult(response)
}
