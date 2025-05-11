import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useManageTerms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [terms, setTerms] = useState("");
  const [errors, setErrors] = useState<boolean>(false);
  const { token } = useSelector((state: RootState) => state.auth);
  const { termsDetail } = useSelector((state: RootState) => state.manage);
  const { currentPage, limit } = useSelector((state: RootState) => state.manage.termsData);

  return {
    terms,
    setTerms,
    navigate,
    dispatch,
    token,
    termsDetail,
    currentPage,
    limit,
    errors,
    setErrors,
  };
};

export default useManageTerms;
