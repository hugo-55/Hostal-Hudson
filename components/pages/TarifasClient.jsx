'use client';
import WhatsAppButton, { Footer } from '../Chrome';
import Estimator from '../Estimator';
import Availability from '../Availability';
import { Breadcrumb } from '../Widgets';
import { useLang } from '../../lib/i18n';
import { useSeo } from '../../lib/useSeo';
import { SEO } from '../../lib/seo';
import { waLink, HOSTAL_PHONE_DISPLAY, RATE_PER_PERSON_NIGHT } from '../../lib/site';

export default function TarifasClient() {
  const { t, lang } = useLang();

  useSeo(SEO.tarifas.es, SEO.tarifas.en);

  // El precio del dato estructurado (Offer) tiene que estar visible en la
  // página: si no, Google lo descarta como rich result.
  const monto = RATE_PER_PERSON_NIGHT.toLocaleString(lang === 'en' ? 'en-US' : 'es-CL');

  return (
    <div className="container">
      <Breadcrumb trail={[t.nav.rates]} />
      <h1>{t.nav.rates}</h1>
      <p className="muted">{t.ratesSub}</p>

      <div className="card">
        <h3>{t.quoteTitle}</h3>
        <p>{t.quoteText}</p>
        <p>
          {t.rateRef} <strong>{monto} CLP</strong>
        </p>
        <p className="muted">{t.estimator.note}</p>
        <a className="btn btn-green" href={waLink('Hola, quiero cotizar una estadía. Llegada: ..., noches: ..., personas: ...')} target="_blank" rel="noopener noreferrer">
          {t.quoteBtn} ({HOSTAL_PHONE_DISPLAY})
        </a>
      </div>

      <div className="card">
        <h3>{t.payTitle}</h3>
        <p><strong>Banco BCI — Cuenta Corriente N° 64049884</strong><br />RUT: 8.133.541-9 · Patricio Valenzuela Paredes</p>
        <p className="muted">{t.sendReceipt}</p>
      </div>

      <div className="card">
        <h3>{t.includesTitle}</h3>
        <p>{t.includesText}</p>
      </div>

      <Estimator />
      <Availability />

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
