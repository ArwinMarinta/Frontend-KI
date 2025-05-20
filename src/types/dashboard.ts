export type DashboardData = {
  totalPengajuan: {
    hakCipta: number;
    paten: number;
    merek: number;
    desainIndustri: number;
  };
  totalPendanaan: {
    pendanaan: number;
    mandiri: number;
  };
  faq: number;
  unduhan: number;
  pengajuanTerakhir: PengajuanItem[];
  berdasarkanGelombang: StatistikPeriode;
  berdasarkanTahun: StatistikPeriode;
};

export type PengajuanItem = {
  id: number;
  namaPengguna: string;
  jenisPengajuan: string;
  pendanaan: string;
  progres: string;
  waktuPengajuan: string;
};

export type StatistikPeriode = {
  labels: string[];
  data: {
    hakCipta: number[];
    paten: number[];
    merek: number[];
    desainIndustri: number[];
  };
};

export interface Notification {
  id: number;
  userId: number;
  title: string;
  descripton: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
