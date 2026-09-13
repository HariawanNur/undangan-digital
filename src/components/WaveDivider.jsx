import styles from "./WaveDivider.module.css";

export default function WaveDivider() {
  return (
    <svg className={styles.wave} viewBox="0 0 480 34" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 18 Q 60 0 120 18 T 240 18 T 360 18 T 480 18 V34 H0 Z" />
    </svg>
  );
}
