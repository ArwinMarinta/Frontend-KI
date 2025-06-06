import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../service/store";
import { deleteDocument, getDocuments } from "../../../../service/actions/documentAction";

const useDocument = () => {
  const { name } = useParams<{ name: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { docs, currentPage, totalPages, totalValue, limit } = useSelector((state: RootState) => state.manage.documentsData);
  const { faqsDetail } = useSelector((state: RootState) => state.manage);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (token || search !== "") {
      dispatch(getDocuments(name, currentPage, limit, search));
    }
  }, [token, dispatch, currentPage, limit, name, search]);

  const handleDelete = async (id: number | string | null) => {
    if (token) {
      const newPage = docs.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      dispatch(deleteDocument(id, name, newPage, limit));
      // dispatch(setCurrentPage({ key: "faqsData", currentPage: newPage }));
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
    faqsDetail,
    search,
    setSearch,
  };
};

export default useDocument;
