# Brief para Antigravity — Hostal Hudson: material real, sin tarifas y con chapa electrónica

Fecha: 2026-11-17
Repo: `C:\Users\hugoc\agent\proyectos\hostal-hudson`
Rama de trabajo: crear `contenido/material-real-2026-11-17` desde `main`
Estado de producción: `main` en `b0decf3`, sitio publicado en `www.hostalhudson.cl`

Este documento manda. No hay que interpretar las fotos viejas ni inventar datos.
El objetivo es reemplazar el material provisional por el material real, quitar
toda tarifa pública y comunicar la chapa electrónica, sin revelar la cantidad de
piezas.

No publicar, no hacer push y no tocar `/admin`, `app/admin/**`, `app/api/**` ni
`components/AdminPanel.jsx`. Entregar rama, build y capturas para revisión.

---

## 1. Reglas duras

1. **No publicar tarifas, montos, “CLP”, “desde $”, precios referenciales ni
   datos bancarios.** Tampoco trasladar los datos de la actual página
   `/tarifas` a otra página. La página se elimina.
2. **No publicar la cantidad de piezas** ni cuántas son matrimoniales. Nada de
   “5 habitaciones”, “cinco piezas”, “2 matrimoniales” ni equivalentes.
3. **Cada habitación debe comunicar “chapa electrónica con clave”** en la ficha
   visible y en los datos estructurados. No decir “llave” ni “entrega de
   llaves”.
4. **Tipologías:** Matrimonial, Doble y Familiar, determinadas por las fotos
   nuevas. No publicar “Individual”: no hay foto nueva que lo respalde.
5. **No usar la foto de huéspedes** (`no-publicar/huespedes-sin-permiso.jpg`).
   No hay permiso confirmado.
6. **No usar** `IMG20251113175838.jpg` (baño con llave física y tag “4”) ni
   `IMG20261117180436.jpg` (baño con sticker de número de pieza).
7. **Mantener** `aysen-puente.jpg` en el hero y `aysen-letrero.jpg` en
   “Ubicación”. No reemplazarlas.
8. **No tocar** `public/img/logo.png` ni el logo del header. El archivo
   `opcional-logo.jpg` de la carpeta de fotos era una captura y no se usa.
9. **No inventar** horarios, políticas, nombres de anfitriones, distancias,
   servicios ni datos de pago.
10. El sitio tiene que verse bien en 1440, 768 y 360 px, sin scroll horizontal
    ni imágenes rotas.

---

## 2. Fotos: fuente y selección

### 2.1 Fuente correcta

La carpeta buena es:

`C:\Users\hugoc\OneDrive\Escritorio\Fotos hostal hudson 17-11-2026`

Tiene **55 archivos**. El ZIP de esa fecha quedó viejo (25 archivos): **no usar
el ZIP**. La carpeta curada para esta entrega es:

`C:\Users\hugoc\OneDrive\Escritorio\hostal-seleccion-2026-11-17`

Ahí están las 16 fotos finales, `LEEME.txt` y la subcarpeta `no-publicar/`.
Antigravity debe tomar los originales de la carpeta curada y generar los
derivados que se indican abajo.

### 2.2 Selección final (16 fotos)

| Destino en `public/img` | Archivo curado | Qué es |
|---|---|---|
| `hostal-matrimonial-01.jpg` | `matrimonial-01.jpg` | Matrimonial, cama de dos plazas |
| `hostal-matrimonial-02.jpg` | `matrimonial-02.jpg` | Matrimonial, segunda vista |
| `hostal-doble-01.jpg` | `doble-01.jpg` | Doble, dos camas de una plaza |
| `hostal-doble-02.jpg` | `doble-02.jpg` | Doble con ventana al río |
| `hostal-familiar-01.jpg` | `familiar-01.jpg` | Familiar, 2 plazas + 1 plaza |
| `hostal-familiar-02.jpg` | `familiar-02.jpg` | Familiar, segunda vista |
| `hostal-bano-01.jpg` | `bano-01.jpg` | Baño privado con ducha e inodoro |
| `hostal-comedor-01.jpg` | `comedor-01.jpg` | Comedor de madera servido |
| `hostal-comedor-02.jpg` | `comedor-02.jpg` | Comedor y cocina |
| `hostal-desayuno-01.jpg` | `desayuno-01.jpg` | Desayuno en el comedor |
| `hostal-desayuno-02.jpg` | `desayuno-02.jpg` | Mesa de desayuno |
| `hostal-living-01.jpg` | `living-01.jpg` | Living con estufa y sillones |
| `hostal-pasillo-01.jpg` | `pasillo-chapas-01.jpg` | Pasillo con chapas |
| `hostal-pasillo-02.jpg` | `pasillo-chapas-02.jpg` | Detalle de chapa |
| `hostal-rio-01.jpg` | `rio-cerros.jpg` | Río y cerros |
| `hostal-entrada-01.jpg` | `entrada-01.jpg` | Entrada con banco de madera |

