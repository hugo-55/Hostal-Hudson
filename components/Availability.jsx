'use client';
import { useEffect, useState } from 'react';
import { AVAILABILITY_CSV, waLink } from '../lib/site';
import { useLang } from '../lib/i18n';

// Calendario de disponibilidad leído de un CSV público de Sheets.
// Sin URL configurada muestra el fallback de consulta por WhatsApp.
function monthDays(year, month) {
  const first = new Date(year, month, 1);
  const startPad = (first.getDay() + 6) % 7; // semana parte lunes
  const days = new Date(year, month + 1, 0).getDate();
  return { startPad, days };
}

export default function Availability() {
  const { t, lang } = useLang();
  const a = t.availability;
  const [busy, setBusy] = useState(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!AVAILABILITY_CSV) return;
    fetch(AVAILABILITY_CSV)
      .then((r) => r.text())
      .then((csv) => {
        const set = new Set();
        csv.split('\n').forEach((line) => {
          const [fecha, estado] = line.split(',').map((s) => (s || '').trim().toLowerCase());
          if (/^\d{4}-\d{2}-\d{2}$/.test(fecha) && estado.startsWith('ocup')) set.add(fecha);
        });
        setBusy(set);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  if (!AVAILABILITY_CSV) {
    return (
      <div className="card">
        <h3>{a.title}</h3>
        <p className="muted">{a.setup}</p>
        <a className="btn btn-green" href={waLink('Hola, consulto disponibilidad para estas fechas: ...')} target="_blank">{a.ask}</a>
      </div>
    );
  }

  const now = new Date();
  const months = [0, 1].map((d) => new Date(now.getFullYear(), now.getMonth() + d, 1));
  const monthName = (d) => d.toLocaleDateString(lang === 'es' ? 'es-CL' : 'en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="card">
      <h3>{a.title}</h3>
      <p className="muted">{a.text}</p>
      <p>
        <span className="ok-pill">🟢 {a.free}</span>{' '}
        <span className="low-pill">🔴 {a.busy}</span>
      </p>
      <div className="grid-2">
        {months.map((m) => {
          const { startPad, days } = monthDays(m.getFullYear(), m.getMonth());
          return (
            <div key={m.toISOString()}>
              <strong style={{ textTransform: 'capitalize' }}>{monthName(m)}</strong>
              <div className="mini-cal">
                {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d) => <span key={d} className="cal-head">{d}</span>)}
                {Array.from({ length: startPad }).map((_, k) => <span key={`p${k}`} />)}
                {Array.from({ length: days }).map((_, k) => {
                  const iso = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}-${String(k + 1).padStart(2, '0')}`;
                  const isBusy = busy.has(iso);
                  return <span key={iso} className={isBusy ? 'cal-busy' : 'cal-free'} title={iso}>{k + 1}</span>;
                })}
              </div>
            </div>
          );
        })}
      </div>
      {!loaded && <p className="muted">{a.loading}</p>}
    </div>
  );
}
