import { cookies } from 'next/headers';

// GET /api/auth/session → { ok: true/false }
export async function GET() {
  const store = cookies();
  return Response.json({ ok: Boolean(store.get('hostal-session')) });
}
