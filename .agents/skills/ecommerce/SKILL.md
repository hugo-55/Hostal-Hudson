---
name: ecommerce
description: Diseño e implementación de e-commerce con pagos (catálogo, carrito, órdenes, stock, cupones, checkout, webhooks y compliance en Chile). Usar al construir o revisar una tienda online.
---

# E-commerce

## Modelo mínimo

- `product` y `variant` (SKU, precio, stock).
- `cart` y `cart_item`.
- `order` y `order_item` con precio congelado al momento de comprar.
- `payment` (proveedor, estado, referencia externa).
- `shipment` con estado y seguimiento.
- `coupon` con reglas y límites de uso.

## Dinero

- Enteros en la unidad mínima (CLP no tiene decimales; USD en centavos).
- Moneda explícita en cada monto.
- Redondeo definido y aplicado una sola vez, al final.
- Nunca confiar en precios enviados por el cliente.

## Órdenes

- Máquina de estados explícita: `pending_payment`, `paid`, `preparing`,
  `shipped`, `delivered`, `cancelled`, `refunded`.
- Cada transición validada en servidor y registrada.
- La orden congela precios, impuestos y envío.
- Idempotencia en la creación de orden y en el cobro.

## Pagos

- Nunca tocar datos de tarjeta: tokenización o checkout hospedado.
- Elegir proveedor y verificar su documentación vigente (en Chile, Webpay de
  Transbank y MercadoPago son opciones comunes; no asumir API de memoria).
- Webhooks con firma verificada, tolerancia a duplicados y orden arbitrario.
- Reintentos y conciliación: el estado final se confirma con el proveedor, no
  solo con la respuesta del navegador.
- Reembolsos y anulaciones con registro y permiso.
- Sandbox para todo el desarrollo; nunca probar con tarjetas reales.

## Stock

- Reserva al iniciar el pago y liberación por timeout.
- Evitar sobreventa con transacción o actualización condicional.
- Alertas de stock bajo.
- Nunca calcular stock solo en el cliente.

## Seguridad y abuso

- Precio, descuento, envío e impuestos calculados en servidor.
- Validar cupones: uso único, monto mínimo, vigencia, acumulación.
- Rate limiting en cupones, checkout y login.
- Sin enumeración de pedidos ajenos (IDOR).
- Logs sin datos de tarjeta ni PII innecesaria.

## UX de checkout

- Invitado sin registro obligatorio.
- Resumen claro de costos antes de pagar.
- Estados de error recuperables: pago rechazado, timeout, stock agotado.
- Carrito persistente.
- Confirmación por correo y página de gracias con número de orden.

## Chile

- IVA y boleta/factura según corresponda.
- Ley 19.496: información veraz, derecho a retracto cuando aplique.
- Privacidad y cookies: enlazar con la skill `legalidad`.
- Términos, cambios y devoluciones visibles antes de pagar.

## Pruebas

- Checkout aprobado, rechazado, abandonado y reintentado.
- Webhook duplicado y fuera de orden.
- Cupón inválido, expirado y agotado.
- Dos compras simultáneas de la última unidad.
