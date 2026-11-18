'use client';
import Image from 'next/image';
import WhatsAppButton, { Footer } from '../Chrome';
import FactsStrip from '../FactsStrip';
import FinalCta from '../FinalCta';
import { useLang } from '../../lib/i18n';
import { useSeo } from '../../lib/useSeo';
import { SEO } from '../../lib/seo';
import { waLink } from '../../lib/site';

export default function HabitacionesClient() {
  const { t } = useLang();
  const rp = t.roomsPage;

  useSeo(SEO.habitaciones.es, SEO.habitaciones.en);

  return (
    <>
      <main>
        <section className="page-hero">
          <div className="page-hero-bg">
            <Image
              src="/img/aysen-puente.jpg"
              alt={t.home.alt.hero}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: '50% 48%' }}
            />
          </div>
          <div className="page-hero-overlay" aria-hidden="true" />
          <div className="wrap page-hero-content">
            <h1>{t.roomsPageTitle}</h1>
            <p className="lead">{t.roomsPageSub}</p>
          </div>
        </section>

        <FactsStrip />

        <div className="wrap rooms-rows">
          {rp.items.map((room, i) => (
            <article className={`room-row${i % 2 ? ' room-row--flip' : ''}`} key={room.key}>
              <div className="room-row-media">
                <Image
                  src={room.img}
                  alt={room.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 58vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="room-row-body">
                <span className="badge-private">{rp.badgePrivate}</span>
                <h2>{room.name}</h2>
                <p>{room.desc}</p>
                <ul className="specs">
                  {room.specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
                <a
                  className="btn"
                  href={waLink(`Hola Hostal Hudson, consulto disponibilidad para la habitación ${room.name.toLowerCase()}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.askRoom}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="wrap">
          <aside className="security-band">
            <div className="security-media">
              <Image
                src="/img/hostal-pasillo-01.jpg"
                alt={rp.securityAlt}
                fill
                sizes="(max-width: 900px) 100vw, 42vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="security-body">
              <h2>{rp.securityTitle}</h2>
              <p>{rp.securityText}</p>
            </div>
          </aside>
        </div>

        <section className="group-band">
          <div className="wrap group-inner">
            <div>
              <h2>{rp.groupTitle}</h2>
              <p className="lead">{rp.groupText}</p>
            </div>
            <div className="group-action">
              <a
                className="btn btn-light"
                href={waLink('Hola Hostal Hudson, viajo en familia y quiero consultar opciones')}
                target="_blank"
                rel="noopener noreferrer"
              >
                {rp.groupCta}
              </a>
              <p>{rp.groupNote}</p>
            </div>
          </div>
        </section>

        <FinalCta />
      </main>

      <Footer credit />
      <WhatsAppButton />
    </>
  );
}
