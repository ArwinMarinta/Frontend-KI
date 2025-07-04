import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../service/store";
import { FormIndustialDesign } from "../../../../types/industrialDesignType";
import { deleteCategorySubIndusDesign, getCategorySubIndusDesign } from "../../../../service/actions/categoryIndusDesignAction";

const useSubIndusDesign = () => {
  const { ids } = useParams<{ ids: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { design, limit, currentPage, totalPages } = useSelector((state: RootState) => state.category.categorySubIndustrialDesign);
  const { categorySubIndustrialDesignDetail } = useSelector((state: RootState) => state.category);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<FormIndustialDesign>({
    title: "",
  });

  const [errors, setErrors] = useState<{ title: string | null }>({
    title: null,
  });

  useEffect(() => {
    if (token || search !== "") {
      dispatch(getCategorySubIndusDesign(ids, currentPage, limit, search));
    }
  }, [token, dispatch, currentPage, limit, ids, search]);

  const handleDeleteFaq = async (id: number | string | null) => {
    if (token) {
      const newPage = design.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      dispatch(deleteCategorySubIndusDesign(id, ids, newPage, limit));
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
    categorySubIndustrialDesignDetail,
    setForm,
    form,
    errors,
    setErrors,
    ids,
    search,
    setSearch,
  };
};

export default useSubIndusDesign;
