import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../service/store";
import { useState } from "react";

const useManageYear = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { token } = useSelector((state: RootState) => state.auth);
  const { faqsDetail } = useSelector((state: RootState) => state.manage);
  const { currentPage, limit } = useSelector((state: RootState) => state.manage.faqsData);

  return {
    title,
    setTitle,
    navigate,
    dispatch,
    token,
    faqsDetail,
    currentPage,
    limit,
    name,
    error,
    setError,
  };
};

export default useManageYear;
