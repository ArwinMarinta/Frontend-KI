import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../service/store";
import useSubmissionType from "../hooks/useSubmissionType";
import usePersonalData from "../hooks/usePersonalData";
import { createSubmissionBrand } from "../../../../service/actions/submissionAction";
import SideSubmisson from "../../../../components/adminNavigation/sideSubmisson";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import Stepper from "../components/stepper";
import Form_2 from "../components/form_2";
import Form_4 from "../components/form_4";
import FormBrand from "../components/formBrand";
import useBrand from "../hooks/useBrand";
import useLoadingProses from "../../../../hooks/useLoadingProses";
import ModalLoading from "../../../../components/modal/modalLoading";
import { useModal } from "../../../../hooks/useModal";
import ModalWarningContributor from "../../../../components/modal/modalWarningContributor";
import { useEffect } from "react";

const SubmissionUserBrand = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, setLoading } = useLoadingProses();
  const { error, currentStep, setCurrentStep } = useSubmissionType();
  const { setPersonalData, personalData, handleChangePerson, addContributor, validatePersonalData, setPersonalDataError, personalDataError, removeContributor } = usePersonalData();
  const { formBrand, formAdditionalBrand, handleChangeAdditionalBrand, handleChangeBrand, tempAdditionalBrandError, tempAdditionalBrand, addAdditionalBrand, handleDeleteAttempBrand, validateBrandData, setFormBrandError, formBrandError, setFormBrand, setFormAdditionalBrand } = useBrand();
  const { activeModal, handleOpenModal, handleCloseModal, setMessage, message } = useModal();
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

    if (personalData.length === 1) {
      handleOpenModal(null, "warningContributorBrand");
      setMessage("Apakah Anda yakin ingin melanjutkan tanpa menambah kontributor lainnya?");
    }

    if (personalData.length > 1) {
      if (currentStep < 3 && !error) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleNextStep = () => {
    const error = validateBrandData(formBrand);
    const hasError = Object.values(error).includes(true);

    if (hasError) {
      setFormBrandError(error);
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await dispatch(createSubmissionBrand(3, personalData, formBrand, formAdditionalBrand));
      setCurrentStep(0);
      setPersonalData([
        {
          id: 1,
          isLeader: true,
          name: "",
          email: "",
          faculty: "",
          studyProgram: "",
          institution: "",
          work: "",
          nationalState: "",
          countryResidence: "",
          province: "",
          city: "",
          subdistrict: "",
          ward: "",
          postalCode: "",
          phoneNumber: "",
          address: "",
          ktp: null,
          facebook: "",
          whatsapp: "",
          instagram: "",
          twitter: "",
        },
      ]);

      setFormBrand({
        applicationType: "",
        brandType: null,
        referenceName: "",
        elementColor: "",
        translate: "",
        pronunciation: "",
        disclaimer: "",
        description: "",
        documentType: "",
        information: "",
        labelBrand: null,
        fileUploade: null,
        signature: null,
        InformationLetter: null,
        letterStatment: null,
      });

      setFormAdditionalBrand([]);
    } finally {
      setLoading(false);
    }
  };

  const goToNextStep = () => {
    if (currentStep < 3 && !error) {
      setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentStep]);

  return (
    <div className="flex flex-row w-full h-full bg-[#F6F9FF]">
      <div className="min-h-full lg:w-[16%] hidden lg:block bg-white ">
        <SideSubmisson />
      </div>
      <div className="lg:w-[84%] w-full border ">
        <HeaderNavigation />
        <div className="px-4 lg:px-12  py-8">
          <div className=" lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
            <div className="flex justify-center mb-10">
              <h1 className="lg:text-[48px] font-bold lg:mb-20 mb-10 text-2xl text-center">Formulir Pengajuan Merek</h1>
            </div>
            <Stepper currentStep={currentStep} steps={[{ label: "Dokumen Pengajuan" }, { label: "Data Diri" }, { label: "Review" }]} />

            {currentStep === 0 && (
              <FormBrand
                formBrand={formBrand}
                handleChange={handleChangeBrand}
                formBrandError={formBrandError}
                handleChangeAdditional={handleChangeAdditionalBrand}
                formAdditionalBrand={formAdditionalBrand}
                tempAdditionalBrand={tempAdditionalBrand}
                addAdditionalBrand={addAdditionalBrand}
                tempAdditionalBrandError={tempAdditionalBrandError}
                handleDeleteAttempBrand={handleDeleteAttempBrand}
                handleNextStep={handleNextStep}
              />
            )}
            {currentStep === 1 && (
              <Form_2 submissionType="Merek" error={personalDataError} personalData={personalData} handleChange={handleChangePerson} addContributor={addContributor} handleNextStep={handleNextStep2} currentStep={currentStep} setCurrentStep={setCurrentStep} removeContributor={removeContributor} />
            )}
            {currentStep === 2 && <Form_4 currentStep={currentStep} setCurrentStep={setCurrentStep} submissionType="Merek" personalData={personalData} handleSubmit={handleSubmit} formBrand={formBrand} formAdditionalBrand={formAdditionalBrand} />}
          </div>
        </div>
      </div>
      <ModalLoading show={loading} />
      <ModalWarningContributor modal={activeModal === "warningContributorBrand" || activeModal === "warningContributorBrand"} setModal={handleCloseModal} message={message} handleAddContributor={addContributor} handleNext={goToNextStep} />
    </div>
  );
};

export default SubmissionUserBrand;
