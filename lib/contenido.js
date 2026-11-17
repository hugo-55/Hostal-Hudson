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

// Tipologías confirmadas por las fotos reales del hostal (interior3: cama de
// una plaza; interior4: dos camas). Es la misma fuente que usan la página de
// habitaciones y su JSON-LD: el texto marcado y el visible no se desincronizan.
export const ROOMS_ES = [
  {
    key: 'individual',
    name: 'Individual',
    desc: 'Cama de una plaza, respaldo de madera y luz natural. Para quien viaja solo o viene a trabajar a la región.',
    homeDesc: 'Cama de una plaza, calefacción y luz natural. Para viaje solo o de trabajo.',
    meta: '1 persona · Desayuno incluido',
    specs: ['1 persona', 'Baño privado', 'Desayuno incluido'],
    img: '/img/gal-hostal-interior3.jpg',
    alt: 'Habitación individual con cama de una plaza, respaldo de madera y ventana con cortina clara',
  },
  {
    key: 'double',
    name: 'Doble',
    desc: 'Dos camas de una plaza, ventana al exterior y ropa de cama abrigada. Silencio nocturno para reponer fuerzas.',
    homeDesc: 'Dos camas de una plaza, silencio nocturno y ropa de cama abrigada.',
    meta: '2 personas · Desayuno incluido',
    specs: ['2 personas', 'Baño privado', 'Desayuno incluido'],
    img: '/img/gal-hostal-interior4.jpg',
    alt: 'Habitación doble con dos camas individuales y ventana iluminada',
  },
];
