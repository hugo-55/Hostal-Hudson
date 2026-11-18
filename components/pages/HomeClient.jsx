'use client';
import Image from 'next/image';
import WhatsAppButton, { Footer } from '../Chrome';
import FactsStrip from '../FactsStrip';
import FinalCta from '../FinalCta';
import Reviews from '../Reviews';
import { useLang } from '../../lib/i18n';
import { useSeo } from '../../lib/useSeo';
import { SEO } from '../../lib/seo';
import { ADDRESS, HOSTAL_PHONE_DISPLAY, MAPS_URL, waLink } from '../../lib/site';

export default function HomeClient() {
  const { t } = useLang();
  const h = t.home;
  const rooms = t.roomsPage.items;

  // El servidor manda título y descripción en español; esto solo los actualiza
  // cuando el visitante cambia de idioma.
  useSeo(SEO.home.es, SEO.home.en);

  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-media">
            <Image
              src="/img/aysen-puente.jpg"
              alt={h.alt.hero}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 58vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="hero-panel">
            <span className="kicker kicker-light">{h.heroKicker}</span>
            <h1>{h.heroTitle}</h1>
            <p className="lead">{h.heroLead}</p>
            <div className="hero-actions">
              <a
                className="btn btn-light"
                href={waLink('Hola Hostal Hudson, quiero consultar disponibilidad')}
                target="_blank"
                rel="noopener noreferrer"
              >
                {h.heroWa}
              </a>
              <a className="btn btn-ghost-light" href="/habitaciones">{h.heroRooms}</a>
            </div>
          </div>
        </section>

        <FactsStrip />

        <section className="section" id="habitaciones">
          <div className="wrap">
            <div className="section-head">
              <h2>{h.roomsTitle}</h2>
              <p>{h.roomsSub}</p>
            </div>

            <div className="rooms-grid">
              {rooms.map((room) => (
                <article className="room-card" key={room.key}>
                  <div className="room-media">
                    <Image
                      src={room.img}
                      alt={room.alt}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="room-body">
                    <span className="badge-private">{h.badgePrivate}</span>
                    <h3>{room.name}</h3>
                    <p className="room-desc">{room.homeDesc}</p>
                    <p className="room-meta">{room.meta}</p>
                    <a className="room-link" href="/habitaciones">{h.seeRoom}</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="group-band">
          <div className="wrap group-inner">
            <div>
              <h2>{h.inquiryTitle}</h2>
              <p className="lead">{h.inquiryText}</p>
            </div>
            <div className="group-action">
              <a
                className="btn btn-light"
                href={waLink('Hola Hostal Hudson, viajo en familia y quiero consultar opciones')}
                target="_blank"
                rel="noopener noreferrer"
              >
                {h.inquiryCta}
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="el-hostal">
          <div className="wrap">
            <div className="section-head">
              <h2>{h.hostelTitle}</h2>
              <p>{h.hostelSub}</p>
            </div>

            <div className="common">
              <figure className="common-main">
                <Image
                  src="/img/hostal-entrada-01.jpg"
                  alt={h.alt.entrance}
                  fill
                  sizes="(max-width: 900px) 100vw, 58vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </figure>

              <div className="common-side">
                <div className="common-mosaic">
                  <figure>
                    <Image
                      src="/img/hostal-living-01.jpg"
                      alt={h.alt.stove}
                      fill
                      sizes="(max-width: 900px) 50vw, 29vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </figure>
                  <figure>
                    <Image
                      src="/img/hostal-comedor-01.jpg"
                      alt={h.alt.dining}
                      fill
                      sizes="(max-width: 900px) 50vw, 29vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </figure>
                </div>

                <ul className="common-list">
                  {h.hostelList.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Reviews />

        <section className="section" id="ubicacion">
          <div className="wrap location">
            <div>
              <h2>{h.locationTitle}</h2>
              <p className="lead">{h.locationLead}</p>
              <address className="addr">
                <strong>Hostal Hudson</strong>
                {ADDRESS}
                <br />
                WhatsApp {HOSTAL_PHONE_DISPLAY}
              </address>
              <div className="location-actions">
                <a className="btn" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  {h.locationMaps}
                </a>
                <a
                  className="btn btn-outline"
                  href={waLink('Hola Hostal Hudson, quiero consultar cómo llegar')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {h.locationAsk}
                </a>
              </div>
            </div>

            <figure className="location-media">
              <Image
                src="/img/aysen-letrero.jpg"
                alt={h.alt.location}
                fill
                sizes="(max-width: 1023px) 100vw, 58vw"
                style={{ objectFit: 'cover' }}
              />
            </figure>
          </div>
        </section>

        <FinalCta />
      </main>

      <Footer credit />
      <WhatsAppButton />
    </>
  );
}
