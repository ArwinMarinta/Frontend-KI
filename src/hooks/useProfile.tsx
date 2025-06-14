import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../service/actions/userAction";
import { AppDispatch, RootState } from "../service/store";
import { UpdateProfileErrors, User3 } from "../types/userType";
import { updateProfile } from "../service/actions/userAction";
import { logout } from "../service/actions/authAction";
import useLoadingProses from "./useLoadingProses";

const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoadingProses();
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
    fullname: null,
    faculty: null,
    studyProgram: null,
    // institution: null,
    phoneNumber: null,
  });

  const handleStatusChange = (status: string, type: "current" | "profile" = "current") => {
    if (type === "current") {
      setCurrentStatus(status);
    } else {
      setProfileStatus(status as "Detail" | "Edit");
      if (status === "Edit") {
        setErrors({
          fullname: null,
          phoneNumber: null,
          faculty: null,
          studyProgram: null,
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
  }, [dispatch, token]);

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

  const isFormChanged = form.fullname !== user?.fullname || form.faculty !== user?.faculty || form.phoneNumber !== form.phoneNumber || form?.studyProgram !== user?.studyProgram;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      fullname: form.fullname.trim() === "" ? "Nama Lengkap tidak boleh kosong" : null,
      phoneNumber: form.phoneNumber.trim() === "" ? "No.Telpon Lengkap tidak boleh kosong" : null,
      faculty: form.faculty.trim() === "" ? "Fakultas tidak boleh kosong" : null,
      studyProgram: form.studyProgram.trim() === "" ? "Prodi tidak boleh kosong" : null,
    };

    setErrors(newErrors);

    if (newErrors.fullname || newErrors.fullname || newErrors.faculty || newErrors.studyProgram) return;

    if (profileStatus === "Edit" && isFormChanged) {
      setLoading(true);
      try {
        await dispatch(
          updateProfile(form, user?.id || "", () => {
            setProfileStatus("Detail");
            setForm({
              fullname: "",
              phoneNumber: "",
              faculty: "",
              studyProgram: "",
            });
          })
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
  };

  return { loading, handleLogout, user, token, currentStatus, profileStatus, handleStatusChange, form, handleChange, handleSubmit, errors, navigate, isFormChanged, dispatch };
};

export default useProfile;
