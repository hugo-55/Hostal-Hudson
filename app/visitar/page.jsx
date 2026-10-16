'use client';
import WhatsAppButton, { Footer } from '../../components/Chrome';
import ReservaCTA from '../../components/ReservaCTA';
import Weather from '../../components/Weather';
import SmartImg from '../../components/SmartImg';
import { PageTitle, Breadcrumb } from '../../components/Widgets';
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
  const { t } = useLang();
  const v = t.visitar;
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
      <ReservaCTA />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
