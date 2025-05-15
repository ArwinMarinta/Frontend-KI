import { useEffect, useState } from "react";
import { FormComplateIndustDesign, FormDesignSubmissionErrors } from "../../../../types/submissionType";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
// import { useLocation } from "react-router-dom";
import { getSubTypeIndusDesign, getTypeIndusDesign } from "../../../../service/actions/landingAction";
import { complateSubmissionIndusDesign } from "../../../../service/actions/submissionAction";
import { useLocation } from "react-router-dom";

const useComplateIndustrialDesain = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { designId } = location.state || {};
  console.log(designId);
  const { typeDesign, subtypeDesain } = useSelector((state: RootState) => state.landing.submissionType.indusDesign);

  const [formIndustDesign, setFormIndustDesign] = useState<FormComplateIndustDesign>({
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
  });
  const [formIndustDesignError, setFormIndustDesignError] = useState<FormDesignSubmissionErrors>({
    titleDesign: null,
    type: null,
    typeDesignId: null,
    subtypeDesignId: null,
    claim: null,
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

  const validateIndustrialDesign = (data: FormComplateIndustDesign): FormDesignSubmissionErrors => {
    const errors: FormDesignSubmissionErrors = {
      titleDesign: data.titleDesign.trim() === "" ? "Field Tidak Boleh Kosong!" : null,
      type: data.type.trim() === "" ? "Field Tidak Boleh Kosong!" : null,
      typeDesignId: data.typeDesignId === 0 ? "Field Tidak Boleh Kosong!" : null,
      subtypeDesignId: data.subtypeDesignId === 0 ? "Field Tidak Boleh Kosong!" : null,
      claim: data.claim.length === 0 ? "Klaim harus diisi!" : null,
      looksPerspective: !data.looksPerspective ? "File Tidak Boleh Kosong!" : null,
      frontView: !data.frontView ? "File Tidak Boleh Kosong!" : null,
      backView: !data.backView ? "File Tidak Boleh Kosong!" : null,
      rightSideView: !data.rightSideView ? "File Tidak Boleh Kosong!" : null,
      lefttSideView: !data.lefttSideView ? "File Tidak Boleh Kosong!" : null,
      topView: !data.topView ? "File Tidak Boleh Kosong!" : null,
      downView: !data.downView ? "File Tidak Boleh Kosong!" : null,
      moreImages: !data.moreImages ? "File Tidak Boleh Kosong!" : null,
      letterTransferDesignRights: !data.letterTransferDesignRights ? "File Tidak Boleh Kosong!" : null,
      designOwnershipLetter: !data.designOwnershipLetter ? "File Tidak Boleh Kosong!" : null,
    };

    return errors;
  };

  const handleChangeComplateIndusDesign = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    // Handle input file
    if (type === "file" && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0] || null;

      setFormIndustDesign((prev) => ({
        ...prev,
        [name]: file,
      }));

      setFormIndustDesignError((prev) => ({
        ...prev,
        [name]: file ? null : "File Tidak Boleh Kosong!",
      }));
    } else {
      // Handle input text/select/textarea
      setFormIndustDesign((prev) => ({
        ...prev,
        [name]: value,
      }));

      setFormIndustDesignError((prev) => ({
        ...prev,
        [name]: value.trim() ? null : "Field Tidak Boleh Kosong!",
      }));
    }
  };

  const handleClaimCheckboxChange = (label: string) => {
    setFormIndustDesign((prev) => {
      const exists = prev.claim.includes(label);
      return {
        ...prev,
        claim: exists ? prev.claim.filter((item) => item !== label) : [...prev.claim, label],
      };
    });
  };

  const handleSubmitComplateIndusDesign = () => {
    const errors = validateIndustrialDesign(formIndustDesign);
    const hasErrors = Object.values(errors).some((error) => error !== null);
    if (hasErrors) {
      setFormIndustDesignError(errors);
      return;
    }
    dispatch(complateSubmissionIndusDesign(designId, formIndustDesign));
  };

  useEffect(() => {
    dispatch(getTypeIndusDesign());
  }, [dispatch]);

  useEffect(() => {
    if (formIndustDesign.typeDesignId) {
      dispatch(getSubTypeIndusDesign(formIndustDesign.typeDesignId));
    }
  }, [dispatch, formIndustDesign.typeDesignId]);

  return {
    formIndustDesign,
    formIndustDesignError,
    handleChangeComplateIndusDesign,
    handleSubmitComplateIndusDesign,
    handleClaimCheckboxChange,
    typeDesign,
    subtypeDesain,
  };
};

export default useComplateIndustrialDesain;
