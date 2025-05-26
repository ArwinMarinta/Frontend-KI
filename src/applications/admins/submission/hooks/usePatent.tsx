import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { useEffect, useState } from "react";
import { deleteSubmission, getSubmissionPatent } from "../../../../service/actions/submissionAction";

const usePatent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { patent, currentPage, limit, totalPages } = useSelector((state: RootState) => state.submission.patentData);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (token || search !== "") {
      dispatch(getSubmissionPatent(currentPage, limit, search));
    }
  }, [token, dispatch, currentPage, limit, search]);

  const handleDeleteSubmission = (id: number | string | null) => {
    const newPage = patent.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
    dispatch(deleteSubmission(id, "Paten", newPage, limit));
  };

  return {
    patent,
    limit,
    currentPage,
    dispatch,
    totalPages,
    handleDeleteSubmission,
    search,
    setSearch,
  };
};

export default usePatent;
