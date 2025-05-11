import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../service/store";

const useManageDocument = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    title: "",
    document: null as File | null,
    cover: null as File | null,
    coverName: "",
    documentName: "",
  });

  const [errors, setErrors] = useState({
    title: false,
    document: false,
    cover: false,
  });
  const { token } = useSelector((state: RootState) => state.auth);
  const { documentDetail } = useSelector((state: RootState) => state.manage);
  const { currentPage, limit } = useSelector((state: RootState) => state.manage.faqsData);

  return {
    form,
    setForm,
    navigate,
    dispatch,
    token,
    documentDetail,
    currentPage,
    limit,
    name,
    errors,
    setErrors,
  };
};

export default useManageDocument;
