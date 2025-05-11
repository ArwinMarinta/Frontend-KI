import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { deletePeriods, getPeriods } from "../../../../service/actions/periodeAction";

const useYears = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { years, currentPage, totalPages, totalValue, limit } = useSelector((state: RootState) => state.manage.periodsData);

  useEffect(() => {
    if (token) {
      dispatch(getPeriods(currentPage, limit));
    }
  }, [token, dispatch, currentPage, limit]);

  const handleDeleteFaq = async (id: number | string | null) => {
    if (token) {
      const newPage = years.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      dispatch(deletePeriods(id, newPage, limit));
      // dispatch(setCurrentPage({ key: "faqsData", currentPage: newPage }));
    }
  };

  return {
    years,
    currentPage,
    totalPages,
    totalValue,
    limit,
    handleDeleteFaq,
    dispatch,
  };
};

export default useYears;
