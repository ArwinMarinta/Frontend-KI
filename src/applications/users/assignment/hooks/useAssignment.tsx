import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { getReviewerSubmission } from "../../../../service/actions/historyAction";

const useAssignment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { reviewer, currentPage, limit, totalPages } = useSelector((state: RootState) => state.history.reviewerSubmission);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (token || search !== "") {
      dispatch(getReviewerSubmission(currentPage, limit, search));
    }
  }, [token, dispatch, currentPage, limit, search]);

  return {
    reviewer,
    limit,
    currentPage,
    dispatch,
    totalPages,
    search,
    setSearch,
  };
};

export default useAssignment;
