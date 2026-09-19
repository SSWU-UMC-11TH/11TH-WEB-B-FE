import type { Movie } from "../types/movie";

/** Figma 영화 목록 프레임에서 내려받은 카드 10개의 더미 데이터예요. */
export const initialMovies: Movie[] = [
  {
    id: 1,
    title: "스파이더맨: 브랜드 뉴 데이",
    releaseDate: "2026.07.29",
    posterUrl: "/posters/spider-man-brand-new-day.png",
    isBookmarked: false,
    originalTitle: "Spider-Man: Brand New Day",
    genres: ["SF", "액션", "모험"],
    runtimeMinutes: 145,
    tagline: "스파이더맨의 새로운 날을 확인하라!",
    synopsis:
      "4년 전 소중한 사람들을 지키기 위해 모두의 기억에서 사라진 피터 파커. 친절한 이웃 스파이더맨으로서 뉴욕을 지키며 고독\n한 삶을 살아가던 피터는 예상치 못한 DNA 변이와 자신의 정체를 아는 적을 마주한다.",
    backdropUrl: "/detail/detail-stage.png",
    detailPosterUrl: "/detail/poster.png",
  },
  {
    id: 2,
    title: "오디세이",
    releaseDate: "2026.08.05",
    posterUrl: "/posters/odyssey.png",
    isBookmarked: true,
  },
  {
    id: 3,
    title: "스파이더맨: 노 웨이 홈",
    releaseDate: "2021.12.15",
    posterUrl: "/posters/spider-man-no-way-home.png",
    isBookmarked: false,
  },
  {
    id: 4,
    title: "라스트 하우스",
    releaseDate: "2026.08.07",
    posterUrl: "/posters/the-last-house.png",
    isBookmarked: false,
  },
  {
    id: 5,
    title: "미니언즈 & 몬스터즈",
    releaseDate: "2026.07.15",
    posterUrl: "/posters/minions-and-monsters.png",
    isBookmarked: false,
  },
  {
    id: 6,
    title: "군체",
    releaseDate: "2026.05.21",
    posterUrl: "/posters/gunche.png",
    isBookmarked: false,
  },
  {
    id: 7,
    title: "토이 스토리 5",
    releaseDate: "2026.06.17",
    posterUrl: "/posters/toy-story-5.png",
    isBookmarked: true,
  },
  {
    id: 8,
    title: "로빈 후드의 죽음",
    releaseDate: "2026.06.18",
    posterUrl: "/posters/the-death-of-robin-hood.png",
    isBookmarked: false,
  },
  {
    id: 9,
    title: "이블 데드 번",
    releaseDate: "2026.07.07",
    posterUrl: "/posters/evil-dead-burn.png",
    isBookmarked: false,
  },
  {
    id: 10,
    title: "옵세션",
    releaseDate: "2026.09.02",
    posterUrl: "/posters/obsession.png",
    isBookmarked: false,
  },
];
