import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../service/store";
import { useState } from "react";
import { FormUpdateProgress, FormUpdateProgressErrors } from "../types/submissionType";
import { updateReviewerSubmissionProgress } from "../service/actions/submissionAction";
import useLoadingProses from "./useLoadingProses";
import { toast } from "sonner";
import { useModal } from "./useModal";

const useUpdateProgress = () => {
  const location = useLocation();
  const { loading, setLoading } = useLoadingProses();
  const { submissionId, name } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { progresSubmission } = useSelector((state: RootState) => state.submission);
  const { handleOpenModal, setMessage, activeModal, handleCloseModal, message } = useModal();
  const [pendingType, setPendingType] = useState<string | undefined>();

  const [formUpdateProgress, setFormUpdateProgress] = useState<FormUpdateProgress>({
    reviewStatus: "",
    comments: "",
    paymentCode: "",
    certificateFile: null,
    fileNames: [],
    files: [],
  });

  const [formErrors, setFormErrors] = useState<FormUpdateProgressErrors>({
    reviewStatus: null,
    paymentCode: null,
    files: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;

      setFormUpdateProgress((prev) => ({
        ...prev,
        [name]: file,
      }));

      if (name === "certificateFile") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          files: file ? null : "Sertifikat wajib diunggah saat status Sertifikat Terbit",
        }));
      }
    } else {
      setFormUpdateProgress((prev) => ({
        ...prev,
        [name]: value,
      }));

      setFormErrors((prevErrors) => {
        const newErrors = { ...prevErrors };

        if (name === "reviewStatus") {
          newErrors.reviewStatus = value.trim() === "" ? "Status tidak boleh kosong" : null;
        } else if (name === "paymentCode" && formUpdateProgress.reviewStatus === "Pembayaran") {
          newErrors.paymentCode = value.trim() === "" ? "Payment code wajib diisi" : null;
        }

        return newErrors;
      });
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

  const handleSaveClick = (type: string | undefined) => {
    const isCommentEmpty = formUpdateProgress.comments.trim() === "";
    const isFilesEmpty = formUpdateProgress.files.length === 0;

    if (isCommentEmpty && isFilesEmpty) {
      handleOpenModal(null, "warningUpdateProgressAdmin");
      setMessage("Apakah Anda yakin ingin mengubah status tanpa mengirim komentar atau file?");
      setPendingType(type);

      return;
    }
  };

  const handleSaveClickReviewer = () => {
    const isCommentEmpty = formUpdateProgress.comments.trim() === "";
    const isFilesEmpty = formUpdateProgress.files.length === 0;

    if (isCommentEmpty && isFilesEmpty) {
      handleOpenModal(null, "warningUpdateProgressReviewer");
      setMessage("Apakah Anda yakin ingin mengubah status tanpa mengirim komentar atau file?");

      return;
    }
  };

  const handleUpdateProgress = async () => {
    const validationErrors = {
      reviewStatus: formUpdateProgress.reviewStatus?.trim() === "" ? "Status tidak boleh kosong" : null,
      paymentCode: formUpdateProgress.reviewStatus === "Pembayaran" && formUpdateProgress.paymentCode.trim() === "" ? "Payment code wajib diisi untuk status Pembayaran" : null,
      files: formUpdateProgress.reviewStatus === "Sertifikat Terbit" && !formUpdateProgress.certificateFile ? "Sertifikat wajib diunggah saat status Sertifikat Terbit" : null,
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
        certificateFile: null,
      });

      navigate("/penugasan/progress", { state: { submissionId: submissionId } });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProgressAdmin = async (type: string | undefined) => {
    const validationErrors = {
      reviewStatus: formUpdateProgress.reviewStatus?.trim() === "" ? "Status tidak boleh kosong" : null,
      paymentCode: formUpdateProgress.reviewStatus === "Pembayaran" && formUpdateProgress.paymentCode.trim() === "" ? "Kode Pembayaran wajib diisi untuk status Pembayaran" : null,
      files: formUpdateProgress.reviewStatus === "Sertifikat Terbit" && !formUpdateProgress.certificateFile ? "Sertifikat wajib diunggah saat status Sertifikat Terbit" : null,
    };

    const hasErrors = Object.values(validationErrors).some((error) => error !== null);
    setFormErrors(validationErrors);

    if (hasErrors) return;

    if (formUpdateProgress.reviewStatus === "Pembayaran" && progresSubmission?.submission?.submissionScheme === null) {
      toast.warning("Pengajuan ini belum memilih skema pendanaan");
      return;
    } else if (formUpdateProgress?.reviewStatus === "Sertifikat Terbit" && progresSubmission?.submission?.submissionScheme === null) {
      toast.warning("Pengajuan ini belum memilih skema pendanaan dan belum melengkapi berkas ");
      return;
    } else if (formUpdateProgress?.reviewStatus === "Pembayaran" && progresSubmission?.submission?.submissionScheme === "Pendanaan") {
      toast.warning("Pengajuan ini skema pendanaan");
      return;
    }

    setLoading(true);
    try {
      await dispatch(updateReviewerSubmissionProgress(submissionId, formUpdateProgress));

      setFormUpdateProgress({
        reviewStatus: "",
        comments: "",
        paymentCode: "",
        fileNames: [],
        files: [],
        certificateFile: null,
      });

      navigate(`/permohonan/${type}`);
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
    handleUpdateProgressAdmin,
    handleSaveClick,
    pendingType,
    setPendingType,
    activeModal,
    handleCloseModal,
    message,
    name,
    handleSaveClickReviewer,
  };
};

export default useUpdateProgress;
