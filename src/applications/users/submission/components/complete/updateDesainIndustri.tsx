import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../service/store";
import useLoadingProses from "../../../../../hooks/useLoadingProses";
import { useNavigate } from "react-router-dom";
import useSubmissionType from "../../hooks/useSubmissionType";
import usePersonalData from "../../hooks/usePersonalData";
import useDraftSubmission from "../../hooks/useDraftSubmission";
import useComplate from "../../hooks/useComplate";
import { useEffect } from "react";
import { getDetailSubmission, updateSubmissionIndustrialDesign } from "../../../../../service/actions/submissionAction";
import { FormPersonalData } from "../../../../../types/submissionType";
import SideSubmisson from "../../../../../components/adminNavigation/sideSubmisson";
import HeaderNavigation from "../../../../../components/adminNavigation/headerNavigation";
import Stepper from "../stepper";
import FormReview from "../formReview";
import Form_2 from "../form_2";
import ModalLoading from "../../../../../components/modal/modalLoading";
import { toSlug } from "../../../../../utils/toSlug";
import Breadcrumb from "../../../../../components/breadcrumb.tsx/breadcrumb";

const UpdateDesainIndustri = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, setLoading } = useLoadingProses();
  const navigate = useNavigate();
  const { detailSubmission } = useSelector((state: RootState) => state.submission);
  const { currentStep, setCurrentStep } = useSubmissionType();
  const { personalData, handleChangePerson, addContributor, setPersonalDataError, personalDataError, removeContributor, setPersonalData } = usePersonalData();
  const { draftPatent, handleDraftPatenChange, errorDraftPatent, setDraftPatent } = useDraftSubmission();
  const { types, submissionId, submissionType } = useComplate();

  useEffect(() => {
    dispatch(getDetailSubmission(submissionId));
  }, [dispatch, submissionId]);

  function validateKtp(ktp: string | File | null | undefined, ktpName: string | null | undefined) {
    if (typeof ktp === "string" && ktp.trim() !== "") return null;
    if (ktp instanceof File && ktp.size > 0) return null;
    if (typeof ktpName === "string" && ktpName.trim() !== "") return null;
    return "KTP wajib diisi";
  }

  const handleNextStep2 = async () => {
    const updatedErrors = personalData.map((data) => ({
      name: data.name.trim() === "" ? "Nama wajib diisi" : null,
      email: !/\S+@\S+\.\S+/.test(data.email) ? "Format email tidak valid" : null,
      faculty: data.faculty === null ? "Fakultas wajib dipilih" : null,
      studyProgram: data.studyProgram === null ? "Program studi wajib dipilih" : null,
      institution: data.institution.trim() === "" ? "Institusi wajib diisi" : null,
      work: data.work.trim() === "" ? "Pekerjaan wajib diisi" : null,
      nationalState: data.nationalState.trim() === "" ? "Kewarganegaraan wajib diisi" : null,
      countryResidence: data.countryResidence.trim() === "" ? "Negara tempat tinggal wajib diisi" : null,
      province: data.province.trim() === "" ? "Provinsi wajib diisi" : null,
      city: data.city.trim() === "" ? "Kota wajib diisi" : null,
      subdistrict: data.subdistrict.trim() === "" ? "Kecamatan wajib diisi" : null,
      ward: data.ward.trim() === "" ? "Kelurahan wajib diisi" : null,
      postalCode: data.postalCode.trim() === "" ? "Kode pos wajib diisi" : null,
      phoneNumber: data.phoneNumber.trim() === "" ? "Nomor telepon wajib diisi" : null,
      address: data.address?.trim() === "" ? "Alamat wajib diisi" : null,
      ktp: validateKtp(data.ktp, data.ktpName),
    }));

    const excludeFields = ["id", "isLeader", "facebook", "whatsapp", "instagram", "twitter"];

    const hasError = updatedErrors.some((errorObj) =>
      Object.entries(errorObj)
        .filter(([key]) => !excludeFields.includes(key))
        .some(([, value]) => value !== null)
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
        address: error.address || null,
        ktp: error.ktp || null,
      }));

      setPersonalDataError(newErrors);

      return;
    }

    setLoading(true);
    try {
      await dispatch(updateSubmissionIndustrialDesign(submissionId, personalData, draftPatent));
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
      navigate("/histori-pengajuan/desain-industri");
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep1 = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [currentStep]);

  useEffect(() => {
    const initForm = async () => {
      if (!detailSubmission?.submission?.industrialDesign && types !== "Menunggu") return;

      // const draftDesainIndustriApplicationFile = await processFile(detailSubmission?.submission?.industrialDesign?.draftDesainIndustriApplicationFile !== undefined ? detailSubmission.submission.industrialDesign.draftDesainIndustriApplicationFile : null);

      // Set Form Hak Cipta
      // setDraftPatent(draftDesainIndustriApplicationFile);

      // Set Personal Data jika tersedia
      if (detailSubmission?.submission?.personalDatas && Array.isArray(detailSubmission.submission.personalDatas)) {
        const mappedContributors = await Promise.all(
          detailSubmission.submission.personalDatas.map(async (item: FormPersonalData) => ({
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
            facebook: item.facebook || "",
            whatsapp: item.whatsapp || "",
            instagram: item.instagram || "",
            twitter: item.twitter || "",
            ktp: null,
            ktpName: typeof item.ktp === "string" ? item.ktp : item.ktp instanceof File ? item.ktp.name : "",
          }))
        );

        setPersonalData(mappedContributors);
      }
    };

    initForm();
  }, [types, setPersonalData, detailSubmission, setDraftPatent]);

  return (
    <div className="flex flex-row w-full h-full bg-[#F6F9FF]">
      <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
        <SideSubmisson />
      </div>
      <div className="lg:w-[84%] w-full  border ">
        <HeaderNavigation />
        <div className=" px-4 lg:px-12  py-8 ">
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
          <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50 ">
            <div className="flex justify-center mb-10">
              <h1 className="lg:text-[48px] font-bold lg:mb-20 mb-10 text-2xl text-center">Formulir Pengajuan Paten</h1>
            </div>
            <Stepper currentStep={currentStep} steps={[{ label: "Dokumen Pengajuan" }, { label: "Data Diri" }]} />
            {currentStep === 0 && <FormReview draftPatent={draftPatent} handleChange={handleDraftPatenChange} errorDraftPatent={errorDraftPatent} handleNextStep1={handleNextStep1} types={types} url={detailSubmission?.submission?.industrialDesign?.draftDesainIndustriApplicationFile} />}
            {currentStep === 1 && (
              <Form_2
                submissionType="Paten"
                error={personalDataError}
                personalData={personalData}
                handleChange={handleChangePerson}
                addContributor={addContributor}
                handleNextStep={handleNextStep2}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                removeContributor={removeContributor}
                types={types}
              />
            )}
          </div>
        </div>
      </div>
      <ModalLoading show={loading} />
    </div>
  );
};

export default UpdateDesainIndustri;
