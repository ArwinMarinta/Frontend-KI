export const statusAdminList = [
  { key: "Menunggu", label: "Menunggu" },
  { key: "Direview", label: "Direview" },
  { key: "Ditolak", label: "Ditolak" },
  { key: "Skema Pendanaan", label: "Skema Pendanaan" },
  { key: "Pembayaran", label: "Pembayaran" },
  { key: "Revisi", label: "Revisi" },
  { key: "Diajukan", label: "Diajukan" },
  { key: "Lengkapi Berkas", label: "Lengkapi Berkas" },
  { key: "Sertifikat Terbit", label: "Sertifikat Terbit" },
];

export const statusReviewerList = [
  { key: "Menunggu", label: "Menunggu" },
  { key: "Direview", label: "Direview" },
  { key: "Ditolak", label: "Ditolak" },
  { key: "Lengkapi Berkas", label: "Lengkapi Berkas" },
  { key: "Skema Pendanaan", label: "Skema Pendanaan" },
];

export const statusDescriptions: Record<string, string> = {
  Menunggu: "Pengajuan Anda sedang menunggu proses review oleh pihak-pihak terkait di sentra. Mohon bersabar sementara dokumen Anda diperiksa secara menyeluruh.",

  Direview: "Dokumen pengajuan Anda saat ini sedang dalam tahap review oleh tim kami untuk memastikan semua data dan persyaratan terpenuhi.",

  Ditolak: "Mohon maaf, pengajuan Anda ditolak karena tidak memenuhi beberapa persyaratan yang diperlukan. Silakan periksa kembali dan lakukan perbaikan jika diperlukan.",

  Revisi: "Pengajuan Anda terdapat kesalahan atau kekurangan pada dokumen. Harap lakukan revisi sesuai instruksi agar pengajuan dapat diproses kembali.",

  Diajukan: "Pengajuan Anda telah siap dan sedang dalam proses untuk diajukan ke DJKI sesuai prosedur yang berlaku.",

  "Skema Pendanaan": "Seluruh berkas pengajuan Anda sudah lengkap dan benar. Selanjutnya, Anda diminta untuk memilih skema pendanaan yang sesuai dengan kebutuhan Anda.",

  Pembayaran: "Anda harus melakukan pembayaran melalui kode billing yang diberikan oleh admin. Kode billing ini berlaku selama 2 hari, harap lakukan pembayaran tepat waktu agar proses dapat berjalan lancar.",

  "Lengkapi Berkas": "Setelah pengajuan diajukan, ada beberapa berkas tambahan yang perlu Anda lengkapi agar proses dapat dilanjutkan tanpa hambatan. Harap segera lengkapi berkas-berkas tersebut.",

  "Sertifikat Terbit": "Selamat! Sertifikat pengajuan Anda sudah diterbitkan oleh DJKI. Anda dapat mengunduh sertifikat tersebut atau menghubungi kami jika membutuhkan bantuan lebih lanjut.",
};
