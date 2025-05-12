import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { getReviewerSubmission } from "../../../../service/actions/historyAction";

const useAssignment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { reviewer, currentPage, limit, totalPages } = useSelector((state: RootState) => state.history.reviewerSubmission);

  useEffect(() => {
    if (token) {
      dispatch(getReviewerSubmission(currentPage, limit));
    }
  }, [token, dispatch, currentPage, limit]);

  return {
    reviewer,
    limit,
    currentPage,
    dispatch,
    totalPages,
    // handleDeleteSubmission,
  };
};

export default useAssignment;
