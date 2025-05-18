import React from "react";
import { SubmissionProgress } from "../../../../../types/submissionType";
import { FormAdditionalBrand, FormAdditionalBrandError, FormSubmissionBrand, FormSubmissionBrandError } from "../../../../../types/brandType";
import FormRevision from "./formRevision";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../service/store";
import InputFile from "../field/InputFile";
import FieldTextarea from "../../../../../components/input/fieldTextArea";
import Field from "../../../../../components/input/fieldInput";
import { brandClassOptions, brandTypeOptions } from "../../../../../data/brand";
import FieldDropdown from "../../../../../components/input/FieldDropDown";

interface FormRevisionProps {
  progresSubmission: SubmissionProgress[] | null;
  formBrand?: FormSubmissionBrand;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
  formBrandError?: FormSubmissionBrandError;
  handleChangeAdditional: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  formAdditionalBrand?: FormAdditionalBrand[];
  tempAdditionalBrand?: FormAdditionalBrand;
  addAdditionalBrand: () => void;
  tempAdditionalBrandError?: FormAdditionalBrandError;
  handleDeleteAttempBrand: (index: number) => void;
  handleNextStep: () => void;
}

const RevisionBrand = ({ progresSubmission, formBrand, formBrandError, handleChange, formAdditionalBrand, tempAdditionalBrand, handleChangeAdditional, addAdditionalBrand, tempAdditionalBrandError, handleDeleteAttempBrand, handleNextStep }: FormRevisionProps) => {
  const { typeBrand } = useSelector((state: RootState) => state.landing.submissionType.brand);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-6">
        <FormRevision progresSubmission={progresSubmission} />
        <div className="flex flex-col w-full gap-6">
          <div>
            <div className="flex lg:flex-row flex-col w-full gap-6">
              <FieldDropdown
                label="Tipe Permohonan"
                name="applicationType"
                type="select"
                value={formBrand?.applicationType ?? ""}
                onChange={handleChange}
                options={
                  brandTypeOptions?.map((item) => ({
                    label: item.label,
                    value: item.value,
                  })) ?? []
                }
                error={formBrandError?.applicationType}
                need
              />
              <FieldDropdown
                label="Tipe Merek"
                name="brandType"
                type="select"
                value={String(formBrand?.brandType ?? null)}
                onChange={handleChange}
                options={
                  typeBrand?.map((item) => ({
                    label: item.title,
                    value: item.id,
                  })) ?? []
                }
                error={formBrandError?.brandType}
                need
              />
            </div>
          </div>

          <div className="flex lg:flex-row flex-col w-full gap-6">
            <Field label="Nama Refrensi Label Merek" value={formBrand?.referenceName || ""} name="referenceName" type="text" placeholder="" need error={formBrandError?.elementColor} onChange={handleChange} />
            <Field label="Unsur Warna Dalam Label Merek" value={formBrand?.elementColor || ""} name="elementColor" type="text" placeholder="Contoh: Hitam, Putih dan Biru, Kuning, Merah" need error={formBrandError?.elementColor} onChange={handleChange} />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-6">
            <Field label="Disclaimer (Tidak dilindungin)" value={formBrand?.disclaimer || ""} name="disclaimer" type="text" placeholder="Contoh: Kata 'Halal', 'Menyehatkan', 'Dijamin Mutu' " error={formBrandError?.disclaimer} onChange={handleChange} />
            <FieldDropdown
              label="Jenis Dokumen"
              name="documentType"
              type="select"
              value={formBrand?.documentType ?? ""}
              onChange={handleChange}
              options={
                brandClassOptions?.map((item) => ({
                  label: item.label,
                  value: item.value,
                })) ?? []
              }
              error={formBrandError?.documentType}
              need
            />
          </div>

          <div className="flex lg:flex-row flex-col w-full gap-6">
            <Field label="Terjemahan Jika Menggunakan Bahasa Asing" value={formBrand?.translate || ""} name="translate" type="text" placeholder="" need error={formBrandError?.translate} onChange={handleChange} />
            <Field label="Pengucapan Jika Menggunakan Huruf Non-Latin" value={formBrand?.pronunciation || ""} name="pronunciation" type="text" placeholder="" need error={formBrandError?.pronunciation} onChange={handleChange} />
          </div>

          <FieldTextarea
            label="Dekripsi Label Merek"
            value={formBrand?.description ?? ""}
            name="description"
            placeholder="Contoh: Kotak, Lingkaran, Segitiga, dan sebagainya (bukan filosofi merek).
Wajib diisi jika tipe merek adalah Tiga Dimensi, Hologram, atau Suara.
Jika bukan, isi dengan tanda strip -."
            required
            row={4}
            onChange={handleChange}
            error={formBrandError?.description}
            need
          />
          <FieldTextarea label="Keterangan" value={formBrand?.information ?? ""} name="information" placeholder="" required row={4} onChange={handleChange} error={formBrandError?.information} need />

          <InputFile label="Label Merek" value={formBrand?.labelBrand ?? null} name="labelBrand" required onChange={handleChange} accept=".jpg" error={formBrandError?.labelBrand} need />
          <InputFile label="Upload File" value={formBrand?.fileUploade ?? null} name="fileUploade" required onChange={handleChange} accept=".jpg, .jpeg" error={formBrandError?.fileUploade} need />
          <InputFile label="Tanda Tangan Permohonan" value={formBrand?.signature ?? null} name="signature" required onChange={handleChange} error={formBrandError?.signature} need />
          <InputFile label="Surat Keterangan UMKM" value={formBrand?.InformationLetter ?? null} name="InformationLetter" required onChange={handleChange} error={formBrandError?.InformationLetter} need />
          <InputFile label="Surat Pernyataan UMKM" value={formBrand?.letterStatment ?? null} name="letterStatment" required onChange={handleChange} error={formBrandError?.letterStatment} need />

          <div className="flex flex-col mt-10 gap-6">
            <h1 className="font-semibold text-3xl">Data Merek Tambahan</h1>
            <InputFile label="Upload Label Tambahan" value={tempAdditionalBrand?.additionalFiles ?? null} name="additionalFiles" required onChange={handleChangeAdditional} error={tempAdditionalBrandError?.additionalFiles} />
            <FieldTextarea label="Keterangan" value={tempAdditionalBrand?.additionalDescriptions ?? ""} name="additionalDescriptions" placeholder="" required row={4} onChange={handleChangeAdditional} error={tempAdditionalBrandError?.additionalDescriptions} />

            <button onClick={addAdditionalBrand} className="bg-PRIMARY01 px-4 py-2 text-white font-medium rounded-md cursor-pointer max-w-fit">
              Tambah
            </button>
          </div>

          {(formAdditionalBrand ?? []).length > 0 && (
            <div className="overflow-x-auto w-full mb-6">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left border-b max-w-10">No</th>
                    <th className="px-4 py-2 text-left border-b ">Nama File</th>
                    <th className="px-4 py-2 text-left border-b ">Deskripsi</th>
                    <th className="px-4 py-2 text-left border-b ">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {formAdditionalBrand?.map((item, index) => (
                    <tr key={index} className="bg-white hover:bg-gray-50 h-full">
                      <td className="px-4 py-2 border-b">{index + 1}</td>
                      <td className="px-4 py-2 border-b">{item.additionalFiles?.name ?? null}</td>
                      <td className="px-4 py-2 border-b">{item.additionalDescriptions}</td>
                      <td className="px-4 py-2 border-b">
                        {" "}
                        <button onClick={() => handleDeleteAttempBrand(index)} className="bg-RED01 px-4 py-1 text-white font-medium rounded-md cursor-pointer">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="flex justify-end mt-16">
          <button onClick={handleNextStep} className="bg-PRIMARY01 px-4 py-2 flex flex-row items-center  gap-2 text-white font-medium rounded-md cursor-pointer">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevisionBrand;
