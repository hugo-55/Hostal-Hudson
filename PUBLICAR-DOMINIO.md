# Publicar el sitio en `www.hostalhudson.cl`

Guía paso a paso para poner la web nueva en producción y reemplazar el sitio
anterior (Joomla, en Index Patagonia). Es el documento de referencia para el
**cutover**: consérvalo y síguelo paso a paso el día de la publicación.

---

## 1. Estado actual del dominio (verificado)

| Dato | Valor | Dónde se comprobó |
|---|---|---|
| Dominio | `hostalhudson.cl` | — |
| Titular | **Patricio Valenzuela Paredes** (el dueño del hostal) | WHOIS de NIC Chile |
| Agente registrador | NIC Chile (directo, no reseller) | WHOIS |
| Creado / vence | 2014-05-28 / **2031-05-28** | WHOIS |
| Nameservers | `ns1..ns4.indexpatagonia.cl` | DNS |
| IP del sitio | `104.167.196.102` | DNS |
| Correo (`MX`) | `hostalhudson.cl → 104.167.196.102` | DNS |
| Sitio actual | Joomla (template `ammon_v2`), multiidioma | HTTP |
| Hosting | Index Patagonia (hostingprovider.cl) | NS |

**Dato clave:** el dominio **es del cliente**, no del desarrollador anterior.
Este último solo administra el panel de hosting (donde vive el DNS), el código
Joomla y el buzón de correo. No hay disputa de dominio: lo que hay que hacer
es **cambiar 3 registros DNS**.

### Qué es el DNS (en simple)

El DNS es la "agenda de teléfonos" de internet. A partir del nombre
`www.hostalhudson.cl`, el DNS devuelve la dirección IP del servidor que
responde. Hay entradas independientes para:

- **A / CNAME** → a qué servidor va la web (aquí se decide el sitio).
- **MX** → a qué servidor va el correo (aquí NO hay que tocar nada).
- **NS** → quién administra el DNS (se pueden mantener en Index Patagonia).
- **TXT** → textos de verificación (Vercel usa uno para demostrar que el
  dominio es tuyo).

Por eso se pueden cambiar los registros de la web **sin tocar el correo**:
son casillas distintas de la misma agenda.

---

## 2. Antes de pedir el cambio al desarrollador

Todo esto tiene que estar listo **antes** de escribirle, para que el corte
dure 15 minutos y no días.

- [ ] Proyecto creado en Vercel desde el repo `hugo-55/Hostal-Hudson` y
      desplegado (build OK).
- [ ] En Vercel → **Settings → Domains → Add**: `hostalhudson.cl` y
      `www.hostalhudson.cl`. Vercel muestra los registros exactos que pide
      (copiarlos textualmente: la IP de Vercel puede cambiar).
- [ ] Env vars en Vercel: `ADMIN_KEY`, `GOOGLE_PLACES_API_KEY`
      (y opcionalmente `SITE_PREVIEW=1` mientras esté en pruebas).
- [ ] Pruebas hechas en el `.vercel.app`: portada, tarifas, reservas, `/admin`,
      cambio de idioma, galería, formulario de reservas y aviso de cookies.
- [ ] Avisado al hostal que **el formulario de reservas nuevo captura por
      WhatsApp** (ver §7).
- [ ] TTL de los registros A/CNAME bajado a `300` (el día anterior al corte).
- [ ] Fecha y hora de la ventana acordada con el cliente **y** con el
      desarrollador.
- [ ] Enviado el pedido por escrito (ver §9).

---

## 3. Los 3 registros a cambiar (en el panel de Index Patagonia)

