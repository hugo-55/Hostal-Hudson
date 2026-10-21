'use client';
import WhatsAppButton, { Footer } from '../Chrome';
import ReservaCTA from '../ReservaCTA';
import Weather from '../Weather';
import SmartImg from '../SmartImg';
import { Breadcrumb } from '../Widgets';
import { useLang } from '../../lib/i18n';
import { useSeo } from '../../lib/useSeo';
import { SEO } from '../../lib/seo';
import { SPOTS_ES } from '../../lib/contenido';
import { waLink } from '../../lib/site';

const SPOTS = Object.entries(SPOTS_ES).map(([key, s]) => ({ key, src: s.img }));

export default function VisitarClient() {
  const { t } = useLang();
  const v = t.visitar;

  useSeo(SEO.visitar.es, SEO.visitar.en);

  return (
    <div className="container">
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
      <WhatsAppButton />
    </div>
  );
}
