import { useEffect, useState } from "react";
import { defaultGuestName } from "../data/weddingData";

/**
 * Membaca nama tamu dari parameter URL ?to=Nama%20Tamu
 * Contoh: https://undanganmu.vercel.app/?to=Budi%20%26%20Keluarga
 */
export function useGuestName() {
  const [guestName, setGuestName] = useState(defaultGuestName);

  useEffect(() => {
    // URLSearchParams.get() sudah otomatis mendekode nilai dari URL
    // (termasuk %20 dan + jadi spasi), jadi TIDAK perlu decodeURIComponent
    // lagi di sini -- kalau dipanggil dua kali, nama tamu yang mengandung
    // karakter "%" (mis. "50% Off Catering") akan membuat halaman error.
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to && to.trim()) setGuestName(to.trim());
  }, []);

  return guestName;
}
