import { useState } from "react";
import { FormAdditionalBrand, FormSubmissionBrand } from "../../../../types/brandType";

const useBrand = () => {
  const [formBrand, setFormBrand] = useState<FormSubmissionBrand>({
    applicationType: "",
    brandType: "",
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

  const [tempAdditionalBrandError, setTempAdditionalBrandError] = useState<{
    additionalDescriptions: boolean;
    additionalFiles: boolean;
  }>({
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

  const handleChangeAdditionalBrand = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof FormAdditionalBrand) => {
    if (e.target.type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setTempAdditionalBrand((prev) => ({
        ...prev,
        [field]: file,
      }));
    } else {
      setTempAdditionalBrand((prev) => ({
        ...prev,
        [field]: e.target.value,
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
  };
};

export default useBrand;
