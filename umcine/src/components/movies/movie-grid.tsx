import type { Movie } from "../../types/movie";
import { MovieCard } from "./movie-card";

interface MovieGridProps {
  movies: Movie[];
  onToggleBookmark: (movieId: number) => void;
}

export function MovieGrid({ movies, onToggleBookmark }: MovieGridProps) {
  if (movies.length === 0) {
    return <p className="py-16 text-center text-[#8b929c]">표시할 영화가 없어요.</p>;
  }

  return (
    <ul className="grid list-none grid-cols-2 gap-x-[18px] gap-y-6 p-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieCard movie={movie} onToggleBookmark={onToggleBookmark} />
        </li>
      ))}
    </ul>
  );
}
