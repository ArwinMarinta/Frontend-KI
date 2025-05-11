import Navbar from "../../../../components/navigations/navbar";
import Stepper from "../components/stepper";
import Form_1 from "../components/form_1";
import Form_2 from "../components/form_2";
import Form_3 from "../components/form_3";
import Form_4 from "../components/form_4";

import useSubmissionType from "../hooks/useSubmissionType";
import usePersonalData from "../hooks/usePersonalData";

import useDraftSubmission from "../hooks/useDraftSubmission";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../service/store";
import { createSubmissionCopyright, createSubmissionIndustrialDesign, createSubmissionPaten } from "../../../../service/actions/submissionAction";
import useCopyright from "../hooks/useCopyright";
import useBrand from "../hooks/useBrand";

const Submission = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const { currentStep, submissionType, setCurrentStep, setSubmissionType } = useSubmission();
  const { error, currentStep, submissionType, setCurrentStep, handleChange, setError } = useSubmissionType();
  const { personalData, handleChangePerson, addContributor, validatePersonalData, setPersonalDataError, personalDataError } = usePersonalData();
  const { draftPatent, handleDraftPatenChange, errorDraftPatent, setErrorDraftPatent } = useDraftSubmission();
  const { formCopyright, handleChangeCopyright, formCopyrightError, setFormCopyrightError, validateCopyrightData } = useCopyright();
  const { formBrand, formAdditionalBrand, handleChangeAdditionalBrand, handleChangeBrand } = useBrand();

  const handleNextStep1 = () => {
    if (submissionType.trim() === "") {
      setError(true);
      return;
    }

    if (currentStep < 3 && !error) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleNextStep2 = () => {
    const updatedErrors = personalData.map(validatePersonalData);

    const hasError = updatedErrors.some((err) => Object.values(err).some((v) => v === true));

    if (hasError) {
      const newErrors = updatedErrors.map((error) => ({
        name: error.name === true,
        email: error.email === true,
        faculty: error.faculty === true,
        studyProgram: error.studyProgram === true,
        institution: error.institution === true,
        work: error.work === true,
        nationalState: error.nationalState === true,
        countryResidence: error.countryResidence === true,
        province: error.province === true,
        city: error.city === true,
        subdistrict: error.subdistrict === true,
        ward: error.ward === true,
        postalCode: error.postalCode === true,
        phoneNumber: error.phoneNumber === true,
        ktp: error.ktp === true,
        facebook: error.facebook === true,
        whatsapp: error.whatsapp === true,
        instagram: error.instagram === true,
        twitter: error.twitter === true,
        address: error.address === true,
      }));

      setPersonalDataError(newErrors);

      return;
    }

    if (currentStep < 3 && !error) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleNextStep3 = () => {
    if (submissionType === "Paten" || submissionType === "Desain Industri") {
      if (draftPatent === null) {
        setErrorDraftPatent(true);
        return;
      }
      if (currentStep < 3 && !error) {
        setCurrentStep(currentStep + 1);
      }
    }

    if (submissionType === "Hak Cipta") {
      // Validasi formCopyright
      const error = validateCopyrightData(formCopyright);

      // Cek jika ada error
      const hasError = Object.values(error).includes(true);

      if (hasError) {
        setFormCopyrightError(error);

        return;
      }

      // Lanjutkan ke langkah berikutnya jika tidak ada error
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleSubmit = () => {
    if (submissionType === "Paten") {
      dispatch(createSubmissionPaten(2, personalData, draftPatent));
    }
    if (submissionType === "Hak Cipta") {
      dispatch(createSubmissionCopyright(1, personalData, formCopyright));
    }
    if (submissionType === "Desain Industri") {
      dispatch(createSubmissionIndustrialDesign(4, personalData, draftPatent));
    }
  };

  const handleChangeSubmission = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (submissionType === "Hak Cipta") {
      handleChangeCopyright(e);
    } else if (submissionType === "Merek") {
      handleChangeBrand(e);
    } else {
      handleDraftPatenChange(e);
    }
  };

  return (
    <>
      <Navbar />
      <main className="w-full flex justify-center">
        <section className="container w-full flex flex-col py-32 gap-10 ">
          <div className="flex justify-center">
            <h1 className="text-[48px] font-bold mb-20">Formulir Pengajuan</h1>
          </div>
          <Stepper currentStep={currentStep} />

          <div>
            {currentStep === 0 && <Form_1 error={error} handleChange={handleChange} submissionType={submissionType} handleNextStep={handleNextStep1} />}
            {currentStep === 1 && <Form_2 error={personalDataError} personalData={personalData} handleChange={handleChangePerson} addContributor={addContributor} handleNextStep={handleNextStep2} />}
            {currentStep === 2 && (
              <Form_3
                submissionType={submissionType}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                draftPatent={draftPatent}
                handleChange={handleChangeSubmission}
                errorDraftPatent={errorDraftPatent}
                handleNextStep={handleNextStep3}
                formCopyright={formCopyright}
                formCopyrightError={formCopyrightError}
                handleChangeAdditional={handleChangeAdditionalBrand}
                formBrand={formBrand}
                formAdditionalBrand={formAdditionalBrand}
              />
            )}
            {currentStep === 3 && <Form_4 currentStep={currentStep} setCurrentStep={setCurrentStep} submissionType={submissionType} personalData={personalData} draftPatent={draftPatent} handleSubmit={handleSubmit} formCopyright={formCopyright} />}
          </div>
        </section>
      </main>
    </>
  );
};

export default Submission;
