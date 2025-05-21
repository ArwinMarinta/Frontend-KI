import FieldDropdown from "../../../../components/input/FieldDropDown";
import Field from "../../../../components/input/fieldInput";
import { IoSearch } from "react-icons/io5";
import { FormReportAnaliticType } from "../../../../types/document";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
type Props = {
  form: FormReportAnaliticType;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSearch: () => void;
};

const FormReportAnalitic = ({ form, onChange, handleSearch }: Props) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-6">
        <Field label="" value={form.namaPengguna} name="namaPengguna" type="text" placeholder="Nama Pencipta" onChange={onChange} />
        <FieldDropdown
          label=""
          name="jenisPengajuan"
          type="select"
          value={form.jenisPengajuan}
          onChange={onChange}
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
          value={form.peran}
          onChange={onChange}
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
              <button onClick={handleSearch} type="submit" className="bg-PRIMARY01 px-4 py-2 text-white font-base rounded-md flex flex-row justify-center mt-2 items-center gap-2">
                <IoSearch />
                <span>Cari..</span>
              </button>
            </div>
          </>
        )}
      </div>

      {showMoreFilters && (
        <div className="flex flex-row gap-6">
          <Field label="" name="tanggalPengajuan" value={form.tanggalPengajuan} type="date" onChange={onChange} placeholder="Tanggal Pengajuan" />
          <Field label="" name="instansi" value={form.instansi} type="text" onChange={onChange} placeholder="Nama Instansi" />
          <div className="">
            <button type="button" onClick={() => setShowMoreFilters(false)} className="flex flex-row border w-full justify-center border-BORDER01 border-md bg-gray-50 gap-2 mt-2 rounded-md items-center py-2 px-4">
              <FiFilter /> Sembuyikan
            </button>
          </div>
          <div className="col-span-4">
            <button onClick={handleSearch} type="submit" className="bg-PRIMARY01 px-4 py-2 text-white font-base rounded-md flex flex-row justify-center mt-2 items-center gap-2">
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
