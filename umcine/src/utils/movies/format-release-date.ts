// TMDB의 "2026-07-29"를 화면 표기인 "2026.07.29"로 바꿔요.
export function formatReleaseDate(releaseDate: string) {
  return releaseDate ? releaseDate.replaceAll("-", ".") : "개봉일 미정";
}
