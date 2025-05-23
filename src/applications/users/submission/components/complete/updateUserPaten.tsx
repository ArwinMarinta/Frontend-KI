import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../service/store";
import useLoadingProses from "../../../../../hooks/useLoadingProses";
import useSubmissionType from "../../hooks/useSubmissionType";
import usePersonalData from "../../hooks/usePersonalData";
import useDraftSubmission from "../../hooks/useDraftSubmission";
import { getDetailSubmission, updateSubmissionPatenPending } from "../../../../../service/actions/submissionAction";
import { useEffect } from "react";
import SideSubmisson from "../../../../../components/adminNavigation/sideSubmisson";
import HeaderNavigation from "../../../../../components/adminNavigation/headerNavigation";
import Stepper from "../stepper";
import FormReview from "../formReview";
import Form_2 from "../form_2";

import ModalLoading from "../../../../../components/modal/modalLoading";
import { processFile } from "../../../../../utils/formatFile";
import useComplate from "../../hooks/useComplate";
import { PersonalData } from "../../../../../types/submissionType";
import { useNavigate } from "react-router-dom";

const UpdateUserPaten = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, setLoading } = useLoadingProses();
  const navigate = useNavigate();
  const { detailSubmission } = useSelector((state: RootState) => state.submission);
  const { error, currentStep, setCurrentStep } = useSubmissionType();
  const { personalData, handleChangePerson, addContributor, validatePersonalData, setPersonalDataError, personalDataError, removeContributor, setPersonalData } = usePersonalData();
  const { draftPatent, handleDraftPatenChange, errorDraftPatent, setErrorDraftPatent, setDraftPatent } = useDraftSubmission();
  const { types, submissionId } = useComplate();

  useEffect(() => {
    dispatch(getDetailSubmission(submissionId));
  }, [dispatch, submissionId]);

  const handleNextStep2 = async () => {
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

    setLoading(true);
    try {
      await dispatch(updateSubmissionPatenPending(submissionId, personalData, draftPatent));
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

      setDraftPatent(null);
      navigate("/histori-pengajuan/paten");
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep1 = () => {
    if (draftPatent === null) {
      setErrorDraftPatent(true);
      return;
    }
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

  useEffect(() => {
    const initForm = async () => {
      if (!detailSubmission?.submission?.patent || types !== "Menunggu") return;

      const draftPatentApplicationFile = await processFile(detailSubmission?.submission?.patent?.draftPatentApplicationFile !== undefined ? detailSubmission.submission.patent.draftPatentApplicationFile : null);

      // Set Form Hak Cipta
      setDraftPatent(draftPatentApplicationFile);

      console.log("ini kag");

      // Set Personal Data jika tersedia
      if (detailSubmission?.submission?.personalDatas && Array.isArray(detailSubmission.submission.personalDatas)) {
        const mappedContributors = await Promise.all(
          detailSubmission.submission.personalDatas.map(async (item: PersonalData) => ({
            id: item.id,
            isLeader: item.isLeader || false,
            name: item.name || "",
            email: item.email || "",
            faculty: item.faculty || "",
            studyProgram: item.studyProgram || "",
            institution: item.institution || "",
            work: item.work || "",
            nationalState: item.nationalState || "",
            countryResidence: item.countryResidence || "",
            province: item.province || "",
            city: item.city || "",
            subdistrict: item.subdistrict || "",
            ward: item.ward || "",
            postalCode: item.postalCode || "",
            phoneNumber: item.phoneNumber || "",
            address: item.address || "",
            ktp: item.ktp ? await processFile(item.ktp) : null,
            facebook: item.facebook || "",
            whatsapp: item.whatsapp || "",
            instagram: item.instagram || "",
            twitter: item.twitter || "",
          }))
        );

        setPersonalData(mappedContributors);
      }
    };

    initForm();
  }, [detailSubmission?.submission?.patent, types, setPersonalData, detailSubmission, setDraftPatent]);

  return (
    <div className="flex flex-row w-full h-full bg-[#F6F9FF]">
      <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
        <SideSubmisson />
      </div>
      <div className="lg:w-[84%] w-full  border ">
        <HeaderNavigation />
        <div className=" px-4 lg:px-12  py-8 ">
          <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50 ">
            <div className="flex justify-center mb-10">
              <h1 className="lg:text-[48px] font-bold lg:mb-20 mb-10 text-2xl text-center">Formulir Pengajuan Paten</h1>
            </div>
            <Stepper currentStep={currentStep} steps={[{ label: "Dokumen Pengajuan" }, { label: "Data Diri" }]} />
            {currentStep === 0 && <FormReview draftPatent={draftPatent} handleChange={handleDraftPatenChange} errorDraftPatent={errorDraftPatent} handleNextStep1={handleNextStep1} />}
            {currentStep === 1 && (
              <Form_2 submissionType="Paten" error={personalDataError} personalData={personalData} handleChange={handleChangePerson} addContributor={addContributor} handleNextStep={handleNextStep2} currentStep={currentStep} setCurrentStep={setCurrentStep} removeContributor={removeContributor} />
            )}
          </div>
        </div>
      </div>
      <ModalLoading show={loading} />
    </div>
  );
};

export default UpdateUserPaten;
