import { HOSTAL_PHONE, HOSTAL_PHONE_DISPLAY, ADDRESS, MAPS_URL } from '../lib/site';

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
      <div>
        <strong>Hostal Hudson</strong>
        <p className="muted">{ADDRESS}<br />Tel/WhatsApp: {HOSTAL_PHONE_DISPLAY}</p>
      </div>
      <div>
        <strong>Secciones</strong>
        <p className="muted"><a href="/habitaciones">Habitaciones</a> · <a href="/tarifas">Tarifas</a> · <a href="/galeria">Galería</a> · <a href="/reservas">Reservas</a></p>
      </div>
      <div>
        <strong>Reserva directa</strong>
        <p className="muted">Sin intermediarios ni comisiones. <a href={MAPS_URL} target="_blank">Cómo llegar →</a></p>
      </div>
    </div>
  );
}
