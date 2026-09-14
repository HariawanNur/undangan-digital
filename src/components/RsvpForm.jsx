import { useState } from "react";
import styles from "./RsvpForm.module.css";

export default function RsvpForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("hadir");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || submitting) return;

    setSubmitting(true);
    try {
      const result = await onSubmit({ name: name.trim(), attendance, guests, message: message.trim() });
      if (result === false) return;

      setName("");
      setAttendance("hadir");
      setGuests("1");
      setMessage("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="rName">Nama</label>
          <input
            id="rName"
            type="text"
            placeholder="Nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Kehadiran</label>
          <div className={styles.seg}>
            <button
              type="button"
              disabled={submitting}
              className={attendance === "hadir" ? styles.active : ""}
              onClick={() => setAttendance("hadir")}
            >
              Hadir
            </button>
            <button
              type="button"
              disabled={submitting}
              className={attendance === "tidak" ? styles.active : ""}
              onClick={() => setAttendance("tidak")}
            >
              Tidak Hadir
            </button>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="rGuests">Jumlah Tamu</label>
          <select id="rGuests" value={guests} onChange={(e) => setGuests(e.target.value)} disabled={submitting}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="rMsg">Ucapan &amp; Doa</label>
          <textarea
            id="rMsg"
            placeholder="Tuliskan ucapan dan doa untuk Risky & Cita"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={submitting}
          />
        </div>

        <button type="submit" className={styles.submit} disabled={submitting}>
          {submitting ? "Mengirim..." : "Kirim Konfirmasi"}
        </button>
      </form>
      <p className={styles.note}>
        {import.meta.env.VITE_RSVP_ENDPOINT
          ? "Konfirmasi tersimpan di daftar tamu."
          : "Mode demo: konfirmasi tersimpan di perangkat ini."}
      </p>
    </>
  );
}
