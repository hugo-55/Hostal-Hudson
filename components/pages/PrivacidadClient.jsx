'use client';
import WhatsAppButton, { Footer } from '../Chrome';
import { Breadcrumb } from '../Widgets';
import { useLang } from '../../lib/i18n';
import { useSeo } from '../../lib/useSeo';
import { SEO } from '../../lib/seo';
import { EMAIL } from '../../lib/site';

export default function PrivacidadClient() {
  const { t } = useLang();
  const p = t.priv;

  useSeo(SEO.privacidad.es, SEO.privacidad.en);

  return (
    <div className="container">
      <Breadcrumb trail={[p.title]} />
      <h1>{p.title}</h1>
      <p className="muted">{p.updated}</p>
      <p>{p.intro}</p>
      <h2>{p.dataTitle}</h2>
      <ul>
        {p.data.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      <h2>{p.useTitle}</h2>
      <ul>
        {p.use.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      <h2>{p.cookieTitle}</h2>
      <p>{p.cookieText}</p>
      <h2>{p.contactTitle}</h2>
      <p>
        {p.rights} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
