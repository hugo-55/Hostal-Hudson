'use client';
import { useEffect, useRef, useState } from 'react';

// Carrusel de testimonios + contador animado al entrar en pantalla.
export function TestimonialCarousel({ items }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [items.length]);
  const t = items[i];
  return (
    <div className="t-carousel">
      <div className="review-stars">★★★★★</div>
      <p className="t-quote">“{t.text}”</p>
      <p><strong>{t.name}</strong> <span className="muted">· {t.tag}</span></p>
      <div className="slide-dots dark">
        {items.map((_, k) => (
          <button key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`Opinión ${k + 1}`} />
        ))}
      </div>
    </div>
  );
}

export function CountUp({ to, suffix = '' }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / 1200);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <b ref={ref}>{val}{suffix}</b>;
}
