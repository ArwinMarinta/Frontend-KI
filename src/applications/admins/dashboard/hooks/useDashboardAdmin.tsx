import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { getDashboardAdmin } from "../../../../service/actions/submissionAction";

const useDashboardAdmin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { dashboard } = useSelector((state: RootState) => state.submission);

  useEffect(() => {
    if (token) {
      dispatch(getDashboardAdmin());
    }
  }, [dispatch, token]);

  return {
    dispatch,
    dashboard,
  };
};

export default useDashboardAdmin;
