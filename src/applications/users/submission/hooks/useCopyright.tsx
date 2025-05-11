import { useState } from "react";
import { FormSubmissionCopyright } from "../../../../types/copyright";

const useCopyright = () => {
  const [formCopyright, setFormCopyright] = useState<FormSubmissionCopyright>({
    titleInvention: "",
    typeCreation: "",
    subTypeCreation: "",
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
      typeCreation: data.typeCreation.trim() === "",
      subTypeCreation: data.subTypeCreation.trim() === "",
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

    // Type Guard untuk memastikan e.target adalah HTMLInputElement dan memiliki files
    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const { files } = e.target;
      const file = files ? files[0] : null; // Ambil file pertama jika ada
      setFormCopyright((prev) => ({
        ...prev,
        [name]: file, // Menggunakan name sebagai key
      }));
      // Set error jika file tidak ada
      setFormCopyrightError((prev) => ({
        ...prev,
        [name]: !file,
      }));
    } else {
      // Jika bukan input file, maka set string value di formCopyright
      setFormCopyright((prev) => ({
        ...prev,
        [name]: value, // Menggunakan name sebagai key
      }));
      // Set error jika value kosong
      setFormCopyrightError((prev) => ({
        ...prev,
        [name]: value.trim() === "", // Validasi kosong
      }));
    }
  };
  return {
    formCopyright,
    setFormCopyright,
    validateCopyrightData,
    formCopyrightError,
    setFormCopyrightError,
    handleChangeCopyright,
  };
};

export default useCopyright;
