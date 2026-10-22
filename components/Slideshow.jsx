'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Hero slideshow con fotos reales. Auto-avanza cada 6s, flechas + puntos.
//
// RENDIMIENTO: antes se montaban las 4 fotos a la vez (las 4 son "visibles"
// para el navegador, aunque solo se vea una) = ~1 MB descargados de entrada.
// Ahora solo se montan:
//   - la slide activa (la que se ve),
//   - la siguiente (precarga, para que al avanzar no haya un hueco), y
//   - la anterior (para que se vea el fundido de salida de verdad).
// Al cargar la portada se baja la mitad; el resto se sigue viendo igual.
export default function Slideshow({ slides }) {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState(null);
  const n = slides.length;

  const go = (target) => {
    const next = ((target % n) + n) % n;
    if (next === i) return;
    setPrev(i);
    setI(next);
  };

  useEffect(() => {
    const t = setInterval(() => go(i + 1), 6000);
    return () => clearInterval(t);
  }, [i, n]);

  // Soltamos la slide anterior cuando termina el fundido (1.2s en el CSS).
  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), 1300);
    return () => clearTimeout(t);
  }, [prev]);

  const idxs = new Set([i, (i + 1) % n]);
  if (prev !== null) idxs.add(prev);

  return (
    <div className="slideshow">
      {[...idxs].map((k) => (
        <div key={slides[k].src} className={`slide ${k === i ? 'active' : ''}`} aria-hidden={k !== i}>
          <Image
            src={slides[k].src}
            alt={slides[k].alt}
            fill
            priority={k === 0}
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}
      <button className="slide-arrow left" onClick={() => go(i - 1)} aria-label="Anterior">‹</button>
      <button className="slide-arrow right" onClick={() => go(i + 1)} aria-label="Siguiente">›</button>
      <div className="slide-dots">
        {slides.map((s, k) => (
          <button key={k} className={k === i ? 'on' : ''} onClick={() => go(k)} aria-label={`Foto ${k + 1}`} />
        ))}
      </div>
    </div>
  );
}
