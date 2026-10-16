'use client';
import { useEffect, useRef, useState } from 'react';
import { waLink, HOSTAL_PHONE, HOSTAL_PHONE_DISPLAY } from '../lib/site';
import { useLang } from '../lib/i18n';

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

// Título único por página (las páginas son client, esto actualiza document.title).
export function PageTitle({ title }) {
  useEffect(() => {
    document.title = `${title} | Hostal Hudson`;
  }, [title]);
  return null;
}

// Migas de pan Home › Página.
export function Breadcrumb({ trail }) {
  const { t } = useLang();
  return (
    <p className="muted crumbs">
      <a href="/">{t.nav.home}</a>
      {trail.map((s) => <span key={s}> › {s}</span>)}
    </p>
  );
}

// Aparece suavemente al entrar en pantalla.
export function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('in'); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

// Compartir esta página por WhatsApp.
export function ShareBar({ text }) {
  const { lang } = useLang();
  const [url, setUrl] = useState('');
  useEffect(() => { setUrl(window.location.href); }, []);
  if (!url) return null;
  const msg = `${text || (lang === 'es' ? 'Mira esto de Hostal Hudson' : 'Look at this from Hostal Hudson')}: ${url}`;
  return (
    <p>
      <a className="btn btn-outline" href={`https://wa.me/?text=${encodeURIComponent(msg)}`} target="_blank">
        ↗ {lang === 'es' ? 'Compartir por WhatsApp' : 'Share via WhatsApp'}
      </a>
    </p>
  );
}
// Barra de reserva fija solo en móvil: siempre visible al hacer scroll.
export function StickyBook() {
  const { t } = useLang();
  return (
    <div className="sticky-book">
      <a href={`tel:+${HOSTAL_PHONE}`}>📞 {HOSTAL_PHONE_DISPLAY}</a>
      <a className="btn btn-green" href={waLink('Hola Hostal Hudson, quiero reservar')} target="_blank">{t.nav.book}</a>
    </div>
  );
}
