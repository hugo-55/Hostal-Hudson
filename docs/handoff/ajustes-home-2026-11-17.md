# Ajustes puntuales al home — 2026-11-17

Para Antigravity. Trabajar sobre la rama `contenido/material-real-2026-11-17`
(commit `3587fba`). No crear otra rama y no tocar nada fuera de esta lista.

## Antes de editar (obligatorio)

Entregá un plan de 5 líneas con los cambios exactos y cualquier objeción. Por
ejemplo: si un texto no entra en el diseño, si la foto del letrero queda
pixelada al tamaño actual o si conviene otro título. **Esperá la aprobación del
dueño antes de editar.** No hagas commit ni push hasta que él lo pida.

## 1. Estufa a pellet y calefacción en las habitaciones

Datos confirmados por el dueño: la estufa del living es **a pellet**, no a
combustión lenta, y **todas las habitaciones tienen calefacción**.

En `lib/i18n.js`, reemplazar en el bloque `home` de `es`:

```js
hostelSub: 'Nuestra entrada en Teniente Merino 1080, el living con estufa a pellet para los días de lluvia y el comedor de madera donde servimos el desayuno.',
hostelList: [
  { title: 'Estufa a pellet', text: 'En el living, para las tardes de lluvia, con sillones alrededor.' },
  { title: 'Calefacción en las habitaciones', text: 'Todas las piezas tienen calefacción.' },
  { title: 'Comedor de madera', text: 'Ahí se sirve el desayuno cada mañana.' },
  { title: 'Vista al río', text: 'El living y varias habitaciones miran al río Aysén. Consultanos por WhatsApp cuál está disponible para tus fechas.' },
],
```

Y en el bloque `en`:

```js
hostelSub: 'Our entrance at Teniente Merino 1080, the lounge with a pellet stove for rainy days and the wooden dining room where we serve breakfast.',
hostelList: [
  { title: 'Pellet stove', text: 'In the lounge, for rainy afternoons, with armchairs around it.' },
  { title: 'Heating in every room', text: 'All rooms have heating.' },
  { title: 'Wooden dining room', text: 'Where breakfast is served every morning.' },
  { title: 'River view', text: 'The lounge and several rooms face the Aysén River. Ask us on WhatsApp which one is available for your dates.' },
],
```

En el mismo archivo, corregir el alt de la foto del living:

- ES: `stove: 'Living de Hostal Hudson con estufa a pellet y sillones verdes',`
- EN: el alt equivalente que corresponda, sin “slow-burning”.

## 2. “Cocina equipada” sale de todas partes

Además del ítem del home, quedan menciones en la guía y en los servicios. Hay
que eliminarlas todas, en español y en inglés:

- `lib/i18n.js`, guía ES: reemplazar
  `'En el hostal tienes cocina equipada y lavandería cercana para viajar liviano.'`
  por
  `'En el hostal tienes desayuno incluido y lavandería cercana para viajar liviano.'`
- `lib/i18n.js`, guía EN: reemplazar
  `'At the hostel you have an equipped kitchen and nearby laundry to travel light.'`
  por
  `'At the hostel you have breakfast included and nearby laundry to travel light.'`
- `lib/i18n.js`, `services.breakfast.desc` ES: reemplazar
  `'Desayuno continental + cocina equipada disponible.'`
  por
  `'Desayuno continental incluido, servido en el comedor de madera.'`
- `lib/i18n.js`, `services.breakfast.desc` EN: reemplazar
  `'Continental breakfast + equipped kitchen available.'`
  por
  `'Continental breakfast included, served in the wooden dining room.'`

No cambiar el alt de la galería “Comedor de madera y cocina de Hostal Hudson”:
describe lo que se ve en la foto, no promete una cocina equipada. Si el dueño
quiere, se ajusta después.

## 3. Imagen grande del bloque “El hostal”

En `components/pages/HomeClient.jsx`, volver a la foto que está publicada hoy en
producción, porque al dueño le gusta más y la nueva le parece cortada:

```jsx
<figure className="common-main">
  <Image
    src="/img/gal-hostal-exterior1.jpg"
    alt={h.alt.exterior}
    fill
    sizes="(max-width: 900px) 100vw, 58vw"
    style={{ objectFit: 'cover', objectPosition: 'center bottom' }}
  />
</figure>
```

Mantener las dos miniaturas como están ahora:
`/img/hostal-living-01.jpg` y `/img/hostal-comedor-01.jpg`.

No borrar `public/img/hostal-entrada-01.jpg`: se sigue usando en la galería.

**Nota para el dueño:** esta foto pesa 42 KB y puede verse blanda en el bloque
grande. Se deja por ahora; si aparece una toma mejor del mismo letrero, se
reemplaza después.

## 4. Alt de la foto del living en la galería

En `components/pages/GaleriaClient.jsx`, cambiar el alt:

```js
{ src: '/img/hostal-living-01.jpg', alt: 'Living de Hostal Hudson con estufa a pellet y sillones verdes' },
```

## Lo que no se toca

- Las fichas de habitaciones, sus `specs`, el JSON-LD, las fotos de habitaciones
  y el bloque de chapa electrónica.
- El hero, la galería (salvo el alt del living), `/reservas` y `/visitar`.
- No agregar “calefacción” a `facts.items` ni a las fichas en esta pasada.
- No publicar cuántas habitaciones tienen vista al río.
- No tocar `/admin`, `app/api/**` ni `AdminPanel`.

## Verificación

1. `npm.cmd run build` sin errores.
2. Capturas del bloque “El hostal” en 1440 y 360: la foto grande es la del
   letrero tallado, las dos miniaturas siguen igual y entran los cuatro ítems
   sin desborde.
3. Buscar que no quede ninguna mención a cocina equipada ni a combustión lenta:

```powershell
Get-ChildItem -Recurse -File -Include *.js,*.jsx |
  Where-Object { $_.FullName -notmatch 'node_modules|\.next|admin|api' } |
  Select-String -Pattern 'combustión lenta|slow-burning|Cocina equipada|Equipped kitchen|cocina equipada|equipped kitchen'
```

No debe devolver nada. La única mención aceptable a “cocina” es el alt de la
foto del comedor en la galería.

4. `git diff --stat` debe mostrar solo `lib/i18n.js`, `components/pages/HomeClient.jsx`
   y `components/pages/GaleriaClient.jsx`.

## Criterio de aceptación

- Se lee “estufa a pellet” y “calefacción en las habitaciones”.
- “Vista al río” aparece en la lista del home, sin afirmar que todas las
  habitaciones la tienen y sin revelar cuántas son.
- “Cocina equipada” ya no existe en ninguna página.
- La foto grande es `gal-hostal-exterior1.jpg`, sin recorte raro.
- Las dos miniaturas no cambian.
- Nada más cambió.
