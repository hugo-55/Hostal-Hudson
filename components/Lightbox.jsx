'use client';
import { useCallback, useEffect, useState } from 'react';
import SmartImg from './SmartImg';

// Galería con lightbox: clic para ampliar, flechas y Escape.
export default function LightboxGallery({ photos }) {
  const [open, setOpen] = useState(null);
  const close = () => setOpen(null);
  const step = useCallback((d) => setOpen((v) => (v + d + photos.length) % photos.length), [photos.length]);
  useEffect(() => {
    if (open === null) return;
    const h = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, step]);
  return (
    <>
      <div className="masonry">
        {photos.map((p, k) => (
          <button key={p.src} className="g-item" onClick={() => setOpen(k)} aria-label={`Ampliar: ${p.alt}`}>
            <SmartImg src={p.src} alt={p.alt} height={230} />
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="lightbox" onClick={close}>
          <button className="lb-close" aria-label="Cerrar">✕</button>
          <button className="lb-arrow left" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Anterior">‹</button>
          <img src={photos[open].src} alt={photos[open].alt} onClick={(e) => e.stopPropagation()} />
          <button className="lb-arrow right" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Siguiente">›</button>
          <div className="lb-cap">{photos[open].alt} · {open + 1}/{photos.length}</div>
        </div>
      )}
    </>
  );
}
