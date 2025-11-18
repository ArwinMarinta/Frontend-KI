import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { FormBrand } from "../../../../types/brandType";
// import { deleteCategoryCopyright, getCategoryCopyright } from "../../../../service/actions/categoryCopyrightAction";
import { deleteStatusIpr, getStatusIpr } from "../../../../service/actions/statusIprAction";
import { getStatusAllByType } from "../../../../service/reducers/statusReducer";

const useStatusBrand = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { center, limit, currentPage, totalPages } = useSelector((state: RootState) => state.status.brand);
  const { brandAll } = useSelector((state: RootState) => state.status);
  const [search, setSearch] = useState("");

  const [errors, setErrors] = useState<{ title: string | null }>({
    title: null,
  });

  useEffect(() => {
    if (token || search !== "") {
      dispatch(getStatusIpr(currentPage, limit, "brand", search));
    }
  }, [token, dispatch, currentPage, limit, search]);

  useEffect(() => {
    dispatch(getStatusAllByType("brand"))
  }, []);

  const handleDeleteStatusByType = async (id: number | string | null) => {
    if (token) {
      const newPage = center.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      dispatch(deleteStatusIpr(id, "brand", limit, newPage));
    }
  };

  return {
  center,
    currentPage,
    totalPages,
    brandAll,
    // totalValue,
    limit,
    // handleDeleteFaq,
    dispatch,
    // categoryCopyrightDetail,
    // setForm,
    // form,
    errors,
    setErrors,
    search,
    setSearch,
    handleDeleteStatusByType
  };
};

export default useStatusBrand;
