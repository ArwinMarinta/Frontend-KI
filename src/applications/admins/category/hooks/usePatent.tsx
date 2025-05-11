import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { FormPatent } from "../../../../types/patentType";
import { deleteCategoryPatent, getCategoryPatent } from "../../../../service/actions/categoryPatentActions";

const usePatent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { patents, limit, currentPage, totalPages } = useSelector((state: RootState) => state.category.categoryPatent);
  const { categoryPatentDetail } = useSelector((state: RootState) => state.category);

  const [form, setForm] = useState<FormPatent>({
    title: "",
  });

  const [errors, setErrors] = useState({
    title: false,
  });
  useEffect(() => {
    if (token) {
      dispatch(getCategoryPatent(currentPage, limit));
    }
  }, [token, dispatch, currentPage, limit]);

  const handleDeleteFaq = async (id: number | string | null) => {
    if (token) {
      const newPage = patents.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      dispatch(deleteCategoryPatent(id, newPage, limit));
    }
  };

  return {
    patents,
    currentPage,
    totalPages,
    // totalValue,
    limit,
    handleDeleteFaq,
    dispatch,
    categoryPatentDetail,
    setForm,
    form,
    errors,
    setErrors,
  };
};

export default usePatent;
