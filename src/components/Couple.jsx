import { couple } from "../data/weddingData";
import Decor from "./Decor";
import styles from "./Couple.module.css";

import photoFrameGold from "../assets/images/photo-frame-gold.webp";
import photoBride from "../assets/images/photo-bride.webp";
import photoGroom from "../assets/images/photo-groom.webp";
import iconInstagram from "../assets/images/icon-instagram.webp";
import meadowWindmillCats from "../assets/images/meadow-windmill-cats.webp";
import bird from "../assets/images/bird.webp";
import butterfly from "../assets/images/butterfly.webp";

function Person({ person, photo, decorSide }) {
  const outer = decorSide === "left" ? "left" : "right";
  const inner = decorSide === "left" ? "right" : "left";
  return (
    <div className={styles.person}>
      <div className={styles.frameWrap}>
        <img src={photoFrameGold} alt="" className={styles.frameImg} />
        <img src={photo} alt={person.name} className={styles.photo} />
        {/* Kombinasi burung + kupu-kupu diperbesar supaya lebih terasa
            "hidup" & eye-catching di setiap frame foto. */}
        <Decor
          src={bird}
          size={38}
          style={{ top: "2%", [outer]: "-20%" }}
          motion="float"
          delay={decorSide === "left" ? 0 : 0.4}
        />
        <Decor
          src={butterfly}
          size={40}
          style={{ bottom: "0%", [inner]: "-20%" }}
          flip={decorSide !== "left"}
          motion="flutter"
          delay={decorSide === "left" ? 0.6 : 1}
        />
      </div>
      <h3 className={styles.name}>{person.name}</h3>
      <p className={styles.desc}>
        {person.order}
        <br />
        {person.parents}
      </p>
      <a
        className={styles.igIcon}
        href={person.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram ${person.name}`}
      >
        <img src={iconInstagram} alt="" />
      </a>
    </div>
  );
}

export default function Couple() {
  return (
    <section className="section section-alt">
      <p className="eyebrow">ASSALAMU&apos;ALAIKUM WARAHMATULLAHI WABARAKATUH</p>
      <h2 className={`section-title ${styles.title}`}>Groom &amp; Bride</h2>

      <div className={styles.wrap}>
        <Person person={couple.bride} photo={photoBride} decorSide="left" />
        <Person person={couple.groom} photo={photoGroom} decorSide="right" />
      </div>

      {/* Windmill + kucing sebagai banner utuh lebar penuh (sesuai PDF
          asli) -- kupu-kupu besar melayang di atasnya sebagai aksen. */}
      <div className={styles.meadowWrap}>
        <img src={meadowWindmillCats} alt="" className={styles.meadowImg} />
        <Decor src={butterfly} size={44} style={{ top: "8%", right: "6%" }} motion="flutter" delay={1.3} />
      </div>
    </section>
  );
}
