'use client';
import { useEffect, useState } from 'react';
import { useLang } from '../lib/i18n';

const KEY = 'hostal-cookies';
export const PREFS_EVENT = 'hostal:cookie-prefs';

export function CookieConsent() {
  const { t } = useLang();
  const [mounted, setMounted] = useState(false);
  const [decision, setDecision] = useState(null); // 'accepted' | 'rejected' | null
  const [open, setOpen] = useState(false);

  // Se lee después de montar para no romper la hidratación (el servidor no tiene localStorage).
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(KEY);
      // El valor legacy '1' significaba "aceptado/cerrado": se migra a 'accepted'.
      setDecision(saved === '1' ? 'accepted' : saved);
    } catch {}
  }, []);

  // Permite reabrir desde el footer ("Preferencias de cookies").
  useEffect(() => {
    const onPrefs = () => setOpen(true);
    window.addEventListener(PREFS_EVENT, onPrefs);
    return () => window.removeEventListener(PREFS_EVENT, onPrefs);
  }, []);

  const visible = mounted && (open || !decision);

  const decide = (value) => {
    try { localStorage.setItem(KEY, value); } catch {}
    setDecision(value);
    setOpen(false);
  };

  // Al ser una tarjeta no modal no se atrapa el foco: Escape solo descarta.
  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => {
      if (e.key === 'Escape') decide('rejected');
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-labelledby="cookie-title">
      <div className="cookie-consent-content">
        <p className="cookie-title" id="cookie-title">{t.cookies.title}</p>
        <p className="cookie-text">
          {t.cookies.text}{' '}
          <a href="/privacidad">{t.cookies.more}</a>
        </p>
        <div className="cookie-actions">
          <button type="button" className="btn btn-green" onClick={() => decide('accepted')}>
            {t.cookies.accept}
          </button>
          <button type="button" className="btn btn-outline" onClick={() => decide('rejected')}>
            {t.cookies.reject}
          </button>
        </div>
      </div>
    </div>
  );
}
