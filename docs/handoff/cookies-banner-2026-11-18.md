# Banner de cookies discreto — 2026-11-18

Para Antigravity. Trabajar sobre `main` (commit `1b38e72`, limpio y sincronizado
con `origin/main`). El dueño encontró invasivo el modal actual: tapa toda la
pantalla con un velo oscuro y bloquea el sitio antes de poder leerlo.

## Antes de editar (obligatorio)

Devolvé un plan de 5 líneas con los cambios exactos y cualquier objeción.
**Esperá la aprobación del dueño.** No hagas commit ni push hasta que él lo
pida.

## Objetivo

Pasar de modal centrado con overlay a una tarjeta fija abajo, sin velo, que deje
navegar el sitio. En desktop va abajo a la izquierda (no tapa el botón de
WhatsApp); en pantallas de 900 px o menos, una barra inferior compacta.

Capturas de referencia del resultado esperado:

```
C:\Users\hugoc\OneDrive\Escritorio\hostal-seleccion-2026-11-17\
  cookies-antes-1440.jpg     (cómo está hoy)
  cookies-despues-1440.jpg   (propuesta)
  cookies-despues-390.jpg    (propuesta en móvil)
```

## 1. `app/globals.css`

Reemplazar el bloque completo desde el comentario `/* Consentimiento de
cookies */` hasta `.cookie-actions .btn { flex: 1; }` (líneas 1255-1276) por:

```css
/* Consentimiento de cookies */
.cookie-consent {
  position: fixed;
  inset: auto auto 0 0;
  z-index: 100;
  display: block;
  padding: 0;
  background: none;
}
.cookie-consent-content {
  width: min(680px, calc(100vw - 120px));
  max-width: none;
  margin: 0 0 18px 18px;
  padding: 14px 16px 14px 18px;
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: 14px;
  box-shadow: 0 12px 32px rgba(18, 33, 27, .16);
  display: grid;
  grid-template-columns: 1fr 168px;
  align-items: center;
  gap: 2px 18px;
}
.cookie-title {
  margin: 0;
  color: var(--ink);
  font-size: .8rem;
  font-weight: 700;
  letter-spacing: .01em;
  grid-column: 1;
}
.cookie-text {
  margin: 0;
  color: var(--muted);
  font-size: .78rem;
  line-height: 1.45;
  grid-column: 1;
}
.cookie-text a {
  color: var(--forest);
  text-decoration: underline;
  text-underline-offset: 2px;
  white-space: nowrap;
}
.cookie-actions {
  grid-column: 2;
  grid-row: 1 / span 2;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
}
.cookie-actions .btn {
  width: 100%;
  min-height: 34px;
  padding: 0 12px;
  font-size: .76rem;
  border-radius: 8px;
}
@media (max-width: 900px) {
  .cookie-consent { inset: auto 0 0 0; }
  .cookie-consent-content {
    width: auto;
    max-width: none;
    margin: 0;
    border-radius: 16px 16px 0 0;
    padding: 13px 16px 15px;
    grid-template-columns: 1fr;
    gap: 6px;
    box-shadow: 0 -8px 28px rgba(18, 33, 27, .14);
  }
  .cookie-title,
  .cookie-text { grid-column: 1; }
  .cookie-actions {
    grid-column: 1;
    grid-row: auto;
    flex-direction: row;
    margin-top: 9px;
  }
  .cookie-actions .btn {
    flex: 1 1 0;
    min-height: 42px;
    font-size: .82rem;
  }
}
```

No cambiar ningún otro bloque del CSS (el botón de WhatsApp, `.sticky-book` y
los `.btn` quedan igual).

## 2. `components/CookieConsent.jsx`

Es una tarjeta no modal: ya no secuestra el foco ni se abre encima del
contenido. Cambios:

- Quitar `aria-modal="true"`.
- Quitar el `useRef` de `dialogRef` y `acceptRef`, el autofoco del botón
  Aceptar y todo el manejo de Tab (el foco ya no se atrapa).
- Conservar Escape, que sigue equivaliendo a "Solo esenciales".
- Agregar el enlace a la política después del texto.

El archivo completo queda así:

```jsx
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
```

## 3. `lib/i18n.js`

Acortar el texto del banner (el detalle completo ya está en `/privacidad`) y
agregar la etiqueta del enlace. En el bloque `es`:

```js
cookies: {
  title: 'Usamos cookies',
  text: 'Sin publicidad ni seguimiento. Solo tus preferencias (idioma y tema) y la sesión del panel.',
  more: 'Ver política',
  accept: 'Aceptar',
  reject: 'Solo esenciales',
  prefs: 'Preferencias de cookies',
  dialog: 'Consentimiento de cookies',
},
```

En el bloque `en`:

```js
cookies: {
  title: 'We use cookies',
  text: 'No advertising or tracking. Only your preferences (language and theme) and the owner panel session.',
  more: 'Privacy policy',
  accept: 'Accept',
  reject: 'Essential only',
  prefs: 'Cookie preferences',
  dialog: 'Cookie consent',
},
```

No tocar `t.cookies.prefs` (lo usa el footer) ni `PrivacidadClient.jsx`.

## Lo que no se toca

- `/admin`, `app/api/**`, `AdminPanel`.
- El footer, el botón flotante de WhatsApp y `.sticky-book`.
- Las otras páginas y textos.

## Verificación

1. `npm.cmd run build` sin errores.
2. En `/`, con `localStorage` limpio, el banner aparece abajo y el sitio se
   puede scrollear y clickear detrás. Sin velo oscuro.
3. `Escape` guarda "Solo esenciales" y el banner no vuelve al recargar.
4. El enlace "Ver política" abre `/privacidad`.
5. "Preferencias de cookies" en el footer lo vuelve a abrir.
6. Capturas en 1440, 900 y 390.

## Criterio de aceptación

- No hay overlay ni se bloquea la página.
- Desktop: tarjeta de 680 px abajo a la izquierda, sin tapar el botón de
  WhatsApp.
- 900 px o menos: barra al pie, texto en dos líneas y botones lado a lado.
- Los dos botones se ven igual de accesibles y el enlace a la política funciona.
