import { useDispatch, useSelector } from "react-redux";
import ModalLoading from "../../../../../components/modal/modalLoading";
import { AppDispatch, RootState } from "../../../../../service/store";
import useLoadingProses from "../../../../../hooks/useLoadingProses";
import useSubmissionType from "../../hooks/useSubmissionType";
import usePersonalData from "../../hooks/usePersonalData";
import useBrand from "../../hooks/useBrand";
import { useEffect } from "react";
import { getDetailSubmission, updateSubmissionBrand } from "../../../../../service/actions/submissionAction";
import { useNavigate } from "react-router-dom";
import useComplate from "../../hooks/useComplate";
import SideSubmisson from "../../../../../components/adminNavigation/sideSubmisson";
import HeaderNavigation from "../../../../../components/adminNavigation/headerNavigation";
import Stepper from "../stepper";
import FormBrand from "../formBrand";
import Form_2 from "../form_2";
import { FormAdditionalBrand } from "../../../../../types/brandType";
import { processFile } from "../../../../../utils/formatFile";
import Breadcrumb from "../../../../../components/breadcrumb.tsx/breadcrumb";
import { toSlug } from "../../../../../utils/toSlug";
import { PersonalData } from "../../../../../types/submissionType";

const UpdateUserBrand = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, setLoading } = useLoadingProses();
  const { types, submissionId, submissionType } = useComplate();
  const { currentStep, setCurrentStep } = useSubmissionType();
  const { setPersonalData, personalData, handleChangePerson, addContributor, validatePersonalData, setPersonalDataError, personalDataError, removeContributor } = usePersonalData();
  const { formBrand, formAdditionalBrand, handleChangeAdditionalBrand, handleChangeBrand, tempAdditionalBrandError, tempAdditionalBrand, addAdditionalBrand, handleDeleteAttempBrand, validateBrandData, setFormBrandError, formBrandError, setFormBrand, setFormAdditionalBrand, setTempAdditionalBrand } =
    useBrand();
  const navigate = useNavigate();
  const { detailSubmission } = useSelector((state: RootState) => state.submission);

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
      await dispatch(updateSubmissionBrand(submissionId, personalData, formBrand, formAdditionalBrand));
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
        labelBrand: null as File | null,
        fileUploade: null as File | null,
        signature: null as File | null,
        InformationLetter: null as File | null,
        letterStatment: null as File | null,
      });

      setFormAdditionalBrand([]);
      navigate("/histori-pengajuan/merek");
    } finally {
      setLoading(false);
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

  useEffect(() => {
    const initForm = async () => {
      if (!detailSubmission?.submission?.brand || types !== "Menunggu") return;

      const { applicationType, brandTypeId, referenceName, elementColor, translate, pronunciation, disclaimer, description, documentType, information, labelBrand, fileUploade, signature, InformationLetter, letterStatment } = detailSubmission.submission.brand;

      // Konversi file (jika ada)
      const convertedLabelBrand = labelBrand ? await processFile(labelBrand) : null;
      const convertedFileUploade = fileUploade ? await processFile(fileUploade) : null;
      const convertedSignature = signature ? await processFile(signature) : null;
      const convertedInformationLetter = InformationLetter ? await processFile(InformationLetter) : null;
      const convertedLetterStatment = letterStatment ? await processFile(letterStatment) : null;

      setFormBrand({
        applicationType: applicationType || "",
        brandType: brandTypeId || null,
        referenceName: referenceName || "",
        elementColor: elementColor || "",
        translate: translate || "",
        pronunciation: pronunciation || "",
        disclaimer: disclaimer || "",
        description: description || "",
        documentType: documentType || "",
        information: information || "",
        labelBrand: convertedLabelBrand,
        fileUploade: convertedFileUploade,
        signature: convertedSignature,
        InformationLetter: convertedInformationLetter,
        letterStatment: convertedLetterStatment,
      });

      if (detailSubmission.submission.brand.additionalDatas && Array.isArray(detailSubmission.submission.brand.additionalDatas)) {
        const mappedAdditionalBrands: FormAdditionalBrand[] = await Promise.all(
          detailSubmission.submission.brand.additionalDatas.map(async (item) => {
            const processedFile = await processFile(item.file);
            return {
              additionalDescriptions: item.description || "",
              additionalFiles: processedFile,
            };
          })
        );

        setFormAdditionalBrand(mappedAdditionalBrands);
      } else {
        setFormAdditionalBrand([]);
      }
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
    };

    initForm();
  }, [types, detailSubmission, setFormBrand, setFormAdditionalBrand, setTempAdditionalBrand, setPersonalData]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
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
          <div className=" lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
            <div className="flex justify-center mb-10">
              <h1 className="lg:text-[48px] font-bold lg:mb-20 mb-10 text-2xl text-center">Ubah Pengajuan Merek</h1>
            </div>
            <Stepper currentStep={currentStep} steps={[{ label: "Dokumen Pengajuan" }, { label: "Data Diri" }]} />

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
          </div>
        </div>
      </div>
      <ModalLoading show={loading} />
    </div>
  );
};

export default UpdateUserBrand;
