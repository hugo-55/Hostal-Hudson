// Lectura/escritura del estado del panel (reservas, notas, estados) en la hoja
// de Google Apps Script. Solo servidor.
import 'server-only';
import { ADMIN_STATE_URL } from './admin-config';

// Devuelve el estado guardado en la hoja ({} si no está configurada o falla).
export async function leerEstadoAdmin() {
  if (!ADMIN_STATE_URL) return {};
  try {
    const r = await fetch(ADMIN_STATE_URL, { cache: 'no-store' });
    if (!r.ok) return {};
    const d = await r.json();
    return d && typeof d === 'object' ? d : {};
  } catch {
    return {};
  }
}

// Guarda (merge superficial) el estado en la hoja.
export async function guardarEstadoAdmin(parche) {
  if (!ADMIN_STATE_URL) return false;
  try {
    const actual = await leerEstadoAdmin();
    const r = await fetch(ADMIN_STATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...actual, ...parche }),
    });
    return r.ok;
  } catch {
    return false;
  }
}
