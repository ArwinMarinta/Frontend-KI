import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { useEffect } from "react";
import { deleteSubmission, getSubmissionCopyRight } from "../../../../service/actions/submissionAction";

const useCopyright = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { copyright, currentPage, limit, totalPages } = useSelector((state: RootState) => state.submission.copyrightData);

  useEffect(() => {
    if (token) {
      dispatch(getSubmissionCopyRight(currentPage, limit));
    }
  }, [token, dispatch, currentPage, limit]);

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
  };
};

export default useCopyright;
