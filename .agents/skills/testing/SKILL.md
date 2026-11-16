---
name: testing
description: Estrategia de tests para proyectos web (Vitest, Testing Library, Playwright, CI y regresión). Usar al implementar lógica, pagos, auth o flujos críticos.
---

# Testing

## Pirámide

- **Unitarios (Vitest):** lógica pura, cálculos de dinero, validaciones,
  formateo. Rápidos y muchos.
- **Integración:** route handlers, server actions, acceso a datos con una base
  de prueba.
- **E2E (Playwright):** solo los flujos que si se rompen, el negocio se cae:
  login, checkout, reserva, alta de pedido.

## Regla de regresión

Todo bug corregido deja un test que **falla antes** del fix y **pasa después**.
Sin ese test, el bug puede volver.

## Qué testear siempre

- Cálculo de precios, impuestos, descuentos y envío.
- Validación de entrada y casos borde (vacío, negativo, enorme, Unicode).
- Autenticación: sesión, expiración, permisos por rol.
- Checkout: carrito, cupón, stock, pago aprobado, rechazado y reintento.
- Webhooks: firma inválida, duplicado, fuera de orden.

## Playwright

- Proyectos por viewport: 360, 768 y 1440.
- `trace: "on-first-retry"` y captura en fallo.
- `@axe-core/playwright` para accesibilidad automática.
- Datos de prueba propios; nunca datos reales de clientes.
- Tests independientes entre sí y sin orden obligatorio.

```ts
// playwright.config.ts (resumen)
export default defineConfig({
  use: { baseURL: "http://localhost:3000", trace: "on-first-retry" },
  projects: [
    { name: "mobile", use: { viewport: { width: 360, height: 800 } } },
    { name: "tablet", use: { viewport: { width: 768, height: 1024 } } },
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
  ],
});
```

## CI mínima

```yaml
name: ci
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm test
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test
```

Si el proyecto no tiene esos scripts, agregalos antes de agregar el CI.

## Definición de terminado

- Suite verde en local y en CI.
- Ningún test deshabilitado sin motivo escrito.
- Cobertura razonable en dinero, auth y checkout; no perseguir el 100%.
- Los tests no dependen de servicios externos reales: se usa sandbox o mock.
