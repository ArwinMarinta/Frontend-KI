import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../service/store";
import { getProgresSubmission } from "../service/actions/submissionAction";

const useProgresSubmission = () => {
  const location = useLocation();
  const { submissionId, submissionType } = location.state || {};
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { progresSubmission } = useSelector((state: RootState) => state.submission);

  useEffect(() => {
    if (token) {
      dispatch(getProgresSubmission(submissionId));
    }
  }, [token, dispatch, submissionId]);

  const toSlug = (text: string): string => {
    return text.toLowerCase().replace(/\s+/g, "-");
  };

  return {
    progresSubmission,
    submissionType,
    toSlug,
    submissionId,
  };
};

export default useProgresSubmission;
