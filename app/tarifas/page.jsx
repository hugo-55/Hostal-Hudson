'use client';
import WhatsAppButton, { Footer } from '../../components/Chrome';
import Estimator from '../../components/Estimator';
import Availability from '../../components/Availability';
import { useLang } from '../../lib/i18n';
import { waLink, HOSTAL_PHONE_DISPLAY } from '../../lib/site';

export default function Tarifas() {
  const { t } = useLang();
  return (
    <div className="container">
      <h1>{t.nav.rates}</h1>
      <p className="muted">{t.ratesSub}</p>

      <div className="card">
        <h3>{t.quoteTitle}</h3>
        <p>{t.quoteText}</p>
        <a className="btn btn-green" href={waLink('Hola, quiero cotizar una estadía. Llegada: ..., noches: ..., personas: ...')} target="_blank">
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
