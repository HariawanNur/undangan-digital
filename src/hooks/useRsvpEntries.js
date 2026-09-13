import { useEffect, useState } from "react";

// Key baru (v4) supaya semua data uji-coba lama (v2, v3) otomatis
// diabaikan / bersih -- dipakai tiap kali perlu "reset" data RSVP sebelum
// undangan disebar ke tamu asli.
const STORAGE_KEY = "rsvp_risky_cita_v5"; // naikin dari v4 ke v5
const LEGACY_KEYS = [
  "rsvp_risky_cita",
  "rsvp_risky_cita_v2",
  "rsvp_risky_cita_v3",
  "rsvp_risky_cita_v4", // tambahin ini biar data v4 beneran ke-wipe
];

function loadEntries() {
  try {
    // Bersihkan data uji-coba dari versi key lama, sekali saja.
    LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function persist(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // localStorage tidak tersedia (mode privat, dsb) — abaikan diam-diam
  }
}

/**
 * Konfirmasi kehadiran disimpan di localStorage milik masing-masing
 * perangkat tamu. Ini cukup untuk demo/undangan sederhana, tapi TIDAK
 * terkumpul ke satu tempat yang bisa dipantau mempelai dari perangkat lain.
 *
 * Kalau butuh semua RSVP terkumpul di satu dashboard, ganti isi addEntry()
 * di bawah supaya mengirim data ke backend/API (mis. Google Sheets API,
 * Firebase, Supabase, dll) selain (atau menggantikan) localStorage.
 */
export function useRsvpEntries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  function addEntry(entry) {
    setEntries((prev) => {
      const next = [...prev, { ...entry, at: Date.now() }];
      persist(next);
      return next;
    });
  }

  return { entries, addEntry };
}
