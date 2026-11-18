'use client';
import { HOSTAL_PHONE_DISPLAY, ADDRESS, EMAIL, MAPS_URL, waLink } from '../lib/site';
import { useLang } from '../lib/i18n';
import { PREFS_EVENT } from './CookieConsent';

const BRIDGE_PHOTO_URL = 'https://commons.wikimedia.org/wiki/File:Puente_Presidente_Ib%C3%A1%C3%B1ez.jpg';

export default function WhatsAppButton({ text } = {}) {
  const { lang } = useLang();
  const msg = text || (lang === 'es' ? 'Hola, quiero reservar en Hostal Hudson' : 'Hi, I would like to book at Hostal Hudson');
  return (
    <a className="wa-float" href={waLink(msg)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
      </svg>
    </a>
  );
}

// Footer común. El crédito de la foto del puente solo se muestra en las
// páginas que usan esa imagen (home y habitaciones), como exige la licencia.
export function Footer({ credit = false }) {
  const { t } = useLang();
  const h = t.home;

  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div>
          <strong>Hostal Hudson</strong>
          <p>{ADDRESS}</p>
          <p>{h.footerHostLine}</p>
        </div>

        <div>
          <strong>{h.footerContact}</strong>
          <ul className="footer-list">
            <li>
              <a href={waLink('Hola Hostal Hudson, quiero consultar disponibilidad')} target="_blank" rel="noopener noreferrer">
                WhatsApp {HOSTAL_PHONE_DISPLAY}
              </a>
            </li>
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li>{h.footerReception}</li>
          </ul>
        </div>

        <div>
          <strong>{h.footerNav}</strong>
          <ul className="footer-list">
            <li><a href="/">{t.nav.home}</a></li>
            <li><a href="/habitaciones">{t.nav.rooms}</a></li>
            <li><a href="/galeria">{t.nav.gallery}</a></li>
            <li><a href="/visitar">{t.nav.visit}</a></li>
            <li><a href="/guia">{h.footerGuide}</a></li>
            <li><a href="/reservas">{t.nav.book}</a></li>
            <li><a href="/privacidad">{t.footerPrivacy}</a></li>
          </ul>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <p>
          {t.footerTag}{' '}
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">{t.directions}</a>{' '}
          <button
            type="button"
            className="link-btn"
            onClick={() => window.dispatchEvent(new CustomEvent(PREFS_EVENT))}
          >
            {t.cookies.prefs}
          </button>
        </p>
        {credit && (
          <p className="footer-credit">
            {h.footerCredit}{' '}
            <a href={BRIDGE_PHOTO_URL} target="_blank" rel="noopener noreferrer">
              Davidlohr Bueso, CC BY 2.0
            </a>
          </p>
        )}
      </div>
    </footer>
  );
}
