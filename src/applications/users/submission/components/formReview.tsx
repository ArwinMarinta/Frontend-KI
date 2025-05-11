import InputFile from "./field/InputFile";

interface FormReviewProps {
  draftPatent?: File | null;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  errorDraftPatent?: boolean;
}

const FormReview = ({ draftPatent, handleChange, errorDraftPatent }: FormReviewProps) => {
  return (
    <div>
      <InputFile label="Draft Review Pengajuan" value={draftPatent || null} name="draftPatentApplicationFile" required onChange={handleChange} error={errorDraftPatent} need />
      <span className="">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
    </div>
  );
};

export default FormReview;
