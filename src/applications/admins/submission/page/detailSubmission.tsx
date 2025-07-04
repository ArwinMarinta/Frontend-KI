import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import useDetailSubmussion from "../../../../hooks/useDetailSubmussion";
import Button from "../../../users/submissionHistory/components/button";
import GeneralInformation from "../components/generalInformation";
import PersonalDataSubmission from "../components/personalDataSubmission";
import DocumentSubmissionPatent from "../components/documentSubmissionPatent";
import DocumentSubmissionCopyright from "../components/documentSubmissionCopyright";
import DocumentSubmissionIndutrialDesign from "../components/documentSubmissionIndutrialDesign";
import DocumentSubmissionBrand from "../components/documentSubmissionBrand";
import FieldTextarea from "../../../../components/input/fieldTextArea";
import InputFile from "../../../users/submission/components/field/InputFile";
import Field from "../../../../components/input/fieldInput";
import FieldDropdown from "../../../../components/input/FieldDropDown";
import { getQuotaLanding, getSubTypeCopyright, getSubTypeIndusDesign, getTypeBrand, getTypeCopyright, getTypeIndusDesign, getTypePaten } from "../../../../service/actions/landingAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import useCopyright from "../../../users/submission/hooks/useCopyright";
import { processFile } from "../../../../utils/formatFile";
import useLoadingProses from "../../../../hooks/useLoadingProses";
import { deletePersonalData, getDetailSubmission, revisionSubmissionIndustrialDesign, revisionSubmissionPaten, revisonSubmissionBrand, revisonSubmissionCopyright, updatePersonalData, updateSubmissionSchema } from "../../../../service/actions/submissionAction";
import ModalLoading from "../../../../components/modal/modalLoading";
import useComplatePaten from "../../../users/submission/hooks/useComplatePaten";
import useComplateIndustrialDesain from "../../../users/submission/hooks/useComplateIndustrialDesain";
import { claimOptions, designTypes } from "../../../../data/indusDesign";
import useBrand from "../../../users/submission/hooks/useBrand";
import { brandClassOptions, brandTypeOptions } from "../../../../data/brand";
import { FormAdditionalBrand } from "../../../../types/brandType";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";
import { formatLabel } from "../../../../utils/toSlug";
import usePersonalData from "../../../users/submission/hooks/usePersonalData";
import { IoAddCircleSharp } from "react-icons/io5";
import { FormPersonalData } from "../../../../types/submissionType";
import useSchemaPayment from "../../../users/submission/hooks/useSchemaPayment";
import { formatIndonesianDate } from "../../../../utils/formatDate";
import { SchemaPayment } from "../../../../data/funding";