No se generan derivados de `no-publicar/`.

### 2.3 Derivados exactos

No subir originales de 3072×4080. Generar JPEG de 1600 px de ancho, calidad 82,
con estos recortes. El script usa `System.Drawing`, no requiere instalar nada.

| Destino | Recorte `x,y,w,h` | Salida |
|---|---|---|
| `hostal-matrimonial-01.jpg` | `0,850,3072,2304` | 1600×1200 |
| `hostal-matrimonial-02.jpg` | `0,850,3072,2304` | 1600×1200 |
| `hostal-doble-01.jpg` | `0,750,3072,2304` | 1600×1200 |
| `hostal-doble-02.jpg` | `0,700,3072,2304` | 1600×1200 |
| `hostal-familiar-01.jpg` | `0,750,3072,2304` | 1600×1200 |
| `hostal-familiar-02.jpg` | `0,750,3072,2304` | 1600×1200 |
| `hostal-bano-01.jpg` | `0,850,3072,2304` | 1600×1200 |
| `hostal-comedor-01.jpg` | `0,1150,3072,1920` | 1600×1000 |
| `hostal-comedor-02.jpg` | `0,900,3072,2304` | 1600×1200 |
| `hostal-desayuno-01.jpg` | `0,700,3072,2304` | 1600×1200 |
| `hostal-desayuno-02.jpg` | `0,700,3072,2304` | 1600×1200 |
| `hostal-living-01.jpg` | `0,1000,3072,1920` | 1600×1000 |
| `hostal-pasillo-01.jpg` | `250,1250,2400,1800` | 1600×1200 |
| `hostal-pasillo-02.jpg` | `0,1000,3072,2304` | 1600×1200 |
| `hostal-rio-01.jpg` | `0,900,3072,1920` | 1600×1000 |
| `hostal-entrada-01.jpg` | `280,760,2792,1745` | 1600×1000 |

Script de referencia para Windows/PowerShell:

