import { useEffect, useState } from "react";
import { FormComplateIndustDesign, FormDesignSubmissionErrors } from "../../../../types/submissionType";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { complateSubmissionIndusDesign, revisionSubmissionIndustrialDesign } from "../../../../service/actions/submissionAction";
import { useLocation, useNavigate } from "react-router-dom";
import useLoadingProses from "../../../../hooks/useLoadingProses";

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
      titleDesign: data.titleDesign.trim() === "" ? "Judul tidak boleh kosong!" : null,
      type: data.type.trim() === "" ? "Type tidak boleh kosong!" : null,
      typeDesignId: data.typeDesignId === 0 ? "Jenis tidak boleh kosong!" : null,
      subtypeDesignId: data.subtypeDesignId === 0 ? "Sub-jenis tidak boleh kosong!" : null,
      claim: data.claim.length === 0 ? "Klaim harus diisi!" : null,
      looksPerspective: !data.looksPerspective ? "Tampak perspektif tidak boleh kosong!" : null,
      frontView: !data.frontView ? "Tampak depan tidak boleh kosong!" : null,
      backView: !data.backView ? "Tampak belakang tidak boleh kosong!" : null,
      rightSideView: !data.rightSideView ? "Tampak samping kanan tidak boleh kosong!" : null,
      lefttSideView: !data.lefttSideView ? "Tampak samping kiri tidak boleh kosong!" : null,
      topView: !data.topView ? "Tampak atas tidak boleh kosong!" : null,
      downView: !data.downView ? "Tampak bawah tidak boleh kosong!" : null,
      moreImages: !data.moreImages ? "Gambar lainnya tidak boleh kosong!" : null,
      letterTransferDesignRights: !data.letterTransferDesignRights ? "Surat pengalihan tidak boleh kosong!" : null,
      designOwnershipLetter: !data.designOwnershipLetter ? "Surat kepemilikan tidak boleh kosong!" : null,
    };

    return errors;
  };

  const handleChangeComplateIndusDesign = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    // Handle input file
    if (type === "file" && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0] || null;

      if (file) {
        const maxSizeMB = 20;
        const maxSizeBytes = maxSizeMB * 1024 * 1024;

        if (file.size > maxSizeBytes) {
          // File terlalu besar
          setFormIndustDesign((prev) => ({
            ...prev,
            [name]: null,
          }));

          setFormIndustDesignError((prev) => ({
            ...prev,
            [name]: `Ukuran file maksimal ${maxSizeMB} MB`,
          }));
          return;
        }
      }

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
      const updatedClaim = exists ? prev.claim.filter((item) => item !== value) : [...prev.claim, value];

      if (updatedClaim.length === 0) {
        setFormIndustDesignError((prevErrors) => ({
          ...prevErrors,
          claim: "Claim harus diisi minimal satu",
        }));
      } else {
        setFormIndustDesignError((prevErrors) => ({
          ...prevErrors,
          claim: null,
        }));
      }

      return {
        ...prev,
        claim: updatedClaim,
      };
    });
  };

  const handleSubmitComplateIndusDesign = async () => {
    if (types === "Lengkapi Berkas") {
      const errors = validateIndustrialDesign(formIndustDesign);
      const hasErrors = Object.values(errors).some((error) => error !== null);
      if (hasErrors) {
        setFormIndustDesignError(errors);
        return;
      }
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
      const errors = validateIndustrialDesign(formIndustDesign);
      if (types === "Revisi") {
        errors.looksPerspective = null;
        errors.frontView = null;
        errors.backView = null;
        errors.rightSideView = null;
        errors.lefttSideView = null;
        errors.topView = null;
        errors.downView = null;
        errors.moreImages = null;
        errors.letterTransferDesignRights = null;
        errors.designOwnershipLetter = null;
      }
      const hasErrors = Object.values(errors).some((error) => error !== null);
      if (hasErrors) {
        setFormIndustDesignError(errors);
        return;
      }
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

      // const looksPerspective = await processFile(detailDesign.looksPerspective);
      // const frontView = await processFile(detailDesign.frontView);
      // const backView = await processFile(detailDesign.backView);
      // const rightSideView = await processFile(detailDesign.rightSideView);
      // const lefttSideView = await processFile(detailDesign.lefttSideView);
      // const topView = await processFile(detailDesign.topView);
      // const downView = await processFile(detailDesign.downView);
      // const moreImages = await processFile(detailDesign.moreImages);
      // const letterTransferDesignRights = await processFile(detailDesign.letterTransferDesignRights);
      // const designOwnershipLetter = await processFile(detailDesign.designOwnershipLetter);

      setFormIndustDesign({
        titleDesign: detailDesign.titleDesign || "",
        type: detailDesign.type || "",
        typeDesignId: detailDesign.typeDesignId || 0,
        subtypeDesignId: detailDesign.subtypeDesignId || 0,
        claim: typeof detailDesign.claim === "string" ? [detailDesign.claim] : Array.isArray(detailDesign.claim) ? detailDesign.claim : [],
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
