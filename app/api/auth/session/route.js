import { cookies } from 'next/headers';
import { tokenSesionValido } from '../../../../lib/session';

// GET /api/auth/session → { ok: true/false }
// La cookie lleva un token firmado con expiración: no basta con mandar '1'.
export async function GET() {
  const token = cookies().get('hostal-session')?.value;
  return Response.json({ ok: tokenSesionValido(token) });
}
