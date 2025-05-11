import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../service/store";
import { getProgresSubmission } from "../../../../service/actions/submissionAction";

const useProgresSubmission = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { progresSubmission } = useSelector((state: RootState) => state.submission);

  useEffect(() => {
    if (token) {
      dispatch(getProgresSubmission(id));
    }
  }, [token, dispatch, id]);

  return {
    progresSubmission,
  };
};

export default useProgresSubmission;
