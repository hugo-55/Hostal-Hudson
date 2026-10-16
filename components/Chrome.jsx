'use client';
import { HOSTAL_PHONE, HOSTAL_PHONE_DISPLAY, ADDRESS, MAPS_URL } from '../lib/site';
import { useLang } from '../lib/i18n';

export default function WhatsAppButton({ text } = {}) {
  const { lang } = useLang();
  const msg = text || (lang === 'es' ? 'Hola, quiero reservar en Hostal Hudson' : 'Hi, I would like to book at Hostal Hudson');
  const href = `https://wa.me/${HOSTAL_PHONE}?text=${encodeURIComponent(msg)}`;
  return (
    <a className="wa-float" href={href} target="_blank" rel="noreferrer" aria-label="WhatsApp">
      ✆
    </a>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <div className="footer">
      <div>
        <strong>Hostal Hudson</strong>
        <p className="muted">{ADDRESS}<br />Tel/WhatsApp: {HOSTAL_PHONE_DISPLAY}</p>
      </div>
      <div>
        <strong>{t.footerSections}</strong>
        <p className="muted">
          <a href="/habitaciones">{t.nav.rooms}</a> · <a href="/tarifas">{t.nav.rates}</a> ·{' '}
          <a href="/galeria">{t.nav.gallery}</a> · <a href="/reservas">{t.nav.book}</a>
        </p>
      </div>
      <div>
        <strong>{t.footerBook}</strong>
        <p className="muted">{t.footerTag} <a href={MAPS_URL} target="_blank">{t.directions}</a></p>
      </div>
    </div>
  );
}
