'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLang } from '../lib/i18n';

// Header del rediseño: logo real arriba a la izquierda con la línea de lugar,
// navegación con anclas de la home y botón de reserva. En móvil se pliega.
export function NavBar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <header className={`site-header${open ? ' nav-open' : ''}`}>
      <div className="wrap site-header-inner">
        <a className="brand" href="/" aria-label="Hostal Hudson — Inicio">
          <img
            className="brand-logo"
            src="/img/logo.png"
            width="179"
            height="70"
            alt="Hostal Hudson"
          />
          <span className="brand-place">{t.brandSub}</span>
        </a>

        <nav id="primary-nav" className="site-nav" aria-label={t.navA11y.primary}>
          <a href="/" aria-current={pathname === '/' ? 'page' : undefined} onClick={close}>
            {t.nav.home}
          </a>
          <a
            href="/habitaciones"
            aria-current={pathname === '/habitaciones' ? 'page' : undefined}
            onClick={close}
          >
            {t.nav.rooms}
          </a>
          <a href="/#el-hostal" onClick={close}>{t.nav.hostel}</a>
          <a href="/#resenas" onClick={close}>{t.nav.reviews}</a>
          <a href="/#ubicacion" onClick={close}>{t.nav.location}</a>
          <a className="btn" href="/reservas" onClick={close}>{t.nav.book}</a>
        </nav>

        <div className="header-end">
          <div className="lang-toggle" role="group" aria-label={t.navA11y.lang}>
            <button
              type="button"
              className={lang === 'es' ? 'on' : ''}
              onClick={() => setLang('es')}
              aria-pressed={lang === 'es'}
            >
              ES
            </button>
            <button
              type="button"
              className={lang === 'en' ? 'on' : ''}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            className="nav-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? t.navA11y.close : t.navA11y.open}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {open ? (
                <>
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
            <span>{t.navA11y.menu}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
