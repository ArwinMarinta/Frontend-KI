import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../service/store";
import { useState } from "react";
import { FormUpdateProgress, FormUpdateProgressErrors } from "../types/submissionType";
import { updateReviewerSubmissionProgress } from "../service/actions/submissionAction";

const useUpdateProgress = () => {
  const { id } = useParams<{ id: string }>();
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

  const handleUpdateProgress = () => {
    const validationErrors = {
      reviewStatus: formUpdateProgress.reviewStatus.trim() === "" ? "Status tidak boleh kosong" : null,
    };
    setFormErrors(validationErrors);
    if (Object.values(validationErrors).every((error) => error === null)) {
      dispatch(updateReviewerSubmissionProgress(id, formUpdateProgress));
    }
  };

  return {
    id,
    dispatch,
    token,
    handleChange,
    formUpdateProgress,
    formErrors,
    handleFileChange,
    handleRemoveFile,
    handleUpdateProgress,
  };
};

export default useUpdateProgress;
