import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { deleteCategoryFaq, getCategoryFaq } from "../../../../service/actions/faqAction";
// import { setCurrentPage } from "../../../../service/reducers/manageReducer";

const useCategoryFaqs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { faqs, currentPage, totalPages, totalValue, limit } = useSelector((state: RootState) => state.manage.faqsCategoryData);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (token || search !== "") {
      dispatch(getCategoryFaq(currentPage, limit, search));
    }
  }, [token, dispatch, currentPage, limit, totalValue, search]);

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
    search,
    setSearch,
  };
};

export default useCategoryFaqs;
