'use client';
import { useState } from 'react';
import { waLink, HOSTAL_PHONE_DISPLAY } from '../lib/site';
import { useLang } from '../lib/i18n';

// Formulario de reserva: abre WhatsApp con la solicitud ya escrita.
//
// IMPORTANTE (por qué el botón de WhatsApp es el paso principal):
// hoy la API /api/reserva no guarda nada (SHEET_ENDPOINT vacío), así que la
// única forma de que la reserva llegue al hostal es que el huésped mande el
// mensaje de WhatsApp. Por eso:
//   1) el submit abre WhatsApp de forma SÍNCRONA (mismo gesto del clic, el
//      navegador no lo bloquea) → un solo clic y la solicitud se envía;
//   2) la llamada a la API queda como respaldo (el día que se conecte la
//      planilla, la reserva también queda registrada ahí).
export default function ReservaCTA({ title } = {}) {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [telefono, setTelefono] = useState('');
  const [llegada, setLlegada] = useState('');
  const [noches, setNoches] = useState(1);
  const [personas, setPersonas] = useState(2);
  const [state, setState] = useState('idle');
  const [live, setLive] = useState(false);
  const [waOpened, setWaOpened] = useState(false);

  const tel = telefono.trim();
  const msg =
    `Hola Hostal Hudson, soy ${name.trim() || '...'}. Quiero reservar: ` +
    `llegada ${llegada || '...'}, ${noches} noche(s), ${personas} persona(s).` +
    (tel ? ` Mi teléfono: ${tel}.` : '') +
    ' ¿Tienen disponibilidad?';
  const today = new Date().toISOString().slice(0, 10);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !llegada) return alert(t.fillAll);
    setState('sending');

    // 1) WhatsApp primero y en el mismo gesto del clic: si lo hacemos después
    //    de un await, el navegador puede bloquear la ventana emergente.
    const win = window.open(waLink(msg), '_blank', 'noopener,noreferrer');
    setWaOpened(Boolean(win));

    // 2) La API es best-effort: si algún día se conecta la planilla, la
    //    reserva también queda registrada ahí.
    try {
      const r = await fetch('/api/reserva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, llegada, noches, personas, telefono }),
      });
      const data = await r.json();
      if (!data.ok) throw new Error(data.error || 'Error');
      setLive(data.sheetMode === 'live' || data.notifyMode === 'live');
    } catch {
      setLive(false);
    }
    setState('done');
  }

  function reset() {
    setName('');
    setTelefono('');
    setLlegada('');
    setNoches(1);
    setPersonas(2);
    setState('idle');
    setLive(false);
    setWaOpened(false);
  }

  if (state === 'done') {
    return (
      <div className="card" style={{ border: '2px solid #16a34a' }}>
        <h3>✅ {t.sentTitle}</h3>
        <p>{t.sentSub}</p>
        {!waOpened && (
          <p style={{ fontWeight: 600, color: '#b91c1c' }}>{t.waFallback}</p>
        )}
        <p style={{ margin: '14px 0' }}>
          <a
            className="btn btn-green"
            style={{ fontSize: '1.05rem', padding: '13px 24px' }}
            href={waLink(msg)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.confirmWa} ({HOSTAL_PHONE_DISPLAY})
          </a>
        </p>
        <p className="muted" style={{ fontSize: '0.9rem' }}>{t.recordedDemo}</p>
        {live && <p className="muted" style={{ fontSize: '0.9rem' }}>{t.recordedLive}</p>}
        <p>
          <button className="btn btn-outline" onClick={reset}>{t.another}</button>
        </p>
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
            <input type="date" min={today} value={llegada} onChange={(e) => setLlegada(e.target.value)} />
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
