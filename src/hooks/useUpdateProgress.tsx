import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../service/store";
import { useState } from "react";
import { FormUpdateProgress, FormUpdateProgressErrors } from "../types/submissionType";
import { updateReviewerSubmissionProgress } from "../service/actions/submissionAction";
import useLoadingProses from "./useLoadingProses";

const useUpdateProgress = () => {
  const location = useLocation();
  const { loading, setLoading } = useLoadingProses();
  const { submissionId } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);

  const [formUpdateProgress, setFormUpdateProgress] = useState<FormUpdateProgress>({
    reviewStatus: "",
    comments: "",
    paymentCode: "",
    fileNames: [],
    files: [],
  });

  const [formErrors, setFormErrors] = useState<FormUpdateProgressErrors>({
    reviewStatus: null,
    paymentCode: null,
    files: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormUpdateProgress((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value.trim() === "") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Field tidak boleh kosong`,
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const maxSizeMB = 5;
      const oversizedFiles = fileArray.filter((file) => file.size > maxSizeMB * 1024 * 1024);

      if (oversizedFiles.length > 0) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          files: `File tidak boleh lebih dari ${maxSizeMB}MB`,
        }));
        return; // hentikan proses jika ada file yang terlalu besar
      }

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        files: null, // reset error jika tidak ada file yang terlalu besar
      }));

      setFormUpdateProgress((prev) => ({
        ...prev,
        files: [...prev.files, ...fileArray],
      }));
      input.value = "";
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFormUpdateProgress((prev) => ({
      ...prev,
      files: prev.files.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleUpdateProgress = async () => {
    const validationErrors = {
      reviewStatus: formUpdateProgress.reviewStatus?.trim() === "" ? "Status tidak boleh kosong" : null,
      paymentCode: formUpdateProgress.reviewStatus === "Pembayaran" && formUpdateProgress.paymentCode.trim() === "" ? "Payment code wajib diisi untuk status Pembayaran" : null,
    };
    const hasErrors = Object.values(validationErrors).some((error) => error !== null);
    setFormErrors(validationErrors);

    if (hasErrors) return;

    setLoading(true);
    try {
      await dispatch(updateReviewerSubmissionProgress(submissionId, formUpdateProgress));

      setFormUpdateProgress({
        reviewStatus: "",
        comments: "",
        paymentCode: "",
        fileNames: [],
        files: [],
      });

      navigate("/penugasan/progress", { state: { submissionId: submissionId } });
    } finally {
      setLoading(false);
    }
  };

  return {
    submissionId,
    dispatch,
    token,
    handleChange,
    formUpdateProgress,
    formErrors,
    handleFileChange,
    handleRemoveFile,
    handleUpdateProgress,
    loading,
  };
};

export default useUpdateProgress;
