import FieldDropdown from "../../../../components/input/FieldDropDown";
import Field from "../../../../components/input/fieldInput";
import FieldTextarea from "../../../../components/input/fieldTextArea";
import { FormAdditionalBrand, FormSubmissionBrand, FormSubmissionBrandError } from "../../../../types/brandType";
import InputFile from "./field/InputFile";

interface FormBrandProps {
  formBrand?: FormSubmissionBrand;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
  formBrandError?: FormSubmissionBrandError;
  handleChangeAdditional: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: keyof FormAdditionalBrand) => void;
  formAdditionalBrand: FormAdditionalBrand[];
}

const FormBrand = ({ formBrand, formBrandError, handleChange }: FormBrandProps) => {
  return (
    <div className="flex flex-col w-full gap-6">
      <div>
        <div className="flex flex-row w-full gap-6">
          <FieldDropdown
            label="Tipe Permohonan"
            name="applicationType"
            type="select"
            value={formBrand?.applicationType ?? ""}
            onChange={handleChange}
            options={[
              { label: "Musik Rock", value: "Musik Rock" },
              { label: "Musik Jazz", value: "Musik Jazz" },
            ]}
            error={formBrandError?.applicationType}
            need
          />
          <FieldDropdown
            label="Tipe Merek"
            name="brandType"
            type="select"
            value={formBrand?.brandType ?? ""}
            onChange={handleChange}
            options={[
              { label: "Musik Rock", value: "Musik Rock" },
              { label: "Musik Jazz", value: "Musik Jazz" },
            ]}
            error={formBrandError?.brandType}
            need
          />
        </div>
      </div>

      <div className="flex flex-row w-full gap-6">
        <FieldDropdown
          label="Nama Refrensi Label Merek"
          name="referenceName"
          type="select"
          value={formBrand?.referenceName ?? ""}
          onChange={handleChange}
          options={[
            { label: "Musik Rock", value: "Musik Rock" },
            { label: "Musik Jazz", value: "Musik Jazz" },
          ]}
          error={formBrandError?.referenceName}
          need
        />
        <Field label="Unsur Warna Dalam Label Merek" value={formBrand?.elementColor || ""} name="elementColor" type="text" placeholder="Contoh: Hitam, Putih dan Biru, Kuning, Merah" need error={formBrandError?.elementColor} onChange={handleChange} />
      </div>

      <div className="flex flex-row w-full gap-6">
        <Field label="Terjemahan Jika Menggunakan Bahasa Asing" value={formBrand?.translate || ""} name="translate" type="text" placeholder="" need error={formBrandError?.translate} onChange={handleChange} />
        <Field label="Pengucapan Jika Menggunakan Huruf Non-Latin" value={formBrand?.pronunciation || ""} name="pronunciation" type="text" placeholder="" need error={formBrandError?.pronunciation} onChange={handleChange} />
      </div>
      <div className="flex flex-row w-full gap-6">
        <Field label="Disclaimer" value={formBrand?.disclaimer || ""} name="disclaimer" type="text" placeholder="" need error={formBrandError?.disclaimer} onChange={handleChange} />
        <FieldDropdown
          label="Jenis Dokumen"
          name="documentType"
          type="select"
          value={formBrand?.documentType ?? ""}
          onChange={handleChange}
          options={[
            { label: "Musik Rock", value: "Musik Rock" },
            { label: "Musik Jazz", value: "Musik Jazz" },
          ]}
          error={formBrandError?.documentType}
          need
        />
      </div>

      <FieldTextarea label="Dekripsi Label Merek" value={formBrand?.description ?? ""} name="description" placeholder="" required row={4} onChange={handleChange} error={formBrandError?.description} need />
      <FieldTextarea label="Keterangan" value={formBrand?.information ?? ""} name="information" placeholder="" required row={4} onChange={handleChange} error={formBrandError?.information} need />

      <InputFile label="Label Merek" value={formBrand?.labelBrand ?? null} name="labelBrand" required onChange={handleChange} accept=".jpg" error={formBrandError?.labelBrand} need />
      <InputFile label="Upload File" value={formBrand?.fileUploade ?? null} name="fileUploade" required onChange={handleChange} accept=".jpg, .jpeg" error={formBrandError?.fileUploade} need />
      <InputFile label="Tanda Tangan Permohonan" value={formBrand?.signature ?? null} name="signature" required onChange={handleChange} error={formBrandError?.signature} need />
      <InputFile label="Surat Keterangan UMKM" value={formBrand?.InformationLetter ?? null} name="InformationLetter" required onChange={handleChange} error={formBrandError?.InformationLetter} need />
      <InputFile label="Surat Pernyataan UMKM" value={formBrand?.letterStatment ?? null} name="letterStatment" required onChange={handleChange} error={formBrandError?.letterStatment} need />

      <div className="flex flex-col mt-10 gap-6">
        <h1 className="font-semibold text-3xl">Data Merek Tambahan</h1>
        <InputFile label="Upload Label Tambahan" value={formBrand?.letterStatment ?? null} name="letterStatment" required onChange={handleChange} error={formBrandError?.letterStatment} />
        <FieldTextarea label="Keterangan" value={formBrand?.information ?? ""} name="information" placeholder="" required row={4} onChange={handleChange} error={formBrandError?.information} />
      </div>
    </div>
  );
};

export default FormBrand;
