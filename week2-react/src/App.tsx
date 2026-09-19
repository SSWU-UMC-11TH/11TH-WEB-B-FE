import { useState } from "react";
import Header from "./components/header";
import MovieGrid from "./components/movie-grid";
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

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  function handleSearch(keyword: string) {
    // TODO: 검색 결과 화면은 아직 시안이 없어 우선 Console로만 확인해요.
    console.log("검색어:", keyword);
  }

  return (
    <div className="app">
      <Header currentTab={currentTab} onChangeTab={setCurrentTab} />

      <main className="app__main">
        {currentTab === "movies" ? (
          <>
            <h1 className="app__title">영화 목록</h1>
            <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
          </>
        ) : currentTab === "search" ? (
          <SearchPage onSearch={handleSearch} />
        ) : currentTab === "login" ? (
          <LoginPage onSignUp={() => setCurrentTab("signup")} />
        ) : (
          <SignupPage onLogin={() => setCurrentTab("login")} />
        )}
      </main>

      {currentTab === "movies" && <Footer />}
    </div>
  );
}
