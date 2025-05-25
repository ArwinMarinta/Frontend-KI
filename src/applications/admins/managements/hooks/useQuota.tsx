import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../service/store";
import { useEffect } from "react";
import { getQuota } from "../../../../service/actions/periodeAction";

const useQuota = () => {
  const { group } = useParams<{ group: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { quota, currentPage, totalPages, totalValue, limit } = useSelector((state: RootState) => state.manage.quotasData);

  useEffect(() => {
    if (token) {
      dispatch(getQuota(group, currentPage, limit));
    }
  }, [token, dispatch, currentPage, limit, group]);

  //   const handleDeleteFaq = async (id: number | string | null) => {
  //     if (token) {
  //       const newPage = quota.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

  //       dispatch(deleteGroup(id, group, newPage, limit));
  //       // dispatch(setCurrentPage({ key: "faqsData", currentPage: newPage }));
  //     }
  //   };

  return {
    group,
    quota,
    currentPage,
    totalPages,
    totalValue,
    limit,
    // handleDeleteFaq,
    dispatch,
  };
};

export default useQuota;
