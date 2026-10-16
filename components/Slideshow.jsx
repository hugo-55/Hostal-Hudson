'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Hero slideshow con fotos reales. Auto-avanza cada 6s, flechas + puntos.
export default function Slideshow({ slides }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);
  return (
    <div className="slideshow">
      {slides.map((s, k) => (
        <div key={s.src} className={`slide ${k === i ? 'active' : ''}`} aria-hidden={k !== i}>
          <Image src={s.src} alt={s.alt} fill priority={k === 0} sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
      ))}
      <button className="slide-arrow left" onClick={() => setI((i - 1 + slides.length) % slides.length)} aria-label="Anterior">‹</button>
      <button className="slide-arrow right" onClick={() => setI((i + 1) % slides.length)} aria-label="Siguiente">›</button>
      <div className="slide-dots">
        {slides.map((s, k) => (
          <button key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`Foto ${k + 1}`} />
        ))}
      </div>
    </div>
  );
}
