import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { getNotification, updateNotification } from "../../../../service/actions/landingAction";

const useNotifications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { notifications } = useSelector((state: RootState) => state.landing);

  useEffect(() => {
    if (token) {
      dispatch(getNotification());
    }
  }, [token, dispatch]);

  const unreadNotifications = notifications?.notifications?.filter((notification) => !notification.isRead).slice(0, 2);

  const handleRead = () => {
    if (notifications?.totalUnread && notifications.totalUnread > 0) {
      dispatch(updateNotification());
    }
  };
  return {
    dispatch,
    notifications,
    unreadNotifications,
    handleRead,
    token,
  };
};

export default useNotifications;
