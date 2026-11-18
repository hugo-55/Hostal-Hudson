'use client';
import { HOSTAL_PHONE_DISPLAY, waLink } from '../lib/site';
import { useLang } from '../lib/i18n';

// CTA de cierre en verde bosque. El número sale de lib/site.js, nunca escrito a mano.
export default function FinalCta() {
  const { t } = useLang();
  const h = t.home;

  return (
    <section className="cta-final">
      <div className="wrap cta-inner">
        <div>
          <h2>{h.ctaTitle}</h2>
          <p>{h.ctaText}</p>
        </div>
        <div className="cta-actions">
          <a
            className="btn btn-light"
            href={waLink('Hola Hostal Hudson, quiero consultar disponibilidad')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {h.ctaWrite} {HOSTAL_PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
