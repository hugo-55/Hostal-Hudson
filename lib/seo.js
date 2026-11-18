// Títulos y descripciones por página (ES/EN) en un solo lugar.
// - Las páginas (componentes de servidor) los usan para `metadata`: así el
//   título y la descripción van en el HTML que lee Google.
// - El cliente (lib/useSeo.js) los usa para actualizar el título cuando el
//   visitante cambia de idioma.
// Los títulos son absolutos (ya incluyen " | Hostal Hudson") para que el
// servidor y el cliente produzcan exactamente la misma cadena.
import { SITE_URL, OG_IMAGE } from './site';

// Bloque OpenGraph listo para cada página.
// OJO: Next reemplaza (no mezcla) el openGraph del layout cuando la página
// define el suyo, así que cada página debe traer su propia imagen.
export function openGraph(seo, path, extra = {}) {
  return {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Hostal Hudson',
    title: seo.title,
    description: seo.description,
    url: `${SITE_URL}${path}`,
    images: [OG_IMAGE],
    ...extra,
  };
}

export const SEO = {
  home: {
    es: {
      title: 'Hostal Hudson — Alojamiento en Puerto Aysén',
      description:
        'Hostal familiar en Puerto Aysén, frente al río y a 2 cuadras de la plaza. Wi-Fi gratis, desayuno incluido, recepción 24 h. Reserva por WhatsApp.',
    },
    en: {
      title: 'Hostal Hudson — Stay in Puerto Aysén',
      description:
        'Family hostel in Puerto Aysén, on the river and 2 blocks from the main square. Free Wi-Fi, breakfast included, 24 h reception. Book via WhatsApp.',
    },
  },
  habitaciones: {
    es: {
      title: 'Habitaciones | Hostal Hudson',
      description:
        'Habitaciones matrimonial, doble y familiar con baño privado en Hostal Hudson, Puerto Aysén. Desayuno, Wi-Fi, TV por cable, calefacción, chapa electrónica y limpieza diaria.',
    },
    en: {
      title: 'Rooms | Hostal Hudson',
      description:
        'Matrimonial, double and family rooms with a private bathroom at Hostal Hudson, Puerto Aysén. Breakfast, Wi-Fi, cable TV, heating, electronic lock and daily cleaning.',
    },
  },
  galeria: {
    es: {
      title: 'Galería | Hostal Hudson',
      description:
        'Fotos reales de Hostal Hudson y de la zona de Puerto Aysén. Habitaciones, comedor, desayuno, entorno y más.',
    },
    en: {
      title: 'Gallery | Hostal Hudson',
      description:
        'Real photos of Hostal Hudson and the Puerto Aysén area. Rooms, dining room, breakfast, surroundings and more.',
    },
  },
  reservas: {
    es: {
      title: 'Reservar | Hostal Hudson',
      description:
        'Reserva tu estadía en Hostal Hudson, Puerto Aysén por WhatsApp en 1 minuto. Recepción 24 h.',
    },
    en: {
      title: 'Book | Hostal Hudson',
      description:
        'Book your stay at Hostal Hudson, Puerto Aysén via WhatsApp in 1 minute. 24 h reception.',
    },
  },
  guia: {
    es: {
      title: 'Guía Aysén | Hostal Hudson',
      description:
        'Guía de viaje de Puerto Aysén: cómo llegar, qué llevar, itinerario de 3 días y consejos prácticos.',
    },
    en: {
      title: 'Aysén Guide | Hostal Hudson',
      description:
        'Travel guide to Puerto Aysén: how to get there, what to pack, 3-day itinerary and practical tips.',
    },
  },
  visitar: {
    es: {
      title: 'Qué visitar | Hostal Hudson',
      description:
        'Qué visitar desde Hostal Hudson en Puerto Aysén: puente Ibáñez, caletas, cascadas, Carretera Austral y más.',
    },
    en: {
      title: 'What to visit | Hostal Hudson',
      description:
        'What to visit from Hostal Hudson in Puerto Aysén: Ibáñez bridge, fishing coves, waterfalls, Carretera Austral and more.',
    },
  },
  privacidad: {
    es: {
      title: 'Política de privacidad | Hostal Hudson',
      description:
        'Qué datos recogemos en hostalhudson.cl, para qué los usamos y cómo contactarnos. Sin cookies de perfilado.',
    },
    en: {
      title: 'Privacy policy | Hostal Hudson',
      description:
        'What data hostalhudson.cl collects, what it is used for and how to contact us. No profiling cookies.',
    },
  },
};
