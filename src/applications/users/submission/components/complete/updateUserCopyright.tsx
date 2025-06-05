import { useEffect } from "react";
import ModalLoading from "../../../../../components/modal/modalLoading";
import Stepper from "../stepper";
import FormCopyright from "../formCopyright";
import Form_2 from "../form_2";
import SideSubmisson from "../../../../../components/adminNavigation/sideSubmisson";
import HeaderNavigation from "../../../../../components/adminNavigation/headerNavigation";
import { getDetailSubmission, updateSubmissionCopyright } from "../../../../../service/actions/submissionAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../service/store";
import useLoadingProses from "../../../../../hooks/useLoadingProses";
import useSubmissionType from "../../hooks/useSubmissionType";
import usePersonalData from "../../hooks/usePersonalData";
import useCopyright from "../../hooks/useCopyright";
import useComplate from "../../hooks/useComplate";
import { processFile } from "../../../../../utils/formatFile";
import { PersonalData } from "../../../../../types/submissionType";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../../components/breadcrumb.tsx/breadcrumb";
import { toSlug } from "../../../../../utils/toSlug";

const UpdateUserCopyright = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, setLoading } = useLoadingProses();
  const { detailSubmission } = useSelector((state: RootState) => state.submission);
  const { currentStep, setCurrentStep } = useSubmissionType();
  const { types, submissionId, actionTypes, submissionType } = useComplate();
  const navigate = useNavigate();
  const { personalData, handleChangePerson, addContributor, validatePersonalData, setPersonalDataError, personalDataError, removeContributor, setPersonalData } = usePersonalData();
  const { formCopyright, handleChangeCopyright, formCopyrightError, setFormCopyrightError, validateCopyrightData, setFormCopyright } = useCopyright();

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
      await dispatch(updateSubmissionCopyright(submissionId, personalData, formCopyright));
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

      navigate("/histori-pengajuan/hak-cipta");
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    const error = validateCopyrightData(formCopyright);
    const excludeFields = ["statementLetter", "letterTransferCopyright", "exampleCreation"];

    const hasError = Object.entries(error)
      .filter(([key]) => !excludeFields.includes(key))
      .some(([, value]) => value === true);

    if (hasError) {
      setFormCopyrightError(error);

      return;
    }
    if (currentStep < 3) {
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
      if (!detailSubmission?.submission?.copyright && types !== "Menunggu") return;

      if (detailSubmission?.submission?.copyright) {
        const statementLetter = await processFile(detailSubmission?.submission?.copyright.statementLetter);
        const letterTransferCopyright = await processFile(detailSubmission?.submission?.copyright.letterTransferCopyright);
        const exampleCreation = await processFile(detailSubmission?.submission?.copyright.exampleCreation);

        // Set Form Hak Cipta
        setFormCopyright({
          titleInvention: detailSubmission?.submission?.copyright.titleInvention || "",
          typeCreation: detailSubmission?.submission?.copyright.typeCreationId || null,
          subTypeCreation: detailSubmission?.submission?.copyright.subTypeCreationId || null,
          countryFirstAnnounced: detailSubmission?.submission?.copyright.countryFirstAnnounced || "",
          cityFirstAnnounced: detailSubmission?.submission?.copyright.cityFirstAnnounced || "",
          timeFirstAnnounced: detailSubmission?.submission?.copyright.timeFirstAnnounced || "",
          briefDescriptionCreation: detailSubmission?.submission?.copyright.briefDescriptionCreation || "",
          statementLetter,
          letterTransferCopyright,
          exampleCreation,
        });

        if (detailSubmission?.submission?.personalDatas && Array.isArray(detailSubmission.submission.personalDatas)) {
          // Set Personal Data jika tersedia
          const mappedContributors = await Promise.all(
            detailSubmission.submission.personalDatas.map(async (item: PersonalData) => ({
              id: item.id ?? null,
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
      }
    };

    initForm();
  }, [types, setFormCopyright, setPersonalData, detailSubmission, actionTypes]);

  return (
    <div className="flex flex-row w-full h-full bg-[#F6F9FF]">
      <div className="min-h-full lg:w-[16%] hidden lg:block bg-white ">
        <SideSubmisson />
      </div>
      <div className="lg:w-[84%] w-full">
        <HeaderNavigation />
        <div className="px-4 lg:px-12  py-8 ">
          <div className="mb-8">
            <Breadcrumb
              title="PROGRES PENGAJUAN"
              items={[
                { label: "Progres Pengajuan", url: `/histori-pengajuan/${toSlug(submissionType)}` },
                { label: submissionType, url: "" },
                { label: "Ubah Pengajuan", url: "" },
              ]}
            />
          </div>
          <div className="md:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50 ">
            <div className="flex justify-center mb-10">
              <h1 className="lg:text-[48px] font-bold lg:mb-20 mb-10 text-2xl text-center">Ubah Pengajuan Hak Cipta</h1>
            </div>
            <Stepper currentStep={currentStep} steps={[{ label: "Dokumen Pengajuan" }, { label: "Data Diri" }]} />

            {currentStep === 0 && <FormCopyright handleChange={handleChangeCopyright} formCopyright={formCopyright} formCopyrightError={formCopyrightError} handleNextStep={handleNextStep} />}
            {currentStep === 1 && (
              <Form_2 submissionType="Hak Cipta" error={personalDataError} personalData={personalData} handleChange={handleChangePerson} addContributor={addContributor} handleNextStep={handleNextStep2} currentStep={currentStep} setCurrentStep={setCurrentStep} removeContributor={removeContributor} />
            )}
          </div>
        </div>
      </div>
      <ModalLoading show={loading} />
    </div>
  );
};

export default UpdateUserCopyright;
