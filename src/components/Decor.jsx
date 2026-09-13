import styles from "./Decor.module.css";

/**
 * Elemen dekoratif kecil yang ditaburkan di sekitar section (burung,
 * kupu-kupu, kilauan bintang) — persis seperti di desain asli.
 *
 * Posisi diatur lewat prop style (top/left/right/bottom dalam %),
 * supaya tiap pemanggilan bisa menaruhnya di titik berbeda.
 *
 * `motion` menambahkan animasi supaya lebih hidup & eye-catching:
 *  - "float"   : burung melayang naik-turun pelan (dipakai untuk bird)
 *  - "flutter" : kupu-kupu terbang meliuk kesana-kemari (dipakai untuk butterfly)
 *  - "twinkle" : kilauan berkedip (dipakai untuk sparkle)
 * Animasi dipasang di elemen pembungkus (span), bukan langsung di <img>,
 * supaya tidak bentrok dengan transform flip/rotate milik gambarnya sendiri.
 * `delay` (detik) dipakai supaya beberapa elemen sejenis tidak bergerak
 * serempak/kaku, jadi terasa lebih natural.
 */
export default function Decor({
  src,
  alt = "",
  size = 36,
  style,
  flip = false,
  rotate = 0,
  motion = "none",
  delay = 0,
}) {
  const motionClass =
    motion === "float" ? styles.float : motion === "flutter" ? styles.flutter : motion === "twinkle" ? styles.twinkle : "";

  return (
    <span
      className={`${styles.decor} ${motionClass}`}
      style={{ animationDelay: `${delay}s`, ...style }}
    >
      <img
        src={src}
        alt={alt}
        aria-hidden={alt === ""}
        className={styles.decorImg}
        style={{
          width: size,
          transform: `${flip ? "scaleX(-1) " : ""}rotate(${rotate}deg)`,
        }}
      />
    </span>
  );
}
