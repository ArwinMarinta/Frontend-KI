import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { deleteCategorySubCopyright, getCategorySubCopyright } from "../../../../service/actions/categoryCopyrightAction";
import { FormCopyright } from "../../../../types/copyright";
import { useParams } from "react-router-dom";

const useSubCopyright = () => {
  const { ids } = useParams<{ ids: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { copyright, limit, currentPage, totalPages } = useSelector((state: RootState) => state.category.categorySubCopyright);
  const { categorySubCopyrightDetail } = useSelector((state: RootState) => state.category);

  const [form, setForm] = useState<FormCopyright>({
    title: "",
  });

  const [errors, setErrors] = useState({
    title: false,
  });
  useEffect(() => {
    if (token) {
      dispatch(getCategorySubCopyright(ids, currentPage, limit));
    }
  }, [token, dispatch, currentPage, limit, ids]);

  const handleDeleteFaq = async (id: number | string | null) => {
    if (token) {
      const newPage = copyright.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      dispatch(deleteCategorySubCopyright(id, ids, newPage, limit));
    }
  };

  return {
    copyright,
    currentPage,
    totalPages,
    // totalValue,
    limit,
    handleDeleteFaq,
    dispatch,
    categorySubCopyrightDetail,
    setForm,
    form,
    errors,
    setErrors,
    ids,
  };
};

export default useSubCopyright;
