'use client';
import { useEffect } from 'react';
import WhatsAppButton, { Footer } from '../../components/Chrome';
import ReservaCTA from '../../components/ReservaCTA';
import { PageTitle, Breadcrumb } from '../../components/Widgets';
import { Schema } from '../../components/Schema';
import { useLang } from '../../lib/i18n';
import { ADDRESS, EMAIL, HOSTAL_PHONE_DISPLAY, MAPS_URL } from '../../lib/site';

export default function Reservas() {
  const { t, lang } = useLang();

  useEffect(() => {
    document.title = lang === 'es' ? 'Reservar — Hostal Hudson' : 'Book — Hostal Hudson';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', lang === 'es'
      ? 'Reserva tu estadía en Hostal Hudson, Puerto Aysén por WhatsApp en 1 minuto. Recepción 24 h.'
      : 'Book your stay at Hostal Hudson, Puerto Aysén via WhatsApp in 1 minute. 24 h reception.');
  }, []);

  const RESERVAS_LD = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: 'Hostal Hudson',
    description: 'Reserva tu estadía en Hostal Hudson, Puerto Aysén por WhatsApp.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Teniente Merino 1080',
      addressLocality: 'Puerto Aysén',
      addressRegion: 'Aysén',
      addressCountry: 'CL',
    },
    telephone: '+56994391571',
    url: 'https://hostal-hudson.vercel.app/reservas',
    priceRange: '$$',
  };
  return (
    <div className="container">
      <PageTitle title={t.nav.book} />
      <Breadcrumb trail={[t.nav.book]} />
      <h1>{t.bookPageTitle}</h1>
      <p className="muted">{t.bookPageSub}</p>
      <ReservaCTA />
      <div className="card">
        <h3>📞 {t.contactTitle}</h3>
        <p>{ADDRESS}<br />Tel/WhatsApp: {HOSTAL_PHONE_DISPLAY}<br />Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        <p><a className="btn btn-outline" href={MAPS_URL} target="_blank">{t.viewMap}</a></p>
      </div>
      <div className="card faq">
        <h3>{t.faqTitle}</h3>
        {t.faq.map((f) => (
          <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
        ))}
      </div>
      <Footer />
      <Schema type="LodgingBusiness" data={RESERVAS_LD} />
      <WhatsAppButton />
    </div>
  );
}
