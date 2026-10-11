# UMC 11기 프론트엔드 5주차 필수 미션

## 기존 코드 분석

- React 18 + TypeScript + Vite 5, TanStack Router 파일 기반 라우팅입니다.
- `src/routes`는 `/`, `/search?query=...`, `/movies/$movieId`를 연결합니다.
- `src/pages/movies`와 `src/components/movies`가 화면과 카드/그리드를 분리합니다.
- 기존 화면은 `src/data/movies.ts`의 로컬 데이터를 사용했습니다. 이 파일과 기존 타입은 참고용으로 보존하고 실제 화면은 TMDB snake_case 타입을 직접 사용합니다.
- `src/stores/bookmark-store.ts`는 ID 배열을 `umcine-bookmark-store` 키로 persist합니다. 저장소 구현과 키를 그대로 유지했습니다.
- 헤더와 로그인 관련 영역은 변경하지 않았습니다.
- 기존 `.gitignore`의 `.env.local` 패턴은 루트와 `src/.env.local` 모두 제외합니다. 환경 파일은 Git 추적 대상도 아닙니다. 사용자 수정분을 유지했습니다.
- 환경 파일은 프로젝트 최상위 `.env.local`에 있습니다. Vite의 기본 root/envDir을 사용해 최상위 환경 파일을 읽습니다. 별도 `loadEnv` 호출은 필요하지 않습니다.

## 구현

- `src/config/env.ts`: 기존 환경 변수 이름을 읽고 토큰 누락을 처리합니다.
- `src/api/movies/models.ts`: 목록, 검색, 상세 응답의 snake_case 타입과 nullable 이미지 경로입니다.
- `src/api/movies/get-movies-with-fetch.ts`: 순수 fetch, Bearer 인증, `response.ok` 오류 검사입니다.
- `src/api/tmdb-client.ts`: ky 공통 URL, 한국어, 인증, 타임아웃 설정입니다.
- `src/api/movies/index.ts`: `getMovies`, `searchMovies`, `getMovieDetail`과 ID 유효성 검사입니다.
- `src/hooks/use-movie-request.ts`: 요청 상태 구분과 AbortController 정리, 변경된 검색어/ID의 이전 결과 숨김입니다.
- `src/components/movies/movie-image.tsx`: 이미지 없음 또는 로드 실패 시 동일 크기 회색 영역입니다.
- `src/components/movies/request-status.tsx`: 로딩과 오류 메시지입니다.
- 카드/그리드와 세 페이지에 실제 데이터, 빈 결과를 연결하고 디자인과 반응형 클래스를 유지했습니다.
- 잘못된 ID는 API 호출 전에 안내하고, 유효한 ID의 HTTP 404는 존재하지 않는 영화로 안내합니다.
- 기존 TMDB 로고와 인증되지 않은 제품이라는 출처 문구를 유지하고 로고에 출처 링크를 추가했습니다.
- 다시 시도 버튼, URL 페이지네이션, adapter 함수는 추가하지 않았습니다. 기존 페이지 번호 UI는 기존처럼 API 페이지 전환 기능이 없습니다.

## ky 호환성

설치 버전은 **2.2.0**입니다. 설치된 타입 정의와 실제 요청으로 `ky.create({ baseUrl })`, `beforeRequest: [({ request }) => ...]`, `.get().json<T>()` 사용을 확인했습니다. Node 24.15.0에서 검증했습니다. 예전 예제의 `prefixUrl`이나 request를 직접 받는 훅 형식은 사용하지 않습니다.

## 실행과 fetch Network 실습

Windows PowerShell에서 실행 정책이 `pnpm.ps1`을 막으면 `pnpm.cmd`를 사용합니다.

```sh
pnpm.cmd dev --host 127.0.0.1
pnpm.cmd exec tsc --noEmit
pnpm.cmd build
```

개발 서버를 켜고 브라우저에서 `http://127.0.0.1:5173`에 접속합니다. 개발자 도구 Network의 Fetch/XHR 필터를 켠 뒤 Console에서 다음을 실행합니다. 토큰 자체는 출력하지 않습니다.

```js
const { getMoviesWithFetch } = await import('/src/api/movies/get-movies-with-fetch.ts')
const result = await getMoviesWithFetch()
console.log({ page: result.page, count: result.results.length })
```

Network에서 `movie/popular?language=ko-KR`의 상태 코드 200과 Response의 `results`, `poster_path`, `release_date`를 확인합니다. Bearer 인증 헤더는 직접 확인할 수 있지만 토큰이 포함된 Request Headers나 HAR 파일은 미션 첨부 자료에서 제외하세요.

## 검증 결과

- `pnpm.cmd exec tsc --noEmit`: 통과.
- `pnpm.cmd build`: 통과. Vite 빌드는 샌드박스 상위 디렉터리 접근 제한 때문에 승인 후 실행했습니다.
- `node scripts/verify-tmdb.mjs`: 실제 소스 함수를 Vite로 로드해 통과. 환경 변수나 헤더를 출력하지 않습니다.
- 인기 영화: ky와 fetch 각각 20개 결과.
- 스파이더맨 검색: 14개 결과. 임의의 긴 검색어: 빈 결과.
- 인기 목록의 영화 ID 969681 상세 조회 성공.
- ID `2147483647`: HTTP 404 확인.
- 잘못된 ID `abc`, `0`, `-1`, `1.5`, `1e3`, 안전한 정수 범위 초과: 유효성 검사 통과.
- `/`, `/search?query=스파이더맨`, `/movies/969681`, `/movies/abc`: 직접 HTTP 요청과 반복 요청에서 200 및 Vite 앱 진입점 확인.
- 브라우저 연결이 없어 실제 화면 렌더링, 브라우저 새로고침, 클릭, localStorage persist, 반응형, 이미지 누락 화면은 미검증입니다. HTTP 반복 요청은 브라우저 새로고침 검증을 대신하지 않습니다.
- 워크북 원문은 작업 공간에 없어 세부 요구사항 대조는 미검증입니다. TMDB 공식 출처 안내를 기준으로 기존 표기를 유지했습니다.

## 직접 확인할 항목과 캡처 위치

1. 목록 `/`: 실제 영화 카드, 북마크 선택, 모바일/데스크톱 배열, 푸터 TMDB 출처.
2. 검색 `/search?query=스파이더맨`: 검색 결과와 건수. `/search`는 입력 안내. 임의의 검색어는 빈 결과.
3. 목록 카드 클릭 또는 `/movies/969681`: 포스터, 배경, 제목, 장르명, 상영 시간. URL 직접 입력 후 새로고침.
4. `/movies/abc`: 잘못된 ID. `/movies/2147483647`: 존재하지 않는 ID. 두 오류 문구 비교 캡처.
5. 동일 영화의 목록/검색/상세에서 북마크 상태가 공유되고 새로고침 후 유지되는지 확인. Application → Local Storage의 `umcine-bookmark-store` 캡처.
6. Network Slow 3G와 새로고침으로 로딩 확인. Offline 전환 후 새로고침으로 네트워크 오류 확인.
7. Network에서 이미지 요청 URL을 차단해 회색 `이미지 없음` 표시와 동일 크기 유지 확인.
8. fetch 실습의 Network 상태 코드와 Response를 캡처. 인증 토큰을 포함한 헤더는 캡처하지 않습니다.

미션 기록 핵심 코드는 env, models, 순수 fetch, 공통 ky 클라이언트, 세 API 함수, 요청 훅, 상세 ID 분기입니다. 공식 참고: [ky 문서](https://github.com/sindresorhus/ky), [TMDB 출처 표기 안내](https://developer.themoviedb.org/docs/faq).
