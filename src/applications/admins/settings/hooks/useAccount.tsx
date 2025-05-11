import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteUser, getAccount } from "../../../../service/actions/userAction";

const useAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { users, totalPages, totalValue, currentPage, limit } = useSelector((state: RootState) => state.user.account);

  useEffect(() => {
    if (token) {
      dispatch(getAccount(currentPage, limit));
    }
  }, [token, dispatch, limit, totalValue, currentPage]);

  const handleDeleteUser = (id: number | string | null) => {
    dispatch(deleteUser(id, currentPage, limit));
  };

  return {
    users,
    currentPage,
    totalPages,
    totalValue,
    limit,
    handleDeleteUser,
  };
};

export default useAccount;
