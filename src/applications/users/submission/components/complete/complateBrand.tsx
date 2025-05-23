import { FormSubmissionBrand, FormSubmissionBrandError } from "../../../../../types/brandType";
import InputFile from "../field/InputFile";

interface FormComplateBrand {
  formBrand?: FormSubmissionBrand;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
  formBrandError?: FormSubmissionBrandError;
  handleUpdate: () => void;
}

const ComplateBrand = ({ formBrand, handleChange, formBrandError, handleUpdate }: FormComplateBrand) => {
  return (
    <>
      <div className="mb-20 font-bold text-center text-4xl">Lengkapi Berkas Merek</div>
      <div className="flex flex-col gap-1">
        <InputFile label="Upload File" value={formBrand?.fileUploade ?? null} name="fileUploade" required onChange={handleChange} error={formBrandError?.fileUploade} need />
        <label className="text-GREY04">Unggah Surat Keterangan UMKM dan Surat Keterangan UKM</label>
      </div>
      <div className="flex justify-end mt-16">
        <button onClick={handleUpdate} className="bg-PRIMARY01 px-4 py-2 flex flex-row items-center  gap-2 text-white font-medium rounded-md cursor-pointer">
          Kirim
        </button>
      </div>
    </>
  );
};

export default ComplateBrand;
