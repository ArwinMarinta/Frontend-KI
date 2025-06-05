import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { useEffect } from "react";
import { getUserDashboard } from "../../../../service/actions/landingAction";
import { useSelector } from "react-redux";

const useUserDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { userDashboard } = useSelector((state: RootState) => state.landing);

  useEffect(() => {
    if (token) {
      dispatch(getUserDashboard());
    }
  }, [dispatch, token]);

  return {
    dispatch,
    userDashboard,
  };
};

export default useUserDashboard;
