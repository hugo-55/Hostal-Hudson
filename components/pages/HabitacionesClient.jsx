'use client';
import WhatsAppButton, { Footer } from '../Chrome';
import ReservaCTA from '../ReservaCTA';
import SmartImg from '../SmartImg';
import { Breadcrumb } from '../Widgets';
import { useLang } from '../../lib/i18n';
import { useSeo } from '../../lib/useSeo';
import { SEO } from '../../lib/seo';
import { ROOM_CARDS_ES } from '../../lib/contenido';
import { waLink } from '../../lib/site';

export default function HabitacionesClient() {
  const { t } = useLang();

  useSeo(SEO.habitaciones.es, SEO.habitaciones.en);

  return (
    <div className="container">
      <Breadcrumb trail={[t.nav.rooms]} />
      <h1>{t.roomsPageTitle}</h1>
      <p className="muted">{t.roomsPageSub}</p>
      <div className="grid">
        {t.roomCards.map((r, k) => (
          <div className="card" key={r.name}>
            <SmartImg src={ROOM_CARDS_ES[k].img} alt={r.name} height={210} />
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
