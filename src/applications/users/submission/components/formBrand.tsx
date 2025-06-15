import { useDispatch, useSelector } from "react-redux";
import FieldDropdown from "../../../../components/input/FieldDropDown";
import Field from "../../../../components/input/fieldInput";
import FieldTextarea from "../../../../components/input/fieldTextArea";
import { FormAdditionalBrand, FormAdditionalBrandError, FormSubmissionBrand, FormSubmissionBrandError } from "../../../../types/brandType";
import InputFile from "./field/InputFile";
import { AppDispatch, RootState } from "../../../../service/store";
import { useEffect } from "react";
import { getTypeBrand } from "../../../../service/actions/landingAction";
import { brandTypeOptions, brandClassOptions } from "../../../../data/brand";
import NextButton from "./nextButton";
import { Link } from "react-router-dom";

interface FormBrandProps {
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
  types?: string;
}

const FormBrand = ({ formBrand, formBrandError, handleChange, formAdditionalBrand, tempAdditionalBrand, handleChangeAdditional, addAdditionalBrand, tempAdditionalBrandError, handleDeleteAttempBrand, handleNextStep }: FormBrandProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { typeBrand } = useSelector((state: RootState) => state.landing.submissionType.brand);

  useEffect(() => {
    dispatch(getTypeBrand());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col items-center lg:mt-20 mt-10 gap-6">
        <h2 className="lg:text-[32px] font-semibold text-2xl">Dokumen Pengajuan</h2>
        <div className="md:w-[60%] w-full">
          <p className="text-center mt-3 items-center">Lengkapi semua data pengajuan Anda agar dapat diproses dengan lancar. Pastikan semua dokumen yang diperlukan telah diisi dengan benar dan lengkap.</p>
        </div>
      </div>
      <div className="flex flex-col w-full gap-6 lg:mt-24 mt-16">
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
          <Field label="Nama Refrensi Label Merek" value={formBrand?.referenceName || ""} name="referenceName" type="text" placeholder="" need error={formBrandError?.referenceName} onChange={handleChange} />
          <Field label="Unsur Warna Dalam Label Merek" value={formBrand?.elementColor || ""} name="elementColor" type="text" placeholder="Contoh: Hitam, Putih dan Biru, Kuning, Merah" need error={formBrandError?.elementColor} onChange={handleChange} />
        </div>
        <div className="flex lg:flex-row flex-col w-full gap-6">
          <Field label="Disclaimer (Tidak dilindungin)" value={formBrand?.disclaimer || ""} name="disclaimer" type="text" placeholder="Contoh: Kata 'Halal', 'Menyehatkan', 'Dijamin Mutu' " error={formBrandError?.disclaimer} onChange={handleChange} />
          <div className="flex flex-col w-full">
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
            <Link className="mt-1 underline text-PRIMARY01" target="_blank" to={"https://skm.dgip.go.id/index.php/skm/detailkelas/35"}>
              Jenis dokumen lihat disini
            </Link>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col w-full gap-6">
          <Field label="Terjemahan Jika Menggunakan Bahasa Asing" value={formBrand?.translate || ""} name="translate" type="text" placeholder="" error={formBrandError?.translate} onChange={handleChange} />
          <Field label="Pengucapan Jika Menggunakan Huruf Non-Latin" value={formBrand?.pronunciation || ""} name="pronunciation" type="text" placeholder="" error={formBrandError?.pronunciation} onChange={handleChange} />
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
        />
        <FieldTextarea label="Keterangan" value={formBrand?.information ?? ""} name="information" placeholder="" required row={4} onChange={handleChange} error={formBrandError?.information} />

        <InputFile label="Label Merek" value={formBrand?.labelBrand ?? null} name="labelBrand" required onChange={handleChange} accept=".jpg" error={formBrandError?.labelBrand} need message="Format file harus berupa jpg. Max 5 MB. 1024 x 1024 pixel" />
        {/* <InputFile label="Upload File" value={formBrand?.fileUploade ?? null} name="fileUploade" required onChange={handleChange} accept=".jpg, .jpeg" error={formBrandError?.fileUploade} need /> */}
        <InputFile label="Tanda Tangan Permohonan" value={formBrand?.signature ?? null} name="signature" required onChange={handleChange} error={formBrandError?.signature} need message="Format file harus berupa pdf. Max 20 MB." />
        {/* <InputFile label="Surat Keterangan UMKM" value={formBrand?.InformationLetter ?? null} name="InformationLetter" required onChange={handleChange} error={formBrandError?.InformationLetter} need />
        <InputFile label="Surat Pernyataan UMKM" value={formBrand?.letterStatment ?? null} name="letterStatment" required onChange={handleChange} error={formBrandError?.letterStatment} need /> */}

        <div className="flex flex-col mt-10 gap-6">
          <h1 className="font-semibold text-3xl">Data Merek Tambahan</h1>
          <InputFile label="Upload Label Tambahan" value={tempAdditionalBrand?.additionalFiles ?? null} name="additionalFiles" required onChange={handleChangeAdditional} error={tempAdditionalBrandError?.additionalFiles} message="Format file harus berupa pdf, doc, dan docx. Max 2MB" />
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
      <div className="mt-20 w-full flex-row gap-6 flex justify-end">
        <NextButton onClick={handleNextStep} />
      </div>
    </>
  );
};

export default FormBrand;
