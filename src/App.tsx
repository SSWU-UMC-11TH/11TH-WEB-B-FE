import Header from "./components/header";
import MovieGrid from "./components/movie-grid";
import Pagination from "./components/pagination";

export default function App() {
  return (
    <>
      <Header />

      <main>
        <h1>영화 목록</h1>
        <MovieGrid />
        <Pagination />
      </main>
    </>
  );
}