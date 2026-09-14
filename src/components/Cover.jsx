import { couple, event } from "../data/weddingData";
import Decor from "./Decor";
import styles from "./Cover.module.css";

import nameFrame from "../assets/images/name-frame.webp";
import pillLabel from "../assets/images/pill-label.webp";
import coverCouple from "../assets/images/cover-couple-new.webp";
import bird from "../assets/images/bird.webp";

export default function Cover({ guestName, opened, onOpen }) {
  return (
    <section className={`${styles.cover} ${opened ? styles.closed : ""}`}>
      <div className={styles.coverInner}>
        <div className={styles.top}>
          <p className={styles.eyebrow}>A celebration of love</p>

          <div className={styles.nameFrameWrap}>
            <img src={nameFrame} alt="" className={styles.nameFrameImg} />
            <div className={styles.nameFrameText}>
              <span>{couple.groom.name.split(" ")[0]}</span>
              <span className={styles.amp}>&amp;</span>
              <span>{couple.bride.name.split(" ")[0]}</span>
            </div>
            <Decor src={bird} size={30} style={{ top: "6%", left: "-6%" }} motion="float" delay={0} />
            <Decor src={bird} size={26} style={{ top: "2%", right: "-4%" }} flip motion="float" delay={0.6} />
            <Decor src={bird} size={24} style={{ bottom: "10%", left: "-10%" }} motion="float" delay={1.1} />
            <Decor src={bird} size={24} style={{ bottom: "18%", right: "-8%" }} flip motion="float" delay={1.7} />
          </div>

          <div className={styles.guestBlock}>
            <p className={styles.guestLabel}>Kepada Yth.</p>
             <p className={styles.guestLabel}>Dengan hormat kami mengundang</p>
            <div className={styles.guestPill}>
              <img src={pillLabel} alt="" className={styles.pillImg} />
              <span className={styles.guestName}>{guestName}</span>
            </div>
          </div>

          <button className={styles.openBtn} onClick={onOpen} aria-label="Buka undangan">
             <img src={pillLabel} alt="" className={styles.pillImg} />
             <span className={styles.pillText}>Buka Undangan <span aria-hidden="true">↗</span></span>
          </button>
        </div>

        <div className={styles.illustration}>
          <img src={coverCouple} alt={`${couple.groom.name} & ${couple.bride.name}`} className={styles.coupleImg} />
        </div>

        <p className={styles.eventDate}>{event.dayDate}</p>
      </div>
    </section>
  );
}
