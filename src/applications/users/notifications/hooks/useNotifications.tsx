import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { getNotification, updateNotification } from "../../../../service/actions/landingAction";

const useNotifications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { notifications } = useSelector((state: RootState) => state.landing);

  const [limit, setLimit] = useState<number>(10);

  useEffect(() => {
    if (token) {
      dispatch(getNotification(limit));
    }
  }, [token, dispatch, limit]);

  const unreadNotifications = notifications?.notifications?.filter((notification) => !notification.isRead).slice(0, 2);

  const handleRead = () => {
    if (notifications?.totalUnread && notifications.totalUnread > 0) {
      dispatch(updateNotification(limit));
    }
  };

  const handleChangeLimit = () => {
    setLimit(limit + 10);
  };
  return {
    dispatch,
    notifications,
    unreadNotifications,
    handleRead,
    token,
    setLimit,
    handleChangeLimit,
  };
};

export default useNotifications;
