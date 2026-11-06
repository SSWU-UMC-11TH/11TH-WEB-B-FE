import type { TmdbMovieListItem } from "../../api/movies/models";
import { MovieCard } from "./movie-card";

interface MovieGridProps {
  movies: TmdbMovieListItem[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) {
    return <p className="py-16 text-center text-[#8b929c]">조건에 맞는 영화가 없어요.</p>;
  }

  return (
    <ul className="grid list-none grid-cols-2 gap-x-[18px] gap-y-6 p-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
}
