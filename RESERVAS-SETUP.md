# Reservas reales del hostal (15 min, una vez)

Las reservas del formulario quedan registradas en una planilla del hostal + aviso WhatsApp. Mismo sistema que la tienda, columnas distintas.

## 1. Planilla del hostal
1. Con la cuenta Google del hostal: sheets.google.com → hoja `Reservas`
2. Primera fila: `fecha_registro | nombre | llegada | noches | personas | telefono`

## 2. Apps Script (igual patrón que SHEETS-SETUP de tienda-demo)
Extensiones → Apps Script → pegar:

```gs
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Reservas') || ss.insertSheet('Reservas');
  const d = JSON.parse(e.postData.contents);
  sheet.appendRow([d.fecha_registro || new Date(), d.nombre || '', d.llegada || '', d.noches || 1, d.personas || 1, d.telefono || '']);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
```

Desplegar como aplicación web (ejecutar como: yo, acceso: cualquier persona) → copiar URL `/exec` → `lib/site.js → SHEET_ENDPOINT`.

## 3. Aviso WhatsApp (opcional, ver NOTIFY-SETUP de tienda-demo)
Mismo puente, el mensaje ya viene armado: "🏨 Nueva reserva: nombre, llegada, noches, personas."

## 4. Verificar
Reserva de prueba en `/reservas` → fila en Sheets + WhatsApp al +56 9 9439 1571.

## 5. Panel del dueño (/admin)
1. En el MISMO Apps Script agrega:
```gs
function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Reservas');
  const vals = sheet.getDataRange().getValues();
  const rows = vals.slice(1).map((r) => ({
    fecha_registro: r[0], nombre: r[1], llegada: r[2], noches: r[3], personas: r[4], telefono: r[5] || '',
  }));
  return ContentService.createTextOutput(JSON.stringify({ rows }))
    .setMimeType(ContentService.MimeType.JSON);
}
```
2. Nueva implementación del script (misma URL base sirve GET y POST) → pégala en `lib/site.js → RESERVAS_READ_URL`
3. Clave del panel: en Vercel agrega `NEXT_PUBLIC_ADMIN_KEY=tu-clave` (o usa `hudson123` temporal y cámbiala ya)
4. Abre `/admin`: reservas reales, editor de disponibilidad y estado de integraciones.
