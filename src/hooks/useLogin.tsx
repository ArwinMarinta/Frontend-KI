import { useState } from "react";

interface LoginType {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [formLogin, setFormLogin] = useState<LoginType>({
    email: "",
    password: "",
  });
  return {
    formLogin,
    setFormLogin,
  };
};
