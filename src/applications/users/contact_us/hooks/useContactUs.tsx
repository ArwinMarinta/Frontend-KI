import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../service/store";
import { FormCreateHelpCenter } from "../../../../types/helpCenter";
import { createHelpCenter } from "../../../../service/actions/helpCenterAction";
import { useLocation, useNavigate } from "react-router-dom";
import useLoadingProses from "../../../../hooks/useLoadingProses";

const useContactUs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const location = useLocation();
  const message = location.state?.message ?? "";

  const { loading, setLoading } = useLoadingProses();

  const [form, setForm] = useState<FormCreateHelpCenter>({
    email: "",
    phoneNumber: "",
    problem: "",
    message: "",
    document: null as File | null,
  });

  const [errors, setErrors] = useState({
    email: false,
    phoneNumber: false,
    problem: false,
    message: false,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "file") {
      const files = target.files;
      setForm((prev) => ({ ...prev, [target.name]: files?.[0] || null }));
      setErrors((prev) => ({ ...prev, [target.name]: !files?.length }));
    } else {
      setForm((prev) => ({ ...prev, [target.name]: target.value }));
      setErrors((prev) => ({ ...prev, [target.name]: !target.value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      email: form.email.trim() === "",
      phoneNumber: form.phoneNumber.trim() === "",
      problem: form.problem.trim() === "",
      message: form.message.trim() === "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((error) => error);
    if (hasError) return;

    setLoading(true);
    try {
      await dispatch(createHelpCenter(form, navigate));

      setForm({
        email: "",
        phoneNumber: "",
        problem: "",
        message: "",
        document: null,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    dispatch,
    form,
    errors,
    handleOnChange,
    handleSubmit,
    loading,
    message,
  };
};

export default useContactUs;
