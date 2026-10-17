'use client';
import { useEffect } from 'react';

// Componente para inyectar JSON-LD (datos estructurados) en páginas client.
export function Schema({ type, data }) {
  useEffect(() => {
    const existing = document.querySelector(`script[data-schema="${type}"]`);
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', type);
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => script.remove();
  }, [type, data]);
  return null;
}
