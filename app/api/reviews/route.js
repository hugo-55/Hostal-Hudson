import { GOOGLE_PLACE_ID, TESTIMONIALS, MAPS_URL, REVIEW_URL } from '../../../lib/site';

// GET /api/reviews → opiniones en vivo desde Google Places, con fallback local.
// Cache 24h para no gastar cuota. Requiere env GOOGLE_PLACES_API_KEY (+ opcional GOOGLE_PLACE_ID, si no se autodescubre).
export const revalidate = 86400;

async function findPlaceId(apiKey) {
  // Autodescubrimiento por nombre/dirección (evita pegar el ChIJ... a mano).
  const q = encodeURIComponent('Hostal Hudson, Teniente Merino 1080, Puerto Aysén');
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${q}&inputtype=textquery&fields=place_id&language=es&key=${encodeURIComponent(apiKey)}`;
  const r = await fetch(url, { next: { revalidate: 86400 } });
  const data = await r.json();
  const pid = data?.candidates?.[0]?.place_id;
  if (!pid) throw new Error(`No se encontró Place ID (${data.status || 'sin respuesta'})`);
  return pid;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  let placeId = GOOGLE_PLACE_ID;

  if (!apiKey) {
    return Response.json({
      live: false,
      rating: 5,
      total: TESTIMONIALS.length,
      reviews: TESTIMONIALS,
      mapsUrl: REVIEW_URL || MAPS_URL,
      reason: 'demo-fallback (falta GOOGLE_PLACES_API_KEY, ver GOOGLE-REVIEWS-SETUP.md)',
    });
  }

  try {
    if (!placeId) placeId = await findPlaceId(apiKey);
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${encodeURIComponent(placeId)}` +
      `&fields=name,rating,user_ratings_total,reviews,url` +
      `&language=es&reviews_sort=newest&key=${encodeURIComponent(apiKey)}`;
    const r = await fetch(url, { next: { revalidate: 86400 } });
    const data = await r.json();
    if (data.status !== 'OK') throw new Error(`Places: ${data.status} ${data.error_message || ''}`.trim());

    const result = data.result || {};
    const reviews = (result.reviews || []).slice(0, 6).map((rev) => ({
      name: rev.author_name,
      tag: 'Reseña de Google',
      text: rev.text,
      rating: rev.rating,
      time: rev.relative_time_description,
    }));

    if (!reviews.length) throw new Error('Places devolvió 0 reseñas');

    return Response.json({
      live: true,
      rating: result.rating,
      total: result.user_ratings_total,
      reviews,
      mapsUrl: result.url || REVIEW_URL || MAPS_URL,
    });
  } catch (e) {
    return Response.json({
      live: false,
      rating: 5,
      total: TESTIMONIALS.length,
      reviews: TESTIMONIALS,
      mapsUrl: REVIEW_URL || MAPS_URL,
      reason: `demo-fallback (${e.message})`,
    });
  }
}
