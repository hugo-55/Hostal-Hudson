// Contenido estático en español, en un solo lugar.
// Lo usan las páginas (servidor) para los datos estructurados (JSON-LD) y
// lib/i18n.js para mostrarlo: así el texto marcado y el visible nunca se
// desincoplan (Google penaliza si no coinciden).
export const FAQ_ES = [
  { q: '¿A qué hora puedo llegar?', a: 'Recepción 24 h con entrega de llaves. Sin restricción de horario de ingreso.' },
  { q: '¿Cómo confirmo mi reserva?', a: 'Por WhatsApp coordinamos y confirmas con transferencia al Banco BCI. Envíanos el comprobante.' },
  { q: '¿Incluye desayuno y estacionamiento?', a: 'Sí, ambos incluidos sin costo adicional.' },
];

export const SPOTS_ES = {
  puente: { name: 'Puente Presidente Ibáñez', desc: 'Monumento Nacional frente a nosotros. La foto obligada.', img: '/img/gal-quevisitar-puente.jpg' },
  caleta: { name: 'Caletas de pescadores', desc: 'Color local y gastronomía marina a minutos.', img: '/img/gal-quevisitar-caleta.jpg' },
  cascada: { name: 'Cascadas de la región', desc: 'Saltos de agua escondidos en bosque patagónico.', img: '/img/gal-quevisitar-cascada.jpg' },
  camino: { name: 'Carretera Austral', desc: 'La ruta escénica más famosa de Chile empieza aquí.', img: '/img/gal-quevisitar-camino.jpg' },
  plaza: { name: 'Plaza de Puerto Aysén', desc: 'A 2 cuadras: comercio, cafés y vida local.', img: '/img/gal-quevisitar-plaza1.jpg' },
  mirador: { name: 'Miradores panorámicos', desc: 'Río, montañas y atardeceres inolvidables.', img: '/img/gal-quevisitar-pan.jpg' },
};

export const ROOM_CARDS_ES = [
  { name: 'Vista al río', desc: 'Despierta con el Aysén en la ventana.', img: '/img/gal-hostal-interior1.jpg' },
  { name: 'Familiar', desc: 'Espacio y calidez para los tuyos.', img: '/img/gal-hostal-interior2.jpg' },
  { name: 'Descanso total', desc: 'Camas cómodas y silencio nocturno.', img: '/img/gal-hostal-interior4.jpg' },
];
