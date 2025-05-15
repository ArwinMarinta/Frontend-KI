import React, { useState } from "react";
import { FormComplatePatenSubmission, FormComplatePatenSubmissionErrors } from "../../../../types/submissionType";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../service/store";

import { complateSubmissionPatent } from "../../../../service/actions/submissionAction";
import { useLocation } from "react-router-dom";

const useComplatePaten = () => {
  const location = useLocation();
  const { patenId } = location.state || {};

  const dispatch = useDispatch<AppDispatch>();

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

  const handleSubmitComplatePatent = () => {
    const errors = validateComplatePaten(formComplatePaten);
    const hasErrors = Object.values(errors).some((error) => error !== null);
    if (hasErrors) {
      setFormComplatePatenError(errors);
      return;
    }
    dispatch(complateSubmissionPatent(patenId, formComplatePaten));
  };

  return {
    formComplatePaten,
    formComplatePatenError,
    handleChangeComplatePaten,
    handleSubmitComplatePatent,
    patenId,
  };
};

export default useComplatePaten;
