const DAY_LABELS = ["SEN", "SEL", "RAB", "KAM", "JUM", "SAB", "MIN"];
const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

/**
 * Menghitung 7 hari (Senin-Minggu) dalam minggu yang memuat tanggal acara,
 * supaya kalender mini di Wedding Details selalu benar tanpa perlu
 * di-edit manual tiap kali tanggal acara berubah.
 */
export function useWeekStrip(isoDateTime) {
  const target = new Date(isoDateTime);
  const targetDay = target.getDate();
  const targetMonth = target.getMonth();

  // getDay(): 0=Minggu..6=Sabtu -> ubah supaya Senin=0
  const dow = (target.getDay() + 6) % 7;
  const monday = new Date(target);
  monday.setDate(target.getDate() - dow);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return {
      label: DAY_LABELS[i],
      date: d.getDate(),
      isTarget: d.getDate() === targetDay && d.getMonth() === targetMonth,
    };
  });

  return { monthName: MONTH_NAMES[targetMonth], days };
}
