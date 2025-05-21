import { useEffect } from "react";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import SideSubmisson from "../../../../components/adminNavigation/sideSubmisson";
import ModalLoading from "../../../../components/modal/modalLoading";

import FormComplateIndustrialDesign from "../components/complete/formComplateIndustrialDesign";
import FormComplatePatent from "../components/complete/formComplatePatent";
import FormConfimPayment from "../components/complete/formConfimPayment";
import FormFunding from "../components/complete/formFunding";

import useComplate from "../hooks/useComplate";
import useComplateIndustrialDesain from "../hooks/useComplateIndustrialDesain";
import useComplatePaten from "../hooks/useComplatePaten";
import useRevision from "../hooks/useRevision";
import useSchemaPayment from "../hooks/useSchemaPayment";
import { getDetailSubmissionLanding, getQuotaLanding, getSubTypeCopyright, getSubTypeIndusDesign, getTermsLanding, getTypeBrand, getTypeCopyright, getTypeIndusDesign, getTypePaten } from "../../../../service/actions/landingAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../service/store";
import RevisionCopyright from "../components/complete/revisionCopyright";
import useCopyright from "../hooks/useCopyright";
import RevisionPaten from "../components/complete/revisionPaten";
import RevisionBrand from "../components/complete/revisionBrand";
import useBrand from "../hooks/useBrand";
import RevisionIndusDesign from "../components/complete/revisionIndusDesign";
import useConfirmPayment from "../hooks/useConfirmPayment";
import { getDetailSubmission } from "../../../../service/actions/submissionAction";

