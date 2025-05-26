import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { deleteSubmission, getSubmissionBrand } from "../../../../service/actions/submissionAction";

const useBrand = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { brand, currentPage, limit, totalPages } = useSelector((state: RootState) => state.submission.brandData);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (token || search !== "") {
      dispatch(getSubmissionBrand(currentPage, limit, search));
    }
  }, [token, dispatch, currentPage, limit, search]);

  const handleDeleteSubmission = (id: number | string | null) => {
    const newPage = brand.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
    dispatch(deleteSubmission(id, "Merek", newPage, limit));
  };

  return {
    brand,
    limit,
    currentPage,
    dispatch,
    totalPages,
    handleDeleteSubmission,
    search,
    setSearch,
  };
};

export default useBrand;
