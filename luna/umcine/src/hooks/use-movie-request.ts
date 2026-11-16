import { useEffect, useState } from 'react'
import { getMovieErrorMessage } from '../utils/movie-error-message'

type RequestState<T> =
  | { status: 'idle' | 'loading'; data?: undefined; error?: undefined }
  | { status: 'success'; data: T; error?: undefined }
  | { status: 'error'; data?: undefined; error: string }

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
      if (!controller.signal.aborted) setResult({ key, state: { status: 'error', error: getMovieErrorMessage(error, '영화 데이터를 불러오지 못했습니다.') } })
    })
    return () => controller.abort()
  }, [key, request, enabled])
  if (!enabled) return { status: 'idle' }
  return result.key === key ? result.state : { status: 'loading' }
}
