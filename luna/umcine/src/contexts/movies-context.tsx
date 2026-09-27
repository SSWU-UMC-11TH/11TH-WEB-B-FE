import { createContext, useContext, useState, type ReactNode } from 'react'
import { movies as initialMovies } from '../data/movies'
import type { Movie } from '../types/movie'

const MoviesContext = createContext<{
  movies: Movie[]
  toggleBookmark: (movieId: number) => void
} | null>(null)

export function MoviesProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState(initialMovies)

  function toggleBookmark(movieId: number) {
    setMovies((current) => current.map((movie) =>
      movie.id === movieId ? { ...movie, isBookmarked: !movie.isBookmarked } : movie,
    ))
  }

  return <MoviesContext.Provider value={{ movies, toggleBookmark }}>{children}</MoviesContext.Provider>
}

export function useMovies() {
  const context = useContext(MoviesContext)
  if (!context) throw new Error('useMovies must be used within MoviesProvider')
  return context
}
