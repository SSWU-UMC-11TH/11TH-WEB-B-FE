export interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  posterUrl: string;
  isBookmarked: boolean;
  /** 아래는 상세 화면 전용 정보예요. 아직 모든 영화에 데이터가 있지 않아 선택 값으로 둬요. */
  originalTitle?: string;
  genres?: string[];
  runtimeMinutes?: number;
  tagline?: string;
  synopsis?: string;
  backdropUrl?: string;
  detailPosterUrl?: string;
}
