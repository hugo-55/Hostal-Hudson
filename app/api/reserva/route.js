import { SHEET_ENDPOINT, NOTIFY_ENDPOINT, NOTIFY_TO } from '../../../lib/site';
import { ipDe, excedeLimite, registrarPedido } from '../../../lib/rate-limit';

// POST { name, llegada, noches, personas, telefono, empresa } → planilla del
// hostal + aviso WhatsApp. Sin endpoints = modo demo (reserva por WhatsApp).
// `empresa` es honeypot antispam: los humanos no la ven (campo oculto del
// formulario); si llega con contenido, es un robot → 200 silencioso sin
// guardar nada. Al cliente solo se le responden mensajes genéricos: los
// detalles de los errores del proveedor de Sheets o del avisador van únicamente
// al log del servidor.
export async function POST(req) {
  const ip = ipDe(req);
  if (excedeLimite(ip)) {
    return Response.json(
      { ok: false, error: 'Demasiadas solicitudes. Espera unos minutos.' },
      { status: 429 }
    );
  }
  registrarPedido(ip);

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'JSON inválido' }, { status: 400 });
  }
  if (!body || typeof body !== 'object') body = {};

  // Honeypot: el campo `empresa` debe viajar vacío. Contenido = robot: 200 y
  // fuera, sin datos guardados ni error visible que invite a reintentar.
  if (String(body.empresa ?? '').trim()) {
    console.warn(`[reserva] honeypot disparado (ip ${ip})`);
    return Response.json({ ok: true, sheetMode: 'demo', notifyMode: 'demo' });
  }

  const { name = '', llegada = '', noches = 1, personas = 2, telefono = '' } = body;
  if (!String(name).trim() || !String(llegada).trim()) {
    return Response.json({ ok: false, error: 'Faltan nombre o fecha' }, { status: 400 });
  }

  // Aceptamos solo AAAA-MM-DD: evita fechas raras en la planilla y controles.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(llegada).trim().slice(0, 10))) {
    return Response.json({ ok: false, error: 'Fecha inválida, formato AAAA-MM-DD' }, { status: 400 });
  }

  const row = {
    fecha_registro: new Date().toISOString(),
    nombre: String(name).trim().slice(0, 80),
    llegada: String(llegada).trim().slice(0, 10),
    noches: Math.max(1, Math.min(60, Number(noches) || 1)),
    personas: Math.max(1, Math.min(20, Number(personas) || 1)),
    telefono: String(telefono || '').replace(/\D/g, '').slice(0, 15),
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
      // Detalles del proveedor: solo al log del servidor. Al cliente nada.
      console.warn('[reserva] planilla no disponible:', e?.message);
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
      console.warn('[reserva] avisador no disponible:', e?.message);
    }
  }

  return Response.json({ ok: true, sheetMode, notifyMode, row });
}
