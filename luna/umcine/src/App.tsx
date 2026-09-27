import React, { useState } from 'react'
import './App.css'
import Header from './components/layout/header'
import MovieGrid from './components/movies/movie-grid'
import Pagination from './components/movies/pagination'
import Footer from './components/layout/footer'
import { movies as initialMovies } from './data/movies'
import type { Movie } from './types/movie'
import { MovieDetailView as MovieDetailPage } from './pages/movies/movie-detail-page'
import MovieListPage from './pages/movies/movie-list-page'
import { LegacySearchPage as SearchPage } from './pages/movies/search-page'
import SearchResultsPage from './pages/search-results-page'
import LoginPage from './pages/login-page'
import SignupPage from './pages/signup-page'
import MyPage from './pages/my-page'
import MyPageEdit from './pages/my-page-edit'

type Page =
  | 'movies'
  | 'search'
  | 'search-results'
  | 'movie-detail'
  | 'login'
  | 'signup'
  | 'mypage'
  | 'mypage-edit'

export default function App() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies)
  const [page, setPage] = useState<Page>('movies')
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null)
  const [query, setQuery] = useState<string>('')
  const [user, setUser] = useState<{ email: string; nickname: string } | null>(null)

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId ? { ...movie, isBookmarked: !movie.isBookmarked } : movie
      )
    )
  }

  function goTo(p: Page, opts?: { movieId?: number; q?: string }) {
    if (opts?.movieId) setSelectedMovieId(opts.movieId)
    if (opts?.q !== undefined) setQuery(opts.q)
    setPage(p)
  }

  const selectedMovie = movies.find((m) => m.id === selectedMovieId) ?? null

  return (
    <div className="app">
      <Header />
      <main>
        {page === 'movies' && (
          <MovieListPage
            movies={movies.slice(0, 10)}
            onToggleBookmark={handleToggleBookmark}
            onSelectMovie={(id) => goTo('movie-detail', { movieId: id })}
          />
        )}

        {page === 'movie-detail' && selectedMovie && (
          <MovieDetailPage
            movie={selectedMovie}
            onBack={() => goTo('movies')}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {page === 'search' && (
          <SearchPage
            onSearch={(q) => goTo('search-results', { q })}
          />
        )}

        {page === 'search-results' && (
          <SearchResultsPage
            movies={movies}
            query={query}
            onSelectMovie={(id) => goTo('movie-detail', { movieId: id })}
          />
        )}

        {page === 'login' && (
          <LoginPage
            onLogin={(u) => {
              setUser(u)
              goTo('mypage')
            }}
            onSignup={() => goTo('signup')}
          />
        )}

        {page === 'signup' && (
          <SignupPage onLogin={() => goTo('login')} />
        )}

        {page === 'mypage' && (
          <MyPage
            user={user}
            movies={movies}
            onEdit={() => goTo('mypage-edit')}
            onSelectMovie={(id) => goTo('movie-detail', { movieId: id })}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {page === 'mypage-edit' && (
          <MyPageEdit user={user} onSave={() => goTo('mypage')} />
        )}
      </main>
      <Footer />
    </div>
  )
}
