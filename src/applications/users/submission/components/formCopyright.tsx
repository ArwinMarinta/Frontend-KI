import { FormSubmissionCopyright, FormSubmissionCopyrightError } from "../../../../types/copyright";
import FieldDropdown from "../../../../components/input/FieldDropDown";
import Field from "../../../../components/input/fieldInput";
import FieldTextarea from "../../../../components/input/fieldTextArea";
import InputFile from "./field/InputFile";

interface FormCopyrightProps {
  formCopyright?: FormSubmissionCopyright;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
  formCopyrightError?: FormSubmissionCopyrightError;
}

const FormCopyright = ({ formCopyright, formCopyrightError, handleChange }: FormCopyrightProps) => {
  return (
    <div className="flex flex-col gap-6">
      <Field label="Judul Ciptaan" value={formCopyright?.titleInvention || ""} name="titleInvention" type="text" placeholder="" need error={formCopyrightError?.titleInvention} onChange={handleChange} />

      <div>
        <div className="flex flex-row w-full gap-6">
          <FieldDropdown
            label="Jenis Hak Cipta"
            name="typeCreation"
            type="select"
            value={formCopyright?.typeCreation ?? ""}
            onChange={handleChange}
            options={[
              { label: "Musik", value: "Musik" },
              { label: "Alat Daerah", value: "Alat Daerah" },
            ]}
            error={formCopyrightError?.typeCreation}
            need
          />
          <FieldDropdown
            label="Sub-Jenis Hak Cipta"
            name="subTypeCreation"
            type="select"
            value={formCopyright?.subTypeCreation ?? ""}
            onChange={handleChange}
            options={[
              { label: "Musik Rock", value: "Musik Rock" },
              { label: "Musik Jazz", value: "Musik Jazz" },
            ]}
            error={formCopyrightError?.subTypeCreation}
            need
          />
        </div>
      </div>

      <div className="flex flex-row w-full gap-6">
        <Field label="Negara Pertama Kali Diumumkan" value={formCopyright?.countryFirstAnnounced || ""} name="countryFirstAnnounced" type="text" placeholder="" need error={formCopyrightError?.countryFirstAnnounced} onChange={handleChange} />
        <Field label="Kota Pertama Kali Diumumkan" value={formCopyright?.cityFirstAnnounced || ""} name="cityFirstAnnounced" type="text" placeholder="" need error={formCopyrightError?.cityFirstAnnounced} onChange={handleChange} />
      </div>

      <div className="w-full">
        <label htmlFor="startDate" className="block mb-2 text-base font-medium">
          Waktu Pertama Kali Diumumkan
        </label>
        <input
          type="date"
          id="timeFirstAnnounced"
          name="timeFirstAnnounced"
          value={formCopyright?.timeFirstAnnounced || ""}
          onChange={handleChange}
          className={`bg-gray-50 border ${formCopyrightError?.timeFirstAnnounced ? "border-RED01 ring-RED01 focus:ring-RED01 focus:border-RED01" : "border-BORDER01 focus:ring-PRIMARY01 focus:border-PRIMARY01"} text-base rounded-md block w-full p-2`}
        />
        {formCopyrightError?.timeFirstAnnounced && <p className="text-sm text-RED01 mt-1">Field Tidak Boleh Kosong!</p>}
      </div>

      <FieldTextarea label="Uraian Singkat Ciptaan" value={formCopyright?.briefDescriptionCreation || ""} name="briefDescriptionCreation" placeholder="" required row={4} onChange={handleChange} error={formCopyrightError?.briefDescriptionCreation} need />
      <InputFile label="Surat Pernyataan" value={formCopyright?.statementLetter ?? null} name="statementLetter" required onChange={handleChange} error={formCopyrightError?.statementLetter} need />
      <InputFile label="Surat Pengalihan Hak Cipta" value={formCopyright?.letterTransferCopyright ?? null} name="letterTransferCopyright" required onChange={handleChange} error={formCopyrightError?.letterTransferCopyright} need />
      <InputFile label="Contoh Ciptaan" value={formCopyright?.exampleCreation ?? null} name="exampleCreation" required onChange={handleChange} error={formCopyrightError?.exampleCreation} need />
    </div>
  );
};

export default FormCopyright;
