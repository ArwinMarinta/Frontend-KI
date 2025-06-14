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
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<FormCopyright>({
    title: "",
  });

  const [errors, setErrors] = useState<{ title: string | null }>({
    title: null,
  });
  useEffect(() => {
    if (token || search !== "") {
      dispatch(getCategorySubCopyright(ids, currentPage, limit, search));
    }
  }, [token, dispatch, currentPage, limit, ids, search]);

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
    search,
    setSearch,
  };
};

export default useSubCopyright;
