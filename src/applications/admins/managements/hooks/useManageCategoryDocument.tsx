import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { useNavigate } from "react-router-dom";

const useManageCategoryDocument = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [types, setTypes] = useState<string>("");
  const [errors, setErrors] = useState<string | null>(null);
  const { token } = useSelector((state: RootState) => state.auth);
  const { categoryDocumentDetail } = useSelector((state: RootState) => state.manage);
  const { currentPage, limit } = useSelector((state: RootState) => state.manage.documentsCategoryData);

  return {
    types,
    setTypes,
    navigate,
    dispatch,
    token,
    categoryDocumentDetail,
    currentPage,
    limit,
    errors,
    setErrors,
  };
};

export default useManageCategoryDocument;
