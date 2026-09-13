import { useMusic } from "./Music";
import styles from "./MusicToggle.module.css";

export default function MusicToggle() {
  const { enabled, toggle } = useMusic();

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Matikan musik" : "Nyalakan musik"}
    >
      <span className={styles.icon}>{enabled ? "🔊" : "🔇"}</span>
      <span>{enabled ? "Musik Menyala" : "Musik Dimatikan"}</span>
    </button>
  );
}
