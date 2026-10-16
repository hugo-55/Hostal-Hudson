// Datos reales de Hostal Hudson (con permiso de los dueños).
export const HOSTAL_PHONE = '56994391571';
export const HOSTAL_PHONE_DISPLAY = '+56 9 9439 1571';
export const ADDRESS = 'Teniente Merino 1080, Puerto Aysén, Chile';
export const EMAIL = 'administracion@hostalhudson.cl';
export const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Teniente+Merino+1080+Puerto+Aysen';
export const SITE_URL = 'https://hostal-hudson.vercel.app';
export const PAGESPEED_URL = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent('https://www.hostalhudson.cl')}`;

export const waLink = (text) => `https://wa.me/${HOSTAL_PHONE}?text=${encodeURIComponent(text)}`;

// Reserva real: Apps Script del hostal (ver RESERVAS-SETUP.md). Vacío = modo demo.
export const SHEET_ENDPOINT = '';
export const NOTIFY_ENDPOINT = '';
export const NOTIFY_TO = HOSTAL_PHONE;

export const SERVICES = [
  { icon: '📶', name: 'Wi-Fi gratis', desc: 'Internet inalámbrico sin costo en todo el hostal.' },
  { icon: '📺', name: 'TV cable', desc: 'Televisión por cable en habitaciones.' },
  { icon: '🅿️', name: 'Estacionamiento', desc: 'Sin costo, hasta completar capacidad.' },
  { icon: '🛎️', name: 'Recepción 24 h', desc: 'Libre horario de ingreso, entrega de llaves.' },
  { icon: '☕', name: 'Desayuno incluido', desc: 'Desayuno continental + cocina equipada disponible.' },
  { icon: '🧹', name: 'Mucama diaria', desc: 'Limpieza todos los días antes del mediodía.' },
];

export const TESTIMONIALS = [
  { name: 'Angélica Balboa', tag: 'Turista nacional', text: 'Realmente se encuentra comodidad y confort, sus camas proporcionan un descanso reparador. La atención personalizada nos permitió disfrutar de un descanso grato y amable.' },
  { name: 'Alex Castillo', tag: 'Turista nacional', text: 'Hermoso paisaje a orillas del río Aysén. La tranquilidad y el silencio nocturno permiten un descanso acogedor. Recomiendo Hostal Hudson.' },
  { name: 'Angélica Cárdenas', tag: 'Visitante', text: 'Excelente. Estupenda atención, cómodas habitaciones, acogedor ambiente. Frente al río y a pasos del centro. Totalmente recomendable.' },
  { name: 'Keka Santamaría', tag: 'Visitante', text: 'Acogedor lugar, con vista excepcional al río y al puente Aysén. Cómodas habitaciones y muy cercano a todo. Perfecto.' },
];