const DetailSubmission = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { typePaten } = useSelector((state: RootState) => state.landing.submissionType.paten);
  const { typeDesign, subtypeDesain } = useSelector((state: RootState) => state.landing.submissionType.indusDesign);
  const { setLoading, loading } = useLoadingProses();
  const { typeBrand } = useSelector((state: RootState) => state.landing.submissionType.brand);
  const { token } = useSelector((state: RootState) => state.auth);
  const { qouta } = useSelector((state: RootState) => state.landing);
  const { detailSubmission, current, handleChange, terms, statusDetail, name, types, submissionId } = useDetailSubmussion();
  const { formCopyright, handleChangeCopyright, formCopyrightError, setFormCopyright } = useCopyright();
  const { typeCopy, subTypeCopy } = useSelector((state: RootState) => state.landing.submissionType.copyright);
  const { formComplatePaten, formComplatePatenError, handleChangeComplatePaten, setFormComplatePaten } = useComplatePaten();
  const { formIndustDesign, formIndustDesignError, handleChangeComplateIndusDesign, handleClaimCheckboxChange, setFormIndustDesign } = useComplateIndustrialDesain();
  const { formBrand, formAdditionalBrand, handleChangeAdditionalBrand, handleChangeBrand, tempAdditionalBrandError, tempAdditionalBrand, formBrandError, setFormAdditionalBrand, setFormBrand, deletePermanentAdditiona, createAdditionalBrand } = useBrand();
  const { formSchemaPayment, formSchemaPaymentErrors, handleChangeSchema, handleCheckboxChange, validate, setFormSchemaPayment, setFormSchemaPaymentErrors } = useSchemaPayment();
  const { setPersonalData, personalData, handleChangePerson, addContributor, setPersonalDataError, personalDataError, removeContributor, updateKtp } = usePersonalData();

  useEffect(() => {
    dispatch(getQuotaLanding());
  }, [dispatch]);

  useEffect(() => {
    if (name === "paten") {
      dispatch(getTypePaten());
    }
    if (name === "desain-industri") {
      dispatch(getTypeIndusDesign());
      if (formIndustDesign?.typeDesignId) {
        dispatch(getSubTypeIndusDesign(formIndustDesign.typeDesignId));
      }
    }
    if (name === "hak-cipta") {
      dispatch(getTypeCopyright());
      if (formCopyright?.typeCreation) {
        dispatch(getSubTypeCopyright(formCopyright.typeCreation));
      }
    }

    if (name === "merek") {
      dispatch(getTypeBrand());
    }
  }, [dispatch, name, formCopyright.typeCreation, formIndustDesign.typeDesignId]);
  function validateKtp(ktp: string | File | null | undefined, ktpName: string | null | undefined) {
    if (typeof ktp === "string" && ktp.trim() !== "") return null;
    if (ktp instanceof File && ktp.size > 0) return null;
    if (typeof ktpName === "string" && ktpName.trim() !== "") return null;
    return "KTP wajib diisi";
  }

  const handleSubmitSchema = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormSchemaPaymentErrors(errors);
      return;
    }
    setLoading(true);
    try {
      await dispatch(updateSubmissionSchema(submissionId, formSchemaPayment, detailSubmission?.id));
      setFormSchemaPayment({
        periodId: null,
        groupId: null,
        submissionScheme: "",
        termsConditionId: [],
      });
      // navigate(`/permohonan/${name}/detail`);
      handleChange("Informasi Umum", "Detail");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getDetailSubmission(submissionId));
  }, [dispatch, submissionId]);

  const handleUpdateCopyright = async () => {
    if (types === "Ubah Hak Cipta") {
      setLoading(true);
      try {
        await dispatch(revisonSubmissionCopyright(detailSubmission?.submission?.copyright?.id, formCopyright));
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
          statementName: "",
          letterName: "",
          exampleName: "",
        });

        handleChange("Dokumen Pengajuan", "Detail");
        dispatch(getDetailSubmission(submissionId));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdatePaten = async () => {
    if (types === "Ubah Paten") {
      setLoading(true);
      try {
        await dispatch(revisionSubmissionPaten(detailSubmission?.submission?.patent?.id, formComplatePaten));
        setFormComplatePaten({
          inventionTitle: "",
          patentTypeId: "",
          numberClaims: "",
          description: null,
          abstract: null,
          claim: null,
          inventionImage: null,
          statementInventionOwnership: null,
          letterTransferRightsInvention: null,
          draftPatentApplicationFile: null,
        });
        handleChange("Dokumen Pengajuan", "Detail");
        dispatch(getDetailSubmission(submissionId));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateDesignIndus = async () => {
    if (types === "Ubah Desain Industri") {
      setLoading(true);
      try {
        await dispatch(revisionSubmissionIndustrialDesign(detailSubmission?.submission?.industrialDesign?.id, formIndustDesign));
        setFormIndustDesign({
          titleDesign: "",
          type: "",
          typeDesignId: 0,
          subtypeDesignId: 0,
          claim: [] as string[],
          looksPerspective: null as File | null,
          frontView: null as File | null,
          backView: null as File | null,
          rightSideView: null as File | null,
          lefttSideView: null as File | null,
          topView: null as File | null,
          downView: null as File | null,
          moreImages: null as File | null,
          letterTransferDesignRights: null as File | null,
          designOwnershipLetter: null as File | null,
          draftDesainIndustriApplicationFile: null as File | null,
        });
        handleChange("Dokumen Pengajuan", "Detail");
        dispatch(getDetailSubmission(submissionId));
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const initForm = async () => {
      if (!detailSubmission?.submission?.copyright || types !== "Ubah Hak Cipta") return;

      // const statementLetter = await processFile(detailSubmission?.submission?.copyright.statementLetter);
      // const letterTransferCopyright = await processFile(detailSubmission?.submission?.copyright.letterTransferCopyright);
      // const exampleCreation = await processFile(detailSubmission?.submission?.copyright.exampleCreation);

      setFormCopyright({
        titleInvention: detailSubmission?.submission?.copyright?.titleInvention || "",
        typeCreation: detailSubmission?.submission?.copyright?.typeCreationId || null,
        subTypeCreation: detailSubmission?.submission?.copyright?.subTypeCreationId || null,
        countryFirstAnnounced: detailSubmission?.submission?.copyright?.countryFirstAnnounced || "",
        cityFirstAnnounced: detailSubmission?.submission?.copyright?.cityFirstAnnounced || "",
        timeFirstAnnounced: detailSubmission?.submission?.copyright?.timeFirstAnnounced || "",
        briefDescriptionCreation: detailSubmission?.submission?.copyright?.briefDescriptionCreation || "",
        statementLetter: null,
        letterTransferCopyright: null,
        exampleCreation: null,
        statementName: detailSubmission?.submission?.copyright?.statementLetter || "",
        letterName: detailSubmission?.submission?.copyright?.letterTransferCopyright || "",
        exampleName: detailSubmission?.submission?.copyright?.exampleCreation || "",
      });
    };

    initForm();
  }, [detailSubmission?.submission?.copyright, setFormCopyright, statusDetail, types]);

  useEffect(() => {
    const initForm = async () => {
      if (!detailSubmission?.submission?.patent || types !== "Ubah Paten") return;

      // const description = await processFile(detailSubmission?.submission?.patent.description);
      // const abstract = await processFile(detailSubmission?.submission?.patent.abstract);
      // const claim = await processFile(detailSubmission?.submission?.patent.claim);
      // const inventionImage = await processFile(detailSubmission?.submission?.patent.inventionImage);
      // const statement = await processFile(detailSubmission?.submission?.patent.statementInventionOwnership);
      // const letter = await processFile(detailSubmission?.submission?.patent.letterTransferRightsInvention);

      setFormComplatePaten({
        inventionTitle: detailSubmission?.submission?.patent.inventionTitle || "",
        patentTypeId: detailSubmission?.submission?.patent.patentTypeId || "",
        numberClaims: detailSubmission?.submission?.patent.numberClaims || "",
        description: null,
        abstract: null,
        claim: null,
        inventionImage: null,
        statementInventionOwnership: null,
        letterTransferRightsInvention: null,
        draftPatentApplicationFile: null,
      });
    };

    initForm();
  }, [detailSubmission?.submission?.patent, types, setFormComplatePaten]);

  useEffect(() => {
    const initForm = async () => {
      if (!detailSubmission?.submission?.industrialDesign || types !== "Ubah Desain Industri") return;

      // const looksPerspective = await processFile(detailSubmission?.submission?.industrialDesign.looksPerspective);
      // const frontView = await processFile(detailSubmission?.submission?.industrialDesign.frontView);
      // const backView = await processFile(detailSubmission?.submission?.industrialDesign.backView);
      // const rightSideView = await processFile(detailSubmission?.submission?.industrialDesign.rightSideView);
      // const lefttSideView = await processFile(detailSubmission?.submission?.industrialDesign.lefttSideView);
      // const topView = await processFile(detailSubmission?.submission?.industrialDesign.topView);
      // const downView = await processFile(detailSubmission?.submission?.industrialDesign.downView);
      // const moreImages = await processFile(detailSubmission?.submission?.industrialDesign.moreImages);
      // const letterTransferDesignRights = await processFile(detailSubmission?.submission?.industrialDesign.letterTransferDesignRights);
      // const designOwnershipLetter = await processFile(detailSubmission?.submission?.industrialDesign.designOwnershipLetter);

      setFormIndustDesign({
        titleDesign: detailSubmission?.submission?.industrialDesign.titleDesign || "",
        type: detailSubmission?.submission?.industrialDesign.type || "",
        typeDesignId: detailSubmission?.submission?.industrialDesign.typeDesignId || 0,
        subtypeDesignId: detailSubmission?.submission?.industrialDesign.subtypeDesignId || 0,
        claim: typeof detailSubmission?.submission?.industrialDesign.claim === "string" ? [detailSubmission?.submission?.industrialDesign.claim] : Array.isArray(detailSubmission?.submission?.industrialDesign.claim) ? detailSubmission?.submission?.industrialDesign.claim : [],
        looksPerspective: null,
        frontView: null,
        backView: null,
        rightSideView: null,
        lefttSideView: null,
        topView: null,
        downView: null,
        moreImages: null,
        letterTransferDesignRights: null,
        designOwnershipLetter: null,
      });
    };

    initForm();
  }, [detailSubmission?.submission?.industrialDesign, types, setFormIndustDesign]);

  const handleUpdateMerek = async () => {
    if (types === "Ubah Merek") {
      setLoading(true);
      try {
        await dispatch(revisonSubmissionBrand(detailSubmission?.submission?.brand?.id, formBrand, formAdditionalBrand));
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
        handleChange("Dokumen Pengajuan", "Detail");
        dispatch(getDetailSubmission(submissionId));
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const initFormBrand = async () => {
      if (!detailSubmission?.submission?.brand || types !== "Ubah Merek") return;

      // Proses file-file di formBrand
      // const labelBrand = await processFile(detailSubmission?.submission?.brand.labelBrand);
      // const fileUploade = await processFile(detailSubmission?.submission?.brand.fileUploade);
      // const signature = await processFile(detailSubmission?.submission?.brand.signature);
      // const InformationLetter = await processFile(detailSubmission?.submission?.brand.InformationLetter);
      // const letterStatment = await processFile(detailSubmission?.submission?.brand.letterStatment);

      // Set formBrand state
      setFormBrand({
        applicationType: detailSubmission?.submission?.brand.applicationType || "",
        brandType: detailSubmission?.submission?.brand?.brandTypeId || null,
        referenceName: detailSubmission?.submission?.brand.referenceName || "",
        elementColor: detailSubmission?.submission?.brand.elementColor || "",
        translate: detailSubmission?.submission?.brand.translate || "",
        pronunciation: detailSubmission?.submission?.brand.pronunciation || "",
        disclaimer: detailSubmission?.submission?.brand.disclaimer || "",
        description: detailSubmission?.submission?.brand.description || "",
        documentType: detailSubmission?.submission?.brand.documentType || "",
        information: detailSubmission?.submission?.brand.information || "",
        labelBrand: null,
        fileUploade: null,
        signature: null,
        InformationLetter: null,
        letterStatment: null,
      });

      if (detailSubmission?.submission?.brand.additionalDatas && Array.isArray(detailSubmission?.submission?.brand.additionalDatas)) {
        const mappedAdditionalBrands: FormAdditionalBrand[] = await Promise.all(
          detailSubmission?.submission?.brand.additionalDatas.map(async (item) => {
            const processedFile = await processFile(item.file);
            return {
              id: item?.id,
              additionalDescriptions: item.description || "",
              additionalFiles: processedFile,
            };
          })
        );

        setFormAdditionalBrand(mappedAdditionalBrands);
      } else {
        setFormAdditionalBrand([]);
      }
    };

    initFormBrand();
  }, [detailSubmission?.submission?.brand, types, setFormAdditionalBrand, setFormBrand]);

  const handleUpdatePersonalData = async () => {
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
      await dispatch(updatePersonalData(detailSubmission?.submission?.id, personalData, updateKtp));
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
          ktpName: "",
        },
      ]);
      handleChange("Data Diri", "Detail");
      dispatch(getDetailSubmission(submissionId));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initPersonalData = async () => {
      if (!detailSubmission?.submission?.personalDatas && statusDetail !== "Ubah") {
        return;
      } else if (statusDetail == "Ubah" && detailSubmission?.submission?.personalDatas && Array.isArray(detailSubmission?.submission?.personalDatas)) {
        const mappedContributors = await Promise.all(
          detailSubmission.submission.personalDatas.map(async (item: FormPersonalData) => ({
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
            ktp: null,
            ktpName: typeof item.ktp === "string" ? item.ktp : item.ktp instanceof File ? item.ktp.name : "",
            facebook: item.facebook || "",
            whatsapp: item.whatsapp || "",
            instagram: item.instagram || "",
            twitter: item.twitter || "",
          }))
        );

        setPersonalData(mappedContributors);
      }
    };

    initPersonalData();
  }, [detailSubmission?.submission?.personalDatas, setPersonalData, types, current, statusDetail]);

  const uniquePersonalData = Array.from(new Map(personalData.map((item) => [item.id, item])).values());

  const handleDeletePermanen = async (id: number | null) => {
    if (!token) return;

    try {
      setLoading(true);
      await dispatch(deletePersonalData(id, submissionId));
    } finally {
      setLoading(false);
    }
  };

  const idSubmissionDetail = detailSubmission?.id;
  const idSubmissionBrandDetail = detailSubmission?.submission?.brand?.id;

  const currentTitle = formatLabel(name);

  console.log(currentTitle);

  // console.log("Skema saat ini:", formSchemaPayment.submissionScheme);
  // console.log(
  //   "Quota yang bisa dipilih:",
  //   qouta?.filter((item: Group) => item.quota.some((q) => q.title === formSchemaPayment.name && q.remainingQuota > 0))
  // );

  return (
    <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
      <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
        <SideNavigation />
      </div>
      <div className="lg:w-[84%] w-full  border ">
        <HeaderNavigation />
        <div className="px-4 lg:px-12  py-8">
          <div className="mb-8">
            <Breadcrumb
              title="INFORMASI PENGAJUAN"
              items={[
                { label: `${formatLabel(name)}`, url: `/permohonan/${name}` },
                { label: "Informasi Pengajuan", url: "" },
              ]}
            />
          </div>
          <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
            <div className="bg-white  ">
              <div className="mb-16">
                <h1 className="text-center text-3xl w-full font-bold">Informasi Pengajuan</h1>
              </div>
              <div className="flex flex-row w-full justify-center mb-10">
                <Button label="Informasi Umum" isActive={current === "Informasi Umum"} onClick={() => handleChange("Informasi Umum", "Detail")} />
                <Button label="Data Diri" isActive={current === "Data Diri"} onClick={() => handleChange("Data Diri", "Detail")} />
                <Button label="Dokumen Pengajuan" isActive={current === "Dokumen Pengajuan"} onClick={() => handleChange("Dokumen Pengajuan", "Detail")} />
              </div>
              <div>
                {current === "Informasi Umum" && <GeneralInformation data={detailSubmission} terms={terms} status={statusDetail} />}
                {current === "Data Diri" && statusDetail === "Detail" && <PersonalDataSubmission data={detailSubmission?.submission?.personalDatas} />}

                {current === "Dokumen Pengajuan" && statusDetail === "Detail" && (
                  <>
                    {detailSubmission?.submission?.patent && <DocumentSubmissionPatent data={detailSubmission.submission.patent} />}
                    {detailSubmission?.submission?.copyright && <DocumentSubmissionCopyright data={detailSubmission.submission.copyright} />}
                    {detailSubmission?.submission?.industrialDesign && <DocumentSubmissionIndutrialDesign data={detailSubmission.submission.industrialDesign} />}
                    {detailSubmission?.submission?.brand && <DocumentSubmissionBrand data={detailSubmission.submission.brand} />}
                  </>
                )}

                {current === "Data Diri" && statusDetail === "Ubah" && (
                  <>
                    <div className="flex flex-col gap-6  mt-10">
                      {uniquePersonalData.map((item, index) => (
                        <>
                          <div key={index} className="border p-6 rounded-md flex flex-col gap-4 border-PRIMARY01">
                            <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
                              <Field label={index === 0 ? "Ketua Pencipta" : `Kontributor ${index + 0}`} value={item.name} name="name" type="text" placeholder="" onChange={(e) => handleChangePerson(e, index, "name")} error={personalDataError[index]?.name} need />
                              <Field label="Email" value={item.email} name="email" type="email" placeholder="" onChange={(e) => handleChangePerson(e, index, "email")} error={personalDataError[index]?.email} need />
                            </div>
                            <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
                              <Field label="Instansi" value={item.institution} name="institution" type="text" placeholder="" onChange={(e) => handleChangePerson(e, index, "institution")} error={personalDataError[index]?.institution} need />
                              <Field label="Pekerjaan" value={item.work} name="work" type="text" placeholder="" onChange={(e) => handleChangePerson(e, index, "work")} error={personalDataError[index]?.work} need />
                            </div>
                            <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
                              <Field label="Fakultas" value={item.faculty || ""} name="faculty" type="text" placeholder="strip '-' jika bukan berasal dari ITK" onChange={(e) => handleChangePerson(e, index, "faculty")} error={personalDataError[index]?.faculty} need />
                              <Field label="Prodi" value={item.studyProgram || ""} name="studyProgram" type="text" placeholder="strip '-' jika bukan berasal dari ITK" onChange={(e) => handleChangePerson(e, index, "studyProgram")} error={personalDataError[index]?.studyProgram} need />
                            </div>
                            <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
                              <Field label="Negara Kebangsaan" value={item.nationalState} name="nationalState" type="text" placeholder="" onChange={(e) => handleChangePerson(e, index, "nationalState")} error={personalDataError[index]?.nationalState} need />
                              <Field label="Negara Tempat Tingggal" value={item.countryResidence} name="countryResidence" type="text" placeholder="" onChange={(e) => handleChangePerson(e, index, "countryResidence")} error={personalDataError[index]?.countryResidence} need />
                            </div>
                            <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
                              <Field label="Provinsi" value={item.province} name="province" type="text" placeholder="" onChange={(e) => handleChangePerson(e, index, "province")} error={personalDataError[index]?.province} need />
                              <Field label="Kota/Kabupaten" value={item.city} name="city" type="text" placeholder="" onChange={(e) => handleChangePerson(e, index, "city")} error={personalDataError[index]?.city} need />
                            </div>
                            <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
                              <Field label="Kecamatan" value={item.subdistrict} name="subdistrict" type="text" placeholder="" onChange={(e) => handleChangePerson(e, index, "subdistrict")} error={personalDataError[index]?.subdistrict} need />
                              <Field label="Kelurahan" value={item.ward} name="ward" type="text" placeholder="" onChange={(e) => handleChangePerson(e, index, "ward")} error={personalDataError[index]?.ward} need />
                            </div>
                            <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
                              <Field label="Kode Pos" value={item.postalCode} name="postalCode" type="text" placeholder="" onChange={(e) => handleChangePerson(e, index, "postalCode")} error={personalDataError[index]?.postalCode} need />
                              <Field label="Nomor Handphone" value={item.phoneNumber} name="phoneNumber" type="text" placeholder="" onChange={(e) => handleChangePerson(e, index, "phoneNumber")} error={personalDataError[index]?.phoneNumber} need />
                            </div>
                            {detailSubmission?.submission?.submissionType?.title === "Merek" && (
                              <>
                                <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
                                  <Field label="Facebook" value={item.facebook || ""} name="facebook" type="text" placeholder="" onChange={(e) => handleChangePerson(e, index, "facebook")} error={personalDataError[index]?.facebook} />
                                  <Field label="Whatsapp" value={item.whatsapp || ""} name="whatsapp" type="text" placeholder="" onChange={(e) => handleChangePerson(e, index, "whatsapp")} error={personalDataError[index]?.whatsapp} />
                                </div>
                                <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
                                  <Field label="Instagram" value={item.instagram || ""} name="instagram" type="text" placeholder="" onChange={(e) => handleChangePerson(e, index, "instagram")} error={personalDataError[index]?.instagram} />
                                  <Field label="Twitter" value={item.twitter || ""} name="twitter" type="text" placeholder="" onChange={(e) => handleChangePerson(e, index, "twitter")} error={personalDataError[index]?.twitter} />
                                </div>
                              </>
                            )}

                            <FieldTextarea label="Alamat" value={item.address || ""} name="address" placeholder="" required row={4} onChange={(e) => handleChangePerson(e, index, "address")} error={personalDataError[index]?.address} need />
                            <InputFile
                              label="KTP"
                              value={item.ktp instanceof File ? item.ktp : undefined}
                              name={`ktp_${index}`}
                              required
                              onChange={(e) => handleChangePerson(e, index, "ktp")}
                              accept=".pdf"
                              error={personalDataError[index]?.ktp}
                              need
                              placeholder={`${item.ktpName ?? ""}`}
                              message="Format file harus berupa pdf. Max 5MB"
                              edite={statusDetail}
                              url={item.ktpName}
                            />

                            {personalData.length > 1 && index !== 0 ? (
                              <div className="flex justify-end mt-10">
                                <button
                                  onClick={() => {
                                    if (item?.id === null) {
                                      removeContributor?.(index);
                                      // deleteContributor?.(item.id);
                                    } else {
                                      handleDeletePermanen?.(item.id);
                                    }
                                  }}
                                  className="bg-RED01 py-1 px-4 text-white rounded-md"
                                >
                                  Hapus
                                </button>
                              </div>
                            ) : null}
                          </div>
                        </>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-start">
                      <button type="button" onClick={addContributor} className="flex flex-row items-center gap-2 px-2 py-2 active:bg-gray-100 rounded-md">
                        <IoAddCircleSharp className="md:text-3xl text-xl text-PRIMARY01" />
                        <span className="text-PRIMARY01 font-bold md:text-xl text-lg">Tambah Pencipta</span>
                      </button>
                    </div>

                    <div className="flex justify-end mt-6 gap-6">
                      <button onClick={() => handleChange("Data Diri", "Detail")} className="bg-GREY01 px-4 py-2 flex flex-row items-center gap-2 text-GREY02 font-medium rounded-md">
                        Kembali
                      </button>
                      <button onClick={handleUpdatePersonalData} className="bg-PRIMARY01 px-6 py-2 text-white font-medium rounded-md cursor-pointer">
                        Simpan
                      </button>
                    </div>
                  </>
                )}
                {current === "Dokumen Pengajuan" && statusDetail === "Ubah" && name === "hak-cipta" && (
                  <>
                    <div className="flex flex-col gap-6 lg:mt-24 mt-16">
                      <Field label="Judul Ciptaan" value={formCopyright?.titleInvention || ""} name="titleInvention" type="text" placeholder="" need error={formCopyrightError?.titleInvention} onChange={handleChangeCopyright} />

                      <div>
                        <div className="flex md:flex-row flex-col w-full gap-6">
                          <FieldDropdown
                            label="Jenis Hak Cipta"
                            name="typeCreation"
                            type="select"
                            value={formCopyright?.typeCreation?.toString() || ""}
                            onChange={handleChangeCopyright}
                            options={
                              typeCopy?.map((item) => ({
                                label: item.title,
                                value: item.id,
                              })) ?? []
                            }
                            error={formCopyrightError?.typeCreation}
                            need
                          />
                          <FieldDropdown
                            label="Sub-Jenis Hak Cipta"
                            name="subTypeCreation"
                            type="select"
                            value={formCopyright?.subTypeCreation?.toString() || ""}
                            onChange={handleChangeCopyright}
                            options={
                              subTypeCopy?.map((item) => ({
                                label: item.title,
                                value: item.id,
                              })) ?? []
                            }
                            error={formCopyrightError?.subTypeCreation}
                            need
                          />
                        </div>
                      </div>

                      <div className="flex md:flex-row flex-col w-full gap-6">
                        <Field label="Negara Pertama Kali Diumumkan" value={formCopyright?.countryFirstAnnounced || ""} name="countryFirstAnnounced" type="text" placeholder="" need error={formCopyrightError?.countryFirstAnnounced} onChange={handleChangeCopyright} />
                        <Field label="Kota Pertama Kali Diumumkan" value={formCopyright?.cityFirstAnnounced || ""} name="cityFirstAnnounced" type="text" placeholder="" need error={formCopyrightError?.cityFirstAnnounced} onChange={handleChangeCopyright} />
                      </div>

                      <div className="w-full">
                        <label htmlFor="startDate" className="block mb-2 text-base font-medium">
                          Waktu Pertama Kali Diumumkan
                        </label>
                        <input
                          type="date"
                          id="timeFirstAnnounced"
                          name="timeFirstAnnounced"
                          value={formCopyright?.timeFirstAnnounced || ""}
                          onChange={handleChangeCopyright}
                          className={`bg-gray-50 border ${formCopyrightError?.timeFirstAnnounced ? "border-RED01 ring-RED01 focus:ring-RED01 focus:border-RED01" : "border-BORDER01 focus:ring-PRIMARY01 focus:border-PRIMARY01"} text-base rounded-md block w-full p-2`}
                        />
                        {formCopyrightError?.timeFirstAnnounced && <p className="text-sm text-RED01 mt-1">Field Tidak Boleh Kosong!</p>}
                      </div>

                      <FieldTextarea label="Uraian Singkat Ciptaan" value={formCopyright?.briefDescriptionCreation || ""} name="briefDescriptionCreation" placeholder="" required row={4} onChange={handleChangeCopyright} error={formCopyrightError?.briefDescriptionCreation} need />
                      <InputFile
                        label="Surat Pernyataan"
                        value={formCopyright?.statementLetter ?? null}
                        name="statementLetter"
                        required
                        onChange={handleChangeCopyright}
                        error={formCopyrightError?.statementLetter}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={formCopyright?.statementName}
                      />
                      <InputFile
                        label="Surat Pengalihan Hak Cipta"
                        value={formCopyright?.letterTransferCopyright ?? null}
                        name="letterTransferCopyright"
                        required
                        onChange={handleChangeCopyright}
                        error={formCopyrightError?.letterTransferCopyright}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={formCopyright?.letterName}
                      />
                      <InputFile
                        label="Contoh Ciptaan"
                        value={formCopyright?.exampleCreation ?? null}
                        name="exampleCreation"
                        required
                        onChange={handleChangeCopyright}
                        error={formCopyrightError?.exampleCreation}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={formCopyright?.exampleName}
                      />
                    </div>
                    <div className="mt-10 flex justify-end gap-6">
                      <button onClick={() => handleChange("Dokumen Pengajuan", "Detail")} className="bg-GREY01 px-4 py-2 flex flex-row items-center gap-2 text-GREY02 font-medium rounded-md">
                        Kembali
                      </button>
                      <button
                        onClick={async () => {
                          await handleUpdateCopyright();
                        }}
                        className="bg-PRIMARY01 px-6 py-2 text-white font-medium rounded-md cursor-pointer"
                      >
                        Simpan
                      </button>
                    </div>
                  </>
                )}
              </div>
              {current === "Dokumen Pengajuan" && statusDetail === "Ubah" && name === "paten" && (
                <>
                  {
                    <div className="flex flex-col gap-6">
                      <Field label="Judul Invensi" value={formComplatePaten.inventionTitle} name="inventionTitle" type="text" placeholder="" need error={formComplatePatenError.inventionTitle} onChange={handleChangeComplatePaten} />
                      <div className="flex flex-row gap-6">
                        <div className="flex flex-row w-full gap-6">
                          <FieldDropdown
                            label="Jenis Paten"
                            name="patentTypeId"
                            type="select"
                            value={formComplatePaten.patentTypeId?.toString() || ""}
                            onChange={handleChangeComplatePaten}
                            options={
                              typePaten?.map((item) => ({
                                label: item.title,
                                value: item.id,
                              })) ?? []
                            }
                            error={formComplatePatenError.patentTypeId}
                            need
                          />
                          <Field label="Jumlah Klaim" value={formComplatePaten.numberClaims?.toString() || ""} name="numberClaims" type="text" placeholder="contoh: 1,2,3 dst." error={formComplatePatenError.numberClaims} onChange={handleChangeComplatePaten} need />
                        </div>
                      </div>
                      <InputFile
                        label="Draft Paten Keseluruhan"
                        value={formComplatePaten.draftPatentApplicationFile}
                        name="draftPatentApplicationFile"
                        required
                        onChange={handleChangeComplatePaten}
                        // error={formComplatePatenError.claim}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.patent?.draftPatentApplicationFile}
                      />
                      <InputFile
                        label="Klaim"
                        value={formComplatePaten.claim}
                        name="claim"
                        required
                        onChange={handleChangeComplatePaten}
                        error={formComplatePatenError.claim}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.patent?.claim}
                      />
                      <InputFile
                        label="Deskripsi"
                        value={formComplatePaten.description}
                        name="description"
                        required
                        onChange={handleChangeComplatePaten}
                        error={formComplatePatenError.description}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.patent?.description}
                      />
                      <InputFile
                        label="Abstrak"
                        value={formComplatePaten.abstract}
                        name="abstract"
                        required
                        onChange={handleChangeComplatePaten}
                        error={formComplatePatenError.abstract}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.patent?.abstract}
                      />
                      <InputFile
                        label="Gambar Invensi"
                        value={formComplatePaten.inventionImage}
                        name="inventionImage"
                        required
                        onChange={handleChangeComplatePaten}
                        error={formComplatePatenError.inventionImage}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.patent?.inventionImage}
                      />
                      <InputFile
                        label="Surat Pernyataan Kepemilikan Invensi"
                        value={formComplatePaten.statementInventionOwnership}
                        name="statementInventionOwnership"
                        required
                        onChange={handleChangeComplatePaten}
                        error={formComplatePatenError.statementInventionOwnership}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.patent?.statementInventionOwnership}
                      />
                      <InputFile
                        label="Surat Pengalihan Hak Invensi"
                        value={formComplatePaten.letterTransferRightsInvention}
                        name="letterTransferRightsInvention"
                        required
                        onChange={handleChangeComplatePaten}
                        error={formComplatePatenError.letterTransferRightsInvention}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.patent?.letterTransferRightsInvention}
                      />

                      <div className="flex justify-end mt-6 gap-6">
                        <button onClick={() => handleChange("Dokumen Pengajuan", "Detail")} className="bg-GREY01 px-4 py-2 flex flex-row items-center gap-2 text-GREY02 font-medium rounded-md">
                          Kembali
                        </button>
                        <button onClick={handleUpdatePaten} className="bg-PRIMARY01 px-6 py-2 text-white font-medium rounded-md cursor-pointer">
                          Simpan
                        </button>
                      </div>
                    </div>
                  }
                </>
              )}
              {current === "Dokumen Pengajuan" && statusDetail === "Ubah" && name === "desain-industri" && (
                <>
                  {
                    <div className="flex flex-col gap-6">
                      <Field label="Judul Desain Industri" value={formIndustDesign.titleDesign} name="titleDesign" type="text" placeholder="" need error={formIndustDesignError.titleDesign} onChange={handleChangeComplateIndusDesign} />
                      <FieldDropdown
                        label="Jenis Desain Industri"
                        name="type"
                        type="select"
                        value={formIndustDesign.type?.toString() || ""}
                        onChange={handleChangeComplateIndusDesign}
                        options={
                          designTypes?.map((item) => ({
                            label: item.label,
                            value: item.value,
                          })) ?? []
                        }
                        error={formIndustDesignError.type}
                        need
                      />

                      <div className="flex flex-row gap-6">
                        <div className="flex flex-row w-full gap-6">
                          <FieldDropdown
                            label="Jenis Desain Industri"
                            name="typeDesignId"
                            type="select"
                            value={formIndustDesign.typeDesignId?.toString() || ""}
                            onChange={handleChangeComplateIndusDesign}
                            options={
                              typeDesign?.map((item) => ({
                                label: item.title,
                                value: item.id,
                              })) ?? []
                            }
                            error={formIndustDesignError.typeDesignId}
                            need
                          />
                          <FieldDropdown
                            label="Sub-Jenis Desain Industri"
                            name="subtypeDesignId"
                            type="select"
                            value={formIndustDesign.subtypeDesignId?.toString() || ""}
                            onChange={handleChangeComplateIndusDesign}
                            options={
                              subtypeDesain?.map((item) => ({
                                label: item.title,
                                value: item.id,
                              })) ?? []
                            }
                            error={formIndustDesignError.subtypeDesignId}
                            need
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="block mb-2 text-base font-medium">
                          Klaim
                          <span className="text-RED01 ml-1">*</span>
                        </label>

                        <div className="flex flex-row gap-10">
                          {claimOptions?.map((option) => (
                            <label key={option.value} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                value={option.value}
                                // ✅ otomatis centang jika match
                                className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md focus:ring-PRIMARY010 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1"
                                checked={formIndustDesign.claim.includes(option.value)}
                                onChange={() => handleClaimCheckboxChange(option.value)}
                              />
                              {option.label}
                            </label>
                          ))}
                        </div>
                        {formIndustDesignError.claim && <p className="text-sm text-RED01 mt-2">Klaim Wajib Dipilih!</p>}
                      </div>
                      <InputFile
                        label="Draft Keseluruhan Desain Industri"
                        value={formIndustDesign.draftDesainIndustriApplicationFile}
                        name="draftDesainIndustriApplicationFile"
                        required
                        onChange={handleChangeComplateIndusDesign}
                        // error={formIndustDesignError.draftDesainIndustriApplicationFile}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.industrialDesign?.draftDesainIndustriApplicationFile}
                      />
                      {/* <InputFile
                        label="Tampak Perspektif"
                        value={formIndustDesign.looksPerspective}
                        name="looksPerspective"
                        required
                        onChange={handleChangeComplateIndusDesign}
                        error={formIndustDesignError.looksPerspective}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.industrialDesign?.looksPerspective}
                      /> */}
                      <InputFile
                        label="Tampak Perspektif"
                        value={formIndustDesign.looksPerspective}
                        name="looksPerspective"
                        required
                        onChange={handleChangeComplateIndusDesign}
                        error={formIndustDesignError.looksPerspective}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.industrialDesign?.looksPerspective}
                      />
                      <InputFile
                        label="Tampak Depan"
                        value={formIndustDesign.frontView}
                        name="frontView"
                        required
                        onChange={handleChangeComplateIndusDesign}
                        error={formIndustDesignError.frontView}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.industrialDesign?.frontView}
                      />
                      <InputFile
                        label="Tampak Belakang"
                        value={formIndustDesign.backView}
                        name="backView"
                        required
                        onChange={handleChangeComplateIndusDesign}
                        error={formIndustDesignError.backView}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.industrialDesign?.backView}
                      />
                      <InputFile
                        label="Tampak Samping Kanan"
                        value={formIndustDesign.rightSideView}
                        name="rightSideView"
                        required
                        onChange={handleChangeComplateIndusDesign}
                        error={formIndustDesignError.rightSideView}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.industrialDesign?.rightSideView}
                      />
                      <InputFile
                        label="Tampak Samping Kiri"
                        value={formIndustDesign.lefttSideView}
                        name="lefttSideView"
                        required
                        onChange={handleChangeComplateIndusDesign}
                        error={formIndustDesignError.lefttSideView}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.industrialDesign?.lefttSideView}
                      />
                      <InputFile
                        label="Tampak Atas"
                        value={formIndustDesign.topView}
                        name="topView"
                        required
                        onChange={handleChangeComplateIndusDesign}
                        error={formIndustDesignError.topView}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.industrialDesign?.topView}
                      />
                      <InputFile
                        label="Tampak Bawah"
                        value={formIndustDesign.downView}
                        name="downView"
                        required
                        onChange={handleChangeComplateIndusDesign}
                        error={formIndustDesignError.downView}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.industrialDesign?.downView}
                      />
                      <InputFile
                        label="Gambar Lainnya"
                        value={formIndustDesign.moreImages}
                        name="moreImages"
                        required
                        onChange={handleChangeComplateIndusDesign}
                        error={formIndustDesignError.moreImages}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.industrialDesign?.moreImages}
                      />
                      <InputFile
                        label="Surat Pengalihan Hak Desain Industri"
                        value={formIndustDesign.designOwnershipLetter}
                        name="designOwnershipLetter"
                        required
                        onChange={handleChangeComplateIndusDesign}
                        error={formIndustDesignError.designOwnershipLetter}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.industrialDesign?.designOwnershipLetter}
                      />
                      <InputFile
                        label="Surat Kepemilikan Desain Industri"
                        value={formIndustDesign.letterTransferDesignRights}
                        name="letterTransferDesignRights"
                        required
                        onChange={handleChangeComplateIndusDesign}
                        error={formIndustDesignError.letterTransferDesignRights}
                        need
                        message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                        edite={statusDetail}
                        url={detailSubmission?.submission?.industrialDesign?.letterTransferDesignRights}
                      />

                      <div className="flex justify-end mt-6 gap-6">
                        <button onClick={() => handleChange("Dokumen Pengajuan", "Detail")} className="bg-GREY01 px-4 py-2 flex flex-row items-center gap-2 text-GREY02 font-medium rounded-md">
                          Kembali
                        </button>
                        <button onClick={handleUpdateDesignIndus} className="bg-PRIMARY01 px-6 py-2 text-white font-medium rounded-md cursor-pointer">
                          Kirim
                        </button>
                      </div>
                    </div>
                  }
                </>
              )}
              {current === "Dokumen Pengajuan" && statusDetail === "Ubah" && name === "merek" && (
                <>
                  {
                    <>
                      <div className="flex flex-col w-full gap-6">
                        <div>
                          <div className="flex lg:flex-row flex-col w-full gap-6">
                            <FieldDropdown
                              label="Tipe Permohonan"
                              name="applicationType"
                              type="select"
                              value={formBrand?.applicationType ?? ""}
                              onChange={handleChangeBrand}
                              options={
                                brandTypeOptions?.map((item) => ({
                                  label: item.label,
                                  value: item.value,
                                })) ?? []
                              }
                              error={formBrandError?.applicationType}
                              need
                            />
                            <FieldDropdown
                              label="Tipe Merek"
                              name="brandType"
                              type="select"
                              value={String(formBrand?.brandType ?? null)}
                              onChange={handleChangeBrand}
                              options={
                                typeBrand?.map((item) => ({
                                  label: item.title,
                                  value: item.id,
                                })) ?? []
                              }
                              error={formBrandError?.brandType}
                              need
                            />
                          </div>
                        </div>

                        <div className="flex lg:flex-row flex-col w-full gap-6">
                          <Field label="Nama Refrensi Label Merek" value={formBrand?.referenceName || ""} name="referenceName" type="text" placeholder="" need error={formBrandError?.elementColor} onChange={handleChangeBrand} />
                          <Field label="Unsur Warna Dalam Label Merek" value={formBrand?.elementColor || ""} name="elementColor" type="text" placeholder="Contoh: Hitam, Putih dan Biru, Kuning, Merah" need error={formBrandError?.elementColor} onChange={handleChangeBrand} />
                        </div>
                        <div className="flex lg:flex-row flex-col w-full gap-6">
                          <Field label="Disclaimer (Tidak dilindungin)" value={formBrand?.disclaimer || ""} name="disclaimer" type="text" placeholder="Contoh: Kata 'Halal', 'Menyehatkan', 'Dijamin Mutu' " error={formBrandError?.disclaimer} onChange={handleChangeBrand} />
                          <FieldDropdown
                            label="Jenis Dokumen"
                            name="documentType"
                            type="select"
                            value={formBrand?.documentType ?? ""}
                            onChange={handleChangeBrand}
                            options={
                              brandClassOptions?.map((item) => ({
                                label: item.label,
                                value: item.value,
                              })) ?? []
                            }
                            error={formBrandError?.documentType}
                            need
                          />
                        </div>

                        <div className="flex lg:flex-row flex-col w-full gap-6">
                          <Field label="Terjemahan Jika Menggunakan Bahasa Asing" value={formBrand?.translate || ""} name="translate" type="text" placeholder="" need error={formBrandError?.translate} onChange={handleChangeBrand} />
                          <Field label="Pengucapan Jika Menggunakan Huruf Non-Latin" value={formBrand?.pronunciation || ""} name="pronunciation" type="text" placeholder="" need error={formBrandError?.pronunciation} onChange={handleChangeBrand} />
                        </div>

                        <FieldTextarea
                          label="Dekripsi Label Merek"
                          value={formBrand?.description ?? ""}
                          name="description"
                          placeholder="Contoh: Kotak, Lingkaran, Segitiga, dan sebagainya (bukan filosofi merek).
                 Wajib diisi jika tipe merek adalah Tiga Dimensi, Hologram, atau Suara.
                 Jika bukan, isi dengan tanda strip -."
                          required
                          row={4}
                          onChange={handleChangeBrand}
                          error={formBrandError?.description}
                          need
                        />
                        <FieldTextarea label="Keterangan" value={formBrand?.information ?? ""} name="information" placeholder="" required row={4} onChange={handleChangeBrand} error={formBrandError?.information} need />

                        <InputFile
                          label="Label Merek"
                          value={formBrand?.labelBrand ?? null}
                          name="labelBrand"
                          required
                          onChange={handleChangeBrand}
                          accept=".jpg"
                          error={formBrandError?.labelBrand}
                          need
                          message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                          edite={statusDetail}
                          url={detailSubmission?.submission?.brand?.labelBrand}
                        />
                        <InputFile
                          label="Upload File"
                          value={formBrand?.fileUploade ?? null}
                          name="fileUploade"
                          required
                          onChange={handleChangeBrand}
                          accept=".pdf"
                          error={formBrandError?.fileUploade}
                          need
                          message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                          edite={statusDetail}
                          url={detailSubmission?.submission?.brand?.fileUploade}
                        />
                        <InputFile
                          label="Tanda Tangan Permohonan"
                          value={formBrand?.signature ?? null}
                          name="signature"
                          required
                          onChange={handleChangeBrand}
                          error={formBrandError?.signature}
                          need
                          message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                          edite={statusDetail}
                          url={detailSubmission?.submission?.brand?.signature}
                        />

                        <div className="flex flex-col mt-10 gap-6">
                          <h1 className="font-semibold text-3xl">Data Merek Tambahan</h1>
                          <InputFile
                            label="Upload Label Tambahan"
                            value={tempAdditionalBrand?.additionalFiles ?? null}
                            name="additionalFiles"
                            required
                            onChange={handleChangeAdditionalBrand}
                            error={tempAdditionalBrandError?.additionalFiles}
                            message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
                          />
                          <FieldTextarea label="Keterangan" value={tempAdditionalBrand?.additionalDescriptions ?? ""} name="additionalDescriptions" placeholder="" required row={4} onChange={handleChangeAdditionalBrand} error={tempAdditionalBrandError?.additionalDescriptions} />

                          <button onClick={() => createAdditionalBrand(idSubmissionDetail!, idSubmissionBrandDetail!)} className="bg-PRIMARY01 px-4 py-2 text-white font-medium rounded-md cursor-pointer max-w-fit">
                            Tambah
                          </button>
                        </div>

                        {(formAdditionalBrand ?? []).length > 0 && (
                          <div className="overflow-x-auto w-full mb-6">
                            <table className="min-w-full">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="px-4 py-2 text-left border-b max-w-10">No</th>
                                  <th className="px-4 py-2 text-left border-b ">Nama File</th>
                                  <th className="px-4 py-2 text-left border-b ">Deskripsi</th>
                                  <th className="px-4 py-2 text-left border-b ">Aksi</th>
                                </tr>
                              </thead>
                              <tbody>
                                {formAdditionalBrand?.map((item, index) => {
                                  const fileName = item?.additionalFiles?.name ?? "-";
                                  const description = item?.additionalDescriptions ?? "-";
                                  const itemId = item?.id;

                                  const isDeletable = typeof deletePermanentAdditiona === "function" && typeof idSubmissionDetail === "number" && typeof itemId === "number";

                                  return (
                                    <tr key={index} className="bg-white hover:bg-gray-50 h-full">
                                      <td className="px-4 py-2 border-b">{index + 1}</td>
                                      <td className="px-4 py-2 border-b">{fileName}</td>
                                      <td className="px-4 py-2 border-b">{description}</td>
                                      <td className="px-4 py-2 border-b">
                                        <button onClick={() => isDeletable && deletePermanentAdditiona(idSubmissionDetail, itemId)} className={`px-4 py-1 font-medium rounded-md cursor-pointer ${isDeletable ? "bg-RED01 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
                                          Hapus
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end mt-6 gap-6">
                        <button onClick={() => handleChange("Dokumen Pengajuan", "Detail")} className="bg-GREY01 px-4 py-2 flex flex-row items-center gap-2 text-GREY02 font-medium rounded-md">
                          Kembali
                        </button>
                        <button onClick={handleUpdateMerek} className="bg-PRIMARY01 px-6 py-2 text-white font-medium rounded-md cursor-pointer">
                          Kirim
                        </button>
                      </div>
                    </>
                  }
                </>
              )}
              {current === "Informasi Umum" && statusDetail === "Ubah" && (
                <>
                  <div className="flex flex-col gap-6 mt-6">
                    <FieldDropdown
                      label="Skema Pengajuan"
                      name="submissionScheme"
                      type="select"
                      value={formSchemaPayment.submissionScheme}
                      onChange={handleChangeSchema}
                      options={
                        SchemaPayment?.map((item) => ({
                          label: item.label,
                          value: item.key,
                        })) ?? []
                      }
                      error={formSchemaPaymentErrors.submissionScheme}
                      need
                    />
                    {formSchemaPayment.submissionScheme === "Pendanaan" && (
                      <>
                        <FieldDropdown
                          label="Periode Pengajuan"
                          name="groupId"
                          type="select"
                          value={formSchemaPayment.groupId !== null && formSchemaPayment.periodId !== null ? `${formSchemaPayment.groupId}|${formSchemaPayment.periodId}` : ""}
                          onChange={handleChangeSchema}
                          /* ---------- LOGIKA FILTER ---------- */
                          options={(qouta ?? [])
                            .filter((group) => group.quota.some((q) => q.title === currentTitle && q.remainingQuota > 0))
                            .map((group) => ({
                              label: `${group.group} (${formatIndonesianDate(group.startDate)} - ${formatIndonesianDate(group.endDate)})`,
                              value: `${group.id}|${group.periodId}`,
                            }))}
                          error={formSchemaPaymentErrors.groupId}
                          need
                        />
                        <div className="mb-4">
                          <label className="block mb-2 text-base font-medium">
                            Prasyarat Penerimaan Pendanaan
                            <span className="text-RED01 ml-1">*</span>
                          </label>

                          <ol className=" ">
                            {(terms ?? []).map((term, index) => (
                              <li key={term.id} className="flex items-center space-x-2 mb-1">
                                <span>{index + 1}.</span>
                                <span>{term.terms}</span>
                              </li>
                            ))}
                          </ol>
                          <label className="flex items-center space-x-2 mt-4">
                            <input type="checkbox" className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md focus:ring-PRIMARY01 focus:ring-1" checked={formSchemaPayment.termsConditionId.length === (terms?.length || 0)} onChange={handleCheckboxChange} />
                            <span className="text-black">Saya menyetujui semua syarat dan ketentuan</span>
                          </label>
                          {formSchemaPaymentErrors.termsConditionId && <p className="text-sm text-RED01 mt-2">{formSchemaPaymentErrors.termsConditionId}</p>}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex justify-end mt-10 gap-6">
                    <button onClick={() => handleChange("Informasi Umum", "Detail")} className="bg-GREY01 px-4 py-2 flex flex-row items-center gap-2 text-GREY02 font-medium rounded-md">
                      Kembali
                    </button>
                    <button onClick={handleSubmitSchema} className="bg-PRIMARY01 px-6 py-2 text-white font-medium rounded-md cursor-pointer">
                      Kirim
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="mt-12 flex justify-end">
              {current === "Dokumen Pengajuan" && statusDetail === "Detail" && (
                <button onClick={() => handleChange("Dokumen Pengajuan", "Ubah")} className="bg-PRIMARY01 px-6 py-2 text-white font-medium rounded-md cursor-pointer">
                  Ubah
                </button>
              )}
            </div>
            <div className=" flex justify-end">
              {current === "Data Diri" && statusDetail === "Detail" && (
                <button onClick={() => handleChange("Data Diri", "Ubah")} className="bg-PRIMARY01 px-6 py-2 text-white font-medium rounded-md cursor-pointer">
                  Ubah
                </button>
              )}
            </div>
            <div className=" flex justify-end">
              {current === "Informasi Umum" && statusDetail === "Detail" && (
                <button onClick={() => handleChange("Informasi Umum", "Ubah")} className="bg-PRIMARY01 px-6 py-2 text-white font-medium rounded-md cursor-pointer">
                  Ubah
                </button>
              )}
            </div>
          </div>
        </div>
        <ModalLoading show={loading} />
      </div>
    </main>
  );
};

export default DetailSubmission;
