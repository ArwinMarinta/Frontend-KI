import FieldDropdown from "../../../../components/input/FieldDropDown";
import Field from "../../../../components/input/fieldInput";
import { IoSearch } from "react-icons/io5";

const FormReportAnalitic = () => {
  return (
    <form className="flex flex-row items-end gap-6">
      <Field label="" value={""} name="fullname" type="text" placeholder="Nama Pencipta" />
      <FieldDropdown
        label=""
        name="type"
        type="select"
        value={""}
        options={[
          { label: "Hak Cipta", value: "Hak Cipta" },
          { label: "Paten", value: "Paten" },
          { label: "Merek", value: "Merek" },
          { label: "Desain Industri", value: "Desain Industri" },
        ]}
      />
      <FieldDropdown
        label=""
        name="role"
        type="select"
        value={""}
        options={[
          { label: "Ketua", value: "Ketua" },
          { label: "Anggota", value: "Anggota" },
        ]}
      />

      <button type="submit" className="bg-PRIMARY01 px-4 py-2 text-white font-base rounded-md flex flex-row justify-center items-center gap-2 ">
        <IoSearch />
        <span>Cari..</span>
      </button>
    </form>
  );
};

export default FormReportAnalitic;
