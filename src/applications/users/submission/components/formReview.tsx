import InputFile from "./field/InputFile";
import NextButton from "./nextButton";

interface FormReviewProps {
  draftPatent?: File | null;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  errorDraftPatent?: boolean;
  handleNextStep1: () => void;
}

const FormReview = ({ draftPatent, handleChange, errorDraftPatent, handleNextStep1 }: FormReviewProps) => {
  return (
    <>
      <div className="flex flex-col items-center mt-20 mb-20">
        <h2 className="text-[32px] font-semibold">Dokumen Pengajuan Review</h2>
        <p className="text-justify mt-3">Permohonan anda akan di review terlebih dahulu oleh pihak Sentra Kekayaan Intelektual ITK</p>
      </div>
      <div>
        <InputFile label="Draft Review Pengajuan" value={draftPatent} name="draftPatentApplicationFile" required onChange={handleChange} error={errorDraftPatent} need placeholder={`${draftPatent}`} />
        <span className="block pt-2">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
      </div>
      <div className="mt-20 w-full flex-row gap-6 flex justify-end">
        <NextButton onClick={handleNextStep1} />
      </div>
    </>
  );
};

export default FormReview;