```powershell
Add-Type -AssemblyName System.Drawing

$src = "C:\Users\hugoc\OneDrive\Escritorio\hostal-seleccion-2026-11-17"
$dst = "C:\Users\hugoc\agent\proyectos\hostal-hudson\public\img"

# destino, archivo, x, y, ancho, alto, ancho final, alto final
$fotos = @(
  @{ d='hostal-matrimonial-01.jpg'; f='matrimonial-01.jpg'; x=0;   y=850;  w=3072; h=2304; tw=1600; th=1200 },
  @{ d='hostal-matrimonial-02.jpg'; f='matrimonial-02.jpg'; x=0;   y=850;  w=3072; h=2304; tw=1600; th=1200 },
  @{ d='hostal-doble-01.jpg';       f='doble-01.jpg';       x=0;   y=750;  w=3072; h=2304; tw=1600; th=1200 },
  @{ d='hostal-doble-02.jpg';       f='doble-02.jpg';       x=0;   y=700;  w=3072; h=2304; tw=1600; th=1200 },
  @{ d='hostal-familiar-01.jpg';    f='familiar-01.jpg';    x=0;   y=750;  w=3072; h=2304; tw=1600; th=1200 },
  @{ d='hostal-familiar-02.jpg';    f='familiar-02.jpg';    x=0;   y=750;  w=3072; h=2304; tw=1600; th=1200 },
  @{ d='hostal-bano-01.jpg';        f='bano-01.jpg';        x=0;   y=850;  w=3072; h=2304; tw=1600; th=1200 },
  @{ d='hostal-comedor-01.jpg';     f='comedor-01.jpg';     x=0;   y=1150; w=3072; h=1920; tw=1600; th=1000 },
  @{ d='hostal-comedor-02.jpg';     f='comedor-02.jpg';     x=0;   y=900;  w=3072; h=2304; tw=1600; th=1200 },
  @{ d='hostal-desayuno-01.jpg';    f='desayuno-01.jpg';    x=0;   y=700;  w=3072; h=2304; tw=1600; th=1200 },
  @{ d='hostal-desayuno-02.jpg';    f='desayuno-02.jpg';    x=0;   y=700;  w=3072; h=2304; tw=1600; th=1200 },
  @{ d='hostal-living-01.jpg';      f='living-01.jpg';      x=0;   y=1000; w=3072; h=1920; tw=1600; th=1000 },
  @{ d='hostal-pasillo-01.jpg';     f='pasillo-chapas-01.jpg'; x=250; y=1250; w=2400; h=1800; tw=1600; th=1200 },
  @{ d='hostal-pasillo-02.jpg';     f='pasillo-chapas-02.jpg'; x=0;   y=1000; w=3072; h=2304; tw=1600; th=1200 },
  @{ d='hostal-rio-01.jpg';         f='rio-cerros.jpg';     x=0;   y=900;  w=3072; h=1920; tw=1600; th=1000 },
  @{ d='hostal-entrada-01.jpg';     f='entrada-01.jpg';     x=280; y=760;  w=2792; h=1745; tw=1600; th=1000 }
)

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, 82L
)

foreach ($foto in $fotos) {
  $origen = Join-Path $src $foto.f
  if (!(Test-Path $origen)) { throw "Falta $origen" }

  $img = [System.Drawing.Image]::FromFile($origen)
  $rect = New-Object System.Drawing.Rectangle($foto.x, $foto.y, $foto.w, $foto.h)
  $bmp = New-Object System.Drawing.Bitmap($foto.tw, $foto.th)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.DrawImage(
    $img,
    (New-Object System.Drawing.Rectangle(0, 0, $foto.tw, $foto.th)),
    $rect,
    [System.Drawing.GraphicsUnit]::Pixel
  )
  $g.Dispose()
  $bmp.Save((Join-Path $dst $foto.d), $codec, $ep)
  $bmp.Dispose()
  $img.Dispose()
}

Write-Host "Listo: $($fotos.Count) derivados en $dst"
```

Después de generarlos, borrar del repo las fotos viejas de interiores, una vez
verificado que no quedan referencias:

- `public/img/gal-hostal-interior1.jpg`
- `public/img/gal-hostal-interior2.jpg`
- `public/img/gal-hostal-interior3.jpg`
- `public/img/gal-hostal-interior4.jpg`
- `public/img/gal-hostal-interior5.jpg`

Mantener `public/img/gal-hostal-exterior1.jpg` solo para la galería, como foto
de fachada. No usarla en el home.

---

## 3. Tipologías y copy

### 3.1 Qué se publica

| Tipología | Cama | Personas | Foto principal |
|---|---|---|---|
| Matrimonial | 1 cama de dos plazas | 2 | `hostal-matrimonial-01.jpg` |
| Doble | 2 camas de una plaza | 2 | `hostal-doble-01.jpg` |
| Familiar | 1 de dos plazas + 1 de una plaza | 3 | `hostal-familiar-01.jpg` |

No publicar “Individual”. No publicar cuántas piezas hay de cada tipo.

### 3.2 `lib/contenido.js`

Reemplazar `ROOM_CARDS_ES` y `ROOMS_ES` por:

```js
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
```

Eliminar `ROOM_CARDS_ES` (no se renderiza en ninguna página). Si se prefiere
conservarla, actualizar sus tres fotos a las nuevas; pero es mejor quitarla para
no dejar rutas viejas.

Actualizar `FAQ_ES`:

```js
export const FAQ_ES = [
  { q: '¿A qué hora puedo llegar?', a: 'Recepción 24 h. Coordinamos el acceso con chapa electrónica al confirmar tu reserva.' },
  { q: '¿Cómo confirmo mi reserva?', a: 'Por WhatsApp coordinamos disponibilidad y forma de pago. Te confirmamos todo antes de reservar.' },
  { q: '¿Incluye desayuno y estacionamiento?', a: 'Sí, ambos incluidos sin costo adicional.' },
  { q: '¿Cómo entro a mi habitación?', a: 'Cada habitación tiene chapa electrónica con clave. Coordinamos el acceso al confirmar tu reserva y la recepción está disponible las 24 horas.' },
];
```

