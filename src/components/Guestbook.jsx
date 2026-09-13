import { useMemo, useState } from "react";
import styles from "./Guestbook.module.css";

const PREVIEW_COUNT = 3;

export default function Guestbook({ entries }) {
  const [showAll, setShowAll] = useState(false);

  const ordered = useMemo(() => entries.slice().reverse(), [entries]);

  if (ordered.length === 0) {
    return <p className={styles.empty}>Belum ada ucapan dan doa.</p>;
  }

  const visible = showAll ? ordered : ordered.slice(0, PREVIEW_COUNT);
  const hasMore = ordered.length > PREVIEW_COUNT;

  return (
    <>
      <div className={styles.list}>
        {visible.map((entry, i) => (
          <div key={entry.at ?? i} className={styles.item}>
            <div className={styles.top}>
              <span className={styles.name}>{entry.name}</span>
              <span className={`${styles.status} ${entry.attendance !== "hadir" ? styles.no : ""}`}>
                {entry.attendance === "hadir" ? `Hadir · ${entry.guests} orang` : "Tidak hadir"}
              </span>
            </div>
            {entry.message && <p className={styles.msg}>{entry.message}</p>}
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          className={styles.moreBtn}
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll ? "Tampilkan Lebih Sedikit" : `Lihat Semua (${ordered.length})`}
        </button>
      )}
    </>
  );
}
