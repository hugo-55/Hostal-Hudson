'use client';
import { useEffect, useState } from 'react';
import { useLang } from '../lib/i18n';

export function CookieConsent() {
  const { lang, t } = useLang();
  const [accepted, setAccepted] = useState(() => {
    try { return localStorage.getItem('hostal-cookies') === '1'; } catch { return false; }
  });

  useEffect(() => {
    if (!accepted) return;
    // No hacer nada si ya fue aceptado
  }, [accepted]);

  if (accepted) return null;

  const es = lang === 'es';
  return (
    <div className="cookie-consent" role="dialog" aria-modal="true" aria-label="Cookies">
      <div className="cookie-consent-content">
        <p className="cookie-title">{es ? 'Usamos cookies' : 'We use cookies'}</p>
        <p className="cookie-text">
          {es
            ? 'Usamos cookies propias y de terceros para mejorar tu experiencia y analizar el uso del sitio. Al continuar navegando, aceptas nuestra política de privacidad.'
            : 'We use our own and third-party cookies to improve your experience and analyze site usage. By continuing to browse, you accept our privacy policy.'}
        </p>
        <div className="cookie-actions">
          <button className="btn btn-green" onClick={() => { try { localStorage.setItem('hostal-cookies', '1'); } catch {}; setAccepted(true); }}>
            {es ? 'Aceptar' : 'Accept'}
          </button>
          <button className="btn btn-outline" onClick={() => { try { localStorage.setItem('hostal-cookies', '1'); } catch {}; setAccepted(true); }}>
            {es ? 'Cerrar' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
