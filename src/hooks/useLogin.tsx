import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../service/store";
import { login } from "../service/actions/authAction";
import useLoadingProses from "./useLoadingProses";

interface LoginType {
  email: string;
  password: string;
}

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoadingProses();
  const [formLogin, setFormLogin] = useState<LoginType>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = {
      email: formLogin.email.trim() === "" ? "Email tidak boleh kosong" : undefined,
      password: formLogin.password.trim() === "" ? "Password tidak boleh kosong" : undefined,
    };

    setErrors(validationErrors);

    const isValid = Object.values(validationErrors).every((err) => err === undefined);
    if (!isValid) return;

    setLoading(true);
    try {
      await dispatch(login(formLogin.email, formLogin.password, navigate));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update nilai form
    setFormLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Jika ada error dan user mulai mengetik, hapus error-nya
    if (errors[name as keyof typeof errors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };
  return {
    formLogin,
    setFormLogin,
    handleChange,
    handleLogin,
    errors,
    loading,
  };
};
