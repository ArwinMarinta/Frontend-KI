import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { useEffect } from "react";
import { getLogActivity } from "../../../../service/actions/logActivityAction";

const useLogActivity = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { activity, limit, currentPage, totalPages } = useSelector((state: RootState) => state.information.logActivity);

  useEffect(() => {
    if (token) {
      dispatch(getLogActivity(currentPage, limit));
    }
  }, [token, dispatch, currentPage, limit]);

  return {
    activity,
    currentPage,
    totalPages,
    limit,
    dispatch,
  };
};

export default useLogActivity;
