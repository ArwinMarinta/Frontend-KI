import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { FormBrand } from "../../../../types/brandType";
import { deleteCategoryCopyright, getCategoryCopyright } from "../../../../service/actions/categoryCopyrightAction";
import { deleteStatusIpr } from "../../../../service/actions/statusIprAction";

type FormStatus = {
  title: string;
  type: string
};

const useStatusBrand = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { copyright, limit, currentPage, totalPages } = useSelector((state: RootState) => state.category.categoryCopyright);
  const { detailStatus } = useSelector((state: RootState) => state.status);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<FormStatus>({
    title: "",
    type: ""
  });


  const [errors, setErrors] = useState<{ title: string | null }>({
    title: null,
  });
  // useEffect(() => {
  //   if (token || search !== "") {
  //     dispatch(getCategoryCopyright(currentPage, limit, search));
  //   }
  // }, [token, dispatch, currentPage, limit, search]);



  return {
    copyright,
    currentPage,
    totalPages,
    limit,
    dispatch,
    detailStatus,
    setForm,
    form,
    errors,
    setErrors,
    search,
    setSearch,
  };
};

export default useStatusBrand;
