'use client';
import { useState } from 'react';
import { waLink, RATE_PER_PERSON_NIGHT } from '../lib/site';
import { useLang } from '../lib/i18n';

const fmt = (n) => `$${Number(n).toLocaleString('es-CL')}`;

// Estimador honesto: usa tarifa referencial configurable y obliga a confirmar por WhatsApp.
export default function Estimator() {
  const { t } = useLang();
  const e = t.estimator;
  const [llegada, setLlegada] = useState('');
  const [salida, setSalida] = useState('');
  const [personas, setPersonas] = useState(2);

  const nights =
    llegada && salida
      ? Math.max(0, Math.round((new Date(salida) - new Date(llegada)) / 86400000))
      : 0;
  const total = nights > 0 ? nights * personas * RATE_PER_PERSON_NIGHT : 0;
  const msg = `Hola Hostal Hudson, estimé en la web: llegada ${llegada}, salida ${salida} (${nights} noches), ${personas} personas ≈ ${fmt(total)}. ¿Me confirmas disponibilidad y tarifa final?`;

  return (
    <div className="card" style={{ border: '2px solid #0e7490' }}>
      <h3>{e.title}</h3>
      <p className="muted">{e.text}</p>
      <div className="grid-2">
        <div>
          <label>{e.arrival}</label>
          <input type="date" value={llegada} onChange={(e2) => setLlegada(e2.target.value)} />
        </div>
        <div>
          <label>{e.departure}</label>
          <input type="date" value={salida} onChange={(e2) => setSalida(e2.target.value)} />
        </div>
      </div>
      <label>{e.people}</label>
      <input type="number" min="1" max="20" value={personas} onChange={(ev) => setPersonas(Number(ev.target.value))} />
      {total > 0 ? (
        <>
          <p className="price">{e.total}: {fmt(total)}</p>
          <p className="muted">{e.note}</p>
          <a className="btn btn-green" href={waLink(msg)} target="_blank">{e.confirm}</a>
        </>
      ) : (
        <p className="muted">{e.pick}</p>
      )}
    </div>
  );
}
