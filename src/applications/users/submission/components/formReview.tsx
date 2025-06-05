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
      <div className="flex flex-col items-center md:mt-20 mt-10 gap-6">
        <h2 className="lg:text-[32px] font-semibold text-2xl">Dokumen Review</h2>
        <div className="md:w-[60%] w-full">
          <p className="text-center mt-3  items-center">Permohonan anda akan di review terlebih dahulu oleh pihak Sentra Kekayaan Intelektual ITK</p>
        </div>
      </div>
      <div className=" lg:mt-24 mt-16">
        <InputFile label="Draft Review Pengajuan" value={draftPatent} name="draftPatentApplicationFile" required onChange={handleChange} error={errorDraftPatent} need placeholder="" />
        <span className="mt-1 text-GREY04 text-sm font-medium">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
      </div>
      <div className="mt-20 w-full flex-row gap-6 flex justify-end">
        <NextButton onClick={handleNextStep1} />
      </div>
    </>
  );
};

export default FormReview;
