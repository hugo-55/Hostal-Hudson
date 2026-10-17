'use client';
import { useEffect } from 'react';
import WhatsAppButton, { Footer } from '../../components/Chrome';
import ReservaCTA from '../../components/ReservaCTA';
import Weather from '../../components/Weather';
import SmartImg from '../../components/SmartImg';
import { PageTitle, Breadcrumb } from '../../components/Widgets';
import { Schema } from '../../components/Schema';
import { useLang } from '../../lib/i18n';
import { waLink } from '../../lib/site';

const SPOTS = [
  { src: '/img/gal-quevisitar-puente.jpg', key: 'puente' },
  { src: '/img/gal-quevisitar-caleta.jpg', key: 'caleta' },
  { src: '/img/gal-quevisitar-cascada.jpg', key: 'cascada' },
  { src: '/img/gal-quevisitar-camino.jpg', key: 'camino' },
  { src: '/img/gal-quevisitar-plaza1.jpg', key: 'plaza' },
  { src: '/img/gal-quevisitar-pan.jpg', key: 'mirador' },
];

export default function Visitar() {
  const { t, lang } = useLang();
  const v = t.visitar;

  useEffect(() => {
    document.title = lang === 'es' ? 'Qué visitar — Hostal Hudson' : 'What to visit — Hostal Hudson';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', lang === 'es'
      ? 'Qué visitar desde Hostal Hudson en Puerto Aysén: puente Ibáñez, caletas, cascadas, Carretera Austral y más.'
      : 'What to visit from Hostal Hudson in Puerto Aysén: Ibáñez bridge, fishing coves, waterfalls, Carretera Austral and more.');
  }, []);

  const VISITAR_LD = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: 'Hostal Hudson — Qué visitar',
    description: 'Lugares para visitar desde Hostal Hudson en Puerto Aysén, Patagonia chilena.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Teniente Merino 1080',
      addressLocality: 'Puerto Aysén',
      addressRegion: 'Aysén',
      addressCountry: 'CL',
    },
    url: 'https://hostal-hudson.vercel.app/visitar',
  };
  return (
    <div className="container">
      <PageTitle title={t.nav.visit} />
      <Breadcrumb trail={[t.nav.visit]} />
      <h1>{v.title}</h1>
      <p className="muted">{v.sub}</p>
      <p><Weather /></p>
      <div className="grid">
        {SPOTS.map((s) => (
          <div className="card room" key={s.key}>
            <SmartImg src={s.src} alt={v.spots[s.key].name} height={200} />
            <strong>{v.spots[s.key].name}</strong>
            <p className="muted">{v.spots[s.key].desc}</p>
            <a className="btn btn-outline" href={waLink(`Hola, me interesa visitar: ${v.spots[s.key].name}. ¿Cómo llego desde el hostal?`)} target="_blank">{v.ask}</a>
          </div>
        ))}
      </div>

      <h2 className="section-title">{t.exp.title}</h2>
      <p className="section-sub">{t.exp.sub}</p>
      <div className="grid">
        {t.exp.items.map((e, k) => (
          <div className="card" key={e.name} style={{ borderTop: '4px solid #d97706' }}>
            <div style={{ fontSize: 32 }}>{['🎣', '🛣️', '📸'][k]}</div>
            <strong>{e.name}</strong>
            <p className="muted">{e.desc}</p>
            <a className="btn btn-green" href={waLink(`Hola Hostal Hudson, me interesa la experiencia: ${e.name}`)} target="_blank">{t.exp.cta}</a>
          </div>
        ))}
      </div>

      <p><a className="btn btn-outline" href="/guia">Guía Aysén completa →</a></p>

      <ReservaCTA />
      <Footer />
      <Schema type="TouristAttraction" data={VISITAR_LD} />
      <WhatsAppButton />
    </div>
  );
}
