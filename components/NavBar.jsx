'use client';
import { useState } from 'react';
import { useLang } from '../lib/i18n';

// Menú móvil con hamburguesa + selector de idioma ES/EN.
export function NavBar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <a className="logo" href="/"><img src="/img/logo.png" alt="Hostal Hudson" /> <span>Hostal Hudson<small>{t.brandSub}</small></span></a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
          <a className="nav-cta" href="/reservas" onClick={() => setOpen(false)}>{t.nav.book}</a>
        </nav>
      </div>
    </div>
  );
}
