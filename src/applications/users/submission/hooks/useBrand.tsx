import { useEffect, useState } from "react";
import { FormAdditionalBrand, FormAdditionalBrandError, FormSubmissionBrand } from "../../../../types/brandType";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import useLoadingProses from "../../../../hooks/useLoadingProses";
import { revisonSubmissionBrand } from "../../../../service/actions/submissionAction";
import { processFile } from "../../../../utils/formatFile";

const useBrand = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, setLoading } = useLoadingProses();
  const navigate = useNavigate();
  const { types } = location.state || {};
  const { detailBrand } = useSelector((state: RootState) => state.landing);

  const [formBrand, setFormBrand] = useState<FormSubmissionBrand>({
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

  const [formAdditionalBrand, setFormAdditionalBrand] = useState<FormAdditionalBrand[]>([]);

  const [tempAdditionalBrand, setTempAdditionalBrand] = useState<FormAdditionalBrand>({
    additionalDescriptions: "",
    additionalFiles: null,
  });

  const [tempAdditionalBrandError, setTempAdditionalBrandError] = useState<FormAdditionalBrandError>({
    additionalDescriptions: false,
    additionalFiles: false,
  });

  const [formBrandError, setFormBrandError] = useState<Record<keyof FormSubmissionBrand, boolean>>({
    applicationType: false,
    brandType: false,
    referenceName: false,
    elementColor: false,
    translate: false,
    pronunciation: false,
    disclaimer: false,
    description: false,
    documentType: false,
    information: false,
    labelBrand: false,
    fileUploade: false,
    signature: false,
    InformationLetter: false,
    letterStatment: false,
  });

  const validateBrandData = (data: FormSubmissionBrand) => {
    const error = {
      applicationType: data.applicationType.trim() === "",
      brandType: data.brandType === null,
      referenceName: data.referenceName.trim() === "",
      elementColor: data.elementColor.trim() === "",
      translate: data.translate.trim() === "",
      pronunciation: data.pronunciation.trim() === "",
      disclaimer: data.disclaimer.trim() === "",
      description: data.description.trim() === "",
      documentType: data.documentType.trim() === "",
      information: data.information.trim() === "",
      labelBrand: data.labelBrand === null || data.labelBrand === undefined,
      fileUploade: data.fileUploade === null || data.fileUploade === undefined,
      signature: data.signature === null || data.signature === undefined,
      InformationLetter: data.InformationLetter === null || data.InformationLetter === undefined,
      letterStatment: data.letterStatment === null || data.letterStatment === undefined,
    };

    return error;
  };

  const handleChangeBrand = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Type Guard untuk memastikan e.target adalah HTMLInputElement dan memiliki files
    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const { files } = e.target;
      const file = files ? files[0] : null;
      setFormBrand((prev) => ({
        ...prev,
        [name]: file,
      }));
      setFormBrandError((prev) => ({
        ...prev,
        [name]: !file,
      }));
    } else {
      setFormBrand((prev) => ({
        ...prev,
        [name]: value,
      }));

      setFormBrandError((prev) => ({
        ...prev,
        [name]: value.trim() === "",
      }));
    }
  };

  const handleChangeAdditionalBrand = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof FormAdditionalBrand;

    if (e.target.type === "file") {
      const input = e.target as HTMLInputElement;
      const file = input.files?.[0] || null;

      setTempAdditionalBrand((prev) => ({
        ...prev,
        [name]: file,
      }));

      setTempAdditionalBrandError((prev) => ({
        ...prev,
        [name]: !file,
      }));

      // Reset input agar bisa pilih file yang sama lagi nanti
      input.value = "";
    } else {
      const value = e.target.value;

      setTempAdditionalBrand((prev) => ({
        ...prev,
        [name]: value,
      }));

      setTempAdditionalBrandError((prev) => ({
        ...prev,
        [name]: value.trim() === "",
      }));
    }
  };

  const addAdditionalBrand = () => {
    const errors = {
      additionalDescriptions: tempAdditionalBrand.additionalDescriptions.trim() === "",
      additionalFiles: tempAdditionalBrand.additionalFiles === null,
    };

    setTempAdditionalBrandError(errors);

    const hasError = Object.values(errors).some((val) => val);
    if (hasError) return;

    setFormAdditionalBrand((prev) => [...prev, tempAdditionalBrand]);

    setTempAdditionalBrand({
      additionalDescriptions: "",
      additionalFiles: null,
    });
    setTempAdditionalBrandError({
      additionalDescriptions: false,
      additionalFiles: false,
    });
  };

  const handleDeleteAttempBrand = (index: number) => {
    setFormAdditionalBrand((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitRevision = async () => {
    const error = validateBrandData(formBrand);
    const hasError = Object.values(error).includes(true);

    if (hasError) {
      setFormBrandError(error);
      return;
    }

    if (types === "Revisi") {
      setLoading(true);
      try {
        await dispatch(revisonSubmissionBrand(detailBrand?.id, formBrand, formAdditionalBrand));
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
        navigate("/histori-pengajuan/merek");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const initFormBrand = async () => {
      if (!detailBrand || types !== "Revisi") return;

      // Proses file-file di formBrand
      const labelBrand = await processFile(detailBrand.labelBrand);
      const fileUploade = await processFile(detailBrand.fileUploade);
      const signature = await processFile(detailBrand.signature);
      const InformationLetter = await processFile(detailBrand.InformationLetter);
      const letterStatment = await processFile(detailBrand.letterStatment);

      // Set formBrand state
      setFormBrand({
        applicationType: detailBrand.applicationType || "",
        brandType: detailBrand?.brandTypeId || null,
        referenceName: detailBrand.referenceName || "",
        elementColor: detailBrand.elementColor || "",
        translate: detailBrand.translate || "",
        pronunciation: detailBrand.pronunciation || "",
        disclaimer: detailBrand.disclaimer || "",
        description: detailBrand.description || "",
        documentType: detailBrand.documentType || "",
        information: detailBrand.information || "",
        labelBrand,
        fileUploade,
        signature,
        InformationLetter,
        letterStatment,
      });

      if (detailBrand.additionalDatas && Array.isArray(detailBrand.additionalDatas)) {
        const mappedAdditionalBrands: FormAdditionalBrand[] = await Promise.all(
          detailBrand.additionalDatas.map(async (item) => {
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
    };

    initFormBrand();
  }, [detailBrand, types]);

  return {
    formBrand,
    formAdditionalBrand,
    setFormAdditionalBrand,
    formBrandError,
    setFormBrandError,
    handleChangeBrand,
    addAdditionalBrand,
    handleChangeAdditionalBrand,
    tempAdditionalBrandError,
    tempAdditionalBrand,
    handleDeleteAttempBrand,
    validateBrandData,
    setFormBrand,
    handleSubmitRevision,
    loading,
  };
};

export default useBrand;
