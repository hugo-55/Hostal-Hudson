import { SHEET_ENDPOINT, NOTIFY_ENDPOINT, NOTIFY_TO } from '../../../lib/site';

// POST { name, llegada, noches, personas } → Sheets del hostal + aviso WhatsApp.
// Sin endpoints = modo demo (reserva por WhatsApp manual, como hoy).
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'JSON inválido' }, { status: 400 });
  }
  const { name = '', llegada = '', noches = 1, personas = 2 } = body;
  if (!String(name).trim() || !String(llegada).trim()) {
    return Response.json({ ok: false, error: 'Faltan nombre o fecha' }, { status: 400 });
  }
  const row = {
    fecha_registro: new Date().toISOString(),
    nombre: String(name).slice(0, 80),
    llegada: String(llegada).slice(0, 20),
    noches: Math.max(1, Math.min(60, Number(noches) || 1)),
    personas: Math.max(1, Math.min(20, Number(personas) || 1)),
  };

  let sheetMode = 'demo';
  if (SHEET_ENDPOINT) {
    try {
      const r = await fetch(SHEET_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(row),
      });
      if (!r.ok) throw new Error(`Sheets respondió ${r.status}`);
      sheetMode = 'live';
    } catch (e) {
      sheetMode = `demo-fallback (Sheets: ${e.message})`;
    }
  }

  let notifyMode = 'demo';
  if (NOTIFY_ENDPOINT) {
    try {
      const r = await fetch(NOTIFY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: NOTIFY_TO,
          message: `🏨 Nueva reserva: ${row.nombre}, llegada ${row.llegada}, ${row.noches} noche(s), ${row.personas} persona(s).`,
        }),
      });
      if (!r.ok) throw new Error(`Avisador respondió ${r.status}`);
      notifyMode = 'live';
    } catch (e) {
      notifyMode = `demo-fallback (aviso: ${e.message})`;
    }
  }

  return Response.json({ ok: true, sheetMode, notifyMode, row });
}
