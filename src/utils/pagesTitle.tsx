import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTitle = () => {
  const location = useLocation();

  // Helper untuk cek apakah path sekarang cocok dengan pattern yang ada
  const matchPath = (pattern: string, path: string) => {
    // ubah pattern seperti /permohonan/:name/progres jadi regex
    const regexPattern = "^" + pattern.replace(/:[^\s/]+/g, "([^\\/]+)") + "$";
    const regex = new RegExp(regexPattern);
    return regex.test(path);
  };

  useEffect(() => {
    const titleMap: Record<string, string> = {
      "/": "Beranda",
      "/unduhan": "Unduhan",
      "/frequently-asked-question": "FAQ",
      "/hubungi-kami": "Hubungi Kami",
      "/notifikasi": "Notifikasi",
      "/login": "Login",
      "/aktivasi-email/:token": "Aktivasi Email",
      "/register": "Register",
      "/lupa-kata-sandi": "Lupa Kata Sandi",
      "/resset-password/:token": "Reset Password",
      "/verify-email": "Verifikasi Email",
      "/profile": "Profil",
      "/dashboard/pengajuan": "Dashboard Pengajuan",
      "/pengajuan/hak-cipta": "Pengajuan Hak Cipta",
      "/pengajuan/paten": "Pengajuan Paten",
      "/pengajuan/merek": "Pengajuan Merek",
      "/pengajuan/desain-industri": "Pengajuan Desain Industri",
      "/histori-pengajuan/progress": "Progress Pengajuan",
      "/histori-pengajuan/detail": "Detail Pengajuan",
      "/lengkapi-berkas-pengajuan": "Lengkapi Pengajuan",
      "/histori-pengajuan/:type": "Histori Pengajuan",
      "/penugasan": "Penugasan",
      "/penugasan/progress": "Progress Penugasan",
      "/penugasan/progress/ubah": "Ubah Progress Penugasan",
      "/ubah-password": "Ubah Password",

      // Admin
      "/dashboard": "Dashboard",
      "/permohonan/hak-cipta": "Permohonan Hak Cipta",
      "/permohonan/paten": "Permohonan Paten",
      "/permohonan/merek": "Permohonan Merek",
      "/permohonan/desain-industri": "Permohonan Desain Industri",
      "/permohonan/:name/progres": "Progress Permohonan",
      "/permohonan/:name/progres/ubah": "Ubah Progress Permohonan",
      "/permohonan/:name/detail": "Detail Permohonan",

      "/kategori/kekayaan-intelektual": "Kategori KI",
      "/kategori/hak-cipta": "Kategori Hak Cipta",
      "/kategori/paten": "Kategori Paten",
      "/kategori/merek": "Kategori Merek",
      "/kategori/desain-industri": "Kategori Desain Industri",
      "/kategori/hak-cipta/sub": "Sub Kategori Hak Cipta",
      "/kategori/desain-industri/sub": "Sub Kategori Desain Industri",

      "/manajemen/faq": "Manajemen FAQ",
      "/manajemen/unduhan": "Manajemen Unduhan",
      "/manajemen/pendanaan": "Manajemen Pendanaan",
      "/manajemen/syarat-ketentuan-pendanaan": "Syarat & Ketentuan Pendanaan",
      "/manajemen/category-download": "Manajemen Kategori Unduhan",
      "/manajemen/group": "Manajemen Grup",
      "/manajemen/quota": "Manajemen Kuota",
      "/manajemen/manage-faq": "Manajemen FAQ Detail",

      "/informasi/laporan-analisis": "Laporan Analisis",
      "/informasi/pusat-bantuan": "Pusat Bantuan",
      "/informasi/log-aktivitas": "Log Aktivitas",
      "/informasi/reply-pusat-bantuan": "Balas Pusat Bantuan",

      "/pengaturan/akun": "Pengaturan Akun",
      "/pengaturan/akun/create": "Buat Akun",
      "/pengaturan/akun/detail": "Detail Akun",
      "/pengaturan/akun/update": "Ubah Akun",

      "/profile/admin": "Profil Admin",
    };

    const defaultTitle = "Sentra KI ITK";

    // Cari judul yang cocok dengan pathname (termasuk dynamic routes)
    let pageTitle = defaultTitle;

    // Cek exact match dulu
    if (titleMap[location.pathname]) {
      pageTitle = titleMap[location.pathname];
    } else {
      // Cek path dinamis
      for (const pattern in titleMap) {
        if (pattern.includes(":") && matchPath(pattern, location.pathname)) {
          pageTitle = titleMap[pattern];
          break;
        }
      }
    }

    document.title = `${pageTitle} | ${defaultTitle}`;
  }, [location.pathname]);

  return null;
};

export default PageTitle;
