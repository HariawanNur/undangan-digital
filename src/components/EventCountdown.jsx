import MusicToggle from "./MusicToggle";
import Countdown from "./Countdown";
import { event } from "../data/weddingData";
import styles from "./EventCountdown.module.css";

import fence from "../assets/images/fence.webp";
import fenceFlowers from "../assets/images/fence-flowers.webp";

export default function EventCountdown() {
  return (
    <section className="section">
      <MusicToggle />
      <Countdown targetDateTime={event.isoDateTime} />

      {/* Pagar dan bunga sengaja ditumpuk (bunga menutupi bagian bawah
          pagar) supaya jadi satu ilustrasi pembatas, sama seperti di PDF. */}
      <div className={styles.fenceWrap}>
        <img src={fence} alt="" className={styles.fenceImg} />
        <img src={fenceFlowers} alt="" className={styles.fenceFlowersImg} />
      </div>
    </section>
  );
}
