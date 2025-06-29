import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";

import { FormSchema, FormSchemaErrors } from "../../../../types/schemaPayment";
import { updateSubmissionSchema } from "../../../../service/actions/submissionAction";
import { useLocation, useNavigate } from "react-router-dom";
import useLoadingProses from "../../../../hooks/useLoadingProses";
import { toSlug } from "../../../../utils/toSlug";

const useSchemaPayment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { loading, setLoading } = useLoadingProses();
  const navigate = useNavigate();
  const { submissionId, submissionType } = location.state || {};
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
      errors.submissionScheme = "Jenis skema pendanaan tidak boleh kosong.";
    }

    if (isPendanaan) {
      if (!formSchemaPayment.groupId) {
        errors.groupId = "Gelombang pendanaan tidak boleh kosong";
      }
      if (formSchemaPayment.termsConditionId.length === 0) {
        errors.termsConditionId = "Prasyarat pendanaan wajib di centang";
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

  const handleCheckboxChange = () => {
    setFormSchemaPayment((prev) => {
      const allSelected = prev.termsConditionId.length === (terms?.length || 0);
      return {
        ...prev,
        termsConditionId: allSelected ? [] : terms?.map((term) => term.id) ?? [],
      };
    });
  };

  const handleSubmitSchema = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormSchemaPaymentErrors(errors);
      return;
    }
    setLoading(true);
    try {
      await dispatch(updateSubmissionSchema(submissionId, formSchemaPayment));
      setFormSchemaPayment({
        periodId: null,
        groupId: null,
        submissionScheme: "",
        termsConditionId: [],
      });
      navigate(`/histori-pengajuan/${toSlug(submissionType)}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    formSchemaPayment,
    formSchemaPaymentErrors,
    handleChangeSchema,
    handleCheckboxChange,
    validate,
    terms,
    handleSubmitSchema,
    qouta,
    navigate,
    loading,
    setFormSchemaPayment,
    setFormSchemaPaymentErrors,
  };
};

export default useSchemaPayment;
