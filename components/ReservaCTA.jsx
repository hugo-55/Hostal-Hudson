'use client';
import { useState } from 'react';
import { waLink, HOSTAL_PHONE_DISPLAY } from '../lib/site';
import { useLang } from '../lib/i18n';

// Booking form: registers via API, then confirms on WhatsApp.
export default function ReservaCTA({ title } = {}) {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [telefono, setTelefono] = useState('');
  const [llegada, setLlegada] = useState('');
  const [noches, setNoches] = useState(1);
  const [personas, setPersonas] = useState(2);
  const [state, setState] = useState('idle');
  const [live, setLive] = useState(false);

  const msg = `Hola Hostal Hudson, soy ${name || '...'}. Quiero reservar: llegada ${llegada || '...'}, ${noches} noche(s), ${personas} persona(s). ¿Tienen disponibilidad?`;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !llegada) return alert(t.fillAll);
    setState('sending');
    try {
      const r = await fetch('/api/reserva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, llegada, noches, personas, telefono }),
      });
      const data = await r.json();
      if (!data.ok) throw new Error(data.error || 'Error');
      setLive(data.sheetMode === 'live' || data.notifyMode === 'live');
      setState('done');
    } catch {
      setState('done');
      setLive(false);
    }
  }

  if (state === 'done') {
    return (
      <div className="card" style={{ border: '2px solid #16a34a' }}>
        <h3>✅ {t.sentTitle} {name}!</h3>
        <p>{live ? t.recordedLive : t.recordedDemo}</p>
        <a className="btn btn-green" href={waLink(msg)} target="_blank">{t.confirmWa} ({HOSTAL_PHONE_DISPLAY})</a>
        <p><button className="btn btn-outline" onClick={() => setState('idle')}>{t.another}</button></p>
      </div>
    );
  }

  return (
    <div className="card" style={{ border: '2px solid #16a34a' }}>
      <h3>{title || t.reserveTitle}</h3>
      <p className="muted">{t.reserveText} ({HOSTAL_PHONE_DISPLAY}).</p>
      <form onSubmit={handleSubmit}>
        <label>{t.fName}</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="María" />
        <label>{t.fPhone}</label>
        <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="+56 9 ..." inputMode="tel" />
        <div className="grid-2">
          <div>
            <label>{t.fArrival}</label>
            <input type="date" value={llegada} onChange={(e) => setLlegada(e.target.value)} />
          </div>
          <div>
            <label>{t.fNights}</label>
            <input type="number" min="1" max="60" value={noches} onChange={(e) => setNoches(Number(e.target.value))} />
          </div>
        </div>
        <label>{t.fPeople}</label>
        <input type="number" min="1" max="20" value={personas} onChange={(e) => setPersonas(Number(e.target.value))} />
        <button className="btn btn-green" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? t.sending : t.send}
        </button>
      </form>
    </div>
  );
}
