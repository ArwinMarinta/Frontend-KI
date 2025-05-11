import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { deletesTerms, getTerms } from "../../../../service/actions/termsActions";
// import { setCurrentPage } from "../../../../service/reducers/manageReducer";
// import { setCurrentPageTerms } from "../../../../service/reducers/manageReducer";

const useTerms = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { terms, currentPage, totalPages, totalValue, limit } = useSelector((state: RootState) => state.manage.termsData);

  useEffect(() => {
    if (token) {
      dispatch(getTerms(currentPage, limit));
    }
  }, [token, dispatch, currentPage, limit, totalValue]);

  const handleDelete = async (id: number | string | null) => {
    if (token) {
      const newPage = terms.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      dispatch(deletesTerms(id, newPage, limit));
      // dispatch(setCurrentPage({ key: "termsData", currentPage: newPage }));
      // dispatch(getTerms(newPage, limit));
    }
  };
  return {
    terms,
    currentPage,
    totalPages,
    totalValue,
    limit,
    handleDelete,
    dispatch,
  };
};

export default useTerms;
