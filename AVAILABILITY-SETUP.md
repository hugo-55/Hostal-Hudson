# Calendario de disponibilidad (10 min, una vez)

El dueño marca días ocupados en una planilla y la web los muestra en rojo. Sin configurar, se muestra "consulta por WhatsApp".

## 1. Planilla
1. Cuenta Google del hostal → hoja nueva `Disponibilidad`
2. Primera fila: `fecha | estado` — ejemplo: `2026-11-02 | ocupado`
3. El dueño agrega una fila por día ocupado (los libres no necesitan fila)

## 2. Publicar como CSV
Archivo → Compartir → Publicar en la web → solo hoja `Disponibilidad`, formato CSV → copiar URL.
Pégala en `lib/site.js → AVAILABILITY_CSV`, commit + push.

## 3. Verificar
`/tarifas` muestra mes actual + siguiente con días rojos. Agrega una fecha de prueba y recarga.
