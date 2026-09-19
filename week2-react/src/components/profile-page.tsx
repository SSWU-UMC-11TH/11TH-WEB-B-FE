import { useState } from "react";
import type { Movie } from "../types/movie";
import { currentUser } from "../data/current-user";
import Pagination from "./pagination";
import "./profile-page.css";

interface ProfilePageProps {
  bookmarkedMovies: Movie[];
  onSelectMovie: (movieId: number) => void;
}

const PAGE_SIZE = 3;

export default function ProfilePage({
  bookmarkedMovies,
  onSelectMovie,
}: ProfilePageProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(bookmarkedMovies.length / PAGE_SIZE));
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const visibleMovies = bookmarkedMovies.slice(pageStart, pageStart + PAGE_SIZE);

  function handleEditProfile() {
    // TODO: 실제 정보 수정 화면 연동은 이후 주차에서 이어가요.
    console.log("정보 수정 클릭");
  }

  return (
    <section className="profile-page">
      <div className="profile-page__header">
        <h1 className="profile-page__title">내 정보</h1>
        <button
          type="button"
          className="profile-page__edit-button"
          onClick={handleEditProfile}
        >
          정보 수정
        </button>
      </div>

      <div className="profile-page__section">
        <h2 className="profile-page__section-title">기본 정보</h2>
        <div className="profile-page__basic-info">
          <img
            className="profile-page__avatar"
            src="/avatar.png"
            alt=""
            aria-hidden="true"
            width={64}
            height={64}
          />

          <div className="profile-page__field">
            <p className="profile-page__field-label">닉네임</p>
            <p className="profile-page__field-value">{currentUser.nickname}</p>
          </div>

          <div className="profile-page__field">
            <p className="profile-page__field-label">이메일</p>
            <p className="profile-page__field-value">{currentUser.email}</p>
          </div>
        </div>
      </div>

      <div className="profile-page__section profile-page__section--last">
        <h2 className="profile-page__section-title">내 즐겨찾기</h2>

        {bookmarkedMovies.length === 0 ? (
          <p className="profile-page__empty">
            아직 즐겨찾기한 영화가 없어요.
          </p>
        ) : (
          <>
            <ul className="profile-page__grid">
              {visibleMovies.map((movie) => (
                <li key={movie.id}>
                  <button
                    type="button"
                    className="profile-movie-card"
                    onClick={() => onSelectMovie(movie.id)}
                  >
                    <img
                      className="profile-movie-card__poster"
                      src={movie.posterPath}
                      alt={`${movie.title} 포스터`}
                    />
                    <span className="profile-movie-card__title">
                      {movie.title}
                    </span>
                    <span className="profile-movie-card__release-date">
                      {movie.releaseDate}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChangePage={setCurrentPage}
            />
          </>
        )}
      </div>
    </section>
  );
}
