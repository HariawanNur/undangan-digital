import { quote } from "../data/weddingData";
import Decor from "./Decor";
import styles from "./OpeningQuote.module.css";

import bismillah from "../assets/images/bismillah.webp";
import cloudBismillah from "../assets/images/cloud-bismillah.webp";
import sparkle from "../assets/images/sparkle.webp";

export default function OpeningQuote() {
  return (
    <section className={styles.section}>
      <img src={cloudBismillah} alt="" className={styles.cloudBg} />
      <div className={styles.bismillahWrap}>
        <img src={bismillah} alt="Bismillahirrahmanirrahim" className={styles.bismillahImg} />
        <Decor src={sparkle} size={26} style={{ top: "-30%", right: "2%" }} motion="twinkle" />
      </div>
      <p className={styles.text}>&ldquo;{quote.text}&rdquo;</p>
      <p className={styles.source}>({quote.source})</p>
      <Decor src={sparkle} size={30} style={{ bottom: "6%", left: "4%" }} motion="twinkle" delay={1.2} />
    </section>
  );
}
