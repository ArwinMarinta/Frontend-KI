import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import useLoadingProses from "../../../../hooks/useLoadingProses";
import { getAllStatusByType } from "../../../../service/actions/statusIprAction";

const useStatus = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [status, setStatus] = useState<string | undefined>("");
  const [statusError, setStatusError] = useState<string | null>(null);
  const { setLoading, loading } = useLoadingProses();
  const [statusTy, setStatusTy] = useState<string>("");
  const {  patentAll, copyrightAll, desainIndustriAll, brandAll} = useSelector((state: RootState) => state.status);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const setStatusType = (type: string) => {
    setStatusTy(type);
  }

  useEffect(() => {
    if(statusTy !== ""){
      dispatch(getAllStatusByType(statusTy) );
    }
  }, [dispatch]);

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
    setStatusType,
    patentAll, 
    copyrightAll, 
    desainIndustriAll, 
    brandAll
  };
};

export default useStatus;
