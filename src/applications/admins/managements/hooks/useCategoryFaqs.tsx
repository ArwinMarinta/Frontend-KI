import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { deleteCategoryFaq, getCategoryFaq } from "../../../../service/actions/faqAction";
// import { setCurrentPage } from "../../../../service/reducers/manageReducer";

const useCategoryFaqs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { faqs, currentPage, totalPages, totalValue, limit } = useSelector((state: RootState) => state.manage.faqsCategoryData);

  useEffect(() => {
    if (token) {
      dispatch(getCategoryFaq(currentPage, limit));
    }
  }, [token, dispatch, currentPage, limit, totalValue]);

  const handleDeleteCategoryFaq = async (id: number | string | null) => {
    if (token) {
      const newPage = faqs.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      dispatch(deleteCategoryFaq(id, newPage, limit));
      // dispatch(setCurrentPage({ key: "faqsCategoryData", currentPage: newPage }));
      // dispatch(getCategoryFaq(newPage, limit));
    }
  };

  return {
    faqs,
    currentPage,
    totalPages,
    totalValue,
    limit,
    handleDeleteCategoryFaq,
    dispatch,
  };
};

export default useCategoryFaqs;
