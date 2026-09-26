export interface SearchMovie {
  // 영화 목록(movies.ts)과 같은 id를 써야 상세 화면에서 같은 영화를 찾을 수 있어요.
  movieId: number;
  title: string;
  originalTitle: string;
  releaseDate: string;
  synopsis: string;
  posterUrl: string;
}

/** "스파이더맨" 검색 데모용 더미 데이터예요. 실제 검색 API 연동은 이후 주차에서 이어가요. */
export const spiderManSearchResults: SearchMovie[] = [
  {
    movieId: 11,
    title: "스파이더맨",
    originalTitle: "Spider-Man",
    releaseDate: "2002.05.03",
    synopsis:
      "방사능 거미에 물려 특별한 능력을 얻은 피터 파커는 벤 아저씨의 죽음을 계기로 그 힘을 악과 맞서는 데 쓰기로 한다.",
    posterUrl: "/posters/search/spider-man.png",
  },
  {
    movieId: 1,
    title: "스파이더맨: 브랜드 뉴 데이",
    originalTitle: "Spider-Man: Brand New Day",
    releaseDate: "2026.07.29",
    synopsis:
      "모두의 기억에서 사라진 피터 파커가 통제할 수 없는 새로운 힘과 자신의 정체를 아는 적을 마주한다.",
    posterUrl: "/posters/search/spider-man-brand.png",
  },
  {
    movieId: 12,
    title: "스파이더맨: 홈커밍",
    originalTitle: "Spider-Man: Homecoming",
    releaseDate: "2017.07.05",
    synopsis:
      "평범한 고등학생과 히어로 사이를 오가는 피터는 스스로의 힘으로 새로운 빌런을 막으려 한다.",
    posterUrl: "/posters/search/spider-man-homecoming.png",
  },
  {
    movieId: 3,
    title: "스파이더맨: 노 웨이 홈",
    originalTitle: "Spider-Man: No Way Home",
    releaseDate: "2021.12.15",
    synopsis:
      "정체가 드러난 피터 파커는 닥터 스트레인지에게 도움을 청하지만 멀티버스의 문이 열리고 만다.",
    posterUrl: "/posters/search/spider-man-noway.png",
  },
  {
    movieId: 13,
    title: "어메이징 스파이더맨",
    originalTitle: "The Amazing Spider-Man",
    releaseDate: "2012.06.28",
    synopsis:
      "부모의 실종을 추적하던 피터는 코너스 박사의 연구실에서 사고를 겪고 특별한 능력을 얻는다.",
    posterUrl: "/posters/search/the-amazing-spider-man.png",
  },
  {
    movieId: 14,
    title: "스파이더맨 3",
    originalTitle: "Spider-Man 3",
    releaseDate: "2007.05.01",
    synopsis:
      "심비오트에 감염된 피터는 강해진 힘에 도취되고, 뉴 고블린과 샌드맨의 위협을 동시에 마주한다.",
    posterUrl: "/posters/search/spider-man-3.png",
  },
];
