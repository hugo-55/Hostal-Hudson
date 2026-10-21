'use client';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '../lib/i18n';

const KEY = 'hostal-cookies';
export const PREFS_EVENT = 'hostal:cookie-prefs';

export function CookieConsent() {
  const { t } = useLang();
  const [mounted, setMounted] = useState(false);
  const [decision, setDecision] = useState(null); // 'accepted' | 'rejected' | null
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const acceptRef = useRef(null);

  // Se lee después de montar para no romper la hidratación (el servidor no tiene localStorage).
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(KEY);
      // El valor legacy '1' significaba "aceptado/cerrado": se migra a 'accepted'.
      setDecision(saved === '1' ? 'accepted' : saved);
    } catch {}
  }, []);

  // Permite reopening desde el footer ("Preferencias de cookies").
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

  useEffect(() => {
    if (!visible) return;
    if (acceptRef.current) acceptRef.current.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        // Cerrar sin consentir = quedarte con las esenciales.
        decide('rejected');
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
      <div className="cookie-consent-content" ref={dialogRef}>
        <p className="cookie-title" id="cookie-title">{t.cookies.title}</p>
        <p className="cookie-text">{t.cookies.text}</p>
        <div className="cookie-actions">
          <button ref={acceptRef} type="button" className="btn btn-green" onClick={() => decide('accepted')}>
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
