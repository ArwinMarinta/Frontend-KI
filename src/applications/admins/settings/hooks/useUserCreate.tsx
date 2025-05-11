import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../service/store";
import { useState } from "react";
import { FormUserErrors } from "../../../../types/userType";
import { createAccount } from "../../../../service/actions/userAction";

interface FormUser {
  fullname: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
  faculty: string;
  studyProgram: string;
  institution: string;
  phoneNumber: string;
}

const useUserCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { currentPage, limit } = useSelector((state: RootState) => state.user.account);
  const [formUser, setFormUser] = useState<FormUser>({
    fullname: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    faculty: "",
    studyProgram: "",
    institution: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<FormUserErrors>({
    fullname: false,
    email: false,
    role: false,
    password: null,
    confirmPassword: null,
    // faculty: false,
    // studyProgram: false,
    // institution: false,
    // phoneNumber: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormUser((prevState) => ({
      ...prevState,
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
      const newPassword = name === "password" ? value : formUser.password;
      const newConfirmPassword = name === "confirmPassword" ? value : formUser.confirmPassword;

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = {
      fullname: formUser.fullname.trim() === "",
      email: formUser.email.trim() === "",
      role: formUser.role.trim() === "",
      password: formUser.password.trim() === "" ? "Password tidak boleh kosong" : null,
      confirmPassword: formUser.password !== formUser.confirmPassword ? "Password dan konfirmasi password tidak cocok" : null,
      // faculty: formUser.faculty.trim() === "",
      // studyProgram: formUser.studyProgram.trim() === "",
      // institution: formUser.institution.trim() === "",
      // phoneNumber: formUser.phoneNumber.trim() === "",
    };

    setErrors(validationErrors);

    if (!Object.values(validationErrors).includes(true)) {
      dispatch(createAccount(formUser, currentPage, limit, navigate));
    }
  };
  return {
    formUser,
    setFormUser,
    navigate,
    dispatch,
    token,
    handleChange,
    errors,
    setErrors,
    handleSubmit,
  };
};

export default useUserCreate;
