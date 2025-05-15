import NextButton from "./nextButton";
import FormReview from "./formReview";
import FormCopyright from "./formCopyright";
import { FormSubmissionCopyright, FormSubmissionCopyrightError } from "../../../../types/copyright";
import { FormAdditionalBrand, FormAdditionalBrandError, FormSubmissionBrand, FormSubmissionBrandError } from "../../../../types/brandType";
import FormBrand from "./formBrand";

export interface Form3Type {
  submissionType?: string;
  currentStep?: number;
  setCurrentStep: (step: number) => void;
  draftPatent?: File | null;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  errorDraftPatent?: boolean;
  handleNextStep3?: () => void;
  formCopyright?: FormSubmissionCopyright;
  formCopyrightError?: FormSubmissionCopyrightError;
  handleChangeAdditional?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  formBrand?: FormSubmissionBrand;
  formBrandError?: FormSubmissionBrandError;
  formAdditionalBrand?: FormAdditionalBrand[];
  tempAdditionalBrand?: FormAdditionalBrand;
  addAdditionalBrand?: () => void;
  tempAdditionalBrandError?: FormAdditionalBrandError;
  handleDeleteAttempBrand?: (index: number) => void;
}

const Form_3 = ({
  submissionType,

  draftPatent,
  handleChange,
  errorDraftPatent,
  handleNextStep3,
  formCopyright,
  formCopyrightError,
  handleChangeAdditional,
  formBrand,
  formBrandError,
  formAdditionalBrand,
  tempAdditionalBrand,
  addAdditionalBrand,
  tempAdditionalBrandError,
  handleDeleteAttempBrand,
}: Form3Type) => {
  return (
    <div className="flex flex-col">
      <div>
        {(submissionType === "Paten" || submissionType === "Desain Industri") && (
          <div className="flex flex-col items-center mt-20">
            <h2 className="text-[32px] font-semibold">Dokumen Pengajuan Review</h2>
            <p className="text-justify mt-3">Permohonan anda akan di review terlebih dahulu oleh pihak Sentra Kekayaan Intelektual ITK</p>
          </div>
        )}
        {(submissionType === "Hak Cipta" || submissionType === "Merek") && (
          <div className="flex flex-col items-center mt-20">
            <h2 className="text-[32px] font-semibold">Dokumen Pengajuan</h2>
            <p className="text-justify mt-3 flex flex-col w-full items-center">
              <span className="text-justify"> Lengkapi semua data pengajuan Anda agar dapat diproses dengan lancar.</span>
              <span> Pastikan semua dokumen yang diperlukan telah diisi dengan benar dan lengkap.</span>
            </p>
          </div>
        )}
      </div>
      <div className="mt-20">
        {(submissionType === "Paten" || submissionType === "Desain Industri") && <FormReview draftPatent={draftPatent} handleChange={handleChange} errorDraftPatent={errorDraftPatent} />}
        {submissionType === "Hak Cipta" && <FormCopyright formCopyright={formCopyright} formCopyrightError={formCopyrightError} handleChange={handleChange} />}
        {submissionType === "Merek" && (
          <FormBrand
            formBrand={formBrand}
            formBrandError={formBrandError}
            handleChange={handleChange}
            handleChangeAdditional={handleChangeAdditional}
            formAdditionalBrand={formAdditionalBrand}
            tempAdditionalBrand={tempAdditionalBrand}
            addAdditionalBrand={addAdditionalBrand}
            tempAdditionalBrandError={tempAdditionalBrandError}
            handleDeleteAttempBrand={handleDeleteAttempBrand}
          />
        )}
      </div>

      <div className="mt-20 w-full flex-row gap-6 flex justify-end">
        <NextButton onClick={handleNextStep3} />
      </div>
    </div>
  );
};

export default Form_3;
