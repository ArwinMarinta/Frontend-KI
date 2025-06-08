import { useEffect, useState } from "react";
import { FormComplateIndustDesign, FormDesignSubmissionErrors } from "../../../../types/submissionType";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { complateSubmissionIndusDesign, revisionSubmissionIndustrialDesign } from "../../../../service/actions/submissionAction";
import { useLocation, useNavigate } from "react-router-dom";
import useLoadingProses from "../../../../hooks/useLoadingProses";
import { processFile } from "../../../../utils/formatFile";

const useComplateIndustrialDesain = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { loading, setLoading } = useLoadingProses();
  const { designId, types } = location.state || {};
  const navigate = useNavigate();
  const { detailDesign } = useSelector((state: RootState) => state.landing);

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
    draftDesainIndustriApplicationFile: null as File | null,
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

  const handleClaimCheckboxChange = (value: string) => {
    setFormIndustDesign((prev) => {
      const exists = prev.claim.includes(value);
      return {
        ...prev,
        claim: exists ? prev.claim.filter((item) => item !== value) : [...prev.claim, value],
      };
    });
  };

  const handleSubmitComplateIndusDesign = async () => {
    const errors = validateIndustrialDesign(formIndustDesign);
    const hasErrors = Object.values(errors).some((error) => error !== null);
    if (hasErrors) {
      setFormIndustDesignError(errors);
      return;
    }

    if (types === "Lengkapi Berkas") {
      setLoading(true);
      try {
        await dispatch(complateSubmissionIndusDesign(designId, formIndustDesign));
        setFormIndustDesign({
          titleDesign: "",
          type: "",
          typeDesignId: 0,
          subtypeDesignId: 0,
          claim: [],
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
        navigate("/histori-pengajuan/desain-industri");
      } finally {
        setLoading(false);
      }
    }

    if (types === "Revisi") {
      setLoading(true);
      try {
        await dispatch(revisionSubmissionIndustrialDesign(detailDesign?.id, formIndustDesign));
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
        });
        navigate("/histori-pengajuan/desain-industri");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const initForm = async () => {
      if (!detailDesign || types !== "Revisi") return;

      const looksPerspective = await processFile(detailDesign.looksPerspective);
      const frontView = await processFile(detailDesign.frontView);
      const backView = await processFile(detailDesign.backView);
      const rightSideView = await processFile(detailDesign.rightSideView);
      const lefttSideView = await processFile(detailDesign.lefttSideView);
      const topView = await processFile(detailDesign.topView);
      const downView = await processFile(detailDesign.downView);
      const moreImages = await processFile(detailDesign.moreImages);
      const letterTransferDesignRights = await processFile(detailDesign.letterTransferDesignRights);
      const designOwnershipLetter = await processFile(detailDesign.designOwnershipLetter);

      setFormIndustDesign({
        titleDesign: detailDesign.titleDesign || "",
        type: detailDesign.type || "",
        typeDesignId: detailDesign.typeDesignId || 0,
        subtypeDesignId: detailDesign.subtypeDesignId || 0,
        claim: typeof detailDesign.claim === "string" ? [detailDesign.claim] : Array.isArray(detailDesign.claim) ? detailDesign.claim : [],
        looksPerspective,
        frontView,
        backView,
        rightSideView,
        lefttSideView,
        topView,
        downView,
        moreImages,
        letterTransferDesignRights,
        designOwnershipLetter,
      });
    };

    initForm();
  }, [detailDesign, types]);

  return {
    formIndustDesign,
    formIndustDesignError,
    handleChangeComplateIndusDesign,
    handleSubmitComplateIndusDesign,
    handleClaimCheckboxChange,
    setFormIndustDesign,
    loading,
    setFormIndustDesignError,
    validateIndustrialDesign,
  };
};

export default useComplateIndustrialDesain;
