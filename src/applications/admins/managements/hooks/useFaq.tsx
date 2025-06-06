import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { getFaq, deleteFaq } from "../../../../service/actions/faqAction";
// import { setCurrentPage } from "../../../../service/reducers/manageReducer";
import { useParams } from "react-router-dom";

const useFaq = () => {
  const { name } = useParams<{ name: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { faqs, currentPage, totalPages, totalValue, limit } = useSelector((state: RootState) => state.manage.faqsData);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (token || search !== "") {
      dispatch(getFaq(name, currentPage, limit, search));
    }
  }, [token, dispatch, currentPage, limit, name, search]);

  const handleDeleteFaq = async (id: number | string | null) => {
    if (token) {
      const newPage = faqs.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      dispatch(deleteFaq(id, name, newPage, limit));
      // dispatch(setCurrentPage({ key: "faqsData", currentPage: newPage }));
    }
  };

  return {
    faqs,
    currentPage,
    totalPages,
    totalValue,
    limit,
    handleDeleteFaq,
    dispatch,
    search,
    setSearch,
  };
};

export default useFaq;
