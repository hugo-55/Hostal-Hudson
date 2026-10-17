import { SHEET_ENDPOINT, NOTIFY_ENDPOINT, AVAILABILITY_CSV, REVIEW_URL, GOOGLE_PLACE_ID } from '../../../lib/site';

// Estado de integraciones (solo booleanos, sin secretos).
export async function GET() {
  return Response.json({
    sheet: Boolean(SHEET_ENDPOINT),
    notify: Boolean(NOTIFY_ENDPOINT),
    availability: Boolean(AVAILABILITY_CSV),
    review: Boolean(REVIEW_URL),
    reviewsLive: Boolean(GOOGLE_PLACE_ID && process.env.GOOGLE_PLACES_API_KEY),
  });
}
