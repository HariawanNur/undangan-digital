import { gifts } from "../data/weddingData";
import { useToast } from "./Toast";
import Decor from "./Decor";
import styles from "./GiftSection.module.css";

import catBike from "../assets/images/rsvp-cat-bike.webp";
import ribbonBanner from "../assets/images/ribbon-banner.webp";
import bird from "../assets/images/bird.webp";
import sparkle from "../assets/images/sparkle.webp";

export default function GiftSection() {
  const showToast = useToast();

  async function handleCopy(value) {
    try {
      await navigator.clipboard.writeText(value);
      showToast("Berhasil disalin");
    } catch {
      showToast("Gagal menyalin, salin manual ya");
    }
  }

  const banks = gifts.filter((g) => g.type === "bank");
  const address = gifts.find((g) => g.type === "address");

  return (
    <section className="section">
      <div className={styles.titleWrap}>
        <img src={ribbonBanner} alt="" className={styles.ribbon} />
        <h2 className={styles.title}>Cashless</h2>
      </div>

      <div className={styles.cards}>
        {banks.map((gift) => (
          <div className={styles.card} key={gift.label}>
            <p className={styles.ownerName}>{gift.ownerName}</p>
            <p className={styles.label}>{gift.label}</p>
            <p className={styles.value}>{gift.value}</p>
            <button className={styles.copyBtn} onClick={() => handleCopy(gift.value)}>
               Salin nomor rekening
            </button>
          </div>
        ))}
      </div>

      {address && (
        <div className={styles.addressBlock}>
          <p className={styles.giftWord}>Gift</p>
          <p className={styles.addressValue}>{address.value}</p>
          <p className={styles.addressOwner}>{address.owner}</p>
          <button className={styles.copyBtn} onClick={() => handleCopy(address.value)}>
             Salin alamat
          </button>
        </div>
      )}

      <div className={styles.decorWrap}>
        <img src={catBike} alt="" className={styles.catBikeImg} />
        <Decor src={bird} size={24} style={{ top: "0%", right: "10%" }} motion="float" />
        <Decor src={sparkle} size={26} style={{ top: "4%", left: "6%" }} motion="twinkle" />
      </div>
    </section>
  );
}
