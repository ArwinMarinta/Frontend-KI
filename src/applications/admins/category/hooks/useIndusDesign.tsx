import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { useEffect, useState } from "react";
import { FormIndustialDesign } from "../../../../types/industrialDesignType";
import { deleteCategoryIndusDesign, getCategoryIndusDesign } from "../../../../service/actions/categoryIndusDesignAction";

const useIndusDesign = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { design, limit, currentPage, totalPages } = useSelector((state: RootState) => state.category.categoryIndustrialDesign);
  const { categoryIndustrialDesignDetail } = useSelector((state: RootState) => state.category);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<FormIndustialDesign>({
    title: "",
  });

  const [errors, setErrors] = useState({
    title: false,
  });
  useEffect(() => {
    if (token || search !== "") {
      dispatch(getCategoryIndusDesign(currentPage, limit, search));
    }
  }, [token, dispatch, currentPage, limit, search]);

  const handleDeleteFaq = async (id: number | string | null) => {
    if (token) {
      const newPage = design.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      dispatch(deleteCategoryIndusDesign(id, newPage, limit));
    }
  };

  return {
    design,
    currentPage,
    totalPages,
    // totalValue,
    limit,
    handleDeleteFaq,
    dispatch,
    categoryIndustrialDesignDetail,
    setForm,
    form,
    errors,
    setErrors,
    search,
    setSearch,
  };
};

export default useIndusDesign;