No incluir Banco BCI, número de cuenta, RUT ni “envíanos el comprobante”.

### 3.3 `lib/i18n.js`

Cambios obligatorios:

- Quitar `ROOM_CARDS_ES` del import y borrar las claves `roomCards` de `es` y
  `en`.
- En `nav` (ES y EN), quitar `rates`.
- En `facts.items` (ES y EN), agregar `Chapa electrónica` / `Electronic lock`.
  Puede quedar así:
  - ES: `['Baño privado', 'Chapa electrónica', 'Desayuno incluido', 'Wi-Fi gratis', 'Estacionamiento', 'Recepción 24 h', 'Limpieza diaria']`
  - EN: `['Private bathroom', 'Electronic lock', 'Breakfast included', 'Free Wi-Fi', 'Parking', '24 h reception', 'Daily cleaning']`
- Reemplazar `roomsPage.items` de ES por `ROOMS_ES` y el bloque EN por las tres
  tipologías traducidas:
  - Matrimonial / Matrimonial
  - Doble / Double
  - Familiar / Family
  - specs EN: `['2 guests', 'Private bathroom', 'Electronic keypad lock', 'Breakfast included']` (o `3 guests` para Family).
- Quitar `priceLabel` y `priceNote`.
- Agregar en `roomsPage`:
  - ES:
    - `securityTitle: 'Cada habitación tiene chapa electrónica con clave'`
    - `securityText: 'La puerta se abre con clave electrónica. Coordinamos el acceso al confirmar tu reserva y la recepción está disponible las 24 horas.'`
    - `securityAlt: 'Pasillo de Hostal Hudson con puertas de madera y chapas electrónicas'`
  - EN:
    - `securityTitle: 'Every room has an electronic keypad lock'`
    - `securityText: 'The door opens with an electronic code. We coordinate access when you confirm your booking, and reception is available 24 hours.'`
    - `securityAlt: 'Hostal Hudson hallway with wooden doors and electronic locks'`
- Actualizar `groupText` para no hablar de “fotos actuales” (las fotos ya están en
  el sitio):
  - ES: `'La distribución de camas cambia según la habitación libre para tus fechas. Escríbenos y te confirmamos la configuración antes de reservar.'`
  - EN: `'The bed layout depends on the room available for your dates. Write to us and we will confirm the layout before you book.'`
- Actualizar `groupNote`:
  - ES: `'Todas las habitaciones tienen baño privado, chapa electrónica con clave y desayuno incluido.'`
  - EN: `'All rooms have a private bathroom, an electronic keypad lock and breakfast included.'`
- Actualizar `roomsPageSub`:
  - ES: `'Todas incluyen desayuno, Wi-Fi, TV por cable, calefacción, chapa electrónica con clave y limpieza diaria antes del mediodía.'`
  - EN: `'All include breakfast, Wi-Fi, cable TV, heating, an electronic keypad lock and daily cleaning before noon.'`
- Actualizar `home.ctaText` para quitar “tarifa”:
  - ES: `'Respondemos por WhatsApp todos los días. Te confirmamos disponibilidad y coordinamos tu llegada.'`
  - EN: `'We answer on WhatsApp every day. We confirm availability and coordinate your arrival.'`
- Actualizar `home.inquiryText`:
  - ES: `'Cuéntanos cuántas personas son y tus fechas. Te confirmamos la configuración disponible y coordinamos la llegada.'`
  - EN: `'Tell us how many of you there are and your dates. We confirm the available layout and coordinate your arrival.'`
- Actualizar `home.hostelSub` para que describa las fotos nuevas:
  - ES: `'Nuestra entrada en Teniente Merino 1080, el living con estufa a combustión lenta para los días de lluvia y el comedor de madera donde servimos el desayuno.'`
  - EN: `'Our entrance at Teniente Merino 1080, the lounge with a slow-burning stove for rainy days and the wooden dining room where we serve breakfast.'`
