import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../service/store";
import useLoadingProses from "../../../../hooks/useLoadingProses";
import useSubmissionType from "../../../users/submission/hooks/useSubmissionType";
import { useModal } from "../../../../hooks/useModal";
import usePersonalData from "../../../users/submission/hooks/usePersonalData";
import { createSubmissionCopyright } from "../../../../service/actions/submissionAction";
import { useEffect } from "react";
import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import Stepper from "../../../users/submission/components/stepper";
import Form_2 from "../../../users/submission/components/form_2";
import FormCopyright from "../../../users/submission/components/formCopyright";
import ModalLoading from "../../../../components/modal/modalLoading";
import ModalWarningContributor from "../../../../components/modal/modalWarningContributor";
import Form_4 from "../../../users/submission/components/form_4";
import useCopyright from "../../../users/submission/hooks/useCopyright";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";

const CreateSubmissionCopyrightAdmin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoadingProses();
  const { error, currentStep, setCurrentStep } = useSubmissionType();
  const { personalData, handleChangePerson, addContributor, validatePersonalData, setPersonalDataError, personalDataError, removeContributor, setPersonalData } = usePersonalData();
  const { formCopyright, handleChangeCopyright, formCopyrightError, setFormCopyrightError, validateCopyrightData, setFormCopyright } = useCopyright();
  const { activeModal, handleOpenModal, handleCloseModal, setMessage, message } = useModal();

  const handleNextStep2 = () => {
    const updatedErrors = personalData.map(validatePersonalData);

    const hasError = updatedErrors.some((err) =>
      Object.entries(err).some(([key, value]) => {
        if (key === "id") return false; // abaikan id
        return value !== null && value !== undefined && value !== "";
      })
    );

    if (hasError) {
      const newErrors = updatedErrors.map((error) => ({
        name: error.name || null,
        email: error.email || null,
        faculty: error.faculty || null,
        studyProgram: error.studyProgram || null,
        institution: error.institution || null,
        work: error.work || null,
        nationalState: error.nationalState || null,
        countryResidence: error.countryResidence || null,
        province: error.province || null,
        city: error.city || null,
        subdistrict: error.subdistrict || null,
        ward: error.ward || null,
        postalCode: error.postalCode || null,
        phoneNumber: error.phoneNumber || null,
        ktp: error.ktp || null,
        facebook: error.facebook || null,
        whatsapp: error.whatsapp || null,
        instagram: error.instagram || null,
        twitter: error.twitter || null,
        address: error.address || null,
      }));

      setPersonalDataError(newErrors);

      return;
    }
    if (personalData.length === 1) {
      handleOpenModal(null, "warningContributorCopyright");
      setMessage("Apakah Anda yakin ingin melanjutkan tanpa menambah kontributor lainnya?");
    }

    if (personalData.length > 1) {
      if (currentStep < 3 && !error) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleNextStep = () => {
    const error = validateCopyrightData(formCopyright);

    const excludeFields = ["statementLetter", "letterTransferCopyright", "exampleCreation"];

    const hasError = Object.entries(error)
      .filter(([key]) => !excludeFields.includes(key))
      .some(([, value]) => value !== null);

    if (hasError) {
      setFormCopyrightError(error);

      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await dispatch(createSubmissionCopyright(1, personalData, formCopyright));
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

      setFormCopyright({
        titleInvention: "",
        typeCreation: null,
        subTypeCreation: null,
        countryFirstAnnounced: "",
        cityFirstAnnounced: "",
        timeFirstAnnounced: "",
        briefDescriptionCreation: "",
        statementLetter: null,
        letterTransferCopyright: null,
        exampleCreation: null,
      });
      navigate("/permohonan/hak-cipta");
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

  console.log(formCopyright);
  return (
    <div className="flex flex-row w-full h-full bg-[#F6F9FF]">
      <div className="min-h-full lg:w-[16%] hidden lg:block bg-white ">
        <SideNavigation />
      </div>
      <div className="lg:w-[84%] w-full">
        <HeaderNavigation />
        <div className="px-4 lg:px-12  py-8 ">
          <div className="mb-8">
            <Breadcrumb
              title="PERMOHONAN HAK CIPTA"
              items={[
                { label: "Hak Cipta", url: "/permohonan/hak-cipta" },
                { label: "Tambah", url: "" },
              ]}
            />
          </div>
          <div className="md:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50 ">
            <div className="flex justify-center mb-10">
              <h1 className="lg:text-[48px] font-bold lg:mb-20 mb-10 text-2xl text-center">Formulir Pengajuan Hak Cipta</h1>
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
      <ModalLoading show={loading} />
      <ModalWarningContributor modal={activeModal === "warningContributorCopyright" || activeModal === "warningContributorCopyright"} setModal={handleCloseModal} message={message} handleAddContributor={addContributor} handleNext={goToNextStep} />
    </div>
  );
};

export default CreateSubmissionCopyrightAdmin;
