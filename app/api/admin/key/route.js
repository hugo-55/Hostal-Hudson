import { cookies } from 'next/headers';
import { ADMIN_KEY, ADMIN_STATE_URL, ADMIN_DISPONIBLE } from '../../../../lib/admin-config';
import { leerEstadoAdmin, guardarEstadoAdmin } from '../../../../lib/admin-state';
import { tokenSesionValido, clavesIguales } from '../../../../lib/session';

// GET  /api/admin/key → { hasOverride: boolean }
// POST /api/admin/key  { currentKey, newKey } → cambia la clave de acceso del admin
// La clave nueva se guarda como override en la hoja de estado para que
// sobreviva a los redeploys.

function autorizado() {
  if (!ADMIN_DISPONIBLE) return false;
  const token = cookies().get('hostal-session')?.value;
  return tokenSesionValido(token);
}

export async function GET() {
  if (!autorizado()) return Response.json({ ok: false, error: 'no autorizado' }, { status: 401 });
  const d = await leerEstadoAdmin();
  return Response.json({ hasOverride: Boolean(d.adminKeyOverride) });
}

export async function POST(req) {
  // Sin clave del servidor no se puede autenticar el cambio: cerrado.
  if (!ADMIN_DISPONIBLE) {
    return Response.json({ ok: false, error: 'ADMIN_KEY no está configurada en el servidor' }, { status: 503 });
  }
  let body;
  try { body = await req.json(); } catch { return Response.json({ ok: false, error: 'JSON inválido' }, { status: 400 }); }
  const { currentKey, newKey } = body || {};
  if (!currentKey || !newKey || newKey.length < 4) {
    return Response.json({ ok: false, error: 'Claves inválidas' }, { status: 400 });
  }

  // Verificar currentKey contra la env o el override guardado
  const estado = await leerEstadoAdmin();
  const valid = clavesIguales(currentKey, ADMIN_KEY) || clavesIguales(currentKey, estado.adminKeyOverride);
  if (!valid) return Response.json({ ok: false, error: 'Clave actual incorrecta' }, { status: 401 });

  // Sin dónde persistir la nueva clave, el cambio se perdería: lo decimos claro.
  if (!ADMIN_STATE_URL) {
    return Response.json(
      { ok: false, error: 'No hay dónde guardar la clave nueva: configura ADMIN_STATE_URL o redeploy con otra ADMIN_KEY.' },
      { status: 400 }
    );
  }

  const guardado = await guardarEstadoAdmin({ adminKeyOverride: newKey });
  if (!guardado) {
    return Response.json({ ok: false, error: 'No se pudo guardar la clave nueva' }, { status: 500 });
  }

  return Response.json({ ok: true });
}
