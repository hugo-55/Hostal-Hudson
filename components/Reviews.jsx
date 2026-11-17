'use client';
import { TESTIMONIALS } from '../lib/site';
import { useLang } from '../lib/i18n';

// Tres reseñas reales publicadas en Google (texto sin editar). Si el orden de
// lib/site.js cambia, el bloque sigue funcionando con las tres primeras.
const FEATURED = ['Rodrigo Valenzuela', 'Dedy Lincoqueo Soto', 'Oscar Liendo'];
const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps/search/?api=1&query=Hostal+Hudson+Puerto+Aysen';

function featuredReviews() {
  const picked = FEATURED.map((name) => TESTIMONIALS.find((r) => r.name === name)).filter(Boolean);
  return picked.length === FEATURED.length ? picked : TESTIMONIALS.slice(0, 3);
}

function Stars({ count = 5, label }) {
  return (
    <span className="quote-stars" role="img" aria-label={label}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export default function Reviews() {
  const { t } = useLang();
  const h = t.home;

  return (
    <section className="section reviews" id="resenas">
      <div className="wrap">
        <div className="reviews-head">
          <span className="kicker kicker-wood">{h.reviewsKicker}</span>
          <h2>{h.reviewsTitle}</h2>
          <p className="reviews-sub">{h.reviewsSub}</p>
        </div>

        <div className="quote-cards">
          {featuredReviews().map((r) => (
            <blockquote className="quote-card" key={r.name}>
              <div>
                <Stars count={r.rating || 5} label={h.ratingAria} />
                <p>“{r.text}”</p>
              </div>
              <footer>
                <cite>{r.name}</cite>
                <span>{h.reviewSource}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="reviews-more">
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
            {h.reviewsMore} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
