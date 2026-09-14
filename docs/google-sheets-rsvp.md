# RSVP ke Google Sheets

## 1. Siapkan spreadsheet

Buat sheet dengan header berikut pada baris pertama:

`Waktu | Nama | Kehadiran | Jumlah Tamu | Ucapan & Doa`

## 2. Buat Google Apps Script

Buka **Extensions > Apps Script**, lalu gunakan kode berikut:

```javascript
const SHEET_NAME = "Sheet1";

function doPost(event) {
  const data = JSON.parse(event.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  sheet.appendRow([
    new Date(),
    String(data.name || "").slice(0, 120),
    data.attendance === "hadir" ? "Hadir" : "Tidak hadir",
    Number(data.guests) || 0,
    String(data.message || "").slice(0, 500),
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Deploy sebagai **Web app**, pilih akses **Anyone**, lalu masukkan URL deployment ke `.env`:

```bash
VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

Build ulang setelah mengubah environment variable. URL endpoint tidak boleh ditulis langsung di source code.
