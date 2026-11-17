'use client';
import { useLang } from '../lib/i18n';

// Franja de servicios incluidos, igual en home y habitaciones.
export default function FactsStrip() {
  const { t } = useLang();
  return (
    <div className="facts">
      <div className="wrap">
        <ul aria-label={t.facts.aria}>
          {t.facts.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
