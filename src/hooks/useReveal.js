import { useEffect, useRef, useState } from "react";

/**
 * Hook kecil untuk animasi "muncul saat discroll".
 * Mengembalikan ref yang dipasang ke elemen, dan boolean `visible`
 * yang jadi true begitu elemen masuk viewport (sekali saja).
 *
 * Dipakai bareng kelas CSS `.reveal` / `.reveal.in` di reveal.css.
 */
export function useReveal(options) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Kalau browser tidak dukung IntersectionObserver, langsung tampilkan.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px", ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, visible];
}
