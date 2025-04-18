import React from "react";

const Form_3 = ({ submissionType }: { submissionType: string }) => {
  return (
    <div className="flex flex-col">
      <div>
        {(submissionType === "Paten" || submissionType === "DesainIndustri") && (
          <div className="flex flex-col items-center mt-20">
            <h2 className="text-[32px] font-semibold">Dokumen Pengajuan Review</h2>
            <p className="text-justify mt-3">Permohonan anda akan di review terlebih dahulu oleh pihak Sentra Kekayaan Intelektual ITK</p>
          </div>
        )}
        {(submissionType === "HakCipta" || submissionType === "Merek") && (
          <div className="flex flex-col items-center mt-20">
            <h2 className="text-[32px] font-semibold">Dokumen Pengajuan</h2>
            <p className="text-justify mt-3">
              Lengkapi semua data pengajuan Anda agar dapat diproses dengan lancar.
              <br /> Pastikan semua dokumen yang diperlukan telah diisi dengan benar dan lengkap.
            </p>
          </div>
        )}
      </div>
      <div className="mt-20">
        <label className="text-xl">
          Jenis Pengajuan <span className="text-RED01">*</span>
        </label>
        <select
          id="countries"
          required
          className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" disabled hidden>
            Pilih Jenis Pengajuan
          </option>
          <option value="US">Hak Cipta</option>
          <option value="CA">Paten</option>
          <option value="FR">Merek</option>
          <option value="DE">Desain Industri</option>
        </select>
      </div>
    </div>
  );
};

export default Form_3;
