import { useEffect, useState } from "react";

// Key baru (v4) supaya semua data uji-coba lama (v2, v3) otomatis
// diabaikan / bersih -- dipakai tiap kali perlu "reset" data RSVP sebelum
// undangan disebar ke tamu asli.
const STORAGE_KEY = "rsvp_risky_cita_v6"; // naikin dari v4 ke v5
const RSVP_ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT?.trim();
const LEGACY_KEYS = [
  "rsvp_risky_cita",
  "rsvp_risky_cita_v2",
  "rsvp_risky_cita_v3",
  "rsvp_risky_cita_v4",
  "rsvp_risky_cita_v5" // tambahin ini biar data v4 beneran ke-wipe
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
 * Menyimpan salinan lokal untuk guestbook dan mengirim ke Google Sheets jika
 * VITE_RSVP_ENDPOINT sudah dikonfigurasi.
 */
export function useRsvpEntries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  async function addEntry(entry) {
    const nextEntry = { ...entry, at: Date.now() };

    if (RSVP_ENDPOINT) {
      const response = await fetch(RSVP_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(nextEntry),
      });

      if (!response.ok && response.type !== "opaque") {
        throw new Error("RSVP endpoint returned an error");
      }
    }

    setEntries((prev) => {
      const next = [...prev, nextEntry];
      persist(next);
      return next;
    });
  }

  return { entries, addEntry, isRemote: Boolean(RSVP_ENDPOINT) };
}
