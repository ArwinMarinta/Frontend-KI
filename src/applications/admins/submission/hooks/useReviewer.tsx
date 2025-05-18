import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import useLoadingProses from "../../../../hooks/useLoadingProses";

const useReviewer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reviewer: reviewerData } = useSelector((state: RootState) => state.user);
  const [reviewer, setReviewer] = useState<number>();
  const [reviewerError, setReviewerError] = useState<string | null>("");
  const { setLoading, loading } = useLoadingProses();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    setReviewer(value === "" ? undefined : Number(value));
    if (value.trim() !== "") {
      setReviewerError("");
    }
  };

  const resetReviewer = () => {
    setReviewer(undefined);
    setReviewerError("");
  };

  return {
    reviewer,
    handleChange,
    reviewerError,
    setReviewerError,
    dispatch,
    reviewerData,
    resetReviewer,
    setLoading,
    loading,
  };
};

export default useReviewer;
