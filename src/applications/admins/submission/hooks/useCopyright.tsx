import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { useEffect, useState } from "react";
import { deleteSubmission, getSubmissionCopyRight } from "../../../../service/actions/submissionAction";

const useCopyright = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { copyright, currentPage, limit, totalPages } = useSelector((state: RootState) => state.submission.copyrightData);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (token || search !== "") {
      dispatch(getSubmissionCopyRight(currentPage, limit, search));
    }
  }, [token, dispatch, currentPage, limit, search]);

  const handleDeleteSubmission = (id: number | string | null) => {
    const newPage = copyright.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
    dispatch(deleteSubmission(id, "Hak Cipta", newPage, limit));
  };

  return {
    copyright,
    limit,
    currentPage,
    dispatch,
    totalPages,
    handleDeleteSubmission,
    setSearch,
    search,
  };
};

export default useCopyright;
