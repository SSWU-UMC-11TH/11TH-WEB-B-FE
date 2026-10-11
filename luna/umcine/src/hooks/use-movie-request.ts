import { useEffect, useState } from 'react'
import { HTTPError, TimeoutError } from 'ky'

type RequestState<T> =
  | { status: 'idle' | 'loading'; data?: undefined; error?: undefined }
  | { status: 'success'; data: T; error?: undefined }
  | { status: 'error'; data?: undefined; error: string }

function errorMessage(error: unknown) {
  if (error instanceof HTTPError) {
    if (error.response.status === 404) return '존재하지 않는 영화 ID입니다. 영화를 찾을 수 없어요.'
    if (error.response.status === 401 || error.response.status === 403) return 'TMDB 인증에 실패했습니다. API 토큰을 확인해 주세요.'
    if (error.response.status === 429) return '요청이 너무 많습니다. 잠시 후 확인해 주세요.'
    return `영화 요청에 실패했습니다. (HTTP ${error.response.status})`
  }
  if (error instanceof TimeoutError) return '서버 응답 시간이 초과되었습니다.'
  if (error instanceof TypeError) return '영화 데이터를 불러오지 못했습니다. 네트워크 연결을 확인해 주세요.'
  return error instanceof Error ? error.message : '영화 데이터를 불러오지 못했습니다.'
}

// 요청 식별자가 바뀌면 이전 결과를 숨기고 이전 요청을 취소합니다.
export function useMovieRequest<T>(key: string, request: (signal: AbortSignal) => Promise<T>, enabled = true): RequestState<T> {
  const [result, setResult] = useState<{ key: string; state: RequestState<T> }>({ key, state: { status: enabled ? 'loading' : 'idle' } })
  useEffect(() => {
    if (!enabled) return
    const controller = new AbortController()
    setResult({ key, state: { status: 'loading' } })
    void Promise.resolve().then(() => request(controller.signal)).then((data) => {
      if (!controller.signal.aborted) setResult({ key, state: { status: 'success', data } })
    }).catch((error: unknown) => {
      if (!controller.signal.aborted) setResult({ key, state: { status: 'error', error: errorMessage(error) } })
    })
    return () => controller.abort()
  }, [key, request, enabled])
  if (!enabled) return { status: 'idle' }
  return result.key === key ? result.state : { status: 'loading' }
}
