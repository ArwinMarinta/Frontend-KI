// import usePersonalData from "../../submission/hooks/usePersonalData";
// import useSubmissionType from "../../submission/hooks/useSubmissionType";
// import useDraftSubmission from "../../submission/hooks/useDraftSubmission";
// import useBrand from "../../submission/hooks/useBrand";
// import Stepper from "../../submission/components/stepper";
// import Navbar from "../../../../components/navigations/navbar";

// import Form_2 from "../../submission/components/form_2";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../../../service/store";
// import { getDetailSubmission, updateSubmissionPaten } from "../../../../service/actions/submissionAction";
// import useCopyright from "../../submission/hooks/useCopyright";
// import BackButton from "../../../../components/button/backButton";
// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

// const SubmissionUpdate = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const location = useLocation();

//   const { detailSubmission } = useSelector((state: RootState) => state.submission);
//   //   const navigate = useNavigate();
//   const { submissionId, submissionTypes } = location.state || {};
//   const { error, currentStep, submissionType, setCurrentStep } = useSubmissionType();
//   const { personalData, handleChangePerson, addContributor, setPersonalDataError, personalDataError, setPersonalData } = usePersonalData();
//   const { draftPatent, handleDraftPatenChange, errorDraftPatent, setErrorDraftPatent, setDraftPatent } = useDraftSubmission();
//   const { formCopyright, handleChangeCopyright, formCopyrightError, setFormCopyrightError, validateCopyrightData } = useCopyright();
//   const { formBrand, formAdditionalBrand, handleChangeAdditionalBrand, handleChangeBrand, tempAdditionalBrandError, tempAdditionalBrand, addAdditionalBrand, handleDeleteAttempBrand, validateBrandData, setFormBrandError, formBrandError } = useBrand();

//   const toSlug = (text: string): string => {
//     return text.toLowerCase().replace(/\s+/g, "-");
//   };
//   // const handleSubmit = () => {
//   //   if (submissionType === "Hak Cipta") {
//   //     dispatch(createSubmissionCopyright(1, personalData, formCopyright));
//   //   }
//   //   if (submissionType === "Paten") {
//   //     dispatch(updateSubmissionPaten(submissionId, 2, personalData, draftPatent));
//   //   }

//   //   if (submissionType === "Merek") {
//   //     dispatch(createSubmissionBrand(3, personalData, formBrand, formAdditionalBrand));
//   //   }
//   //   if (submissionType === "Desain Industri") {
//   //     dispatch(createSubmissionIndustrialDesign(4, personalData, draftPatent));
//   //   }
//   // };
//   const handleChangeSubmission = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     if (submissionType === "Hak Cipta") {
//       handleChangeCopyright(e);
//     } else if (submissionType === "Merek") {
//       handleChangeBrand(e);
//     } else {
//       handleDraftPatenChange(e);
//     }
//   };

//   const handleNextStep2 = () => {
//     // Set untuk menampung error
//     const errors = personalData.map((data) => {
//       const error = {
//         name: data.name?.trim() === "",
//         email: !/\S+@\S+\.\S+/.test(data.email),
//         faculty: data.faculty === null,
//         studyProgram: data.studyProgram === null,
//         institution: data.institution?.trim() === "",
//         work: data.work?.trim() === "",
//         nationalState: data.nationalState?.trim() === "",
//         countryResidence: data.countryResidence?.trim() === "",
//         province: data.province?.trim() === "",
//         city: data.city?.trim() === "",
//         subdistrict: data.subdistrict?.trim() === "",
//         ward: data.ward?.trim() === "",
//         postalCode: data.postalCode?.trim() === "",
//         phoneNumber: data.phoneNumber?.trim() === "",
//         ktp: data.ktp === null,
//         address: data.address?.trim() === "",
//       };

//       // Return error object for each field
//       return error;
//     });

//     // Flatten the array of error objects to check if any field has an error
//     const flattenedErrors = errors.flat();

//     // Cek apakah ada error pada data yang divalidasi
//     const hasError = flattenedErrors.some((err) => Object.values(err).some((v) => v === true));

