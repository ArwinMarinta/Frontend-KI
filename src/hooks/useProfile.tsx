import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../service/actions/userAction";
import { AppDispatch, RootState } from "../service/store";
import { UpdateProfileErrors, User3 } from "../types/userType";
import { updateProfile } from "../service/actions/userAction";

const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [currentStatus, setCurrentStatus] = useState("Profile");
  const [profileStatus, setProfileStatus] = useState("Detail");
  const [form, setForm] = useState<User3>({
    fullname: "",
    phoneNumber: "",
    faculty: "",
    studyProgram: "",
  });

  const [errors, setErrors] = useState<UpdateProfileErrors>({
    fullname: false,
    faculty: false,
    studyProgram: false,
    // institution: false,
    phoneNumber: false,
  });

  const handleStatusChange = (status: string, type: "current" | "profile" = "current") => {
    if (type === "current") {
      setCurrentStatus(status);
    } else {
      setProfileStatus(status as "Detail" | "Edit");
      if (status === "Edit") {
        setErrors({
          fullname: false,
          phoneNumber: false,
          faculty: false,
          studyProgram: false,
        });
      }
    }
  };

  useEffect(() => {
    if (profileStatus === "Edit") {
      setForm({
        fullname: user?.fullname || "",
        phoneNumber: user?.phoneNumber || "",
        faculty: user?.faculty || "",
        studyProgram: user?.studyProgram || "",
      });
    }
  }, [profileStatus]);

  useEffect(() => {
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch, navigate, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      fullname: form.fullname.trim() === "",
      phoneNumber: form.phoneNumber.trim() === "",
      faculty: form.faculty.trim() === "",
      studyProgram: form.studyProgram.trim() === "",
    };

    setErrors(newErrors);

    if (newErrors.fullname || newErrors.fullname || newErrors.faculty || newErrors.studyProgram) return;

    if (profileStatus === "Edit") {
      dispatch(
        updateProfile(form, user?.id || "", () => {
          setProfileStatus("Detail");
        })
      );
    }
  };

  return { user, token, currentStatus, profileStatus, handleStatusChange, form, handleChange, handleSubmit, errors };
};

export default useProfile;
