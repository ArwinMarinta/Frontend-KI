import { useEffect, useState } from "react";
import { FormSubmissionCopyright } from "../../../../types/copyright";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import useLoadingProses from "../../../../hooks/useLoadingProses";
import { revisonSubmissionCopyright } from "../../../../service/actions/submissionAction";
import { processFile } from "../../../../utils/formatFile";

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
  });
  const [formCopyrightError, setFormCopyrightError] = useState({
    titleInvention: false,
    typeCreation: false,
    subTypeCreation: false,
    countryFirstAnnounced: false,
    cityFirstAnnounced: false,
    timeFirstAnnounced: false,
    briefDescriptionCreation: false,
    statementLetter: false,
    letterTransferCopyright: false,
    exampleCreation: false,
  });

  const validateCopyrightData = (data: FormSubmissionCopyright) => {
    const error = {
      titleInvention: data.titleInvention.trim() === "",
      typeCreation: data.typeCreation === null,
      subTypeCreation: data.subTypeCreation === null,
      countryFirstAnnounced: data.countryFirstAnnounced.trim() === "",
      cityFirstAnnounced: data.cityFirstAnnounced.trim() === "",
      timeFirstAnnounced: data.timeFirstAnnounced.trim() === "",
      briefDescriptionCreation: data.briefDescriptionCreation.trim() === "",
      statementLetter: data.statementLetter === null || data.statementLetter === undefined,
      letterTransferCopyright: data.letterTransferCopyright === null || data.letterTransferCopyright === undefined,
      exampleCreation: data.exampleCreation === null || data.exampleCreation === undefined,
    };

    return error;
  };

  const handleChangeCopyright = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    const numberFields = ["typeCreation", "subTypeCreation"];

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const { files } = e.target;
      const file = files ? files[0] : null;
      setFormCopyright((prev) => ({
        ...prev,
        [name]: file,
      }));
      setFormCopyrightError((prev) => ({
        ...prev,
        [name]: !file,
      }));
    } else {
      const parsedValue = numberFields.includes(name) ? Number(value) : value;

      setFormCopyright((prev) => ({
        ...prev,
        [name]: parsedValue,
      }));

      setFormCopyrightError((prev) => ({
        ...prev,
        [name]: parsedValue === "" || parsedValue === null,
      }));
    }
  };

  const handleSubmitCopyright = async () => {
    const error = validateCopyrightData(formCopyright);
    const hasError = Object.values(error).includes(true);

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

  useEffect(() => {
    const initForm = async () => {
      if (!detailCopyright || types !== "Revisi") return;

      const statementLetter = await processFile(detailCopyright.statementLetter);
      const letterTransferCopyright = await processFile(detailCopyright.letterTransferCopyright);
      const exampleCreation = await processFile(detailCopyright.exampleCreation);

      setFormCopyright({
        titleInvention: detailCopyright.titleInvention || "",
        typeCreation: detailCopyright.typeCreationId || null,
        subTypeCreation: detailCopyright.subTypeCreationId || null,
        countryFirstAnnounced: detailCopyright.countryFirstAnnounced || "",
        cityFirstAnnounced: detailCopyright.cityFirstAnnounced || "",
        timeFirstAnnounced: detailCopyright.timeFirstAnnounced || "",
        briefDescriptionCreation: detailCopyright.briefDescriptionCreation || "",
        statementLetter,
        letterTransferCopyright,
        exampleCreation,
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
  };
};

export default useCopyright;
