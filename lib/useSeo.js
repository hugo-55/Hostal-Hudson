'use client';
import { useEffect, useRef } from 'react';
import { useLang } from './i18n';

/**
 * Mantiene el título y la descripción al día cuando el visitante cambia de idioma.
 *
 * En la primera carga NO se escribe nada: el servidor ya mandó el título y la
 * descripción en español (Google los lee sin ejecutar JS y no hay parpadeo).
 * Solo intervenimos cuando el idioma cambia de verdad.
 */
export function useSeo(es, en) {
  const { lang } = useLang();
  // El servidor manda siempre en español: partimos de ahí y solo escribimos
  // cuando el idioma real difiere (o cuando el visitante lo cambia).
  const langAplicado = useRef('es');

  useEffect(() => {
    if (langAplicado.current === lang) return; // ya está el título correcto
    langAplicado.current = lang;

    const data = lang === 'es' ? es : en;
    if (!data) return;

    document.title = data.title;
    setMeta('name', 'description', data.description);
    setMeta('property', 'og:title', data.title);
    setMeta('property', 'og:description', data.description);
    setMeta('name', 'twitter:title', data.title);
    setMeta('name', 'twitter:description', data.description);
  }, [lang]);
}

function setMeta(attr, key, content) {
  if (!content) return;
  const meta = document.querySelector(`meta[${attr}="${key}"]`);
  if (meta) meta.setAttribute('content', content);
}
