'use client';
import { useEffect, useState } from 'react';
import { useLang } from '../lib/i18n';

// Menú móvil con hamburguesa + selector de idioma ES/EN + modo oscuro.
export function NavBar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const { lang, setLang, t } = useLang();
  useEffect(() => {
    try {
      const saved = localStorage.getItem('hostal-theme');
      if (saved === 'dark') setDark(true);
    } catch {}
  }, []);
  useEffect(() => {
    document.body.dataset.theme = dark ? 'dark' : 'light';
    try { localStorage.setItem('hostal-theme', dark ? 'dark' : 'light'); } catch {}
  }, [dark]);
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <a className="logo" href="/"><img src="/img/logo.png" alt="Hostal Hudson" /> <span>Hostal Hudson<small>{t.brandSub}</small></span></a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="Modo oscuro / Light mode">
            {dark ? '☀️' : '🌙'}
          </button>
          <div className="lang-toggle" role="group" aria-label="Idioma / Language">
            <button className={lang === 'es' ? 'on' : ''} onClick={() => setLang('es')}>ES</button>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menú">
            <span /><span /><span />
          </button>
        </div>
        <nav className={`nav ${open ? 'open' : ''}`}>
          <a href="/" onClick={() => setOpen(false)}>{t.nav.home}</a>
          <a href="/habitaciones" onClick={() => setOpen(false)}>{t.nav.rooms}</a>
          <a href="/tarifas" onClick={() => setOpen(false)}>{t.nav.rates}</a>
          <a href="/galeria" onClick={() => setOpen(false)}>{t.nav.gallery}</a>
          <a href="/visitar" onClick={() => setOpen(false)}>{t.nav.visit}</a>
          <a className="nav-cta" href="/reservas" onClick={() => setOpen(false)}>{t.nav.book}</a>
        </nav>
      </div>
    </div>
  );
}
