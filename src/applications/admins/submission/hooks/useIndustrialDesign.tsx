import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { deleteSubmission, getSubmissionIndustrialDesign } from "../../../../service/actions/submissionAction";

const useIndustrialDesign = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { design, currentPage, limit, totalPages } = useSelector((state: RootState) => state.submission.industrialDesignData);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (token || search !== "") {
      dispatch(getSubmissionIndustrialDesign(currentPage, limit, search));
    }
  }, [token, dispatch, currentPage, limit, search]);

  const handleDeleteSubmission = (id: number | string | null) => {
    const newPage = design.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
    dispatch(deleteSubmission(id, "Desain Industri", newPage, limit));
  };

  return {
    design,
    limit,
    currentPage,
    dispatch,
    totalPages,
    handleDeleteSubmission,
    search,
    setSearch,
  };
};

export default useIndustrialDesign;
