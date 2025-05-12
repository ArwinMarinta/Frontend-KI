import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { useEffect, useState } from "react";
import { getUserSubmission } from "../../../../service/actions/historyAction";
import { deleteSubmissionUser } from "../../../../service/actions/submissionAction";

const useHistorySubmission = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { user, currentPage, limit, totalPages } = useSelector((state: RootState) => state.history.historySubmission);
  const [currentStatus, setCurrentStatus] = useState("Hak Cipta");

  const isDifferentType = user.some((data) => data.submission?.submissionType.title !== currentStatus) ? 1 : currentPage;

  useEffect(() => {
    const submissionTypeId = currentStatus === "Hak Cipta" ? 1 : currentStatus === "Paten" ? 2 : currentStatus === "Merek" ? 3 : currentStatus === "Desain Industri" ? 4 : undefined;

    if (token) {
      dispatch(getUserSubmission(isDifferentType, limit, submissionTypeId));
    }
  }, [token, dispatch, currentPage, limit, currentStatus, isDifferentType]);

  const handleDeleteSubmission = (id: number | string | null) => {
    const newPage = user.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
    dispatch(deleteSubmissionUser(id, currentStatus, newPage, limit));
  };

  return {
    user,
    limit,
    currentPage,
    dispatch,
    totalPages,
    currentStatus,
    setCurrentStatus,
    handleDeleteSubmission,
  };
};

export default useHistorySubmission;
