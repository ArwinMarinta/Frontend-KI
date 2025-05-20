import { Dropdown } from "flowbite-react";
import ProfileImage from "../../assets/images/profile.webp";
import { Link } from "react-router-dom";
import { IoIosSettings, IoMdNotificationsOutline } from "react-icons/io";
// import { RiHistoryLine } from "react-icons/ri";
// import { BiTask } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import useProfile from "../../hooks/useProfile";
import { FaCaretDown } from "react-icons/fa";

import useNotifications from "../../applications/users/notifications/hooks/useNotifications";

const HeaderNavigation = () => {
  const { user, handleLogout, token } = useProfile();
  const { unreadNotifications, notifications, handleRead } = useNotifications();

  return (
    <nav className="w-full sticky py-6 border-b z-50 top-0 bg-white">
      <div className="px-4 lg:px-12 flex flex-row justify-between items-center">
        <div>
          <h1 className="font-semibold text-PRIMARY01 text-2xl">Hi, Admin</h1>
        </div>
        <div className="flex flex-row gap-8">
          {token && user?.role !== "superAdmin" && user?.role !== "admin" && (
            <Dropdown
              label=""
              dismissOnClick={false}
              renderTrigger={() => (
                <button className="relative">
                  <IoMdNotificationsOutline className="text-3xl" />
                  {notifications?.totalUnread > 0 && <span className="absolute top-0 right-0 bg-PRIMARY01 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">{notifications.totalUnread}</span>}
                </button>
              )}
              className="w-[300px]"
            >
              <div className="flex flex-col w-full ">
                <div className="flex w-full flex-row justify-between items-center py-2 px-4">
                  <h3 className="text-gray-700 font-semibold text-xl">Notifikasi</h3>
                  <button onClick={handleRead} className="font-semibold text-PRIMARY01 text-sm">
                    Sudah Dibaca
                  </button>
                </div>
                <div className="flex flex-col">
                  {unreadNotifications && unreadNotifications.length > 0 ? (
                    unreadNotifications.map((notif) => (
                      <div key={notif.id} className="border-b border-t py-2 hover:bg-gray-100">
                        <div className="px-4 flex flex-row justify-between gap-4 ">
                          <div className="flex flex-col gap-1">
                            <h2 className="text-base text-black font-semibold">{notif.title}</h2>
                            <p className="text-sm text-[#B2B2B2]">{notif.descripton}</p>
                            <span className="text-sm text-PRIMARY01 font-medium">
                              {new Date(notif.createdAt).toLocaleString("id-ID", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="border-b border-t py-2 px-4 text-center hover:bg-gray-100">Tidak ada notifikasi baru</p>
                  )}
                </div>
                <div className="flex justify-center w-full ">
                  <button className="w-full py-2 px-4">
                    <Link to="/notifikasi">
                      <h3 className="text-gray-700 font-medium text-lg">Lihat Semua</h3>
                    </Link>
                  </button>
                </div>
              </div>
            </Dropdown>
          )}

          <Dropdown
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <button className="flex flex-row items-center gap-2">
                <img src={ProfileImage} alt="image" className="h-10  rounded-full" />
                <span className="font-medium">{user?.fullname}</span>
                <FaCaretDown />
              </button>
            )}
            className="w-[250px] "
          >
            <div className="flex flex-col w-full ">
              <div className="flex w-full flex-row items-center py-2 px-4 gap-4">
                <img src={ProfileImage} alt="image" className="h-10 rounded-full" />
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-semibold text-black overflow-hidden whitespace-nowrap truncate">{user?.fullname ?? "-"}</span>
                  <span className="text-sm text-[#B2B2B2] overflow-hidden whitespace-nowrap truncate">{user?.email ?? "-"}</span>
                </div>
              </div>
              <div className="flex flex-col ">
                <Link to={user?.role === "admin" || user?.role === "superAdmin" ? "/profile/admin" : "/profile"} className="flex flex-row py-3 hover:bg-gray-100 px-4 gap-4 items-center">
                  <IoIosSettings className="text-xl text-[#B2B2B2]" />
                  <span className="text-[#111B29] font-medium">Profile</span>
                </Link>

                <button onClick={handleLogout} className="flex flex-row py-3 hover:bg-gray-100 px-4 gap-4 items-center">
                  <FiLogOut className="text-xl text-PRIMARY03" />
                  <span className="font-medium text-PRIMARY03">Keluar</span>
                </button>
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNavigation;
