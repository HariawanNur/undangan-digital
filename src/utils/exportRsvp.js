import * as XLSX from "xlsx";

/**
 * Export daftar konfirmasi kehadiran ke file Excel (.xlsx).
 * Kolomnya mengikuti field yang ada di form Kehadiran:
 * Nama, Kehadiran, Jumlah Tamu, Ucapan & Doa, Waktu Konfirmasi.
 */
export function exportRsvpToExcel(entries, fileName = "Kehadiran-Risky-Cita") {
  if (!entries || entries.length === 0) return false;

  const rows = entries.map((entry, i) => ({
    No: i + 1,
    Nama: entry.name || "",
    Kehadiran: entry.attendance === "hadir" ? "Hadir" : "Tidak Hadir",
    "Jumlah Tamu": entry.attendance === "hadir" ? Number(entry.guests) || 0 : 0,
    "Ucapan & Doa": entry.message || "",
    "Waktu Konfirmasi": entry.at ? new Date(entry.at).toLocaleString("id-ID") : "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Lebar kolom biar enak dibaca
  worksheet["!cols"] = [
    { wch: 5 },
    { wch: 26 },
    { wch: 12 },
    { wch: 12 },
    { wch: 45 },
    { wch: 20 },
  ];

  const totalTamu = rows.reduce((sum, r) => sum + r["Jumlah Tamu"], 0);
  const hadir = rows.filter((r) => r.Kehadiran === "Hadir").length;
  const tidak = rows.filter((r) => r.Kehadiran === "Tidak Hadir").length;

  const summarySheet = XLSX.utils.aoa_to_sheet([
    ["Ringkasan Kehadiran"],
    ["Total Konfirmasi", entries.length],
    ["Total Tamu (Hadir)", totalTamu],
    ["Hadir", hadir],
    ["Tidak Hadir", tidak],
  ]);
  summarySheet["!cols"] = [{ wch: 22 }, { wch: 12 }];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Daftar Kehadiran");
  XLSX.utils.book_append_sheet(workbook, summarySheet, "Ringkasan");

  const stamp = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `${fileName}-${stamp}.xlsx`);
  return true;
}
