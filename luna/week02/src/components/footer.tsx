import React from 'react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="tmdb">
          <img src="/images/tmdb-logo.svg" alt="tmdb" className="tmdb-logo" />
          <div className="tmdb-attribution">
            <span>This product uses the TMDB API but is not endorsed or certified by TMDB.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
