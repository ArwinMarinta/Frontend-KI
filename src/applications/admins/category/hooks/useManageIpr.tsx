import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { IprForm } from "../../../../types/iprType";
import { useNavigate } from "react-router-dom";

const useManageIpr = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { token } = useSelector((state: RootState) => state.auth);
  const { categoryIprDetail } = useSelector((state: RootState) => state.category);
  const { currentPage, limit } = useSelector((state: RootState) => state.manage.documentsCategoryData);
  const [form, setForm] = useState<IprForm>({
    title: "",
    isPublish: true,
  });

  const [errors, setErrors] = useState({
    title: false,
  });
  return {
    form,
    setForm,
    errors,
    setErrors,
    navigate,
    dispatch,
    token,
    categoryIprDetail,
    currentPage,
    limit,
  };
};

export default useManageIpr;
