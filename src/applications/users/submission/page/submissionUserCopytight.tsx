import SideSubmisson from "../../../../components/adminNavigation/sideSubmisson";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import useSubmissionType from "../hooks/useSubmissionType";
import usePersonalData from "../hooks/usePersonalData";
import Stepper from "../components/stepper";
import Form_2 from "../components/form_2";
import useCopyright from "../hooks/useCopyright";
import Form_4 from "../components/form_4";
import { createSubmissionCopyright } from "../../../../service/actions/submissionAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../service/store";
import FormCopyright from "../components/formCopyright";

const SubmissionUserCopytight = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, currentStep, setCurrentStep } = useSubmissionType();
  const { personalData, handleChangePerson, addContributor, validatePersonalData, setPersonalDataError, personalDataError, removeContributor } = usePersonalData();
  const { formCopyright, handleChangeCopyright, formCopyrightError, setFormCopyrightError, validateCopyrightData } = useCopyright();

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

  const handleNextStep = () => {
    const error = validateCopyrightData(formCopyright);
    const hasError = Object.values(error).includes(true);

    if (hasError) {
      setFormCopyrightError(error);

      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    dispatch(createSubmissionCopyright(1, personalData, formCopyright));
  };

  return (
    <div className="flex flex-row w-full h-full bg-gray-100">
      <div className="min-h-full w-[16%] bg-white">
        <SideSubmisson />
      </div>
      <div className="w-[84%]  border ">
        <HeaderNavigation />
        <div className="container  mt-16 ">
          <div className=" p-16 rounded-md bg-white">
            <div className="flex justify-center mb-10">
              <h1 className="text-[48px] font-bold mb-20">Formulir Pengajuan Hak Cipta</h1>
            </div>
            <Stepper currentStep={currentStep} steps={[{ label: "Dokumen Pengajuan" }, { label: "Data Diri" }, { label: "Review" }]} />

            {currentStep === 0 && <FormCopyright handleChange={handleChangeCopyright} formCopyright={formCopyright} formCopyrightError={formCopyrightError} handleNextStep={handleNextStep} />}
            {currentStep === 1 && (
              <Form_2 submissionType="Hak Cipta" error={personalDataError} personalData={personalData} handleChange={handleChangePerson} addContributor={addContributor} handleNextStep={handleNextStep2} currentStep={currentStep} setCurrentStep={setCurrentStep} removeContributor={removeContributor} />
            )}
            {currentStep === 2 && <Form_4 currentStep={currentStep} setCurrentStep={setCurrentStep} submissionType="Hak Cipta" personalData={personalData} handleSubmit={handleSubmit} formCopyright={formCopyright} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionUserCopytight;
