export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    // Abu-abu: status awal / belum diproses
    case "Menunggu":
    case "direview":
    case "diajukan":
    case "skema pengajuan":
      return "bg-gray-300 text-gray-700";

    // Merah: status yang menunjukkan masalah
    case "revisi":
    case "ditolak":
      return "bg-red-300 text-red-800";

    // Kuning: status sedang diproses / dalam antrean

    case "lengkapi berkas":
      return "bg-yellow-200 text-yellow-800";

    case "pembayaran":
    case "sertifikat terbit":
      return "bg-green-300 text-green-800";

    // Default: abu-abu untuk status tidak dikenal
    default:
      return "bg-gray-300 text-gray-700";
  }
};
