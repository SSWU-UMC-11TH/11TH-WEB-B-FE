import { useState } from "react";
import Header from "./components/header";
import MovieGrid from "./components/movie-grid";
import MovieDetailPage from "./components/movie-detail-page";
import SearchPage from "./components/search-page";
import LoginPage from "./components/login-page";
import SignupPage from "./components/signup-page";
import ProfilePage from "./components/profile-page";
import ProfileEditPage from "./components/profile-edit-page";
import Footer from "./components/footer";
import { movies as listMovies, detailOnlyMovies } from "./data/movies";
import { currentUser } from "./data/current-user";
import type { UserProfile } from "./data/current-user";
import type { Tab } from "./types/tab";
import "./App.css";

const listMovieIds = new Set(listMovies.map((movie) => movie.id));

export default function App() {
  const [movies, setMovies] = useState([...listMovies, ...detailOnlyMovies]);
  const [currentTab, setCurrentTab] = useState<Tab>("movies");
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [profile, setProfile] = useState<UserProfile>(currentUser);

  function handleSaveProfile(changes: Pick<UserProfile, "nickname" | "avatarUrl">) {
    setProfile((currentProfile) => ({ ...currentProfile, ...changes }));
    setCurrentTab("profile");
  }

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

  const selectedMovie = movies.find((movie) => movie.id === selectedMovieId);

  return (
    <div className="app">
      <Header currentTab={currentTab} onChangeTab={setCurrentTab} />

      <main className="app__main">
        {currentTab === "movies" ? (
          <>
            <h1 className="app__title">영화 목록</h1>
            <MovieGrid
              movies={movies.filter((movie) => listMovieIds.has(movie.id))}
              onToggleBookmark={handleToggleBookmark}
              onSelectMovie={handleSelectMovie}
            />
          </>
        ) : currentTab === "search" ? (
          <SearchPage onSelectMovie={handleSelectMovie} />
        ) : currentTab === "login" ? (
          <LoginPage onSignUp={() => setCurrentTab("signup")} />
        ) : currentTab === "signup" ? (
          <SignupPage onLogin={() => setCurrentTab("login")} />
        ) : currentTab === "profile" ? (
          <ProfilePage
            profile={profile}
            bookmarkedMovies={movies.filter((movie) => movie.isBookmarked)}
            onSelectMovie={handleSelectMovie}
            onEditProfile={() => setCurrentTab("profile-edit")}
          />
        ) : currentTab === "profile-edit" ? (
          <ProfileEditPage profile={profile} onSave={handleSaveProfile} />
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

      {(currentTab === "movies" ||
        currentTab === "detail" ||
        currentTab === "search" ||
        currentTab === "profile") && <Footer />}
    </div>
  );
}
