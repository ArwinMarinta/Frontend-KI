import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../service/store";
import { FormCreateHelpCenter } from "../../../../types/helpCenter";
import { createHelpCenter } from "../../../../service/actions/helpCenterAction";

const useContactUs = () => {
  const dispatch = useDispatch<AppDispatch>();

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
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: !value }));
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

    dispatch(createHelpCenter(form));

    setForm({
      email: "",
      phoneNumber: "",
      problem: "",
      message: "",
      document: null,
    });
  };

  return {
    dispatch,
    form,
    errors,
    handleOnChange,
    handleSubmit,
  };
};

export default useContactUs;
