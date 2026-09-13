import { useEffect, useState } from "react";

/**
 * Hitung mundur menuju sebuah waktu target (ISO string dengan offset zona waktu).
 * Mengembalikan { d, h, m, s } yang sudah dipad-nol.
 */
export function useCountdown(isoDateTime) {
  const target = new Date(isoDateTime).getTime();
  const [timeLeft, setTimeLeft] = useState({ d: "00", h: "00", m: "00", s: "00" });

  useEffect(() => {
    function tick() {
      const diff = Math.max(0, target - Date.now());
      const pad = (n) => String(n).padStart(2, "0");
      setTimeLeft({
        d: pad(Math.floor(diff / 86400000)),
        h: pad(Math.floor((diff % 86400000) / 3600000)),
        m: pad(Math.floor((diff % 3600000) / 60000)),
        s: pad(Math.floor((diff % 60000) / 1000)),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}
