import { useState } from "react";
import Field from "./field";
import Button from "../button";

const DetailSubmission = () => {
  const [currentStatus, setCurrentStatus] = useState("Informasi Dasar");
  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <Button label={"Informasi Dasar"} isActive={currentStatus === "Informasi Dasar"} onClick={() => setCurrentStatus("Informasi Dasar")} />
        <Button label={"Data Diri"} isActive={currentStatus === "Data Diri"} onClick={() => setCurrentStatus("Data Diri")} />
        <Button label={"Dokumen Pengajuan"} isActive={currentStatus === "Dokumen Pengajuan"} onClick={() => setCurrentStatus("Dokumen Pengajuan")} />
      </div>
      <div className="mt-10 flex flex-col gap-6">
        <Field label={"Jenis Pengajuan"} value={"Hak Cipta"} />
        <div className="flex flex-row gap-6">
          <Field label={"Awal Pengajuan"} value={"12 April 2025"} />
          <Field label={"Akhir Pengajuan"} value={"Dalam proses"} />
        </div>
        <div className="flex flex-row gap-6">
          <Field label={"Skema Pengajuan"} value={"Pendanaan"} />
          <Field label={"Gelombang Pendanaan"} value={"Gelombang 1 ( 01 Jan 2024 - 01 Maret 2024 )"} />
        </div>
      </div>
    </div>
  );
};

export default DetailSubmission;
