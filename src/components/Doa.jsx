import { doa } from "../data/weddingData";
import styles from "./Doa.module.css";

import doaPaper from "../assets/images/doa-paper.webp";
import doaFeather from "../assets/images/doa-feather.webp";
import doaSeal from "../assets/images/doa-seal.webp";

export default function Doa() {
  return (
    <section className="section">
      {/* Satu kartu utuh: kertas (sudah termasuk pita di pojok) sebagai
          latar, teks + wax-seal + bulu quill semuanya ditumpuk DI ATAS
          kertas yang sama -- bukan lagi elemen terpisah yang bikin
          section terlihat patah jadi dua. */}
      <div className={styles.wrap}>
        <img src={doaPaper} alt="" className={styles.paperImg} />
        <div className={styles.content}>
          <h2 className={styles.title}>Doa &amp; Restu</h2>
          <p className={styles.text}>{doa}</p>
        </div>
        <img src={doaFeather} alt="" className={styles.feather} />
        <img src={doaSeal} alt="" className={styles.seal} />
      </div>
    </section>
  );
}
