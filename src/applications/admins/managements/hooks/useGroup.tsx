import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../service/store";
import { deleteGroup, getGroup } from "../../../../service/actions/periodeAction";

const useGroup = () => {
  const { years } = useParams<{ years: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { group, currentPage, totalPages, totalValue, limit } = useSelector((state: RootState) => state.manage.groupsData);

  useEffect(() => {
    if (token) {
      dispatch(getGroup(years, currentPage, limit));
    }
  }, [token, dispatch, currentPage, limit, years]);

  const handleDeleteFaq = async (id: number | string | null) => {
    if (token) {
      const newPage = group.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      dispatch(deleteGroup(id, years, newPage, limit));
      // dispatch(setCurrentPage({ key: "faqsData", currentPage: newPage }));
    }
  };

  return {
    group,
    years,
    currentPage,
    totalPages,
    totalValue,
    limit,
    handleDeleteFaq,
    dispatch,
  };
};

export default useGroup;
