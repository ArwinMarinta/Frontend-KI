import React, { useState } from "react";
import { FormComplatePatenSubmission, FormComplatePatenSubmissionErrors } from "../../../../types/submissionType";

const useComplatePaten = () => {
  const [formComplatePaten, setFormComplatePaten] = useState<FormComplatePatenSubmission>({
    entirePatentDocument: null,
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

  const [formComplatePatenError, setFormComplatePatenError] = useState<FormComplatePatenSubmissionErrors>({
    entirePatentDocument: null,
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

  const handleChangeComplatePaten = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    // Handle input file
    if (type === "file" && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0] || null;

      setFormComplatePaten((prev) => ({
        ...prev,
        [name]: file,
      }));

      setFormComplatePatenError((prev) => ({
        ...prev,
        [name]: file ? null : "File Tidak Boleh Kosong!",
      }));
    } else {
      // Handle input text/select/textarea
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

  return {
    formComplatePaten,
    formComplatePatenError,
    handleChangeComplatePaten,
  };
};

export default useComplatePaten;
