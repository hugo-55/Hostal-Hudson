'use client';
import { useState } from 'react';
import WhatsAppButton, { Footer } from '../../components/Chrome';
import SmartImg from '../../components/SmartImg';
import { PageTitle, Breadcrumb } from '../../components/Widgets';
import { useLang } from '../../lib/i18n';
import { waLink } from '../../lib/site';

export default function Guia() {
  const { t } = useLang();
  const g = t.guia;
  const [open, setOpen] = useState(null);
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
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
