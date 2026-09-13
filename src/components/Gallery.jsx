import Decor from "./Decor";
import styles from "./Gallery.module.css";

import ribbonBanner from "../assets/images/ribbon-banner.webp";
import sparkle from "../assets/images/sparkle.webp";
import butterfly from "../assets/images/butterfly.webp";

import galleryPhoto1 from "../assets/images/gallery-1.webp";
import galleryPhoto2 from "../assets/images/gallery-2.webp";
import galleryPhoto3 from "../assets/images/gallery-3.webp";
import galleryPhoto4 from "../assets/images/gallery-4.webp";
import galleryPhoto5 from "../assets/images/gallery-5.webp";
import galleryPhoto6 from "../assets/images/gallery-6.webp";

const photos = [galleryPhoto1, galleryPhoto2, galleryPhoto3, galleryPhoto4, galleryPhoto5, galleryPhoto6];

export default function Gallery() {
  return (
    <section className="section section-alt">
      <div className={styles.titleWrap}>
        <img src={ribbonBanner} alt="" className={styles.ribbon} />
        <h2 className={`section-title ${styles.title}`}>Our Gallery</h2>
      </div>

      {/* Grid foto asli, dibuat besar & lega supaya benar-benar mengisi
          layar lebar (bukan lagi satu gambar gabungan kecil di tengah),
          tapi tetap rapi jadi 2 kolom sederhana di HP. */}
      <div className={styles.wrap}>
        <Decor src={sparkle} size={32} style={{ top: "-5%", left: "-2%" }} motion="twinkle" />
        <Decor src={butterfly} size={46} style={{ top: "-6%", right: "2%" }} motion="flutter" />
        <Decor src={sparkle} size={28} style={{ bottom: "-4%", left: "46%" }} motion="twinkle" delay={1} />
        <div className={styles.grid}>
          {photos.map((src, i) => (
            <div className={styles.cell} key={i}>
              <img src={src} alt={`Momen Risky & Cita ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
