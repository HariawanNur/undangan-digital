import { useCountdown } from "../hooks/useCountdown";
import styles from "./Countdown.module.css";
import countdownFrame from "../assets/images/countdown-frame.webp";

export default function Countdown({ targetDateTime }) {
  const t = useCountdown(targetDateTime);

  return (
    <div className={styles.wrap}>
      <p className={styles.title}>The Wedding Of</p>
      <div className={styles.frameWrap}>
        <img src={countdownFrame} alt="" className={styles.frameImg} />
        <div className={styles.numbers}>
          <span>{t.d}</span>
          <span className={styles.colon}>:</span>
          <span>{t.h}</span>
          <span className={styles.colon}>:</span>
          <span>{t.m}</span>
          <span className={`${styles.colon} ${styles.pink}`}>:</span>
          <span className={styles.pink}>{t.s}</span>
        </div>
      </div>
      <div className={styles.labels}>
        <span>Days</span>
        <span>Hours</span>
        <span>Minutes</span>
        <span>Seconds</span>
      </div>
    </div>
  );
}
