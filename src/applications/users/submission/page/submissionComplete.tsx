import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import SideSubmisson from "../../../../components/adminNavigation/sideSubmisson";

import FormComplateIndustrialDesign from "../components/complete/formComplateIndustrialDesign";
import FormComplatePatent from "../components/complete/formComplatePatent";
import FormConfimPayment from "../components/complete/formConfimPayment";
import FormFunding from "../components/complete/formFunding";
import FormRevision from "../components/complete/formRevision";
import useComplate from "../hooks/useComplate";
import useComplateIndustrialDesain from "../hooks/useComplateIndustrialDesain";
import useComplatePaten from "../hooks/useComplatePaten";
import useRevision from "../hooks/useRevision";
import useSchemaPayment from "../hooks/useSchemaPayment";

const SubmissionComplete = () => {
  const { types, submissionType } = useComplate();
  const { formComplatePaten, formComplatePatenError, handleChangeComplatePaten, handleSubmitComplatePatent } = useComplatePaten();
  const { formIndustDesign, formIndustDesignError, handleChangeComplateIndusDesign, handleSubmitComplateIndusDesign, handleClaimCheckboxChange, typeDesign, subtypeDesain } = useComplateIndustrialDesain();
  const { terms, formSchemaPayment, formSchemaPaymentErrors, handleChangeSchema, handleCheckboxChange, handleSubmitSchema, qouta } = useSchemaPayment();
  const { progresSubmission } = useRevision();

  return (
    <>
      <div className="flex flex-row w-full h-full bg-gray-100">
        <div className="min-h-full w-[16%] bg-white">
          <SideSubmisson />
        </div>
        <div className="w-[84%]  border  ">
          <HeaderNavigation />
          <div className="container  mt-16  ">
            <div className="bg-white p-8">
              {types === "Lengkapi Berkas" && submissionType === "Paten" && (
                <FormComplatePatent submissionType={submissionType} formComplatePaten={formComplatePaten} formComplatePatenError={formComplatePatenError} handleChangeComplatePaten={handleChangeComplatePaten} handleSubmitComplatePatent={handleSubmitComplatePatent} />
              )}
              {types === "Lengkapi Berkas" && submissionType === "Desain Industri" && (
                <FormComplateIndustrialDesign
                  typeDesign={typeDesign}
                  subtypeDesain={subtypeDesain}
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
              {types === "Revisi" && <FormRevision progresSubmission={progresSubmission} />}
              {types === "Pembayaran" && <FormConfimPayment />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmissionComplete;
