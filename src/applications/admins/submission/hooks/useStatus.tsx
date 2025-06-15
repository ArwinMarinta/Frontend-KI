import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../service/store";
import useLoadingProses from "../../../../hooks/useLoadingProses";

const useStatus = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [status, setStatus] = useState<string | undefined>("");
  const [statusError, setStatusError] = useState<string | null>(null);
  const { setLoading, loading } = useLoadingProses();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setStatus(value);
    if (value.trim() !== "") {
      setStatusError(null);
    }
  };

  const resetStatus = () => {
    setStatus("");
    setStatusError(null);
  };

  return {
    status,
    setStatus,
    statusError,
    setStatusError,
    handleChange,
    resetStatus,
    dispatch,
    loading,
    setLoading,
  };
};

export default useStatus;