| Tipo | Nombre | Valor | Nota |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` (el que indique Vercel) | apex → Vercel |
| `CNAME` | `www` | `cname.vercel-dns.com` | www → Vercel |
| `TXT` | `_vercel` | `vc-domain-verify=...` | verificación de Vercel |

### NO TOCAR

| Registro | Por qué |
|---|---|
| `NS` (`ns1..ns4.indexpatagonia.cl`) | Si se cambian a los de Vercel, el correo se cae (ver §8) |
| `MX` (`@ → 104.167.196.102`) | Es el buzón `administracion@hostalhudson.cl` |
| `TXT` de Google (`_google`, `google-site-verification=`) | Verificación de Search Console del sitio viejo |

> El SSL (certificado HTTPS) lo emite Vercel solo, 1–2 minutos después de que
> el DNS propaga y el dominio queda verificado. No hay que pedir nada.

---

## 4. Cutover (la ventana acordada)

1. Confirmar con el desarrollador que aplicó los 3 registros.
2. Verificar propagación: <https://verif.tools/dnscheck.is> o
   `nslookup www.hostalhudson.cl`.
3. Esperar a que cargue la web nueva y que el SSL sea válido (candado en el
   navegador, sin aviso de "no seguro").
4. **Probar el correo**: enviar un correo a `administracion@hostalhudson.cl` y
   confirmar que llega. Si no llega, **parar el corte** y avisar al
   desarrollador (pasó a revisar el `MX`).
5. Vercel → **Settings → Domains**: `hostalhudson.cl` debe quedar en estado
   "Valid" y `www.hostalhudson.cl` como dominio principal.
6. Quitar el modo pre-corte: en Vercel, borrar `SITE_PREVIEW=1` y poner
   `CANONICAL_REDIRECT=1`; **redeploy**.
7. Google Search Console → verificar `www.hostalhudson.cl` (método: dominio) y
   enviar el sitemap.
8. Avisar al hostal: "la web ya está en el dominio, el formulario de reservas
   ahora avisa por WhatsApp".

### Verificaciones del sitio nuevo (en producción)

- [ ] `https://www.hostalhudson.cl` carga la web nueva (no la de Joomla).
- [ ] `https://hostalhudson.cl` (sin www) redirige a `https://www.hostalhudson.cl`.
- [ ] `https://hostal-hudson.vercel.app` devuelve 308 a `https://www.hostalhudson.cl/...`.
- [ ] Las 7 páginas responden 200 y tienen su canonical correcto.
- [ ] `/admin` exige sesión y no está indexado.
- [ ] El formulario de reservas devuelve `ok: true` y muestra el botón de
      WhatsApp.
- [ ] El correo del hostal sigue recibiendo.

---

## 5. Después del corte

- [ ] Reclamar en el cliente: Search Console, Analytics, Perfil de Negocio de
      Google, Facebook/Instagram, Booking.
- [ ] **Migrar el correo** a una cuenta propia del hostal (Google Workspace o
      Zoho). Hoy el buzón vive en el hosting del desarrollador anterior: si él
      se va, el hostal pierde también el correo.
- [ ] Dejar escrito que el desarrollador **no vuelve a tocar el DNS**.
- [ ] Pedirle al desarrollador una copia de la base de datos de Joomla y de las
      imágenes, por si el cliente quiere conservar el sitio anterior.
- [ ] Avisar a Booking y a los canales de reserva que cambió la web (si el
      sitio viejo estaba en alguno).

---

## 6. Modos del proyecto (variables de entorno)

| Variable | Estado | Efecto |
|---|---|---|
| `SITE_PREVIEW=1` | mientras el sitio viejo siga vivo | `<meta name="robots" content="noindex, nofollow">` en todas las páginas: Google no indexa la versión nueva hasta el corte |
| `CANONICAL_REDIRECT=1` | desde el día del corte | el `.vercel.app` responde **308** hacia `https://www.hostalhudson.cl` |

Ambas se leen al **build**, así que cambiarlas en Vercel requiere un redeploy.
Déjalas anotadas en la checklist del día del corte.

---

## 7. ⚠️ El formulario de reservas: cómo funciona hoy

`lib/site.js` tiene `SHEET_ENDPOINT` y `NOTIFY_ENDPOINT` vacíos → la API
`/api/reserva` responde `ok: true` **pero no guarda nada**. Lo único que
captura la reserva es el **botón de WhatsApp** que aparece después del envío
del formulario.

Mientras no se configure la hoja de cálculo:

