import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { useEffect } from "react";
import { getUserSubmission } from "../../../../service/actions/historyAction";
import { deleteSubmissionUser } from "../../../../service/actions/submissionAction";
import { useParams } from "react-router-dom";

const useHistorySubmission = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { type } = useParams();
  const { token } = useSelector((state: RootState) => state.auth);
  const { user, currentPage, limit, totalPages } = useSelector((state: RootState) => state.history.historySubmission);
  // const [currentStatus, setCurrentStatus] = useState("Hak Cipta");
  const formatType = (slug: string | undefined) => {
    if (!slug) return "";
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const isDifferentType = user.some((data) => data.submission?.submissionType.title !== formatType(type)) ? 1 : currentPage;

  useEffect(() => {
    const submissionTypeId = type === "hak-cipta" ? 1 : type === "paten" ? 2 : type === "merek" ? 3 : type === "desain-industri" ? 4 : undefined;

    if (token) {
      dispatch(getUserSubmission(isDifferentType, limit, submissionTypeId));
    }
  }, [token, dispatch, currentPage, limit, type, isDifferentType]);

  const handleDeleteSubmission = (id: number | string | null) => {
    const newPage = user.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
    dispatch(deleteSubmissionUser(id, type, newPage, limit));
  };

  return {
    user,
    limit,
    currentPage,
    dispatch,
    totalPages,
    type,
    handleDeleteSubmission,
  };
};

export default useHistorySubmission;