- Actualizar `home.alt`:
  - `entrance`: `'Entrada de Hostal Hudson con banco de madera y letrero hacia la plaza'`
  - `stove`: `'Living de Hostal Hudson con estufa a combustión lenta y sillones verdes'`
  - `dining`: `'Comedor de madera de Hostal Hudson con mesas servidas para el desayuno'`
  - `exterior` puede quedar si se usa en la galería, pero el home no lo usa.
- Actualizar `services.reception.desc`:
  - ES: `'Libre horario de ingreso; acceso con chapa electrónica.'`
  - EN: `'Any check-in time; electronic lock access.'`
- Reemplazar el FAQ EN por:
```js
faq: [
  { q: 'What time can I arrive?', a: '24 h reception. We coordinate electronic lock access when you confirm your booking.' },
  { q: 'How do I confirm my booking?', a: 'We coordinate availability and payment via WhatsApp. Everything is confirmed before you book.' },
  { q: 'Are breakfast and parking included?', a: 'Yes, both included at no extra cost.' },
  { q: 'How do I enter my room?', a: 'Every room has an electronic keypad lock. We coordinate access when you confirm your booking, and reception is available 24 hours.' },
],
```
- Eliminar por completo las claves `estimator` y `availability` de ES y EN, y
  todas las claves de tarifas que solo usaba `TarifasClient`:
  `ratesSub`, `rateRef`, `quoteTitle`, `quoteText`, `quoteBtn`, `payTitle`,
  `includesTitle`, `includesText`, `sendReceipt`.
- No tocar las claves de `/admin` ni las de `AdminPanel`.

### 3.4 `SEO` y datos estructurados

- `lib/seo.js`:
  - `SEO.habitaciones.es.description`:
    `'Habitaciones matrimonial, doble y familiar con baño privado en Hostal Hudson, Puerto Aysén. Desayuno, Wi-Fi, TV por cable, calefacción, chapa electrónica y limpieza diaria.'`
  - `SEO.habitaciones.en.description`:
    `'Matrimonial, double and family rooms with a private bathroom at Hostal Hudson, Puerto Aysén. Breakfast, Wi-Fi, cable TV, heating, electronic lock and daily cleaning.'`
  - Eliminar el bloque `SEO.tarifas`.
  - `SEO.galeria` puede actualizarse a:
    - ES: `'Fotos reales de Hostal Hudson y de la zona de Puerto Aysén. Habitaciones, comedor, desayuno, entorno y más.'`
    - EN: `'Real photos of Hostal Hudson and the Puerto Aysén area. Rooms, dining room, breakfast, surroundings and more.'`
- `app/habitaciones/page.jsx`:
  - Eliminar `numberOfItems: ROOMS_ES.length`.
  - Agregar a cada `item`:
```js
amenityFeature: [
  { '@type': 'LocationFeatureSpecification', name: 'Baño privado' },
  { '@type': 'LocationFeatureSpecification', name: 'Chapa electrónica con clave' },
],
```
- `app/layout.jsx`:
  - Eliminar `priceRange: '$$'`.
  - Agregar a `amenityFeature`:
```js
{ '@type': 'LocationFeatureSpecification', name: 'Chapa electrónica con clave' },
```
- `app/galeria/page.jsx`: actualizar `associatedMedia` con las 16 fotos nuevas
  + las 7 de zona que ya existen. No dejar `gal-hostal-interior1..5`.

---

## 4. Cambios por archivo

### 4.1 `components/pages/HomeClient.jsx`

- Cambiar `const [individual, double] = t.roomsPage.items;` por
  `const rooms = t.roomsPage.items;`.
- Renderizar las tres tarjetas con `rooms.map((room) => ...)`. Mantener el
  `key={room.key}` y el `sizes="(max-width: 900px) 100vw, 33vw"`.
- Sacar del grid la tarjeta verde `room-inquiry`. En su lugar, después de la
  sección de habitaciones, agregar la banda verde “Familias y grupos” usando las
  clases existentes:
