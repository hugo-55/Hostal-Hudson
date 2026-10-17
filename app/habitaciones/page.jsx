'use client';
import { useEffect } from 'react';
import WhatsAppButton, { Footer } from '../../components/Chrome';
import ReservaCTA from '../../components/ReservaCTA';
import SmartImg from '../../components/SmartImg';
import { PageTitle, Breadcrumb } from '../../components/Widgets';
import { Schema } from '../../components/Schema';
import { useLang } from '../../lib/i18n';
import { waLink } from '../../lib/site';

const ROOMS = [
  { img: '/img/gal-hostal-interior1.jpg' },
  { img: '/img/gal-hostal-interior2.jpg' },
  { img: '/img/gal-hostal-interior4.jpg' },
];

export default function Habitaciones() {
  const { t, lang } = useLang();

  useEffect(() => {
    document.title = lang === 'es' ? 'Habitaciones — Hostal Hudson' : 'Rooms — Hostal Hudson';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', lang === 'es'
      ? 'Habitaciones acogedoras en Hostal Hudson, Puerto Aysén. Vista al río, familiar, descanso total. Todas con desayuno incluido.'
      : 'Cozy rooms in Hostal Hudson, Puerto Aysén. River view, family, total rest. All with continental breakfast included.');
  }, []);

  const ROOMS_LD = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: 'Hostal Hudson',
    description: 'Habitaciones en Hostal Hudson, Puerto Aysén. Vista al río, habitaciones familiares y descanso total.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Teniente Merino 1080',
      addressLocality: 'Puerto Aysén',
      addressRegion: 'Aysén',
      addressCountry: 'CL',
    },
    telephone: '+56994391571',
    url: 'https://hostal-hudson.vercel.app/habitaciones',
  };
  return (
    <div className="container">
      <PageTitle title={t.nav.rooms} />
      <Breadcrumb trail={[t.nav.rooms]} />
      <h1>{t.roomsPageTitle}</h1>
      <p className="muted">{t.roomsPageSub}</p>
      <div className="grid">
        {t.roomCards.map((r, k) => (
          <div className="card" key={r.name}>
            <SmartImg src={ROOMS[k].img} alt={r.name} height={210} />
            <strong>{r.name}</strong>
            <p className="muted">{r.desc}</p>
            <a className="btn btn-green" href={waLink(`Hola, consulto disponibilidad: ${r.name}`)} target="_blank">{t.askRoom}</a>
          </div>
        ))}
      </div>
      <ReservaCTA title={t.comingTitle} />
      <Footer />
      <Schema type="Hotel" data={ROOMS_LD} />
      <WhatsAppButton />
    </div>
  );
}
