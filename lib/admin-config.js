// Configuración EXCLUSIVA del servidor (rutas API).
// No importar desde componentes 'use client': así nada de esto viaja al navegador.
import 'server-only';

// Clave del panel del dueño.
// - En producción NO hay valor por defecto: si no se define ADMIN_KEY, el login
//   falla cerrado (503) en vez de dejar entrar con una clave pública.
// - En desarrollo la clave por defecto es 'hudson123' para trabajar cómodo.
export const ADMIN_KEY = process.env.ADMIN_KEY || (process.env.NODE_ENV === 'production' ? '' : 'hudson123');

// ¿Se puede entrar al panel con la clave actual?
export const ADMIN_DISPONIBLE = Boolean(ADMIN_KEY);

// Hoja opcional donde guardar estados/notas/ocupados para verlos desde cualquier PC.
// Pon ADMIN_STATE_URL en .env.local y en Vercel. Vacío = solo localStorage del navegador.
export const ADMIN_STATE_URL = process.env.ADMIN_STATE_URL || '';
