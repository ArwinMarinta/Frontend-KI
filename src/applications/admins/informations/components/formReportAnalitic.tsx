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
    tanggalPengajuan: "",
    peran: "",
    instansi: "",
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
      <div className="flex flex-row gap-6">
        <Field label="" value={formReportAnalitic.namaPengguna} name="namaPengguna" type="text" placeholder="Nama Pencipta" onChange={handleChangeReportAnalitic} />
        <FieldDropdown
          label=""
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
          label=""
          name="peran"
          type="select"
          value={formReportAnalitic.peran}
          onChange={handleChangeReportAnalitic}
          options={[
            { label: "Ketua", value: "Ketua" },
            { label: "Anggota", value: "Anggota" },
          ]}
        />
        {!showMoreFilters && (
          <>
            <div className="">
              <button type="button" onClick={() => setShowMoreFilters(true)} className="flex flex-row border w-full justify-center border-BORDER01 border-md bg-gray-50 gap-2 mt-2 rounded-md items-center py-2 px-4">
                <FiFilter /> Filter
              </button>
            </div>
            <div className="col-span-4">
              <button
                onClick={() => {
                  handleSearch(formReportAnalitic);
                }}
                type="submit"
                className="bg-PRIMARY01 px-4 py-2 text-white font-base rounded-md flex flex-row justify-center mt-2 items-center gap-2"
              >
                <IoSearch />
                <span>Cari..</span>
              </button>
            </div>
          </>
        )}
      </div>

      {showMoreFilters && (
        <div className="flex flex-row gap-6">
          <Field label="" name="tanggalPengajuan" value={formReportAnalitic.tanggalPengajuan} type="date" onChange={handleChangeReportAnalitic} placeholder="Tanggal Pengajuan" />
          <Field label="" name="instansi" value={formReportAnalitic.instansi} type="text" onChange={handleChangeReportAnalitic} placeholder="Nama Instansi" />
          <div className="">
            <button type="button" onClick={() => setShowMoreFilters(false)} className="flex flex-row border w-full justify-center border-BORDER01 border-md bg-gray-50 gap-2 mt-2 rounded-md items-center py-2 px-4">
              <FiFilter /> Sembuyikan
            </button>
          </div>
          <div className="col-span-4">
            <button
              onClick={() => {
                handleSearch(formReportAnalitic);
              }}
              type="submit"
              className="bg-PRIMARY01 px-4 py-2 text-white font-base rounded-md flex flex-row justify-center mt-2 items-center gap-2"
            >
              <IoSearch />
              <span>Cari..</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormReportAnalitic;
