import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const titleMap: Record<string, string> = {
      "/": "Beranda",
      "/pengajuan": "Pengajuan",
      "/unduhan": "Unduhan",
      "/frequently-asked-question": "FAQ",
      "/hubungi-kami": "Hubungi Kami",
      "/notifikasi": "Notifikasi",
      "/login": "Login",
      "/register": "Register",
      "/lupa-kata-sandi": "Lupa Kata Sandi",
      "/resset-password": "Reset Password",
      "/verify-email": "Verifikasi Email",
      "/profile": "Profil",
      "/histori-pengajuan": "Histori Pengajuan",
      "/penugasan": "Penugasan",
      "/ubah-password": "Ubah Password",
      "/histori-pengajuan/progress": "Progress Pengajuan",
      "/histori-pengajuan/detail": "Detail Pengajuan",
      "/histori-pengajuan/lengkapi": "Lengkapi Pengajuan",

      // Admin
      "/dashboard": "Dashboard",
      "/permohonan/hak-cipta": "Permohonan Hak Cipta",
      "/permohonan/paten": "Permohonan Paten",
      "/permohonan/merek": "Permohonan Merek",
      "/permohonan/desain-industri": "Permohonan Desain Industri",

      "/kategori/kekayaan-intelektual": "Kategori KI",
      "/kategori/hak-cipta": "Kategori Hak Cipta",
      "/kategori/paten": "Kategori Paten",
      "/kategori/merek": "Kategori Merek",
      "/kategori/desain-industri": "Kategori Desain Industri",

      "/manajemen/faq": "Manajemen FAQ",
      "/manajemen/unduhan": "Manajemen Unduhan",
      "/manajemen/pendanaan": "Manajemen Pendanaan",
      "/manajemen/syarat-ketentuan-pendanaan": "S&K Pendanaan",

      "/informasi/laporan-analisis": "Laporan Analisis",
      "/informasi/pusat-bantuan": "Pusat Bantuan",
      "/informasi/log-aktivitas": "Log Aktivitas",

      "/pengaturan/akun": "Pengaturan Akun",
    };

    const defaultTitle = "Sentra KI ITK";
    const pageTitle = titleMap[location.pathname] || defaultTitle;

    document.title = `${pageTitle} | ${defaultTitle}`;
  }, [location.pathname]);

  return null;
};

export default PageTitle;
