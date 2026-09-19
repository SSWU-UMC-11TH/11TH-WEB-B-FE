import { useState } from "react";
import Header from "./components/header";
import MovieGrid from "./components/movie-grid";
import MovieDetailPage from "./components/movie-detail-page";
import SearchPage from "./components/search-page";
import LoginPage from "./components/login-page";
import SignupPage from "./components/signup-page";
import Footer from "./components/footer";
import { initialMovies } from "./data/movies";
import type { Tab } from "./types/tab";
import "./App.css";

export default function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [currentTab, setCurrentTab] = useState<Tab>("movies");
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  function handleSelectMovie(movieId: number) {
    setSelectedMovieId(movieId);
    setCurrentTab("detail");
  }

  function handleSearch(keyword: string) {
    // TODO: 검색 결과 화면은 아직 시안이 없어 우선 Console로만 확인해요.
    console.log("검색어:", keyword);
  }

  const selectedMovie = movies.find((movie) => movie.id === selectedMovieId);

  return (
    <div className="app">
      <Header currentTab={currentTab} onChangeTab={setCurrentTab} />

      <main className="app__main">
        {currentTab === "movies" ? (
          <>
            <h1 className="app__title">영화 목록</h1>
            <MovieGrid
              movies={movies}
              onToggleBookmark={handleToggleBookmark}
              onSelectMovie={handleSelectMovie}
            />
          </>
        ) : currentTab === "search" ? (
          <SearchPage onSearch={handleSearch} />
        ) : currentTab === "login" ? (
          <LoginPage onSignUp={() => setCurrentTab("signup")} />
        ) : currentTab === "signup" ? (
          <SignupPage onLogin={() => setCurrentTab("login")} />
        ) : selectedMovie ? (
          <MovieDetailPage
            movie={selectedMovie}
            onBack={() => setCurrentTab("movies")}
            onToggleBookmark={handleToggleBookmark}
          />
        ) : (
          <p>영화를 찾을 수 없어요.</p>
        )}
      </main>

      {(currentTab === "movies" || currentTab === "detail") && <Footer />}
    </div>
  );
}
