import { HTTPError, TimeoutError } from 'ky'

export function getMovieErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof HTTPError) {
    const status = error.response.status

    if (status === 401 || status === 403) {
      return 'TMDB 인증에 실패했습니다. API 토큰을 확인해 주세요.'
    }

    if (status === 404) {
      return '존재하지 않는 영화 정보입니다. 영화를 찾을 수 없어요.'
    }

    if (status === 429) {
      return '요청이 너무 많습니다. 잠시 후 확인해 주세요.'
    }

    if (status >= 500) {
      return '영화 서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'
    }

    return `영화 요청에 실패했습니다. (HTTP ${status})`
  }

  if (error instanceof TimeoutError) {
    return '서버 응답 시간이 초과되었습니다.'
  }

  if (error instanceof TypeError) {
    return '영화 데이터를 불러오지 못했습니다. 네트워크 연결을 확인해 주세요.'
  }

  return fallback
}
