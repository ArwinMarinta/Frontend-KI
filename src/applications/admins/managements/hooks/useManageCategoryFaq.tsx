import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../service/store";
import { useState } from "react";

const useManageCategoryFaq = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [faqs, setFaqs] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { token } = useSelector((state: RootState) => state.auth);
  const { faqCategoryDetail } = useSelector((state: RootState) => state.manage);
  const { currentPage, limit } = useSelector((state: RootState) => state.manage.faqsCategoryData);
  // const [errors, setErrors] = useState<{
  //   [key: string]: boolean;
  // }>({});

  return {
    faqs,
    setFaqs,
    navigate,
    dispatch,
    token,
    faqCategoryDetail,
    currentPage,
    limit,
    error,
    setError,
  };
};

export default useManageCategoryFaq;
