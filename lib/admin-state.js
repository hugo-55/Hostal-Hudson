// Lectura/escritura del estado del panel (estados de habitaciones, notas,
// ocupados, overrides, reservas manuales). Solo servidor.
//
// Dos backends, en orden de preferencia:
//   1. Vercel Blob privado (BLOB_STORE_ID + OIDC). Es el que usamos hoy: un
//      único JSON en el store privado "hostal-hudson-admin".
//   2. Google Apps Script (ADMIN_STATE_URL), legado.
// Sin ninguno de los dos, el panel funciona solo con localStorage del navegador.
import 'server-only';
import { get, put } from '@vercel/blob';
import { ADMIN_STATE_URL } from './admin-config';

const RUTA_BLOB = 'admin/estado.json';

function hayBlob() {
  return Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);
}

export function estadoRemotoDisponible() {
  return hayBlob() || Boolean(ADMIN_STATE_URL);
}

async function leerBlob() {
  try {
    const r = await get(RUTA_BLOB, { access: 'private', useCache: false });
    if (!r) return {};
    const texto = await new Response(r.stream).text();
    const d = JSON.parse(texto);
    return d && typeof d === 'object' ? d : {};
  } catch {
    // Blob inexistente en el primer arranque: estado vacío, no es un error.
    return {};
  }
}

async function guardarBlob(parche) {
  try {
    const actual = await leerBlob();
    const siguiente = { ...actual, ...parche };
    await put(RUTA_BLOB, JSON.stringify(siguiente), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 0,
    });
    return true;
  } catch {
    return false;
  }
}

async function leerSheets() {
  try {
    const r = await fetch(ADMIN_STATE_URL, { cache: 'no-store' });
    if (!r.ok) return {};
    const d = await r.json();
    return d && typeof d === 'object' ? d : {};
  } catch {
    return {};
  }
}

async function guardarSheets(parche) {
  try {
    const actual = await leerSheets();
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

// Devuelve el estado guardado ({} si no hay backend configurado o falla).
export async function leerEstadoAdmin() {
  if (hayBlob()) return leerBlob();
  if (!ADMIN_STATE_URL) return {};
  return leerSheets();
}

// Guarda (merge superficial) el estado.
export async function guardarEstadoAdmin(parche) {
  if (hayBlob()) return guardarBlob(parche);
  if (!ADMIN_STATE_URL) return false;
  return guardarSheets(parche);
}
