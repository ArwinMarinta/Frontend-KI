import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../service/store";
import { FaqFormType } from "../../../../types/faqType";

const useManageFaq = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState<FaqFormType>({
    question: "",
    answer: "",
  });
  const [errors, setErrors] = useState<{ question: string | null; answer: string | null }>({
    question: null,
    answer: null,
  });
  const { token } = useSelector((state: RootState) => state.auth);
  const { faqsDetail } = useSelector((state: RootState) => state.manage);
  const { currentPage, limit } = useSelector((state: RootState) => state.manage.faqsData);

  return {
    form,
    setForm,
    navigate,
    dispatch,
    token,
    faqsDetail,
    currentPage,
    limit,
    name,
    errors,
    setErrors,
  };
};

export default useManageFaq;
