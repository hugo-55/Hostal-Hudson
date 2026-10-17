// Datos reales de Hostal Hudson (con permiso de los dueños).
export const HOSTAL_PHONE = '56994391571';
export const HOSTAL_PHONE_DISPLAY = '+56 9 9439 1571';
export const ADDRESS = 'Teniente Merino 1080, Puerto Aysén, Chile';
export const EMAIL = 'administracion@hostalhudson.cl';
export const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Teniente+Merino+1080+Puerto+Aysen';
export const SITE_URL = 'https://hostal-hudson.vercel.app';
export const PAGESPEED_URL = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent('https://www.hostalhudson.cl')}`;

export const waLink = (text) => `https://wa.me/${HOSTAL_PHONE}?text=${encodeURIComponent(text)}`;

// Cotizador: tarifa referencial por persona/noche. REEMPLAZAR con tarifas reales del dueño.
// Se muestra como "estimación" y se confirma por WhatsApp: nunca un precio falso cerrado.
export const RATE_PER_PERSON_NIGHT = 25000;

// Disponibilidad: URL CSV publicada de Google Sheets (ver AVAILABILITY-SETUP.md).
// Formato: fecha (AAAA-MM-DD), estado (libre/ocupado). Vacío = se muestra "consulta por WhatsApp".
export const AVAILABILITY_CSV = '';

// Reserva real: Apps Script del hostal (ver RESERVAS-SETUP.md). Vacío = modo demo.
export const SHEET_ENDPOINT = '';
export const NOTIFY_ENDPOINT = '';
export const NOTIFY_TO = HOSTAL_PHONE;

// Reviews Google: pega aquí el link "Escribir reseña" del perfil del hostal.
// Vacío = el botón lleva a WhatsApp para pedir el link.
export const REVIEW_URL = '';

// Google Places (opiniones en vivo): Place ID público + API key solo en servidor.
// Ver GOOGLE-REVIEWS-SETUP.md. Vacío = se usan TESTIMONIALS como fallback.
export const GOOGLE_PLACE_ID = '';

// Lectura de reservas para el panel del dueño (ver RESERVAS-SETUP.md, paso 5).
// Apps Script publicado que devuelve las filas en JSON. Vacío = datos de ejemplo.
export const RESERVAS_READ_URL = '';

export const SERVICES = [
  { icon: '📶', key: 'wifi' },
  { icon: '📺', key: 'tv' },
  { icon: '🅿️', key: 'parking' },
  { icon: '🛎️', key: 'reception' },
  { icon: '☕', key: 'breakfast' },
  { icon: '🧹', key: 'cleaning' },
];

export const TESTIMONIALS = [
  { name: 'Rodrigo Valenzuela', tag: 'Reseña de Google', text: 'La habitación muy comoda, la vista al río Aysén invita a quedarse y descansar, calentito en los días de frío y lluvia de la Patagonia... y el desayuno? El mejor que probamos desde Puerto Montt hasta Villa O’Higgins.', rating: 5 },
  { name: 'Dedy Lincoqueo Soto', tag: 'Reseña de Google', text: 'Recomendado en un 100%. Anfitriones muy preocupados. Piezas hermosas y limpias. Lugar céntrico. Desayuno muy rico.', rating: 5 },
  { name: 'Santiago Pernigotti', tag: 'Reseña de Google', text: 'Excelente atención, muy amable, excelente desayuno. Siempre atentos.', rating: 5 },
  { name: 'Oscar Liendo', tag: 'Reseña de Google', text: 'Muy acogedor, ideal para pasar días de descanso. Las piezas impecables y equipadas con calefacción. Los desayunos exquisitos y contundentes. Tienen un perrito ovejero y mis hijos jugaron y se entretuvieron con él. 100% recomendados.', rating: 5 },
  { name: 'Stephany Grego', tag: 'Reseña de Google', text: 'El hostal super lindo, limpio y muy bien ubicado! :) Lo pasamos muy bien en nuestra estadía en Pto. Aysen. ¡Muchas gracias por su hospitalidad y buena onda! Sin duda volveremos!!', rating: 5 },
  { name: 'Patricio Fuentes', tag: 'Reseña de Google', text: 'Muy bien servicio, cómodo, hermosa vista al río y buena ubicación, muy recomendable', rating: 5 },
];
