import { useEffect, useState } from "react";
import { FormComplatePatenSubmission, FormComplatePatenSubmissionErrors } from "../../../../types/submissionType";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { complateSubmissionPatent, revisionSubmissionPaten } from "../../../../service/actions/submissionAction";
import { useLocation, useNavigate } from "react-router-dom";
import useLoadingProses from "../../../../hooks/useLoadingProses";

const useComplatePaten = () => {
  const location = useLocation();
  const { patenId, types } = location.state || {};
  const { loading, setLoading } = useLoadingProses();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { detailPaten } = useSelector((state: RootState) => state.landing);

  const [formComplatePaten, setFormComplatePaten] = useState<FormComplatePatenSubmission>({
    // entirePatentDocument: null,
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
    inventionName: "",
    statementName: "",
    letterName: "",
  });

  const [formComplatePatenError, setFormComplatePatenError] = useState<FormComplatePatenSubmissionErrors>({
    // entirePatentDocument: null,
    inventionTitle: null,
    patentTypeId: null,
    numberClaims: null,
    description: null,
    abstract: null,
    claim: null,
    inventionImage: null,
    statementInventionOwnership: null,
    letterTransferRightsInvention: null,
  });

  const validateComplatePaten = (data: FormComplatePatenSubmission): FormComplatePatenSubmissionErrors => {
    return {
      // entirePatentDocument: !data.entirePatentDocument ? "File Tidak Boleh Kosong!" : null,
      inventionTitle: data.inventionTitle.trim() === "" ? "Field Tidak Boleh Kosong!" : null,
      patentTypeId: !data.patentTypeId ? "Field Tidak Boleh Kosong!" : null,
      numberClaims: !data.numberClaims ? "Field Tidak Boleh Kosong!" : null,
      description: !data.description ? "File Tidak Boleh Kosong!" : null,
      abstract: !data.abstract ? "File Tidak Boleh Kosong!" : null,
      claim: !data.claim ? "File Tidak Boleh Kosong!" : null,
      inventionImage: !data.inventionImage ? "File Tidak Boleh Kosong!" : null,
      statementInventionOwnership: !data.statementInventionOwnership ? "File Tidak Boleh Kosong!" : null,
      letterTransferRightsInvention: !data.letterTransferRightsInvention ? "File Tidak Boleh Kosong!" : null,
    };
  };

  const handleChangeComplatePaten = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "file" && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0] || null;

      if (file && file.size > 20 * 1024 * 1024) {
        // 20 MB dalam bytes
        setFormComplatePatenError((prev) => ({
          ...prev,
          [name]: "Ukuran file maksimal 20 MB!",
        }));
        setFormComplatePaten((prev) => ({
          ...prev,
          [name]: null,
        }));
        return;
      }

      setFormComplatePaten((prev) => ({
        ...prev,
        [name]: file,
      }));

      setFormComplatePatenError((prev) => ({
        ...prev,
        [name]: file ? null : "File Tidak Boleh Kosong!",
      }));
    } else {
      setFormComplatePaten((prev) => ({
        ...prev,
        [name]: value,
      }));

      setFormComplatePatenError((prev) => ({
        ...prev,
        [name]: value.trim() ? null : "Field Tidak Boleh Kosong!",
      }));
    }
  };

  const handleSubmitComplatePatent = async () => {
    if (types === "Lengkapi Berkas") {
      const errors = validateComplatePaten(formComplatePaten);
      const hasErrors = Object.values(errors).some((error) => error !== null);
      if (hasErrors) {
        setFormComplatePatenError(errors);
        return;
      }

      setLoading(true);
      try {
        await dispatch(complateSubmissionPatent(patenId, formComplatePaten));
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
        });
        navigate("/histori-pengajuan/paten");
      } finally {
        setLoading(false);
      }
    }

    if (types === "Revisi") {
      const errors = validateComplatePaten(formComplatePaten);
      if (types === "Revisi") {
        errors.claim = null;
        errors.description = null;
        errors.abstract = null;
        errors.inventionImage = null;
        errors.statementInventionOwnership = null;
        errors.letterTransferRightsInvention = null;
      }
      const hasErrors = Object.values(errors).some((error) => error !== null);

      if (hasErrors) {
        setFormComplatePatenError(errors);
        return;
      }
      setLoading(true);
      try {
        await dispatch(revisionSubmissionPaten(detailPaten?.id, formComplatePaten));
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
        });
        navigate("/histori-pengajuan/paten");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const initForm = async () => {
      if (!detailPaten || types !== "Revisi") return;

      // const description = await processFile(detailPaten.description);
      // const abstract = await processFile(detailPaten.abstract);
      // const claim = await processFile(detailPaten.claim);
      // const inventionImage = await processFile(detailPaten.inventionImage);
      // const statement = await processFile(detailPaten.statementInventionOwnership);
      // const letter = await processFile(detailPaten.letterTransferRightsInvention);

      setFormComplatePaten({
        inventionTitle: detailPaten.inventionTitle || "",
        patentTypeId: detailPaten.patentTypeId || "",
        numberClaims: detailPaten.numberClaims || "",
        description: null,
        abstract: null,
        claim: null,
        inventionImage: null,
        statementInventionOwnership: null,
        letterTransferRightsInvention: null,
      });
    };

    initForm();
  }, [detailPaten, types]);

  return {
    formComplatePaten,
    formComplatePatenError,
    handleChangeComplatePaten,
    handleSubmitComplatePatent,
    loading,
    patenId,
    validateComplatePaten,
    setFormComplatePatenError,
    detailPaten,
    setFormComplatePaten,
  };
};

export default useComplatePaten;
