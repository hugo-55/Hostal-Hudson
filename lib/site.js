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

export const SERVICES = [
  { icon: '📶', key: 'wifi' },
  { icon: '📺', key: 'tv' },
  { icon: '🅿️', key: 'parking' },
  { icon: '🛎️', key: 'reception' },
  { icon: '☕', key: 'breakfast' },
  { icon: '🧹', key: 'cleaning' },
];

export const TESTIMONIALS = [
  { name: 'Angélica Balboa', tag: 'Turista nacional', text: 'Realmente se encuentra comodidad y confort, sus camas proporcionan un descanso reparador. La atención personalizada nos permitió disfrutar de un descanso grato y amable.' },
  { name: 'Alex Castillo', tag: 'Turista nacional', text: 'Hermoso paisaje a orillas del río Aysén. La tranquilidad y el silencio nocturno permiten un descanso acogedor. Recomiendo Hostal Hudson.' },
  { name: 'Angélica Cárdenas', tag: 'Visitante', text: 'Excelente. Estupenda atención, cómodas habitaciones, acogedor ambiente. Frente al río y a pasos del centro. Totalmente recomendable.' },
  { name: 'Keka Santamaría', tag: 'Visitante', text: 'Acogedor lugar, con vista excepcional al río y al puente Aysén. Cómodas habitaciones y muy cercano a todo. Perfecto.' },
];
