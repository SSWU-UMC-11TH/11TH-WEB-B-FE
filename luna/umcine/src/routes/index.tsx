import { createFileRoute } from '@tanstack/react-router'
import MovieListPage from '../pages/movies/movie-list-page'
import { movies } from '../data/movies'

export const Route = createFileRoute('/')({ component: MoviesRoute })

function MoviesRoute() {
  return (
    <main>
      <MovieListPage movies={movies.slice(0, 10)} />
    </main>
  )
}
