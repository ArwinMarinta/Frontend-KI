import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../service/store";
import { useEffect, useState } from "react";
import { FormUserErrors } from "../../../../types/userType";
import { createAccount, updateAccount } from "../../../../service/actions/userAction";
import useLoadingProses from "../../../../hooks/useLoadingProses";

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
  const location = useLocation();
  const { type } = location.state || {};
  const { token } = useSelector((state: RootState) => state.auth);
  const { currentPage, limit } = useSelector((state: RootState) => state.user.account);
  const { userDetails } = useSelector((state: RootState) => state.user);
  const { setLoading, loading } = useLoadingProses();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = {
      fullname: formUser.fullname.trim() === "",
      email: formUser.email.trim() === "",
      role: formUser.role.trim() === "",
      password: type === "create" ? (formUser.password.trim() === "" ? "Password tidak boleh kosong" : null) : null, // untuk update, password tidak wajib
      confirmPassword:
        type === "create" ? (formUser.password !== formUser.confirmPassword ? "Password dan konfirmasi password tidak cocok" : null) : formUser.password || formUser.confirmPassword ? (formUser.password !== formUser.confirmPassword ? "Password dan konfirmasi password tidak cocok" : null) : null,
    };

    const hasErrors = Object.values(validationErrors).some((error) => error !== null && error !== false);

    setErrors(validationErrors);

    if (hasErrors) return;

    if (type === "create") {
      setLoading(true);
      try {
        await dispatch(createAccount(formUser, currentPage, limit, navigate));
        setFormUser({
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
      } finally {
        setLoading(false);
      }
    }

    if (type === "update") {
      setLoading(true);
      try {
        await dispatch(updateAccount(userDetails?.id, formUser, currentPage, limit, navigate));
        setFormUser({
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
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (type === "update") {
      setFormUser({
        fullname: userDetails?.fullname || "",
        email: userDetails?.email || "",
        role: userDetails?.role || "",
        password: "",
        confirmPassword: "",
        faculty: userDetails?.faculty || "",
        studyProgram: userDetails?.studyProgram || "",
        institution: userDetails?.institution || "",
        phoneNumber: userDetails?.phoneNumber || "",
      });
    }
  }, [userDetails, type]);

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
    loading,
  };
};

export default useUserCreate;
