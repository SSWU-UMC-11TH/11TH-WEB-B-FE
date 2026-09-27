import { createFileRoute } from '@tanstack/react-router'
import MovieListPage from '../pages/movies/movie-list-page'
import { useMovies } from '../contexts/movies-context'

export const Route = createFileRoute('/')({ component: MoviesRoute })

function MoviesRoute() {
  const { movies, toggleBookmark } = useMovies()
  return (
    <main>
      <MovieListPage movies={movies.slice(0, 10)} onToggleBookmark={toggleBookmark} />
    </main>
  )
}
