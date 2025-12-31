export const reflectionMessages = [
  "Tarik napas dulu.",
  "Tahun ini mungkin capek.",
  "Beberapa hal berhasil, beberapa tidak.",
  "Dan itu tidak apa-apa.",
  "Ada yang pergi, ada yang datang.",
  "Kamu sudah melakukan yang kamu bisa.",
  "Tidak semua harus sempurna.",
  "Istirahat juga bagian dari proses.",
  "Terima kasih sudah bertahan sejauh ini.",
  "Sekarang, lepaskan semuanya.",
  "Siap untuk yang baru?",
];

export function shuffleMessages(messages: string[]): string[] {
  const shuffled = [...messages];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
