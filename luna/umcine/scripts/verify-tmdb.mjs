import assert from 'node:assert/strict'
import { createServer } from 'vite'

// 실제 소스의 API 함수를 검증하며 토큰과 요청 헤더는 출력하지 않습니다.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { getMovies, searchMovies, getMovieDetail, isValidMovieId } = await server.ssrLoadModule('/src/api/movies/index.ts')
  const { getMoviesWithFetch } = await server.ssrLoadModule('/src/api/movies/get-movies-with-fetch.ts')
  for (const id of ['abc', '0', '-1', '1.5', '1e3', '9007199254740992']) assert.equal(isValidMovieId(id), false)
  assert.equal(isValidMovieId('550'), true)
  console.log('Movie ID validation: PASS')
  const popular = await getMovies()
  assert.ok(popular.results.length > 0)
  console.log(`ky popular: PASS (${popular.results.length} results)`)
  const fetched = await getMoviesWithFetch()
  assert.ok(fetched.results.length > 0)
  console.log(`fetch popular: PASS (${fetched.results.length} results)`)
  const search = await searchMovies('스파이더맨')
  assert.ok(search.total_results > 0)
  console.log(`search: PASS (${search.total_results} results)`)
  const empty = await searchMovies('zzzz_umcine_no_result_987654321')
  assert.equal(empty.results.length, 0)
  console.log('empty search: PASS')
  const detail = await getMovieDetail(String(popular.results[0].id))
  assert.equal(detail.id, popular.results[0].id)
  assert.ok(Array.isArray(detail.genres))
  console.log(`detail: PASS (movie ID ${detail.id})`)
  try {
    await getMovieDetail('2147483647')
    assert.fail('Expected 404')
  } catch (error) {
    assert.equal(error.response?.status, 404)
    console.log('nonexistent movie: PASS (HTTP 404)')
  }
  for (const path of ['/', '/search?query=%EC%8A%A4%ED%8C%8C%EC%9D%B4%EB%8D%94%EB%A7%A8', `/movies/${detail.id}`, '/movies/abc']) {
    for (let attempt = 0; attempt < 2; attempt++) {
      const response = await fetch(`http://127.0.0.1:5173${path}`)
      assert.equal(response.status, 200)
      assert.ok((await response.text()).includes('/src/main.tsx'))
    }
    console.log(`HTML direct access + repeated request: PASS (${path})`)
  }
} catch (error) {
  // HTTPError는 요청 객체와 토큰을 포함할 수 있어 전체 객체를 출력하지 않습니다.
  console.error(`Verification failed: ${error.name}; HTTP ${error.response?.status ?? 'n/a'}; code ${error.cause?.code ?? error.code ?? 'n/a'}`)
  process.exitCode = 1
} finally {
  await server.close()
}
