import { useEffect, useState } from "react";
import { FormSubmissionCopyright, FormSubmissionCopyrightError } from "../../../../types/copyright";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import useLoadingProses from "../../../../hooks/useLoadingProses";
import { complateSubmissionCopyright, revisonSubmissionCopyright } from "../../../../service/actions/submissionAction";

const useCopyright = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, setLoading } = useLoadingProses();
  const navigate = useNavigate();
  const { types } = location.state || {};
  const { detailCopyright } = useSelector((state: RootState) => state.landing);

  // const {  } = useSelector((state: RootState) => state.landing);

  const [formCopyright, setFormCopyright] = useState<FormSubmissionCopyright>({
    titleInvention: "",
    typeCreation: null,
    subTypeCreation: null,
    countryFirstAnnounced: "",
    cityFirstAnnounced: "",
    timeFirstAnnounced: "",
    briefDescriptionCreation: "",
    statementLetter: null as File | null,
    letterTransferCopyright: null as File | null,
    exampleCreation: null as File | null,
    statementName: "",
    letterName: "",
    exampleName: "",
    exampleCreationUrl: "",
  });

  const [formCopyrightError, setFormCopyrightError] = useState<FormSubmissionCopyrightError>({
    titleInvention: null,
    typeCreation: null,
    subTypeCreation: null,
    countryFirstAnnounced: null,
    cityFirstAnnounced: null,
    timeFirstAnnounced: null,
    briefDescriptionCreation: null,
    statementLetter: null,
    letterTransferCopyright: null,
    exampleCreation: null,
  });

  const validateCopyrightData = (data: FormSubmissionCopyright) => {
    return {
      titleInvention: data.titleInvention.trim() === "" ? "Judul ciptaan wajib diisi" : null,
      typeCreation: data.typeCreation === null ? "Jenis ciptaan wajib dipilih" : null,
      subTypeCreation: data.subTypeCreation === null ? "Sub jenis ciptaan wajib dipilih" : null,
      countryFirstAnnounced: data.countryFirstAnnounced.trim() === "" ? "Negara diumumkan wajib diisi" : null,
      cityFirstAnnounced: data.cityFirstAnnounced.trim() === "" ? "Kota diumumkan wajib diisi" : null,
      timeFirstAnnounced: data.timeFirstAnnounced.trim() === "" ? "Waktu diumumkan wajib diisi" : null,
      briefDescriptionCreation: data.briefDescriptionCreation.trim() === "" ? "Deskripsi singkat wajib diisi" : null,
      statementLetter: !data.statementLetter ? "Surat pernyataan wajib diunggah" : null,
      letterTransferCopyright: !data.letterTransferCopyright ? "Surat pengalihan hak wajib diunggah" : null,
      exampleCreation: null,
    };
  };

  const handleChangeCopyright = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const { files } = e.target;
      const file = files?.[0] ?? null;

      if (file && file.size > 20 * 1024 * 1024) {
        setFormCopyright((prev) => ({
          ...prev,
          [name]: null,
        }));
        setFormCopyrightError((prev) => ({
          ...prev,
          [name]: "Ukuran file maksimal 20MB",
        }));
      } else {
        setFormCopyright((prev) => ({
          ...prev,
          [name]: file,
          ...(name === "exampleCreation" && file ? { exampleCreationUrl: "" } : {}),
        }));
        setFormCopyrightError((prev) => ({
          ...prev,
          [name]: null,
        }));
      }
    } else {
      setFormCopyright((prev) => ({
        ...prev,
        [name]: value,
      }));

      setFormCopyrightError((prev) => ({
        ...prev,
        [name]: value.trim() ? null : "Field Tidak Boleh Kosong!",
      }));
    }
  };

  const handleSubmitCopyright = async () => {
    const error = validateCopyrightData(formCopyright);

    if (types === "Revisi") {
      error.exampleCreation = null;
      error.statementLetter = null;
      error.letterTransferCopyright = null;
    }

    const hasError = Object.values(error).some((value) => value !== null);

    if (hasError) {
      setFormCopyrightError(error);
      return;
    }

    if (types === "Revisi") {
      setLoading(true);
      try {
        await dispatch(revisonSubmissionCopyright(detailCopyright?.id, formCopyright));
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
        });
        navigate("/histori-pengajuan/hak-cipta");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmitComplateCopyright = async () => {
    const error = {
      titleInvention: null,
      typeCreation: null,
      subTypeCreation: null,
      countryFirstAnnounced: null,
      cityFirstAnnounced: null,
      timeFirstAnnounced: null,
      briefDescriptionCreation: null,
      statementLetter: !formCopyright.statementLetter ? "Surat pernyataan wajib diunggah" : null,
      letterTransferCopyright: !formCopyright.letterTransferCopyright ? "Surat pengalihan wajib diunggah" : null,
      exampleCreation: null,
    };

    const hasError = Object.values(error).some((e) => e !== null);

    if (hasError) {
      setFormCopyrightError(error);
      return;
    }
    if (types === "Lengkapi Berkas") {
      setLoading(true);
      try {
        await dispatch(complateSubmissionCopyright(detailCopyright?.id, formCopyright));
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
        });
        navigate("/histori-pengajuan/hak-cipta");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const initForm = async () => {
      if (!detailCopyright || types !== "Revisi") return;

      // const statementLetter = await processFile(detailCopyright.statementLetter);
      // const letterTransferCopyright = await processFile(detailCopyright.letterTransferCopyright);
      // const exampleCreation = await processFile(detailCopyright.exampleCreation);

      setFormCopyright({
        titleInvention: detailCopyright.titleInvention || "",
        typeCreation: detailCopyright.typeCreationId || null,
        subTypeCreation: detailCopyright.subTypeCreationId || null,
        countryFirstAnnounced: detailCopyright.countryFirstAnnounced || "",
        cityFirstAnnounced: detailCopyright.cityFirstAnnounced || "",
        timeFirstAnnounced: detailCopyright.timeFirstAnnounced || "",
        briefDescriptionCreation: detailCopyright.briefDescriptionCreation || "",
        statementLetter: null,
        letterTransferCopyright: null,
        exampleCreation: null,
      });
    };

    initForm();
  }, [detailCopyright, types]);

  return {
    formCopyright,
    setFormCopyright,
    validateCopyrightData,
    formCopyrightError,
    setFormCopyrightError,
    handleChangeCopyright,
    handleSubmitCopyright,
    loading,
    detailCopyright,
    handleSubmitComplateCopyright,
  };
};

export default useCopyright;
