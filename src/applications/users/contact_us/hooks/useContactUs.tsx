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

  const [errors, setErrors] = useState<{
    email: string | null;
    phoneNumber: string | null;
    problem: string | null;
    message: string | null;
    document?: string | null;
  }>({
    email: null,
    phoneNumber: null,
    problem: null,
    message: null,
    document: null,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "file") {
      const file = target.files?.[0];

      if (!file) {
        setForm((prev) => ({ ...prev, [target.name]: null }));
      } else if (file.size > 20 * 1024 * 1024) {
        setForm((prev) => ({ ...prev, [target.name]: null }));
        setErrors((prev) => ({ ...prev, document: "Ukuran file maksimal 20MB" }));
      } else {
        setForm((prev) => ({ ...prev, [target.name]: file }));
        setErrors((prev) => ({ ...prev, document: null }));
      }
    } else {
      const value = target.value;
      setForm((prev) => ({ ...prev, [target.name]: value }));
      setErrors((prev) => ({
        ...prev,
        [target.name]: value.trim() === "" ? "Field tidak boleh kosong" : null,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      email: form.email.trim() === "" ? "Email tidak boleh kosong" : null,
      phoneNumber: form.phoneNumber.trim() === "" ? "No. HP tidak boleh kosong" : null,
      problem: form.problem.trim() === "" ? "Masalah tidak boleh kosong" : null,
      message: form.message.trim() === "" ? "Pesan tidak boleh kosong" : null,
      document: form.document && form.document.size > 20 * 1024 * 1024 ? "Ukuran file maksimal 20MB" : null,
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => err !== null);
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
