import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteUser, getAccount } from "../../../../service/actions/userAction";

const useAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { users, totalPages, totalValue, currentPage, limit } = useSelector((state: RootState) => state.user.account);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (token || search !== "") {
      dispatch(getAccount(currentPage, limit, search));
    }
  }, [token, dispatch, limit, totalValue, currentPage, search]);

  const handleDeleteUser = (id: number | string | null) => {
    const newPage = users.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
    dispatch(deleteUser(id, newPage, limit));
  };

  return {
    users,
    currentPage,
    totalPages,
    totalValue,
    limit,
    handleDeleteUser,
    dispatch,
    search,
    setSearch,
  };
};

export default useAccount;
