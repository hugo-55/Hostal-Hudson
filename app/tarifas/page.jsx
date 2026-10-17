'use client';
import { useEffect } from 'react';
import WhatsAppButton, { Footer } from '../../components/Chrome';
import Estimator from '../../components/Estimator';
import Availability from '../../components/Availability';
import { PageTitle, Breadcrumb } from '../../components/Widgets';
import { Schema } from '../../components/Schema';
import { useLang } from '../../lib/i18n';
import { waLink, HOSTAL_PHONE_DISPLAY, RATE_PER_PERSON_NIGHT } from '../../lib/site';

export default function Tarifas() {
  const { t, lang } = useLang();

  useEffect(() => {
    document.title = lang === 'es' ? 'Tarifas — Hostal Hudson' : 'Rates — Hostal Hudson';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', lang === 'es'
      ? 'Tarifas y formas de pago en Hostal Hudson, Puerto Aysén. Reserva directo por WhatsApp, paga por transferencia.'
      : 'Rates and payment methods at Hostal Hudson, Puerto Aysén. Book directly via WhatsApp, pay by bank transfer.');
  }, []);

  const TARIFAS_LD = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: 'Hostal Hudson',
    description: 'Tarifas y formas de pago en Hostal Hudson, Puerto Aysén.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Teniente Merino 1080',
      addressLocality: 'Puerto Aysén',
      addressRegion: 'Aysén',
      addressCountry: 'CL',
    },
    telephone: '+56994391571',
    url: 'https://hostal-hudson.vercel.app/tarifas',
    priceRange: '$$',
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'LodgingBusiness', name: 'Habitación doble' },
        price: RATE_PER_PERSON_NIGHT,
        priceCurrency: 'CLP',
        availability: 'https://schema.org/InStock',
      },
    ],
  };
  return (
    <div className="container">
      <PageTitle title={t.nav.rates} />
      <Breadcrumb trail={[t.nav.rates]} />
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
      <Schema type="LodgingBusiness" data={TARIFAS_LD} />
      <WhatsAppButton />
    </div>
  );
}
