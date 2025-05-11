import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { getUserById } from "../../../../service/actions/userAction";
import { useLocation } from "react-router-dom";

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

const useUserDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { userDetails } = useSelector((state: RootState) => state.user);
  const userId = location.state?.id;

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

  useEffect(() => {
    if (token && userId) {
      dispatch(getUserById(userId));
    }
  }, [token, userId, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return {
    userDetails,
    handleChange,
    formUser,
    setFormUser,
  };
};

export default useUserDetail;
