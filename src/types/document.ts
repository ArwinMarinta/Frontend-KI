export interface DocumentCategoryType {
  id: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  totalTypeDigunakan: string;
}

export interface DocumentType {
  id: number;
  type: string;
  title: string;
  document: string | null;
  cover: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReportandAnalitic {
  id: number;
  submissionId: number;
  namaPengguna: string;
  jenisPengajuan: string;
  skemaPengajuan: string;
  progressPengajuan: string;
  peran: string;
  waktuPengajuan: string;
}

export type FormReportAnaliticType = {
  namaPengguna: string;
  jenisPengajuan: string;
  skemaPengajuan: string;
  progressPengajuan: string;
  peran: string;
  instansi: string;
  startDate: string;
  endDate: string;
};
