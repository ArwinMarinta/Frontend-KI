import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { getQuotaLanding, getTermsLanding } from "../../../../service/actions/landingAction";
import { FormSchema, FormSchemaErrors } from "../../../../types/schemaPayment";
import { updateSubmissionSchema } from "../../../../service/actions/submissionAction";
import { useLocation } from "react-router-dom";

const useSchemaPayment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { submissionId } = location.state || {};
  const { terms } = useSelector((state: RootState) => state.landing);
  const { qouta } = useSelector((state: RootState) => state.landing);
  const [formSchemaPayment, setFormSchemaPayment] = useState<FormSchema>({
    periodId: null,
    groupId: null,
    submissionScheme: "",
    termsConditionId: [],
  });

  const [formSchemaPaymentErrors, setFormSchemaPaymentErrors] = useState<FormSchemaErrors>({});

  const validate = (): FormSchemaErrors => {
    const errors: FormSchemaErrors = {};
    const isPendanaan = formSchemaPayment.submissionScheme === "Pendanaan";

    if (!formSchemaPayment.submissionScheme.trim()) {
      errors.submissionScheme = "Submission Scheme wajib diisi.";
    }

    if (isPendanaan) {
      if (!formSchemaPayment.groupId) {
        errors.groupId = "Group ID wajib diisi untuk pendanaan.";
      }
      if (formSchemaPayment.termsConditionId.length === 0) {
        errors.termsConditionId = "Pilih minimal 1 prasyarat pendanaan";
      }
    }

    return errors;
  };

  const handleChangeSchema = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setFormSchemaPayment((prev) => {
      let updatedForm: FormSchema;

      if (name === "groupId") {
        // Misal value = "30|7"
        const [groupIdStr, periodIdStr] = value.split("|");
        updatedForm = {
          ...prev,
          groupId: groupIdStr ? Number(groupIdStr) : null,
          periodId: periodIdStr ? Number(periodIdStr) : null,
        };
      } else {
        updatedForm = {
          ...prev,
          [name]: type === "number" ? (value === "" ? null : Number(value)) : value,
        };
      }

      setFormSchemaPaymentErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };

        if (value && (name === "submissionScheme" || name === "periodId" || name === "groupId" || name === "termsConditionId")) {
          delete updatedErrors[name];
        }

        return updatedErrors;
      });

      return updatedForm;
    });
  };

  const handleCheckboxChange = (id: number) => {
    setFormSchemaPayment((prev) => {
      const exists = prev.termsConditionId.includes(id);

      return {
        ...prev,
        termsConditionId: exists ? prev.termsConditionId.filter((item) => item !== id) : [...prev.termsConditionId, id],
      };
    });
  };

  const handleSubmitSchema = () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormSchemaPaymentErrors(errors);
      return;
    }

    dispatch(updateSubmissionSchema(submissionId, formSchemaPayment));
  };

  useEffect(() => {
    dispatch(getTermsLanding());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getQuotaLanding());
  }, [dispatch]);

  return {
    formSchemaPayment,
    formSchemaPaymentErrors,
    handleChangeSchema,
    handleCheckboxChange,
    validate,
    terms,
    handleSubmitSchema,
    qouta,
  };
};

export default useSchemaPayment;
