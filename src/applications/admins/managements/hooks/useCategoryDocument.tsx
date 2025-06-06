import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { deleteCategoryDocument, getCategoryDocument } from "../../../../service/actions/documentAction";

const useCategoryDocument = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { docs, currentPage, totalPages, totalValue, limit } = useSelector((state: RootState) => state.manage.documentsCategoryData);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (token || search !== "") {
      dispatch(getCategoryDocument(currentPage, limit, search));
    }
  }, [token, dispatch, currentPage, limit, totalValue, search]);

  const handleDelete = async (id: number | string | null) => {
    if (token) {
      const newPage = docs.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
      console.log(id);
      dispatch(deleteCategoryDocument(id, newPage, limit));
      // dispatch(setCurrentPage({ key: "faqsCategoryData", currentPage: newPage }));
      // dispatch(getCategoryFaq(newPage, limit));
    }
  };

  return {
    docs,
    currentPage,
    totalPages,
    totalValue,
    limit,
    handleDelete,
    dispatch,
    search,
    setSearch,
  };
};

export default useCategoryDocument;
