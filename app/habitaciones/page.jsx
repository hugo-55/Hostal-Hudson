'use client';
import WhatsAppButton, { Footer } from '../../components/Chrome';
import ReservaCTA from '../../components/ReservaCTA';
import SmartImg from '../../components/SmartImg';
import { PageTitle, Breadcrumb } from '../../components/Widgets';
import { useLang } from '../../lib/i18n';
import { waLink } from '../../lib/site';

const ROOMS = [
  { img: '/img/gal-hostal-interior1.jpg' },
  { img: '/img/gal-hostal-interior2.jpg' },
  { img: '/img/gal-hostal-interior4.jpg' },
];

export default function Habitaciones() {
  const { t } = useLang();
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
      <WhatsAppButton />
    </div>
  );
}