```jsx
<section className="group-band">
  <div className="wrap group-inner">
    <div>
      <h2>{h.inquiryTitle}</h2>
      <p className="lead">{h.inquiryText}</p>
    </div>
    <div className="group-action">
      <a
        className="btn btn-light"
        href={waLink('Hola Hostal Hudson, viajo en familia y quiero consultar opciones')}
        target="_blank"
        rel="noopener noreferrer"
      >
        {h.inquiryCta}
      </a>
    </div>
  </div>
</section>
```
- En “El hostal”:
  - `common-main` usa `src="/img/hostal-entrada-01.jpg"` y
    `alt={h.alt.entrance}`. `objectPosition: 'center'`.
  - Mosaico: `src="/img/hostal-living-01.jpg"` con `alt={h.alt.stove}` y
    `src="/img/hostal-comedor-01.jpg"` con `alt={h.alt.dining}`.
- Mantener el hero con `aysen-puente.jpg` y la ubicación con `aysen-letrero.jpg`.
- Mantener `Footer credit` y `WhatsAppButton`.

### 4.2 `components/pages/HabitacionesClient.jsx`

- Borrar el bloque `<p className="price-line">...` completo.
- Después de `</div>` de `rooms-rows` y antes de `group-band`, agregar:
```jsx
<div className="wrap">
  <aside className="security-band">
    <div className="security-media">
      <Image
        src="/img/hostal-pasillo-01.jpg"
        alt={rp.securityAlt}
        fill
        sizes="(max-width: 900px) 100vw, 42vw"
        style={{ objectFit: 'cover' }}
      />
    </div>
    <div className="security-body">
      <h2>{rp.securityTitle}</h2>
      <p>{rp.securityText}</p>
    </div>
  </aside>
</div>
```
- Mantener el hero con `aysen-puente.jpg` y `Footer credit`.
- No agregar la cantidad de habitaciones.

### 4.3 `components/pages/GaleriaClient.jsx`

Reemplazar `HOSTAL` por:

```js
const HOSTAL = [
  { src: '/img/hostal-entrada-01.jpg', alt: 'Entrada de Hostal Hudson con banco de madera y letrero hacia la plaza' },
  { src: '/img/hostal-living-01.jpg', alt: 'Living de Hostal Hudson con estufa a combustión lenta y sillones verdes' },
  { src: '/img/hostal-comedor-01.jpg', alt: 'Comedor de madera de Hostal Hudson con mesas servidas para el desayuno' },
  { src: '/img/hostal-comedor-02.jpg', alt: 'Comedor de madera y cocina de Hostal Hudson' },
  { src: '/img/hostal-desayuno-01.jpg', alt: 'Desayuno continental servido en Hostal Hudson' },
  { src: '/img/hostal-desayuno-02.jpg', alt: 'Mesa de desayuno con pan, fruta y café en Hostal Hudson' },
  { src: '/img/hostal-matrimonial-01.jpg', alt: 'Habitación matrimonial con cama de dos plazas y cabecera de madera' },
  { src: '/img/hostal-matrimonial-02.jpg', alt: 'Habitación matrimonial con cama de dos plazas y pared azul' },
  { src: '/img/hostal-doble-01.jpg', alt: 'Habitación doble con dos camas de una plaza' },
  { src: '/img/hostal-doble-02.jpg', alt: 'Habitación doble con dos camas de una plaza y ventana al río' },
  { src: '/img/hostal-familiar-01.jpg', alt: 'Habitación familiar con una cama de dos plazas y una de una plaza' },
  { src: '/img/hostal-familiar-02.jpg', alt: 'Habitación familiar con camas para tres personas' },
  { src: '/img/hostal-bano-01.jpg', alt: 'Baño privado con ducha, lavamanos e inodoro en Hostal Hudson' },
  { src: '/img/hostal-pasillo-01.jpg', alt: 'Pasillo de Hostal Hudson con puertas de madera y chapas electrónicas' },
  { src: '/img/hostal-pasillo-02.jpg', alt: 'Detalle de la chapa electrónica de una habitación' },
  { src: '/img/hostal-rio-01.jpg', alt: 'Vista del río Aysén y los cerros desde Hostal Hudson' },
  { src: '/img/gal-hostal-exterior1.jpg', alt: 'Fachada y letrero de madera de Hostal Hudson' },
];
```

Mantener `ZONA` tal como está. No incluir la foto de huéspedes.

### 4.4 `app/galeria/page.jsx`