const SubmissionComplete = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { types, submissionType, submissionId } = useComplate();
  const { formComplatePaten, formComplatePatenError, handleChangeComplatePaten, handleSubmitComplatePatent, loading: loadingPaten } = useComplatePaten();
  const { formIndustDesign, formIndustDesignError, handleChangeComplateIndusDesign, handleSubmitComplateIndusDesign, handleClaimCheckboxChange, loading: loadingDesign } = useComplateIndustrialDesain();
  const { terms, formSchemaPayment, formSchemaPaymentErrors, handleChangeSchema, handleCheckboxChange, handleSubmitSchema, qouta, loading: loadingSchema } = useSchemaPayment();
  const { progresSubmission } = useRevision();
  const { formCopyright, handleChangeCopyright, formCopyrightError, handleSubmitCopyright, loading: loadingCopyright } = useCopyright();
  const { formBrand, formAdditionalBrand, handleChangeAdditionalBrand, handleChangeBrand, tempAdditionalBrandError, tempAdditionalBrand, addAdditionalBrand, handleDeleteAttempBrand, formBrandError, handleSubmitRevision, loading: loadingBrand } = useBrand();
  const { formConfirmPayment, handleChange, formConfirmPaymentErrors, handleSubmitPayment, loading: loadingConfirmPayment } = useConfirmPayment();

  useEffect(() => {
    if (submissionType === "Paten") {
      dispatch(getTypePaten());
      dispatch(getDetailSubmissionLanding("Paten", submissionId));
    }
    if (submissionType === "Desain Industri") {
      dispatch(getDetailSubmissionLanding("Desain Industri", submissionId));
      dispatch(getTypeIndusDesign());
      if (formIndustDesign?.typeDesignId) {
        dispatch(getSubTypeIndusDesign(formIndustDesign.typeDesignId));
      }
    }
    if (submissionType === "Hak Cipta") {
      dispatch(getDetailSubmissionLanding("Hak Cipta", submissionId));
      dispatch(getTypeCopyright());
      if (formCopyright?.typeCreation) {
        dispatch(getSubTypeCopyright(formCopyright.typeCreation));
      }
    }

    if (submissionType === "Merek") {
      dispatch(getDetailSubmissionLanding("Merek", submissionId));
      dispatch(getTypeBrand());
    }
  }, [dispatch, submissionType, formIndustDesign.typeDesignId, formCopyright.typeCreation, submissionId]);

  useEffect(() => {
    dispatch(getTermsLanding());
    dispatch(getDetailSubmission(submissionId));
    dispatch(getQuotaLanding());
  }, [dispatch, submissionId]);

  return (
    <>
      <div className="flex flex-row w-full h-full bg-[#F6F9FF]">
        <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
          <SideSubmisson />
        </div>
        <div className="lg:w-[84%] w-full  border ">
          <HeaderNavigation />
          <div className="px-4 lg:px-12  py-8 ">
            <div className=" lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50 ">
              {types === "Lengkapi Berkas" && submissionType === "Paten" && (
                <FormComplatePatent submissionType={submissionType} formComplatePaten={formComplatePaten} formComplatePatenError={formComplatePatenError} handleChangeComplatePaten={handleChangeComplatePaten} handleSubmitComplatePatent={handleSubmitComplatePatent} />
              )}
              {types === "Lengkapi Berkas" && submissionType === "Desain Industri" && (
                <FormComplateIndustrialDesign
                  handleClaimCheckboxChange={handleClaimCheckboxChange}
                  formIndustDesign={formIndustDesign}
                  formIndustDesignError={formIndustDesignError}
                  handleChangeComplateIndusDesign={handleChangeComplateIndusDesign}
                  handleSubmitComplateIndusDesign={handleSubmitComplateIndusDesign}
                />
              )}
              {types === "Skema Pendanaan" && (
                <FormFunding qouta={qouta} terms={terms} formSchemaPayment={formSchemaPayment} formSchemaPaymentErrors={formSchemaPaymentErrors} handleChangeSchema={handleChangeSchema} handleCheckboxChange={handleCheckboxChange} handleSubmitSchema={handleSubmitSchema} />
              )}
              {types === "Revisi" && submissionType === "Hak Cipta" && <RevisionCopyright progresSubmission={progresSubmission} formCopyright={formCopyright} handleChange={handleChangeCopyright} formCopyrightError={formCopyrightError} handleUpdate={handleSubmitCopyright} />}
              {types === "Revisi" && submissionType === "Paten" && (
                <RevisionPaten progresSubmission={progresSubmission} formComplatePaten={formComplatePaten} formComplatePatenError={formComplatePatenError} handleChangeComplatePaten={handleChangeComplatePaten} handleSubmitComplatePatent={handleSubmitComplatePatent} />
              )}
              {types === "Revisi" && submissionType === "Merek" && (
                <RevisionBrand
                  progresSubmission={progresSubmission}
                  formBrand={formBrand}
                  handleChange={handleChangeBrand}
                  formBrandError={formBrandError}
                  handleChangeAdditional={handleChangeAdditionalBrand}
                  formAdditionalBrand={formAdditionalBrand}
                  tempAdditionalBrand={tempAdditionalBrand}
                  addAdditionalBrand={addAdditionalBrand}
                  tempAdditionalBrandError={tempAdditionalBrandError}
                  handleDeleteAttempBrand={handleDeleteAttempBrand}
                  handleNextStep={handleSubmitRevision}
                />
              )}
              {types === "Revisi" && submissionType === "Desain Industri" && (
                <RevisionIndusDesign
                  progresSubmission={progresSubmission}
                  formIndustDesign={formIndustDesign}
                  formIndustDesignError={formIndustDesignError}
                  handleChangeComplateIndusDesign={handleChangeComplateIndusDesign}
                  handleSubmitComplateIndusDesign={handleSubmitComplateIndusDesign}
                  handleClaimCheckboxChange={handleClaimCheckboxChange}
                />
              )}
              {types === "Pembayaran" && <FormConfimPayment formConfirmPayment={formConfirmPayment} handleChange={handleChange} formConfirmPaymentErrors={formConfirmPaymentErrors} handleSubmitPayment={handleSubmitPayment} />}
            </div>
          </div>
        </div>
        <ModalLoading show={loadingPaten || loadingDesign || loadingSchema || loadingBrand || loadingConfirmPayment || loadingCopyright} />
      </div>
    </>
  );
};

export default SubmissionComplete;
