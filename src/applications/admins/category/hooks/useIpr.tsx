import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { deletesIpr, getIpr } from "../../../../service/actions/categoryIprAction";
import { IprForm } from "../../../../types/iprType";
// import { IprForm } from "../../../../types/iprType";

const useIpr = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { iprs, limit, currentPage, totalPages } = useSelector((state: RootState) => state.category.categoryIpr);
  const { categoryIprDetail } = useSelector((state: RootState) => state.category);

  const [form, setForm] = useState<IprForm>({
    title: "",
    isPublish: true,
  });

  const [errors, setErrors] = useState<{ title: string | null }>({
    title: null,
  });
  useEffect(() => {
    if (token) {
      dispatch(getIpr(currentPage, limit));
    }
  }, [token, dispatch, currentPage, limit]);

  const handleDeleteFaq = async (id: number | string | null) => {
    if (token) {
      const newPage = iprs.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      dispatch(deletesIpr(id, newPage, limit));
    }
  };

  return {
    iprs,
    currentPage,
    totalPages,
    // totalValue,
    limit,
    handleDeleteFaq,
    dispatch,
    categoryIprDetail,
    setForm,
    form,
    errors,
    setErrors,
  };
};

export default useIpr;
