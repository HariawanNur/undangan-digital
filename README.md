# Undangan Digital Risky & Cita

Undangan pernikahan digital berbasis React dan Vite.

## Menjalankan Project

Pastikan Node.js sudah terpasang, lalu jalankan:

```bash
npm install
npm run dev
```

Untuk membuat production build:

```bash
npm run build
```

## RSVP ke Google Sheets

RSVP dikirim ke Google Sheets melalui Google Apps Script Web App. Endpoint dibaca dari environment variable berikut:

```env
VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

Salin file `.env.example` menjadi `.env`, kemudian isi URL deployment Google Apps Script.

```bash
cp .env.example .env
```

Jangan commit file `.env` ke repository.

### 1. Buat Google Sheet

Buat spreadsheet baru dan gunakan satu sheet, misalnya `Sheet1`. Isi baris pertama dengan header:

| Waktu | Nama | Kehadiran | Jumlah Tamu | Ucapan & Doa |
| --- | --- | --- | --- | --- |

Nama sheet harus sama dengan nilai `SHEET_NAME` pada Apps Script.

### 2. Buat Google Apps Script

Di Google Sheet, buka **Extensions > Apps Script**. Hapus kode bawaan dan masukkan:

```javascript
const SHEET_NAME = "Sheet1";

function doPost(event) {
  const data = JSON.parse(event.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error(`Sheet ${SHEET_NAME} tidak ditemukan`);
  }

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

### 3. Deploy sebagai Web App

1. Klik **Deploy > New deployment**.
2. Pilih tipe **Web app**.
3. Atur **Execute as** menjadi akun pemilik script.
4. Atur **Who has access** menjadi **Anyone**.
5. Klik **Deploy**.
6. Salin URL yang berakhiran `/exec`.

Masukkan URL tersebut ke file `.env`:

```env
VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

Restart server Vite setelah mengubah `.env`:

```bash
npm run dev
```

Jika project sudah di-hosting, environment variable harus diisi pada pengaturan environment platform hosting, lalu lakukan redeploy.

## Cara Menguji RSVP

1. Buka undangan dengan URL yang memiliki nama tamu, contohnya `/?to=awang`.
2. Buka bagian **Kehadiran**.
3. Isi nama, pilihan kehadiran, jumlah tamu, dan ucapan.
4. Klik **Kirim Konfirmasi**.
5. Pastikan baris baru muncul di Google Sheet.

Jika `VITE_RSVP_ENDPOINT` kosong, aplikasi berjalan dalam mode demo dan data hanya disimpan di `localStorage` browser.

## Catatan Implementasi

- Endpoint memakai `POST` dengan payload JSON.
- Request menggunakan `Content-Type: text/plain` agar tidak memicu preflight CORS pada Google Apps Script.
- Aplikasi menyimpan salinan RSVP lokal untuk menampilkan guestbook pada perangkat yang sama.
- Google Apps Script memotong nama hingga 120 karakter dan ucapan hingga 500 karakter.
- Google Apps Script Web App tidak menyediakan autentikasi tamu pada implementasi ini.
- Untuk undangan publik, tambahkan validasi spam, rate limiting, dan validasi server-side sebelum penggunaan skala besar.

## Fitur

- Nama tamu otomatis dari parameter URL `?to=`.
- Cover satu viewport yang responsif.
- Tombol buka undangan.
- Musik latar dan mute/unmute.
- Countdown acara.
- Detail lokasi dan tombol Google Maps.
- RSVP dan ucapan/doa.
- Copy nomor rekening ke clipboard.
- Export data RSVP lokal ke Excel.
