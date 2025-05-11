import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { FormBrand } from "../../../../types/brandType";
import { deleteCategoryCopyright, getCategoryCopyright } from "../../../../service/actions/categoryCopyrightAction";

const useCopyright = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { copyright, limit, currentPage, totalPages } = useSelector((state: RootState) => state.category.categoryCopyright);
  const { categoryCopyrightDetail } = useSelector((state: RootState) => state.category);

  const [form, setForm] = useState<FormBrand>({
    title: "",
  });

  const [errors, setErrors] = useState({
    title: false,
  });
  useEffect(() => {
    if (token) {
      dispatch(getCategoryCopyright(currentPage, limit));
    }
  }, [token, dispatch, currentPage, limit]);

  const handleDeleteFaq = async (id: number | string | null) => {
    if (token) {
      const newPage = copyright.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      dispatch(deleteCategoryCopyright(id, newPage, limit));
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
    categoryCopyrightDetail,
    setForm,
    form,
    errors,
    setErrors,
  };
};

export default useCopyright;
