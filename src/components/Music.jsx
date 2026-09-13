import { createContext, useContext, useState } from "react";
import styles from "./Music.module.css";

const MusicContext = createContext(null);

// Taylor Swift - Daylight (Official Audio) — diputar via embed resmi YouTube
// (bukan file audio yang di-hosting sendiri), mulai dari detik ke-167 (2:47).
const VIDEO_ID = "u9raS7-NisU";
const START_SECONDS = 167;

/**
 * Menyediakan status musik latar (nyala/mati) ke seluruh komponen di
 * bawahnya. Iframe YouTube tersembunyi hanya dipasang setelah undangan
 * dibuka (prop `active`) DAN musik dalam keadaan menyala — dipasang di
 * saat yang sama dengan klik tombol "Buka Undangan" supaya autoplay
 * bersuara diizinkan browser (dihitung sebagai aksi pengguna).
 */
export function MusicProvider({ active, children }) {
  const [enabled, setEnabled] = useState(true);

  const src =
    `https://www.youtube.com/embed/${VIDEO_ID}` +
    `?start=${START_SECONDS}&autoplay=1&mute=0&controls=0` +
    `&loop=1&playlist=${VIDEO_ID}&modestbranding=1&rel=0`;

  return (
    <MusicContext.Provider value={{ enabled, toggle: () => setEnabled((e) => !e) }}>
      {children}
      {active && enabled && (
        <iframe
          key="bg-music"
          src={src}
          title="Musik latar undangan"
          allow="autoplay; encrypted-media"
          className={styles.hiddenFrame}
        />
      )}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within a MusicProvider");
  return ctx;
}
