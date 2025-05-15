import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../service/store";
import { getProgresSubmission } from "../../../../service/actions/submissionAction";

const useRevision = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { progresSubmission } = useSelector((state: RootState) => state.submission);
  const { token } = useSelector((state: RootState) => state.auth);
  const { submissionId } = location.state || {};

  useEffect(() => {
    if (token) {
      dispatch(getProgresSubmission(submissionId));
    }
  }, [token, dispatch, submissionId]);

  return {
    progresSubmission,
  };
};

export default useRevision;
