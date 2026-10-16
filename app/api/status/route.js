import { SHEET_ENDPOINT, NOTIFY_ENDPOINT, AVAILABILITY_CSV, REVIEW_URL } from '../../../lib/site';

// Estado de integraciones (solo booleanos, sin secretos).
export async function GET() {
  return Response.json({
    sheet: Boolean(SHEET_ENDPOINT),
    notify: Boolean(NOTIFY_ENDPOINT),
    availability: Boolean(AVAILABILITY_CSV),
    review: Boolean(REVIEW_URL),
  });
}
