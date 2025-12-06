import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Review } from "../../types/submissionType";

type ExportRow = { [key: string]: string | number | undefined };

export const parseISO = (value?: string | null) => {
  if (!value || typeof value !== "string") return "-";

  const iso = value.trim();
  if (!iso.includes("T")) return iso; 

  return iso.replace("T", " ").replace("Z", "");
};

// Fungsi export umum
const exportDataToExcel = (data: ExportRow[], sheetName: string, fileName: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);

  const range = XLSX.utils.decode_range(worksheet["!ref"]!);

  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
    if (!worksheet[cellAddress]) continue;

    worksheet[cellAddress].s = {
      fill: { fgColor: { rgb: "0070C0" } },
      font: { bold: true, color: { rgb: "FFFFFF" }, sz: 14 },
      alignment: { horizontal: "center", vertical: "center" },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    };
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true,
  });

  const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(dataBlob, fileName);
};

// Fungsi khusus untuk export Hak Cipta
export const exportCopyrightToExcel = (copyright: Review[]) => {
  const dataToExport = copyright.map((item, index) => ({
    "id": index + 1,
    "Nama Pemohon": item?.user?.fullname ?? "-",
    "Judul Hak Cipta": item?.submission?.copyright?.titleInvention ?? "-",
    Pembayaran: item?.submission?.submissionScheme ?? "-",
    Reviewer: item?.reviewer?.fullname ?? "-",
    "Status Pengajuan": item?.centralStatus?.name ?? "-",
    "Progres Pengajuan": item?.progress?.[0]?.status ?? "-",
    Anggota: item?.submission?.personalDatas ? item.submission.personalDatas.map((user) => user.name).join(", ") : "-",
    "Terakhir Diperbarui": parseISO(item?.updatedAt) ?? "-",
    "Dibuat": parseISO(item?.createdAt )?? "-",
  }));

  exportDataToExcel(dataToExport, "Permohonan Hak Cipta", "Permohonan_Hak_Cipta.xlsx");
};

// Fungsi khusus untuk export Paten
export const exportPatentToExcel = (patent: Review[]) => {
  // console.log("cek exportnya", copyright)
  const dataToExport = patent.map((item, index) => ({
    "id": index + 1,
    "Nama Pemohon": item?.user?.fullname ?? "-",
    "Judul Paten": item?.submission?.patent?.inventionTitle ?? "-",
    Pembayaran: item?.submission?.submissionScheme ?? "-",
    Reviewer: item?.reviewer?.fullname ?? "-",
    "Status Pengajuan": item?.centralStatus?.name?? "-",
    "Progres Pengajuan": item?.progress?.[0]?.status ?? "-",
    Anggota: item?.submission?.personalDatas ? item.submission.personalDatas.map((user) => user.name).join(", ") : "-",
    "Terakhir Diperbarui": parseISO(item?.updatedAt) ?? "-",
    "Dibuat": parseISO(item?.createdAt) ?? "-",
  }));

  exportDataToExcel(dataToExport, "Permohonan Paten", "Permohonan_Paten.xlsx");
};

// Fungsi khusus untuk export Merek
export const exportBrandToExcel = (trademark: Review[]) => {
  const dataToExport = trademark.map((item, index) => ({
    "id": index + 1,
    "Nama Pemohon": item?.user?.fullname ?? "-",
    Pembayaran: item?.submission?.submissionScheme ?? "-",
    Reviewer: item?.reviewer?.fullname ?? "-",
    "Status Pengajuan": item?.centralStatus?.name?? "-",
    "Progres Pengajuan": item?.progress?.[0]?.status ?? "-",
    Anggota: item?.submission?.personalDatas ? item.submission.personalDatas.map((user) => user.name).join(", ") : "-",
    "Terakhir Diperbarui": parseISO(item?.updatedAt) ?? "-",
    "Dibuat": parseISO(item?.createdAt) ?? "-",
  }));

  exportDataToExcel(dataToExport, "Permohonan Merek", "Permohonan_Merek.xlsx");
};

// Fungsi khusus untuk export Desain Industri
export const exportIndustrialDesignToExcel = (industrialDesign: Review[]) => {
  const dataToExport = industrialDesign.map((item, index) => ({
    "id": index + 1,
    "Nama Pemohon": item?.user?.fullname ?? "-",
    "Judul Desain Industri": item?.submission?.industrialDesign?.titleDesign ?? "-",
    Pembayaran: item?.submission?.submissionScheme ?? "-",
    Reviewer: item?.reviewer?.fullname ?? "-",
    "Status Pengajuan": item?.centralStatus?.name ?? "-",
    "Progres Pengajuan": item?.progress?.[0]?.status ?? "-",
    Anggota: item?.submission?.personalDatas ? item.submission.personalDatas.map((user) => user.name).join(", ") : "-",
    "Terakhir Diperbarui": parseISO(item?.updatedAt) ?? "-",
    "Dibuat": parseISO(item?.createdAt) ?? "-",
  }));

  exportDataToExcel(dataToExport, "Permohonan Desain Industri", "Permohonan_Desain_Industri.xlsx");
};
