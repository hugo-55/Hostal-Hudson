'use client';
import WhatsAppButton, { Footer } from '../Chrome';
import ReservaCTA from '../ReservaCTA';
import { Breadcrumb } from '../Widgets';
import { useLang } from '../../lib/i18n';
import { useSeo } from '../../lib/useSeo';
import { SEO } from '../../lib/seo';
import { ADDRESS, EMAIL, HOSTAL_PHONE_DISPLAY, MAPS_URL } from '../../lib/site';

export default function ReservasClient() {
  const { t } = useLang();

  useSeo(SEO.reservas.es, SEO.reservas.en);

  return (
    <div className="container">
      <Breadcrumb trail={[t.nav.book]} />
      <h1>{t.bookPageTitle}</h1>
      <p className="muted">{t.bookPageSub}</p>
      <ReservaCTA />
      <div className="card">
        <h3>📞 {t.contactTitle}</h3>
        <p>{ADDRESS}<br />Tel/WhatsApp: {HOSTAL_PHONE_DISPLAY}<br />Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        <p><a className="btn btn-outline" href={MAPS_URL} target="_blank" rel="noopener noreferrer">{t.viewMap}</a></p>
      </div>
      <div className="card faq">
        <h3>{t.faqTitle}</h3>
        {t.faq.map((f) => (
          <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
        ))}
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