//     if (hasError) {
//       // Langsung set error berdasarkan hasil validasi tanpa perlu mapping ulang
//       setPersonalDataError(errors);
//       return;
//     }

//     // Lanjutkan ke langkah berikutnya jika tidak ada error
//     if (currentStep < 1 && !error) {
//       setCurrentStep(currentStep + 1);
//     }
//   };
//   const handleNextStep3 = () => {
//     if (submissionTypes === "Paten" || submissionTypes === "Desain Industri") {
//       if (draftPatent === null) {
//         setErrorDraftPatent(true);
//         return;
//       }
//       dispatch(updateSubmissionPaten(submissionId, 2, personalData, draftPatent));
//     }

//     if (submissionTypes === "Hak Cipta") {
//       const error = validateCopyrightData(formCopyright);

//       const hasError = Object.values(error).includes(true);

//       if (hasError) {
//         setFormCopyrightError(error);

//         return;
//       }

//       if (currentStep < 3) {
//         setCurrentStep(currentStep + 1);
//       }
//     }

//     if (submissionTypes === "Merek") {
//       const error = validateBrandData(formBrand);
//       const hasError = Object.values(error).includes(true);

//       if (hasError) {
//         setFormBrandError(error);
//         return;
//       }

//       if (currentStep < 3) {
//         setCurrentStep(currentStep + 1);
//       }
//     }
//   };

//   useEffect(() => {
//     dispatch(getDetailSubmission(submissionId));
//   }, [dispatch, submissionId]);

//   useEffect(() => {
//     if (detailSubmission) {
//       setPersonalData(detailSubmission.submission.personalDatas ?? []);
//       const fileUrl = detailSubmission.submission.patent?.draftPatentApplicationFile;
//       if (fileUrl) {
//         fetch(fileUrl)
//           .then((response) => response.blob())
//           .then((blob) => {
//             const file = new File([blob], fileUrl, { type: blob.type });
//             setDraftPatent(file);
//           })
//           .catch((error) => console.error("Failed to download file:", error));
//       } else {
//         setDraftPatent(null);
//       }
//     }
//   }, [detailSubmission, setPersonalData, setDraftPatent]);

//   return (
//     <>
//       <Navbar />
//       <main className="w-full flex justify-center">
//         <section className="container w-full flex flex-col py-32 gap-10 ">
//           <div className="grid grid-cols-3 items-center h-24 mb-10">
//             <div>
//               <BackButton url={`/histori-pengajuan/${toSlug(submissionTypes)}`} />
//             </div>
//             <h1 className="text-center text-3xl w-full font-bold">Ubah Data Pengajuan {submissionTypes}</h1>
//           </div>

//           <Stepper currentStep={currentStep} steps={[{ label: "Data Diri" }, { label: "Dokumen Pengajuan" }]} />

//           <div>
//             {currentStep === 0 && <Form_2 error={personalDataError} personalData={personalData} handleChange={handleChangePerson} addContributor={addContributor} handleNextStep={handleNextStep2} />}
//             {currentStep === 1 && (
//               <Form_3
//                 submissionType={submissionTypes}
//                 currentStep={currentStep}
//                 setCurrentStep={setCurrentStep}
//                 draftPatent={draftPatent}
//                 handleChange={handleChangeSubmission}
//                 errorDraftPatent={errorDraftPatent}
//                 formCopyright={formCopyright}
//                 formCopyrightError={formCopyrightError}
//                 handleChangeAdditional={handleChangeAdditionalBrand}
//                 formBrand={formBrand}
//                 formAdditionalBrand={formAdditionalBrand}
//                 tempAdditionalBrand={tempAdditionalBrand}
//                 addAdditionalBrand={addAdditionalBrand}
//                 tempAdditionalBrandError={tempAdditionalBrandError}
//                 handleDeleteAttempBrand={handleDeleteAttempBrand}
//                 formBrandError={formBrandError}
//                 handleNextStep3={handleNextStep3}
//               />
//             )}
//           </div>
//         </section>
//       </main>
//     </>
//   );
// };

// export default SubmissionUpdate;
