# Undangan Pernikahan — Risky & Cita

Undangan pernikahan digital dibangun dengan **React + Vite**, memakai
ilustrasi & foto asli dari desain Canva aslinya (bukan lagi placeholder).
Struktur file dipecah per komponen supaya gampang dirawat.

## Struktur folder

```
├── index.html                  # entry HTML (judul, font, favicon)
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                 # render root
    ├── App.jsx                  # merangkai semua section
    ├── App.module.css
    ├── assets/images/            # ⭐ SEMUA ASET VISUAL ASLI (WebP, dioptimasi)
    ├── data/
    │   └── weddingData.js        # ⭐ SEMUA KONTEN (nama, tanggal, rekening, dst)
    ├── hooks/
    │   ├── useCountdown.js
    │   ├── useWeekStrip.js       # hitung 7 hari kalender mini otomatis
    │   ├── useGuestName.js       # baca ?to= dari URL
    │   └── useRsvpEntries.js     # RSVP + localStorage
    ├── styles/
    │   ├── index.css             # variabel warna & font, reset global
    │   └── sections.css          # kelas utilitas section bersama
    ├── components/
        ├── Cover.jsx              # halaman pembuka (ilustrasi pasangan asli)
        ├── OpeningQuote.jsx       # kaligrafi Bismillah + ayat Ar-Rum
        ├── Couple.jsx             # foto asli Risky & Cita dlm bingkai emas
        ├── DateStrip.jsx          # kalender mini (Sen–Min, tanggal acara ditandai)
        ├── Countdown.jsx          # hitung mundur dgn frame asli
        ├── EventDetails.jsx       # tombol musik, tanggal, kastil, pagar+bunga, maps
        ├── Music.jsx              # provider musik latar (embed YouTube tersembunyi)
        ├── MusicToggle.jsx        # tombol nyala/mati musik
        ├── Gallery.jsx            # komposit galeri foto asli
        ├── Doa.jsx                # kertas surat + wax seal + bulu angsa asli
        ├── Rsvp.jsx               # form + ringkasan tamu + buku ucapan
        ├── RsvpForm.jsx
        ├── Guestbook.jsx
        ├── GiftSection.jsx        # rekening + ilustrasi kucing naik sepeda
        ├── Thanks.jsx             # penutup + ilustrasi pasangan + kastil
        ├── Decor.jsx              # elemen kecil (burung/kupu-kupu/sparkle)
        └── Toast.jsx              # notifikasi kecil di bawah layar
```

## Menjalankan di lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`. Tambahkan `?to=Nama%20Tamu` di URL untuk
menguji nama tamu otomatis di halaman pembuka.

## Mengubah isi undangan

Edit **`src/data/weddingData.js`** — semua teks, tanggal, nama mempelai,
lokasi, dan nomor rekening ada di sana. Komponen React tidak perlu diubah.

## Mengganti gambar/ilustrasi

Semua aset visual ada di **`src/assets/images/`** dalam format WebP
(sudah dikompresi dari file asli yang jauh lebih besar). Untuk mengganti
satu gambar, cukup timpa file WebP dengan nama yang sama, atau ganti
nama file lalu perbarui baris `import ... from "../assets/images/..."`
di komponen terkait.

Ada beberapa file cadangan yang belum dipakai di komponen manapun
(`castle-hedge.webp`, `cloud-alt.webp`, `cloud-bismillah.webp`) — sengaja
disimpan andai suatu saat mau ditambahkan.

## Mengganti font Railey & Sigher

Font "Railey" dan "Sigher" bukan Google Fonts (keduanya font
personal-use/komersial dari foundry pihak ketiga), jadi saat ini diganti
padanan gratis dari Google Fonts:

- Railey → **Beau Rivage** (script)
- Sigher → **Quicksand** (sans)

Kalau kamu sudah punya lisensi resmi filenya:

1. Taruh file font (`.woff2`/`.ttf`) di `src/assets/fonts/`.
2. Tambahkan `@font-face` di `src/styles/index.css`.
3. Ganti nilai `--font-script` dan `--font-sans` di file yang sama.
4. Hapus baris `<link>` Google Fonts di `index.html` kalau sudah tidak dipakai.

## Musik latar

Musik latar memakai **embed resmi YouTube** yang disembunyikan (bukan file
audio yang di-hosting sendiri) — lagu "Daylight" oleh Taylor Swift, mulai
dari detik ke-167 (2:47), diputar berulang (loop). Musik otomatis mulai
begitu tamu menekan tombol **"Buka Undangan"** (supaya kebijakan autoplay
browser mengizinkannya, karena dipicu langsung oleh klik tamu), dan bisa
dimatikan lewat tombol yang ada tepat di atas kalender mini pada bagian
"Wedding Details".

Untuk mengganti lagu: buka `src/components/Music.jsx`, ganti nilai
`VIDEO_ID` (ambil dari URL video YouTube-nya) dan `START_SECONDS` (detik
mulai lagunya).

Catatan: karena musik dimulai ulang dari detik yang sama setiap kali
dinyalakan (bukan melanjutkan dari posisi terakhir), matikan/nyalakan
berulang akan membuat lagu mulai lagi dari 2:47 — ini batasan dari
pendekatan sederhana (mount/unmount iframe) yang dipakai supaya tidak
perlu memuat YouTube IFrame API penuh.

## Build untuk produksi

```bash
npm run build
```

Hasilnya ada di folder `dist/`. Coba dulu secara lokal dengan:

```bash
npm run preview
```

## Deploy ke Vercel

1. Push project ini ke repo GitHub.
2. Buka [vercel.com](https://vercel.com) → **Add New Project** → import repo
   tersebut.
3. Vercel otomatis mendeteksi ini project Vite:
   - **Build Command**: `vite build` (otomatis)
   - **Output Directory**: `dist` (otomatis)
4. Klik **Deploy**. Selesai — kamu dapat URL seperti
   `undangan-risky-cita.vercel.app`.
5. Untuk mengirim ke tamu dengan nama otomatis, tambahkan `?to=` di URL,
   misalnya:
   `https://undangan-risky-cita.vercel.app/?to=Budi%20%26%20Keluarga`

## Catatan tentang RSVP & Ringkasan Tamu

Konfirmasi kehadiran dan "Ringkasan Tamu" (Total/Hadir/Tidak Hadir) saat
ini dihitung dari `localStorage` **milik masing-masing perangkat tamu** —
jadi mempelai tidak otomatis melihat gabungan semua balasan dari satu
tempat. Kalau butuh semua RSVP terkumpul di satu dashboard, ganti
`addEntry()` di `src/hooks/useRsvpEntries.js` agar mengirim data ke
backend pilihanmu (Google Sheets API, Firebase, Supabase, dll).

Key localStorage sudah diganti ke `rsvp_risky_cita_v2` dan kode akan
otomatis menghapus data uji-coba di key lama (`rsvp_risky_cita`) begitu
halamannya dibuka — jadi data lama yang sempat tersimpan saat kamu
coba-coba sebelumnya sudah bersih dengan sendirinya, tidak perlu
dihapus manual.
