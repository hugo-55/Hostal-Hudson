import WhatsAppButton, { Footer } from '../../components/Chrome';
import { waLink, HOSTAL_PHONE_DISPLAY } from '../../lib/site';

export default function Tarifas() {
  return (
    <div className="container">
      <h1>Tarifas y reserva directa</h1>
      <p className="muted">Sin intermediarios ni comisiones: reservas directo con nosotros por WhatsApp y pagas por transferencia.</p>

      <div className="card">
        <h3>💬 Cotiza tu estadía</h3>
        <p>Cuéntanos fecha y personas y te confirmamos disponibilidad y tarifa en minutos.</p>
        <a className="btn btn-green" href={waLink('Hola, quiero cotizar una estadía. Llegada: ..., noches: ..., personas: ...')} target="_blank">
          Cotizar por WhatsApp ({HOSTAL_PHONE_DISPLAY})
        </a>
      </div>

      <div className="card">
        <h3>💳 Pago por transferencia (como siempre)</h3>
        <p><strong>Banco BCI — Cuenta Corriente N° 64049884</strong><br />RUT: 8.133.541-9 · Patricio Valenzuela Paredes</p>
        <p className="muted">Envíanos el comprobante por WhatsApp y tu reserva queda confirmada.</p>
      </div>

      <div className="card">
        <h3>✅ Incluye siempre</h3>
        <p>Desayuno continental · Wi-Fi gratis · TV cable · Estacionamiento · Recepción 24 h · Cocina equipada · Mucama diaria.</p>
      </div>

      <Footer />
      <WhatsAppButton text="Hola, quiero cotizar una estadía en Hostal Hudson" />
    </div>
  );
}
