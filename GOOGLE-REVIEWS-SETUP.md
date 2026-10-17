# Reseñas de Google en vivo (5 min)

El sitio ya quedó listo para mostrar reseñas reales y auto-actualizadas.
Sin API key muestra las 4 locales de `lib/site.js` (fallback). Con API key muestra las últimas 6 de Google + nota + link "Ver todas".

## 1. Conseguir el Place ID (1 min, gratis)
1. Abre https://developers.google.com/maps/documentation/places/web-service/place-id-finder
2. Busca `Hostal Hudson, Teniente Merino 1080, Puerto Aysén`
3. Copia el Place ID (empieza con `ChIJ...`)
4. Pégalo en `lib/site.js` → `GOOGLE_PLACE_ID = 'ChIJ...'`

## 2. Crear API key (2 min, requiere facturación en Google Cloud)
1. https://console.cloud.google.com → proyecto nuevo o existente → Habilitar `Places API (New)` y `Places API` legacy.
2. Credenciales → Crear clave de API → restringe por HTTP referrer a tu dominio (`hostal-hudson.vercel.app/*`, `localhost:3000/*`).
3. En local crea `.env.local`:
   ```
   GOOGLE_PLACES_API_KEY=AIza...
   ```
4. En Vercel: Settings → Environment Variables → `GOOGLE_PLACES_API_KEY` → Redeploy.

Costo: Places Details cuesta ~USD 0.017 por llamada. Con caché de 24h (`revalidate = 86400` en `app/api/reviews/route.js`) son ~30 llamadas/mes = ~USD 0.50/mes, dentro del free tier.

## 3. Probar
- `npm run dev` → abre `/api/reviews`:
  - Sin key: `{ live: false, reason: 'demo-fallback...' }`
  - Con key: `{ live: true, rating: 4.8, total: 123, reviews: [...] }`
- La portada (`app/page.jsx`) usa `<ReviewsLive fallback={TESTIMONIALS} />`: si `live:true` muestra estrellas reales + "Ver todas →".

## Por qué no scraping directo del link de Travel
Google Travel/Maps carga con JS y pide login, bloquea `fetch` server-side sin API (devuelve página "navegador obsoleto"). Hacer scraping además viola los TOS y se rompe cada semana. La API oficial es la única forma estable y permitida para auto-actualizar.
