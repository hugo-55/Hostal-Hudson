// Contenido estático en español, en un solo lugar.
// Lo usan las páginas (servidor) para los datos estructurados (JSON-LD) y
// lib/i18n.js para mostrarlo: así el texto marcado y el visible nunca se
// desincoplan (Google penaliza si no coinciden).
export const FAQ_ES = [
  { q: '¿A qué hora puedo llegar?', a: 'Recepción 24 h. Coordinamos el acceso con chapa electrónica al confirmar tu reserva.' },
  { q: '¿Cómo confirmo mi reserva?', a: 'Por WhatsApp coordinamos disponibilidad y forma de pago. Te confirmamos todo antes de reservar.' },
  { q: '¿Incluye desayuno y estacionamiento?', a: 'Sí, ambos incluidos sin costo adicional.' },
  { q: '¿Cómo entro a mi habitación?', a: 'Cada habitación tiene chapa electrónica con clave. Coordinamos el acceso al confirmar tu reserva y la recepción está disponible las 24 horas.' },
];

export const SPOTS_ES = {
  puente: { name: 'Puente Presidente Ibáñez', desc: 'Monumento Nacional frente a nosotros. La foto obligada.', img: '/img/gal-quevisitar-puente.jpg' },
  caleta: { name: 'Caletas de pescadores', desc: 'Color local y gastronomía marina a minutos.', img: '/img/gal-quevisitar-caleta.jpg' },
  cascada: { name: 'Cascadas de la región', desc: 'Saltos de agua escondidos en bosque patagónico.', img: '/img/gal-quevisitar-cascada.jpg' },
  camino: { name: 'Carretera Austral', desc: 'La ruta escénica más famosa de Chile empieza aquí.', img: '/img/gal-quevisitar-camino.jpg' },
  plaza: { name: 'Plaza de Puerto Aysén', desc: 'A 2 cuadras: comercio, cafés y vida local.', img: '/img/gal-quevisitar-plaza1.jpg' },
  mirador: { name: 'Miradores panorámicos', desc: 'Río, montañas y atardeceres inolvidables.', img: '/img/gal-quevisitar-pan.jpg' },
};

// Tipologías confirmadas por las fotos reales del hostal. Es la misma fuente
// que usan la página de habitaciones y su JSON-LD: el texto marcado y el
// visible no se desincronizan.
export const ROOMS_ES = [
  {
    key: 'matrimonial',
    name: 'Matrimonial',
    desc: 'Cama de dos plazas, cabecera de madera y luz natural. Para descansar en pareja después de recorrer Aysén.',
    homeDesc: 'Cama de dos plazas, calefacción y luz natural. Para descansar en pareja.',
    meta: '2 personas · Desayuno incluido',
    specs: ['2 personas', 'Baño privado', 'Chapa electrónica con clave', 'Desayuno incluido'],
    img: '/img/hostal-matrimonial-01.jpg',
    alt: 'Habitación matrimonial con cama de dos plazas, cabecera de madera y luz natural',
  },
  {
    key: 'double',
    name: 'Doble',
    desc: 'Dos camas de una plaza, ventana al exterior y ropa de cama abrigada. Una habitación práctica para dos personas que viajan juntas.',
    homeDesc: 'Dos camas de una plaza, silencio nocturno y ropa de cama abrigada.',
    meta: '2 personas · Desayuno incluido',
    specs: ['2 personas', 'Baño privado', 'Chapa electrónica con clave', 'Desayuno incluido'],
    img: '/img/hostal-doble-01.jpg',
    alt: 'Habitación doble con dos camas de una plaza y cabeceras de madera',
  },
  {
    key: 'family',
    name: 'Familiar',
    desc: 'Una cama de dos plazas y una de una plaza, con espacio para tres personas. La configuración final depende de la habitación disponible para tus fechas.',
    homeDesc: 'Una cama de dos plazas y una de una plaza. Espacio para tres personas.',
    meta: '3 personas · Desayuno incluido',
    specs: ['3 personas', 'Baño privado', 'Chapa electrónica con clave', 'Desayuno incluido'],
    img: '/img/hostal-familiar-01.jpg',
    alt: 'Habitación familiar con una cama de dos plazas y una de una plaza frente a la ventana',
  },
];
