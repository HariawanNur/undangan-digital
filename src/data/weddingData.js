/**
 * Semua data undangan dikumpulkan di sini.
 * Kalau ada perubahan (tanggal, lokasi, rekening, dll), cukup edit file ini —
 * tidak perlu menyentuh komponen React sama sekali.
 */

export const couple = {
  groom: {
    name: "Risky Adi Saputra",
    parents: "Bapak Choirul & Ibu Yuliati",
    order: "Putra pertama dari",
    initial: "R",
    instagram: "https://www.instagram.com/riskyadii_",
  },
  bride: {
    name: "Cita Kurniasih Suryadi",
    parents: "Bapak Dodi Suryadi & Ibu Ketut Ruminiasih",
    order: "Putri pertama dari",
    initial: "C",
    instagram: "https://www.instagram.com/citakurniasih",
  },
};

export const event = {
  // Dipakai untuk hitung mundur — format ISO dengan offset zona waktu (WITA = +08:00)
  isoDateTime: "2026-10-03T17:30:00+08:00",
  dayDate: "Sabtu, 03 Oktober 2026",
  sessionLabel: "Resepsi",
  timeRange: "17.30 – 20.00 WITA",
  venueName: "Wisma Bima I",
  address: "Jl. Raya Kuta No. 195, Kuta, Kec. Kuta, Kabupaten Badung, Bali 80361",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Wisma+Bima+I+Jl+Raya+Kuta+No+195+Kuta+Bali",
};

export const quote = {
  text:
    "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan " +
    "untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepada-Nya, " +
    "dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian " +
    "itu benar-benar terdapat tanda-tanda kebesaran Allah bagi kaum yang berpikir.",
  source: "QS. Ar-Rum : 21",
};

export const doa =
  "Dengan penuh kerendahan hati, kami memohon doa dan restu dari keluarga serta " +
  "orang-orang terkasih, agar langkah kami menuju kehidupan baru senantiasa dipenuhi " +
  "cinta, kebahagiaan, dan keberkahan.";

export const thanks = {
  text:
    "Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i " +
    "berkenan hadir dan memberikan doa restu kepada kami.",
  sign: "With love,",
};

export const gifts = [
  {
    type: "bank",
    ownerName: "Risky Adi Saputra",
    label: "BANK BCA",
    value: "7730717312",
  },
  {
    type: "bank",
    ownerName: "Cita Kurniasih Suryadi",
    label: "BANK BNI",
    value: "1886161064",
  },
  {
    type: "address",
    label: "KIRIM HADIAH",
    value:
      "Jl. Cokroaminoto Gg. Mahoni 306, Ubung Kaja, Denpasar Utara, Kota Denpasar, Bali 80116",
    owner: "a.n Risky Adi Saputra",
  },
];

export const defaultGuestName = "Tamu Undangan";
