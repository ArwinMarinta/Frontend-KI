import { useState } from "react";

interface RegisterType {
  fullname: string;
  email: string;
  password: string;
  confPassword: string;
}

export const useRegister = () => {
  const [formRegister, setFormRegister] = useState<RegisterType>({
    fullname: "",
    email: "",
    password: "",
    confPassword: "",
  });

  return {
    formRegister,
    setFormRegister,
  };
};
