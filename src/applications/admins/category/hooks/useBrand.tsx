import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { deleteCategoryBrand, getCategoryBrand } from "../../../../service/actions/categoryBrandAction";
import { FormBrand } from "../../../../types/brandType";

const useBrand = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { brands, limit, currentPage, totalPages } = useSelector((state: RootState) => state.category.categoryBrand);
  const { categoryBrandDetail } = useSelector((state: RootState) => state.category);

  const [form, setForm] = useState<FormBrand>({
    title: "",
  });

  const [errors, setErrors] = useState({
    title: false,
  });
  useEffect(() => {
    if (token) {
      dispatch(getCategoryBrand(currentPage, limit));
    }
  }, [token, dispatch, currentPage, limit]);

  const handleDeleteFaq = async (id: number | string | null) => {
    if (token) {
      const newPage = brands.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      dispatch(deleteCategoryBrand(id, newPage, limit));
    }
  };

  return {
    brands,
    currentPage,
    totalPages,
    // totalValue,
    limit,
    handleDeleteFaq,
    dispatch,
    categoryBrandDetail,
    setForm,
    form,
    errors,
    setErrors,
  };
};

export default useBrand;
