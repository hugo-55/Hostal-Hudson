import { HOSTAL_PHONE, HOSTAL_PHONE_DISPLAY } from '../lib/site';

export default function WhatsAppButton({ text = 'Hola, quiero reservar en Hostal Hudson' }) {
  const href = `https://wa.me/${HOSTAL_PHONE}?text=${encodeURIComponent(text)}`;
  return (
    <a className="wa-float" href={href} target="_blank" rel="noreferrer" aria-label="WhatsApp">
      ✆
    </a>
  );
}

export function Footer() {
  return (
    <div className="footer">
      <p>
        <strong>Hostal Hudson</strong> · Teniente Merino 1080, Puerto Aysén · {HOSTAL_PHONE_DISPLAY}
      </p>
      <p className="muted">Versión renovada del sitio — diseño rápido y reserva por WhatsApp. Sitio original: hostalhudson.cl</p>
    </div>
  );
}
