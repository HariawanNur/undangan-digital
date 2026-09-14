import { useWeekStrip } from "../hooks/useWeekStrip";
import styles from "./DateStrip.module.css";

export default function DateStrip({ isoDateTime }) {
  const { monthName, days } = useWeekStrip(isoDateTime);

  return (
    <div className={styles.wrap}>
      <p className={styles.month}>{monthName}</p>
      <div className={styles.row}>
        {days.map((d) => (
          <span key={d.label} className={styles.dayLabel}>
            {d.label}
          </span>
        ))}
      </div>
      <div className={styles.row}>
        {days.map((d) => (
          <span
            key={`${d.date}-${d.label}`}
            className={`${styles.date} ${d.isOutsideMonth ? styles.outside : ""} ${d.isTarget ? styles.target : ""}`}
          >
            {d.date}
          </span>
        ))}
      </div>
    </div>
  );
}