- El sitio nuevo **no deja reservas registradas** por sí solo.
- Hay que avisar al hostal de que revise el WhatsApp del hostal.
- Si el cliente quiere que quede todo registrado, hay que configurar el
  Apps Script de `RESERVAS-SETUP.md` (~30 min) **antes** del corte.

---

## 8. Plan B: si el desarrollador no coopera

El titular del dominio (el dueño del hostal) tiene su propia cuenta en
**NIC Chile** y puede cambiar los *nameservers* sin ayuda de nadie:

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

Funciona, pero **tiene un costo**: al cambiar los NS, el `MX` también pasa a
Vercel, y **Vercel no hospeda buzones** (solo reenvío) → el correo
`administracion@hostalhudson.cl` se cae.

Para usarlo habría que, **antes**:

1. Migrar el correo a Google Workspace / Zoho (recomendado de todas formas), o
2. Dejar en Vercel un `MX` apuntando al servidor de Index Patagonia
   (`mail.indexpatagonia.cl → 104.167.196.102`) **y confirmar con Index
   Patagonia que ese servidor sigue aceptando correo para el dominio** con
   los nameservers cambiados.

Por eso el plan A (cambiar solo `A`/`CNAME`/`TXT`) es claramente superior.

---

## 9. Modelo de correo al desarrollador

> Ideal que lo envíe **el cliente** con el equipo técnico en copia, o que lo
> envíe el equipo técnico mencionando que el cliente ya lo autorizó. Si el
> desarrollador no responde al cliente, no va a responder a un desconocido.

```
Hola [nombre], te escribo de parte de Hostal Hudson.

Estamos por publicar el sitio nuevo del hostal, que va a reemplazar el sitio
actual. El cliente me pidió hablar directamente contigo para coordinar la
parte técnica.

Situación actual (revisada):
- Dominio hostalhudson.cl: registrado a nombre de Patricio Valenzuela Paredes
  (titular en NIC Chile), agente registrador NIC Chile, vence en 2031.
- Hosting y DNS: Index Patagonia, IP 104.167.196.102.
- El sitio actual corre en Joomla.

Lo que necesitamos:

1) Cambio de DNS en el panel de Index Patagonia. Son 3 registros y NO se tocan
   ni los NS ni los MX:

   A      @       76.76.21.21
   CNAME  www     cname.vercel-dns.com
   TXT    _vercel vc-domain-verify=...   (te lo paso por acá)

   Los NS (ns1-4.indexpatagonia.cl) y el MX quedan como están, para que el
   correo administracion@hostalhudson.cl siga funcionando sin interrupciones.
   Vercel emite el certificado SSL automáticamente.

2) Traspaso de la cuenta de hosting de Index Patagonia a nombre de Hostal
   Hudson (o, al menos, crear un usuario administrador a nombre del cliente),
   para que el cliente sea dueño de su hosting y de su correo.

3) Los accesos que hoy están en tu cuenta: Google Search Console, Google
   Analytics, Perfil de Negocio de Google, Facebook/Instagram, Booking y
   cualquier otro que use el sitio.

4) Si el formulario de reservas del sitio actual guarda datos en la base de
   datos de Joomla, un export (CSV) de las reservas, y confirmar dónde
   llegan hoy las reservas: ¿al correo del hostal, a un WhatsApp, a Booking?

5) Confirmarnos por escrito que, una vez hecho el cambio, no se volvería a
   modificar el DNS, y que el sitio actual queda respaldado (copia de la base
   de datos y de las imágenes) por si el cliente lo necesita.

Ventana: [FECHA] a las [HORA]. El sitio actual sigue funcionando hasta
entonces; lo que hay que hacer es el cambio y esperar la propagación
(15-30 min).

Cualquier duda me escribo directo. Gracias.
```

---

## 10. Lo que NO hay que hacer

- **No pedir ni aceptar el dominio en nombre del equipo técnico.** El dominio
  es del hostal y debe quedar a nombre del hostal; el equipo técnico entra
  como administrador.
- **No cambiar los NS "para ahorrar un paso"**: rompe el correo.
- **No hacer el corte sin avisarle al desarrollador**: lo más probable es que
  el DNS vuelva atrás.
- **No cortar sin probar el correo** en la ventana de publicación.
