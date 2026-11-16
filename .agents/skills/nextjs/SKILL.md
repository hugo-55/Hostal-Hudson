---
name: nextjs
description: Convenciones y errores comunes de Next.js App Router (server y client components, caching, server actions, route handlers, metadata y rendimiento). Usar al construir o revisar apps Next.js.
---

# Next.js (App Router)

Verificá la versión exacta del proyecto antes de aplicar algo. Si hay duda de
API, consultá Context7 en vez de asumir.

## Server y Client Components

- Server Component por defecto. `"use client"` solo cuando hay estado,
  efectos, eventos o APIs del navegador.
- No pasar funciones ni clases del servidor al cliente.
- Mantené el `"use client"` en hojas del árbol, no en el layout raíz.
- Los secretos solo existen en el servidor: nunca en un Client Component.

## Datos y caching

- `fetch` en servidor con `cache` y `next: { revalidate }` explícitos.
- `revalidatePath` / `revalidateTag` después de mutar.
- Rutas dinámicas cuando dependen de sesión o datos por usuario.
- No cachear datos privados en CDN.
- Evitá waterfalls: pedidos en paralelo con `Promise.all`.

## Server Actions y Route Handlers

- Validá toda entrada con Zod dentro de la action, no en el cliente.
- Verificá autorización en cada action y handler.
- Las actions devuelven errores tipados, no lanzan strings.
- Route handlers para webhooks, APIs públicas y archivos.
- Webhooks: verificá firma antes de procesar y sé idempotente.

## Bordes y estados

- `loading.tsx`, `error.tsx` y `not-found.tsx` por segmento.
- Los errores de `error.tsx` no exponen stack ni detalles internos.
- Formularios con `useFormStatus` o equivalente para el estado pendiente.

## Metadata y SEO

- `metadata` o `generateMetadata` por ruta.
- `canonical`, Open Graph y JSON-LD cuando corresponda.
- Sitemap y robots generados, no hardcodeados a mano.

## Performance

- `next/image` con dimensiones y prioridad solo en el hero.
- `next/font` local o con swap.
- Bundle: revisar `@next/bundle-analyzer` cuando algo pesa.
- Preferir Server Components para no mandar JS innecesario.

## Seguridad

- Variables `NEXT_PUBLIC_` son públicas: nunca secretos ahí.
- CSP y headers en `next.config`.
- Middleware para redirecciones y sesión, no como única barrera de autorización.

## Errores comunes

- `use client` en todo el árbol "porque no compila".
- Cachear una respuesta autenticada y filtrar datos entre usuarios.
- Lógica de dinero en el cliente.
- `fetch` a la propia API desde un Server Component (llamada redundante).
- `revalidate = 0` global por miedo al cache.
