'use client';
import { useState } from 'react';
import { waLink } from '../lib/site';
import { useLang } from '../lib/i18n';

// Booking bar with language support. Computes nights automatically.
export default function BookingBar() {
  const { t } = useLang();
  const b = t.booking;
  const [llegada, setLlegada] = useState('');
  const [salida, setSalida] = useState('');
  const [personas, setPersonas] = useState(2);
  const [name, setName] = useState('');

  const nights =
    llegada && salida
      ? Math.max(0, Math.round((new Date(salida) - new Date(llegada)) / 86400000))
      : 0;

  const msg = `Hola Hostal Hudson, soy ${name || '...'}. Quiero reservar: llegada ${llegada || '...'}, salida ${salida || '...'} (${nights} noche(s)), ${personas} persona(s). ¿Tienen disponibilidad?`;
  const valid = name.trim() && llegada && salida && nights > 0;
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="booking-bar">
      <div className="bb-field">
        <label>{b.name}</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={b.namePh} />
      </div>
      <div className="bb-field">
        <label>{b.arrival}</label>
        <input type="date" min={today} value={llegada} onChange={(e) => setLlegada(e.target.value)} />
      </div>
      <div className="bb-field">
        <label>{b.departure}</label>
        <input type="date" min={llegada || today} value={salida} onChange={(e) => setSalida(e.target.value)} />
      </div>
      <div className="bb-field">
        <label>{b.people}</label>
        <input type="number" min="1" max="20" value={personas} onChange={(e) => setPersonas(Number(e.target.value))} />
      </div>
      <div className="bb-action">
        {nights > 0 && <span className="bb-nights">{nights} {nights > 1 ? b.nights : b.night}</span>}
        {valid ? (
          <a className="btn btn-green" href={waLink(msg)} target="_blank">{b.submit}</a>
        ) : (
          <span className="btn btn-disabled">{b.fill}</span>
        )}
      </div>
    </div>
  );
}
