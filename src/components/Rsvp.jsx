import RsvpForm from "./RsvpForm";
import Guestbook from "./Guestbook";
import Decor from "./Decor";
import { useRsvpEntries } from "../hooks/useRsvpEntries";
import { useToast } from "./Toast";
import { exportRsvpToExcel } from "../utils/exportRsvp";
import styles from "./Rsvp.module.css";

import windmillScene from "../assets/images/meadow-windmill-cats.webp";
import rsvpCatsHug from "../assets/images/rsvp-cats-hug.webp";
import rsvpHearts from "../assets/images/rsvp-hearts.webp";
import catBirdhouse from "../assets/images/cat-birdhouse.webp";
import fence from "../assets/images/fence.webp";
import fenceFlowers from "../assets/images/fence-flowers.webp";
import bird from "../assets/images/bird.webp";
import butterfly from "../assets/images/butterfly.webp";

export default function Rsvp() {
  const { entries, addEntry } = useRsvpEntries();
  const showToast = useToast();

  async function handleSubmit(entry) {
    try {
      await addEntry(entry);
      showToast("Terima kasih, konfirmasi berhasil dikirim");
    } catch {
      showToast("Konfirmasi gagal dikirim. Coba lagi ya");
      return false;
    }
  }

  function handleExport() {
    const ok = exportRsvpToExcel(entries);
    showToast(ok ? "Excel kehadiran berhasil diunduh" : "Belum ada data kehadiran untuk diunduh");
  }

  const totalTamu = entries.reduce((sum, e) => sum + (e.attendance === "hadir" ? Number(e.guests) : 0), 0);
  const hadirCount = entries.filter((e) => e.attendance === "hadir").length;
  const tidakCount = entries.filter((e) => e.attendance !== "hadir").length;

  return (
    <section className="section section-alt">
      {/* Satu pemandangan menyatu (kucing & kincir berbagi tanah &
          langit yang sama), persis seperti referensi -- bukan lagi
          susunan bertingkat terpisah. */}
      <div className={styles.headerImgWrap}>
        <div className={styles.scene}>
          <img src={windmillScene} alt="" className={styles.sceneImg} />
          <img src={rsvpHearts} alt="" className={styles.heartsImg} />
          <img src={rsvpCatsHug} alt="" className={styles.catsHugImg} />
          <Decor src={butterfly} size={26} style={{ top: "2%", left: "8%" }} motion="flutter" />
          <Decor src={butterfly} size={22} style={{ top: "6%", left: "24%" }} motion="flutter" delay={0.6} />
        </div>
      </div>

      <h2 className={`section-title ${styles.title}`}>Kehadiran</h2>
      <p className="section-lead">Mohon konfirmasi kehadiran Bapak/Ibu/Saudara/i</p>

      <RsvpForm onSubmit={handleSubmit} />

            <div className={styles.summary}>
        <div className={styles.summaryHeader}>
          <p className={styles.summaryTitle}>Ringkasan Tamu</p>
          <button
            type="button"
            className={styles.exportIconBtn}
            onClick={handleExport}
            aria-label="Unduh Excel Kehadiran"
            title="Unduh Excel Kehadiran"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12" />
              <path d="M7 10l5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
          </button>
        </div>
        <div className={styles.summaryRow}>
          <div className={styles.summaryCell}>
            <span>{totalTamu}</span>
            <label>Total Tamu</label>
          </div>
          <div className={styles.summaryCell}>
            <span>{hadirCount}</span>
            <label>Hadir</label>
          </div>
          <div className={styles.summaryCell}>
            <span>{tidakCount}</span>
            <label>Tidak Hadir</label>
          </div>
        </div>
      </div>

      <div className={styles.guestbookCard}>
        <p className={styles.summaryTitle}>Ucapan &amp; Doa</p>
        <Guestbook entries={entries} />
      </div>

      <div className={styles.decorWrap}>
        {/* Rumah burung + kucing berdiri ditumpuk LANGSUNG di atas pita
            pagar+bunga (bukan mengambang sendirian di background polos),
            persis komposisi di PDF: kucing berdiri menghadap ke atas,
            berpijak tepat di garis pagar. */}
        <img src={catBirdhouse} alt="" className={styles.catImg} />
        <div className={styles.fenceBand}>
          <img src={fence} alt="" className={styles.fenceImg} />
          <img src={fenceFlowers} alt="" className={styles.fenceFlowersImg} />
        </div>
        <Decor src={bird} size={22} style={{ top: "6%", right: "10%" }} motion="float" />
      </div>
    </section>
  );
}