Actualizar `GALERIA_LD.associatedMedia` con las mismas 16 rutas de hostal y las
7 de zona. No incluir `gal-hostal-interior1..5`. Si se prefiere evitar
duplicación, importar el arreglo desde un módulo compartido; si no, dejar un
comentario “mantener sincronizado con GaleriaClient”.

### 4.5 Eliminar tarifas

Borrar:

- `app/tarifas/page.jsx` (y la carpeta `app/tarifas/`)
- `components/pages/TarifasClient.jsx`
- `components/Estimator.jsx`
- `components/Availability.jsx`

No trasladar los datos bancarios de `TarifasClient.jsx` a ninguna página. La
página desaparece.

Ajustes asociados:

- `components/Chrome.jsx`: quitar el `<li><a href="/tarifas">...` del footer.
- `lib/i18n.js`: quitar `rates`, `estimator`, `availability`, `ratesSub`,
  `rateRef`, `quoteTitle`, `quoteText`, `quoteBtn`, `payTitle`,
  `includesTitle`, `includesText`, `sendReceipt`.
- `components/FinalCta.jsx`: cambiar el mensaje de WhatsApp a
  `'Hola Hostal Hudson, quiero consultar disponibilidad'` (sin “tarifa”).
- `app/manifest.js`: reemplazar el shortcut “Tarifas” por uno de “Galería”:
```js
{
  name: 'Galería',
  url: '/galeria',
  description: 'Fotos del hostal y de Aysén',
  icons: [{ src: '/img/icon-192.png', sizes: '192x192', type: 'image/png' }],
},
```
- `app/sitemap.js`: quitar `/tarifas` del arreglo `pages`.
- `lib/seo.js`: eliminar `SEO.tarifas`.
- `next.config.js`:
  - Agregar al inicio de `REDIRECTS_JOOMLA`:
    `{ source: '/tarifas', destination: '/reservas', permanent: true },`
  - Cambiar los dos redirects de Joomla que apuntan a `/tarifas` para que
    apunten a `/reservas`.
  - Actualizar el comentario de la tabla.
- `public/sw.js`: subir `CACHE_NAME` a `hostal-hudson-v4` para invalidar cachés
  viejas. No hace falta tocar la lógica.
- `app/globals.css`: borrar `.price-line` y `.price` si quedan sin uso.

### 4.6 `lib/site.js`

- Mantener `RATE_PER_PERSON_NIGHT` porque lo usa `AdminPanel` para calcular
  ingresos internos.
- Cambiar el comentario para que diga:
  `// Tarifa interna del panel de administración. No renderizar en páginas públicas.`
- No cambiar `OG_IMAGE`: la vista previa sigue siendo la foto del puente.
- No tocar `SERVICES` salvo que se use en el futuro; hoy no se renderiza.

### 4.7 CSS del bloque de seguridad

Agregar cerca de `.room-row` / `.group-band`:

```css
.security-band {
  display: grid;
  grid-template-columns: 5fr 7fr;
  margin: 0 auto clamp(32px, 5vw, 56px);
  max-width: var(--max);
  overflow: hidden;
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--card-shadow);
}
.security-media {
  position: relative;
  min-height: 320px;
  aspect-ratio: 4 / 3;
  background: var(--paper-2);
}
.security-media img { object-fit: cover; }
.security-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(24px, 3.5vw, 42px);
}
.security-body h2 { margin: 0 0 10px; font-size: clamp(1.4rem, 2.2vw, 1.9rem); }
.security-body p { max-width: 46ch; margin: 0; color: var(--muted); }

@media (max-width: 900px) {
  .security-band { grid-template-columns: 1fr; }
  .security-media { min-height: 0; aspect-ratio: 16 / 10; }
}
```

El `security-band` va dentro de un contenedor con padding lateral; si se pone
fuera, envolverlo en `<div className="wrap">` para que no toque los bordes.

---

## 5. Lo que no se toca

- `public/img/aysen-puente.jpg`
- `public/img/aysen-letrero.jpg`
- `public/img/logo.png`
- `public/img/gal-quevisitar-*.jpg`
- `app/admin/**`, `components/AdminPanel.jsx`, `app/api/**`
- `RATE_PER_PERSON_NIGHT` (solo uso interno)
- Reseñas, testimonios y nombres reales de `lib/site.js`
- Datos de contacto: teléfono, dirección, correo y mapa
- `Footer credit` con el crédito de la foto del puente
- La estructura de navegación, salvo quitar “Tarifas” del footer

