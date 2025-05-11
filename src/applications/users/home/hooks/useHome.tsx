import { useEffect } from "react";
import { AppDispatch, RootState } from "../../../../service/store";
import { useDispatch, useSelector } from "react-redux";
import { getQoutaFunding } from "../../../../service/actions/periodeAction";

const useHome = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { period, year } = useSelector((state: RootState) => state.landing.home);

  useEffect(() => {
    dispatch(getQoutaFunding());
  }, [dispatch]);

  return {
    period,
    year,
  };
};

export default useHome;
