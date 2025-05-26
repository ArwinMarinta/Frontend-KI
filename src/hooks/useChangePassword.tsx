import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../service/store";
import { useNavigate } from "react-router-dom";
import { FormChangePassword, FormChangePasswordErros } from "../types/authType";
import { changePassword } from "../service/actions/authAction";
import useLoadingProses from "./useLoadingProses";

const useChangePassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, setLoading } = useLoadingProses();

  const [form, setForm] = useState<FormChangePassword>({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormChangePasswordErros>({
    password: null,
    newPassword: null,
    confirmPassword: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Field tidak boleh kosong",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }

    if (name === "password" || name === "confirmPassword") {
      const newPassword = name === "password" ? value : form.password;
      const newConfirmPassword = name === "confirmPassword" ? value : form.confirmPassword;

      if (newPassword && newConfirmPassword && newPassword !== newConfirmPassword) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Password dan konfirmasi password tidak cocok",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: null,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = {
      password: form.password.trim() === "" ? "Password tidak boleh kosong" : null,
      newPassword: form.newPassword.trim() === "" ? "Password tidak boleh kosong" : null,
      confirmPassword: form.newPassword !== form.confirmPassword ? "Password dan konfirmasi password tidak cocok" : null,
    };

    setErrors(validationErrors);

    const isValid = Object.values(validationErrors).every((err) => err === null);

    if (!isValid) return;

    setLoading(true);
    try {
      await dispatch(changePassword(form));
      setForm({
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    dispatch,
    navigate,
    form,
    errors,
    handleChange,
    handleSubmit,
    loading,
  };
};

export default useChangePassword;
