import { useEffect, useState } from "react";
import { FormAdditionalBrand, FormAdditionalBrandError, FormSubmissionBrand, FormSubmissionBrandError } from "../../../../types/brandType";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import useLoadingProses from "../../../../hooks/useLoadingProses";
import { complateSubmissionBrand, revisonSubmissionBrand } from "../../../../service/actions/submissionAction";
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
    brandType: 0,
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
    additionalDescriptions: null,
    additionalFiles: null,
  });

  const [formBrandError, setFormBrandError] = useState<FormSubmissionBrandError>({
    applicationType: null,
    brandType: null,
    referenceName: null,
    elementColor: null,
    translate: null,
    pronunciation: null,
    disclaimer: null,
    description: null,
    documentType: null,
    information: null,
    labelBrand: null,
    fileUploade: null,
    signature: null,
    InformationLetter: null,
    letterStatment: null,
  });

  const validateBrandData = (data: FormSubmissionBrand): FormSubmissionBrandError => {
    return {
      applicationType: data.applicationType.trim() === "" ? "Tipe permohonan wajib diisi" : null,
      brandType: data.brandType === null ? "Tipe Brand wajib dipilih" : null,
      referenceName: data.referenceName.trim() === "" ? "Refrensi Label Merek wajib diisi" : null,
      elementColor: data.elementColor.trim() === "" ? "Warna Label Merek wajib diisi" : null,
      translate: null,
      pronunciation: null,
      disclaimer: null,
      description: null,
      documentType: data.documentType.trim() === "" ? "Jenis dokumen wajib diisi" : null,
      information: null,
      labelBrand: data.labelBrand == null ? "Label Merek wajib dipilih" : null,
      // fileUploade: data.fileUploade == null ? "Tanda Tangan Permohonan" : null,
      signature: data.signature == null ? "Tanda tangan wajib diunggah" : null,
      // InformationLetter: data.InformationLetter == null ? "Information Letter wajib diunggah" : null,
      // letterStatment: data.letterStatment == null ? "Letter Statement wajib diunggah" : null,
    };
  };
  const handleChangeBrand = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const files = e.target.files;
      const file = files ? files[0] : null;

      if (!file) {
        // Kalau gak ada file, set error
        setFormBrandError((prev) => ({
          ...prev,
          [name]: "File tidak boleh kosong",
        }));
        setFormBrand((prev) => ({
          ...prev,
          [name]: null,
        }));
        return;
      }

      const maxSizeMB = name === "labelBrand" ? 5 : 25;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;

      if (file.size > maxSizeBytes) {
        setFormBrandError((prev) => ({
          ...prev,
          [name]: `Ukuran file maksimal ${maxSizeMB} MB`,
        }));
        setFormBrand((prev) => ({
          ...prev,
          [name]: null,
        }));
        return;
      }

      if (name === "labelBrand") {
        // Validasi dimensi gambar
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
          if (img.width !== 1024 || img.height !== 1024) {
            setFormBrandError((prev) => ({
              ...prev,
              [name]: "Dimensi gambar harus 1024 x 1024 px",
            }));
            setFormBrand((prev) => ({
              ...prev,
              [name]: null,
            }));
          } else {
            setFormBrandError((prev) => ({
              ...prev,
              [name]: null,
            }));
            setFormBrand((prev) => ({
              ...prev,
              [name]: file,
            }));
          }
          URL.revokeObjectURL(objectUrl);
        };

        img.onerror = () => {
          setFormBrandError((prev) => ({
            ...prev,
            [name]: "File bukan gambar yang valid",
          }));
          setFormBrand((prev) => ({
            ...prev,
            [name]: null,
          }));
          URL.revokeObjectURL(objectUrl);
        };

        img.src = objectUrl;
      } else {
        // Untuk file lain hanya cek ukuran
        setFormBrandError((prev) => ({
          ...prev,
          [name]: null,
        }));
        setFormBrand((prev) => ({
          ...prev,
          [name]: file,
        }));
      }
    } else {
      // Untuk input selain file
      setFormBrand((prev) => ({
        ...prev,
        [name]: value,
      }));

      setFormBrandError((prev) => ({
        ...prev,
        [name]: value.trim() === "" ? "Field tidak boleh kosong" : null,
      }));
    }
  };

  const handleChangeAdditionalBrand = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof FormAdditionalBrand;

    if (e.target.type === "file") {
      const input = e.target as HTMLInputElement;
      const file = input.files?.[0] || null;

      if (file) {
        const maxSizeMB = 2;
        const maxSizeBytes = maxSizeMB * 1024 * 1024;

        if (file.size > maxSizeBytes) {
          // Jika file melebihi batas
          setTempAdditionalBrand((prev) => ({
            ...prev,
            [name]: null,
          }));
          setTempAdditionalBrandError((prev) => ({
            ...prev,
            [name]: `Ukuran file maksimal ${maxSizeMB}MB`,
          }));
          input.value = "";
          return;
        }
      }

      setTempAdditionalBrand((prev) => ({
        ...prev,
        [name]: file,
      }));

      setTempAdditionalBrandError((prev) => ({
        ...prev,
        [name]: file ? null : "File tidak boleh kosong",
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
        [name]: value.trim() === "" ? "Field tidak boleh kosong" : null,
      }));
    }
  };

  const addAdditionalBrand = () => {
    const errors = {
      additionalDescriptions: tempAdditionalBrand.additionalDescriptions.trim() === "" ? "Deskripsi tambahan wajib diisi" : null,
      additionalFiles: tempAdditionalBrand.additionalFiles === null ? "File tambahan wajib diunggah" : null,
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
      additionalDescriptions: null,
      additionalFiles: null,
    });
  };

  const handleDeleteAttempBrand = (index: number) => {
    setFormAdditionalBrand((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitRevision = async () => {
    const error = validateBrandData(formBrand);

    if (types === "Revisi") {
      error.labelBrand = null;
      error.signature = null;
      error.fileUploade = null;
      error.InformationLetter = null;
      error.letterStatment = null;
    }

    const hasError = Object.values(error).some((value) => value !== null);

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
        setFormAdditionalBrand([]);
        navigate("/histori-pengajuan/merek");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleComplateBrand = async () => {
    const error = {
      applicationType: null,
      brandType: null,
      referenceName: null,
      elementColor: null,
      translate: null,
      pronunciation: null,
      disclaimer: null,
      description: null,
      documentType: null,
      information: null,
      labelBrand: null,
      fileUploade: formBrand.fileUploade == null ? "Surat Pernyataan dan Keterangan wajib diunggah" : null,
      signature: null,
      InformationLetter: null,
      letterStatment: null,
    };
    const hasError = Object.values(error).some((val) => val !== null);

    if (hasError) {
      setFormBrandError(error);
      return;
    }

    if (types === "Lengkapi Berkas") {
      setLoading(true);
      try {
        await dispatch(complateSubmissionBrand(detailBrand?.id, formBrand));
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
      // const labelBrand = await processFile(detailBrand.labelBrand);
      // const fileUploade = await processFile(detailBrand.fileUploade);
      // const signature = await processFile(detailBrand.signature);
      // const InformationLetter = await processFile(detailBrand.InformationLetter);
      // const letterStatment = await processFile(detailBrand.letterStatment);

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
        labelBrand: null,
        fileUploade: null,
        signature: null,
        InformationLetter: null,
        letterStatment: null,
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
    setTempAdditionalBrand,
    handleComplateBrand,
  };
};

export default useBrand;
