import { movies } from "../../data/movies";
import { MovieGrid } from "../../components/movies/movie-grid";

export function MovieListPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] flex-1 px-6 pb-10 pt-6 md:px-20 md:pt-[30px]">
      <h1 className="mb-7 text-[38px] font-bold leading-[44px] tracking-[-1.71px] text-[#17191e]">
        영화 목록
      </h1>
      <MovieGrid movies={movies} />
    </main>
  );
}
