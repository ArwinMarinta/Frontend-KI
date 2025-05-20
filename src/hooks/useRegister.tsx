import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../service/store";
import { useNavigate } from "react-router-dom";
import { register } from "../service/actions/authAction";
import useLoadingProses from "./useLoadingProses";

interface RegisterType {
  fullname: string;
  email: string;
  password: string;
  confPassword: string;
}

export interface RegisterErrors {
  fullname?: string;
  email?: string;
  password?: string;
  confPassword?: string;
}

export const useRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoadingProses();
  const [formRegister, setFormRegister] = useState<RegisterType>({
    fullname: "",
    email: "",
    password: "",
    confPassword: "",
  });

  const [errors, setErrors] = useState<RegisterErrors>({});

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors: RegisterErrors = {
      fullname: formRegister.fullname.trim() === "" ? "Nama lengkap tidak boleh kosong" : undefined,
      email: formRegister.email.trim() === "" ? "Email tidak boleh kosong" : undefined,
      password: formRegister.password.trim() === "" ? "Password tidak boleh kosong" : undefined,
      confPassword: formRegister.confPassword.trim() === "" ? "Konfirmasi password tidak boleh kosong" : formRegister.password !== formRegister.confPassword ? "Konfirmasi password tidak sesuai" : undefined,
    };

    setErrors(validationErrors);

    const isValid = Object.values(validationErrors).every((err) => err === undefined);
    if (!isValid) return;

    setLoading(true);
    try {
      await dispatch(register(formRegister.fullname, formRegister.email, formRegister.password, navigate));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormRegister((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name as keyof RegisterErrors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  return {
    formRegister,
    setFormRegister,
    handleRegister,
    handleChange,
    errors,
    loading,
  };
};
