import { ADMIN_STATE_URL } from '../../../../lib/site';

// GET  /api/admin/state → { estados, notas, busy, overrides }  (desde Sheets si está configurado)
// POST /api/admin/state → guarda { estados, notas, busy, overrides } (si está configurado)
export async function GET() {
  if (!ADMIN_STATE_URL) return Response.json({ ok: true, data: {} });
  try {
    const r = await fetch(ADMIN_STATE_URL, { next: { revalidate: 60 } });
    const d = await r.json();
    return Response.json({ ok: true, data: d || {} });
  } catch { return Response.json({ ok: false, data: {} }); }
}

export async function POST(req) {
  if (!ADMIN_STATE_URL) return Response.json({ ok: false, error: 'no configurado' }, { status: 400 });
  try {
    const body = await req.json();
    const r = await fetch(ADMIN_STATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!r.ok) throw new Error('sheets error');
    return Response.json({ ok: true });
  } catch { return Response.json({ ok: false }, { status: 500 }); }
}