---

## 6. Verificación obligatoria

Antes de entregar:

1. `npm run build` sin errores.
2. Buscar precios y datos bancarios en páginas públicas:
   ```powershell
   Get-ChildItem -Recurse -File -Include *.js,*.jsx |
     Where-Object { $_.FullName -notmatch 'node_modules|\.next|admin|api' } |
     Select-String -Pattern 'CLP|RATE_PER_PERSON_NIGHT|Banco|BCI|64049884|8\.133\.541|desde \$|precio|tarifa'
   ```
   Solo puede aparecer `RATE_PER_PERSON_NIGHT` en `lib/site.js` y en
   `components/AdminPanel.jsx` (uso interno). En páginas públicas, cero.
3. Buscar fotos viejas:
   ```powershell
   Get-ChildItem -Recurse -File -Include *.js,*.jsx |
     Where-Object { $_.FullName -notmatch 'node_modules|\.next' } |
     Select-String -Pattern 'gal-hostal-interior'
   ```
   No debe devolver nada.
4. Buscar cantidad de piezas:
   ```powershell
   Get-ChildItem -Recurse -File -Include *.js,*.jsx |
     Where-Object { $_.FullName -notmatch 'node_modules|\.next|admin|api' } |
     Select-String -Pattern '5 habitaciones|cinco habitaciones|5 piezas|cinco piezas|numberOfItems'
   ```
   No debe devolver nada en páginas públicas.
5. Probar:
   - `/` 200, hero puente, tres tarjetas, bloque “El hostal” con las fotos nuevas.
   - `/habitaciones` 200, tres filas, bloque de chapa, sin tarifa.
   - `/galeria` 200, 17 fotos de hostal + zona, sin interiores viejos.
   - `/reservas` 200, FAQ sin Banco BCI.
   - `/tarifas` responde 308 a `/reservas`.
   - `/index.php/2016-01-15-14-53-28` responde 308 a `/reservas`.
6. Capturas 1440, 768 y 360 de `/`, `/habitaciones` y `/galeria`. Sin desborde
   horizontal, sin imágenes rotas, sin texto cortado.
7. Revisar `sitemap.xml` y `manifest.webmanifest`: no debe aparecer `/tarifas`.
8. Revisar que `public/img` tenga los 16 derivados y que ninguno pese más de
   ~600 KB.

---

## 7. Entregables

- Rama `contenido/material-real-2026-11-17` con los cambios.
- `npm run build` pasado.
- Capturas 1440/768/360 de las tres páginas.
- Nota breve con:
  - qué fotos se usaron en cada bloque;
  - qué se eliminó;
  - resultado de las búsquedas de verificación;
  - cualquier duda que haya quedado.
- No hacer push ni desplegar. La revisión y el merge los decide el dueño.

---

## 8. Pendientes de confirmación (no bloquean esta pasada)

- Nombre comercial definitivo de la tipología “Familiar”. Se usa “Familiar”
  como nombre de trabajo.
- Permiso escrito de los huéspedes para publicar
  `no-publicar/huespedes-sin-permiso.jpg`. Hasta entonces, no se usa.
- Si existe una habitación individual y el dueño manda foto, se agrega después.
  Hoy no se publica porque no hay foto nueva que la respalde.
- Logo vectorial oficial, si el dueño lo tiene. El `logo.png` actual se mantiene
  y no se redibuja.

---

## 9. Criterio de aceptación final

- Cero tarifas, montos, “CLP”, “desde $” y datos bancarios en páginas públicas.
- Chapa electrónica con clave visible en cada ficha y en la franja de servicios.
- Tres tipologías correctas: Matrimonial, Doble y Familiar.
- Ninguna referencia a “Individual”.
- Ninguna referencia a `gal-hostal-interior1..5`.
- Ninguna mención a la cantidad total de piezas ni a cuántas son matrimoniales.
- Fotos nuevas en home, habitaciones y galería; puente y letrero intactos.
- Foto de huéspedes fuera del sitio.
- Build pasado y capturas sin problemas en PC, tablet y celular.
