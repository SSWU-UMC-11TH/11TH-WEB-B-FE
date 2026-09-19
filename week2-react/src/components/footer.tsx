import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <img
          className="footer__logo"
          src="/images/logos/tmdb-logo.svg"
          alt="TMDB"
          width={24}
          height={24}
        />
        <p className="footer__text">
          This product uses the TMDB API but is not endorsed or certified by{" "}
          <a
            className="footer__link"
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
          >
            TMDB
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
