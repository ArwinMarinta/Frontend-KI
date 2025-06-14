import FieldDropdown from "../../../../components/input/FieldDropDown";
import Field from "../../../../components/input/fieldInput";
import { IoSearch } from "react-icons/io5";
import { FormReportAnaliticType } from "../../../../types/document";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
type Props = {
  handleSearch: (form: FormReportAnaliticType) => void;
};

const FormReportAnalitic = ({ handleSearch }: Props) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const [formReportAnalitic, setFormReportAnalitic] = useState<FormReportAnaliticType>({
    namaPengguna: "",
    jenisPengajuan: "",
    skemaPengajuan: "",
    progressPengajuan: "",
    peran: "",
    instansi: "",
    startDate: "",
    endDate: "",
  });

  const handleChangeReportAnalitic = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormReportAnalitic((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Form Section */}
      <div className={`gap-6 ${showMoreFilters ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "flex flex-row"}`}>
        <Field label="Nama Pencipta" value={formReportAnalitic.namaPengguna} name="namaPengguna" type="text" placeholder="Nama Pencipta" onChange={handleChangeReportAnalitic} />

        <FieldDropdown
          label="Jenis Pengajuan"
          name="jenisPengajuan"
          type="select"
          value={formReportAnalitic.jenisPengajuan}
          onChange={handleChangeReportAnalitic}
          placeholder="Pilih Jenis Pengajuan"
          options={[
            { label: "Hak Cipta", value: "Hak Cipta" },
            { label: "Paten", value: "Paten" },
            { label: "Merek", value: "Merek" },
            { label: "Desain Industri", value: "Desain Industri" },
          ]}
        />

        <FieldDropdown
          label="Peran"
          name="peran"
          type="select"
          value={formReportAnalitic.peran}
          onChange={handleChangeReportAnalitic}
          options={[
            { label: "Ketua", value: "Ketua" },
            { label: "Anggota", value: "Anggota" },
          ]}
        />

        {showMoreFilters && (
          <>
            <FieldDropdown
              label="Skema Pengajuan"
              name="skemaPengajuan"
              type="select"
              value={formReportAnalitic.skemaPengajuan}
              onChange={handleChangeReportAnalitic}
              placeholder="Pilih Skema Pengajuan"
              options={[
                { label: "Pendanaan", value: "Pendanaan" },
                { label: "Mandiri", value: "Mandiri" },
              ]}
            />
            <FieldDropdown
              label="Progres Pengajuan"
              name="progressPengajuan"
              type="select"
              value={formReportAnalitic.progressPengajuan}
              onChange={handleChangeReportAnalitic}
              placeholder="Pilih Skema Pengajuan"
              options={[
                { label: "Menunggu", value: "Menunggu" },
                { label: "Direview", value: "Direview" },
                { label: "Ditolak", value: "Ditolak" },
                { label: "Revisi", value: "Revisi" },
                { label: "Diajukan", value: "Diajukan" },
                { label: "Skema Pendanaan", value: "Skema Pendanaan" },
                { label: "Pembayaran", value: "Pembayaran" },
                { label: "Lengkapi Berkas", value: "Lengkapi Berkas" },
                { label: "Sertifikat Terbit", value: "Sertifikat Terbit" },
              ]}
            />

            <Field label="Tanggal Awal" name="startDate" value={formReportAnalitic.startDate} type="date" onChange={handleChangeReportAnalitic} placeholder="Tanggal Awal" />
            <Field label="Tanggal Akhir" name="endDate" value={formReportAnalitic.endDate} type="date" onChange={handleChangeReportAnalitic} placeholder="Tanggal Akhir" />
            <Field label="Instansi" name="instansi" value={formReportAnalitic.instansi} type="text" onChange={handleChangeReportAnalitic} placeholder="Nama Instansi" />
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button type="button" onClick={() => setShowMoreFilters((prev) => !prev)} className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md bg-gray-50 text-gray-700">
          <FiFilter />
          {showMoreFilters ? "Sembunyikan Filter" : "Tampilkan Filter"}
        </button>

        <button type="submit" onClick={() => handleSearch(formReportAnalitic)} className="flex items-center gap-2 bg-PRIMARY01 px-4 py-2 text-white rounded-md">
          <IoSearch />
          <span>Cari..</span>
        </button>
      </div>
    </div>
  );
};

export default FormReportAnalitic;
