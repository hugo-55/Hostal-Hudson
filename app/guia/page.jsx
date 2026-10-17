'use client';
import { useEffect, useState } from 'react';
import WhatsAppButton, { Footer } from '../../components/Chrome';
import SmartImg from '../../components/SmartImg';
import { PageTitle, Breadcrumb, ShareBar } from '../../components/Widgets';
import { Schema } from '../../components/Schema';
import { useLang } from '../../lib/i18n';
import { waLink } from '../../lib/site';

export default function Guia() {
  const { t, lang } = useLang();
  const g = t.guia;
  const [open, setOpen] = useState(null);

  useEffect(() => {
    document.title = lang === 'es' ? 'Guía Aysén — Hostal Hudson' : 'Aysén Guide — Hostal Hudson';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', lang === 'es'
      ? 'Guía de viaje de Puerto Aysén: cómo llegar, qué llevar, itinerario de 3 días y consejos prácticos.'
      : 'Travel guide to Puerto Aysén: how to get there, what to pack, 3-day itinerary and practical tips.');
  }, []);

  const GUIA_LD = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Guía Aysén — Hostal Hudson',
    description: 'Guía de viaje de Puerto Aysén: consejos prácticos para viajeros.',
    publisher: {
      '@type': 'Organization',
      name: 'Hostal Hudson',
      url: 'https://hostal-hudson.vercel.app',
    },
    url: 'https://hostal-hudson.vercel.app/guia',
  };
  return (
    <div className="container">
      <PageTitle title="Guía Aysén" />
      <Breadcrumb trail={['Guía Aysén']} />
      <h1>{g.title}</h1>
      <p className="muted">{g.sub}</p>
      <div className="grid">
        {g.posts.map((p, k) => (
          <div className="card" key={p.slug}>
            <SmartImg src={p.img} alt={p.title} height={180} />
            <strong>{p.title}</strong>
            <p className="muted">{p.excerpt}</p>
            <button className="btn btn-outline" onClick={() => setOpen(open === k ? null : k)}>
              {open === k ? '▲' : 'Leer ▼'}
            </button>
            {open === k && (
              <div style={{ marginTop: 10 }}>
                {p.body.map((par, j) => <p key={j}>{par}</p>)}
                <a className="btn btn-green" href={waLink('Hola Hostal Hudson, leí su guía y quiero reservar')} target="_blank">{g.cta}</a>
              </div>
            )}
          </div>
        ))}
      </div>
      <ShareBar />
      <Footer />
      <Schema type="Blog" data={GUIA_LD} />
      <WhatsAppButton />
    </div>
  );
}
