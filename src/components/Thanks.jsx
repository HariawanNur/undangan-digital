import { couple, thanks } from "../data/weddingData";
import Decor from "./Decor";
import styles from "./Thanks.module.css";

import thanksCouple from "../assets/images/thanks-couple-new.webp";
import thanksCastle from "../assets/images/thanks-castle-new.webp";
import thanksHills from "../assets/images/thanks-hills.webp";
import bird from "../assets/images/bird.webp";
import butterfly from "../assets/images/butterfly.webp";

export default function Thanks() {
  return (
    <footer className={styles.footer}>
      <h2 className={styles.thankYou}>Thank You!</h2>
      <p className={styles.text}>{thanks.text}</p>
      <p className={styles.sign}>{thanks.sign}</p>
      <h3 className={styles.names}>
        {couple.groom.name.split(" ")[0]} &amp; {couple.bride.name.split(" ")[0]}
      </h3>

      {/* Adegan bertumpuk: kastil sebagai latar, bukit+pepohonan sebagai
          lapisan depan (menutupi separuh bawah kastil), lalu ilustrasi
          pengantin berdiri di depannya -- semua gambar utuh (tanpa
          crop paksa) jadi selalu proporsional di ukuran layar apa pun. */}
      <div className={styles.illustration}>
        <img src={thanksCastle} alt="" className={styles.castleImg} />
        <img src={thanksHills} alt="" className={styles.hillsImg} />
        <img
          src={thanksCouple}
          alt={`${couple.groom.name} & ${couple.bride.name}`}
          className={styles.coupleImg}
        />
        <Decor src={bird} size={32} style={{ top: "2%", left: "6%" }} motion="float" />
        <Decor src={butterfly} size={38} style={{ top: "10%", right: "8%" }} motion="flutter" delay={0.5} />
      </div>
    </footer>
  );
}
