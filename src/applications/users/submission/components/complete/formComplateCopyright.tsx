import { FormSubmissionCopyright, FormSubmissionCopyrightError } from "../../../../../types/copyright";
import InputFile from "../field/InputFile";

interface FormComplaCopyright {
  formCopyright?: FormSubmissionCopyright;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
  formCopyrightError?: FormSubmissionCopyrightError;
  handleUpdate: () => void;
  openWarningModal: (type: string, submitFn: () => void) => void;
}

const FormComplateCopyright = ({ formCopyright, handleChange, formCopyrightError, handleUpdate, openWarningModal }: FormComplaCopyright) => {
  return (
    <>
      <div className="mb-20 font-bold text-center text-4xl">Lengkapi Berkas Hak Cipta</div>
      <div className="flex flex-col gap-6">
        <InputFile label="Surat Pernyataan" value={formCopyright?.statementLetter} name="statementLetter" required onChange={handleChange} error={formCopyrightError?.statementLetter} need message="Format file harus berupa pdf. Max 20 MB" accept=".pdf" />
        <InputFile label="Surat Pengalihan Hak Cipta" value={formCopyright?.letterTransferCopyright} name="letterTransferCopyright" required onChange={handleChange} error={formCopyrightError?.letterTransferCopyright} need message="Format file harus berupa pdf. Max 20 MB" accept=".pdf" />
      </div>
      <div className="flex justify-end mt-16">
        <button onClick={() => openWarningModal("LengkapiBerkasPaten", handleUpdate)} className="bg-PRIMARY01 px-4 py-2 flex flex-row items-center  gap-2 text-white font-medium rounded-md cursor-pointer">
          Kirim
        </button>
      </div>
    </>
  );
};

export default FormComplateCopyright;
