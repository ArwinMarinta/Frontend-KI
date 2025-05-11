export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "draft":
      return "bg-gray-300 text-gray-700"; // Warna untuk Draft
    case "direview":
      return "bg-blue-100 text-blue-700"; // Warna untuk Direview
    case "revisi":
    case "revisi draft":
      return "bg-red-100 text-red-700"; // Warna untuk Revisi dan Revisi Draft
    case "diajukan":
      return "bg-yellow-100 text-yellow-700"; // Warna untuk Diajukan
    case "ditolak":
      return "bg-red-500 text-red-800"; // Warna untuk Ditolak
    case "skema pengajuan":
      return "bg-green-100 text-green-700"; // Warna untuk Skema Pengajuan
    case "pembayaran":
      return "bg-green-200 text-green-800"; // Warna untuk Pembayaran
    case "lengkapi berkas":
      return "bg-orange-200 text-orange-800"; // Warna untuk Lengkapi Berkas
    case "selesai":
      return "bg-green-300 text-green-900"; // Warna untuk Selesai
    default:
      return "bg-gray-100 text-gray-700"; // Default untuk status lainnya
  }
};
