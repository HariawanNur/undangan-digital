import DateStrip from "./DateStrip";
import { event } from "../data/weddingData";
import styles from "./EventDetails.module.css";

import castle from "../assets/images/castle.webp";

export default function EventDetails() {
  return (
    <section className="section">
      <h2 className={styles.title}>Wedding Details</h2>
      <DateStrip isoDateTime={event.isoDateTime} />

      <div className={styles.textBlock}>
        <p className={styles.day}>{event.dayDate}</p>
        <p className={styles.time}>{event.sessionLabel}</p>
        <p className={styles.time}>{event.timeRange}</p>
        <p className={styles.lokasiLabel}>LOKASI</p>
        <p className={styles.venue}>{event.venueName.toUpperCase()}</p>
        <p className={styles.address}>{event.address}</p>
        <a className={styles.mapsBtn} href={event.mapsUrl} target="_blank" rel="noopener noreferrer">
          MAPS
        </a>
      </div>

      <div className={styles.castleWrap}>
        <img src={castle} alt="" className={styles.castleImg} />
      </div>
    </section>
  );
}
