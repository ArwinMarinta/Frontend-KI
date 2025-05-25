import HeaderNavigation from "../../../components/adminNavigation/headerNavigation";
import SideSubmisson from "../../../components/adminNavigation/sideSubmisson";
import Breadcrumb from "../../../components/breadcrumb.tsx/breadcrumb";

import useNotifications from "./hooks/useNotifications";
import { HiSpeakerphone } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";

const Notification = () => {
  const { notifications, handleRead, handleChangeLimit } = useNotifications();
  const notificationList = notifications?.notifications ?? [];
  return (
    <>
      <div className="flex flex-row w-full h-full bg-[#F6F9FF]">
        <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
          <SideSubmisson />
        </div>
        <div className="lg:w-[84%] w-full  border ">
          <HeaderNavigation />
          <div className="px-4 lg:px-12  py-8 ">
            <div className="mb-8">
              <Breadcrumb title="NOTIFIKASI" items={[{ label: "Notifikasi", url: "" }]} />
            </div>
            <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
              <div className="flex flex-row justify-between ">
                <h1 className="text-[32px] font-medium">Notifikasi</h1>
                <button onClick={handleRead} className="text-PRIMARY01 font-semibold text-lg">
                  Sudah dibaca
                </button>
              </div>
              <div className="flex flex-col mt-8 border-b border-BORDER01">
                {notifications && notificationList?.length > 0 ? (
                  <>
                    {notifications?.notifications?.map((notif) => (
                      <div key={notif.id} className={`flex flex-row justify-between ${notif.isRead ? "bg-white" : "bg-PRIMARY04"} px-4 items-center border-t border-r border-l border-BORDER01`}>
                        <div className="flex flex-row gap-4 py-4 items-center flex-grow">
                          <div>
                            <HiSpeakerphone className="text-3xl text-PRIMARY01" />
                          </div>
                          <div className="flex-grow">
                            <h1 className="text-lg font-semibold">{notif.title}</h1>
                            <span className="text-gray-600">{notif.descripton}</span>
                          </div>
                        </div>
                        <span className="text-PRIMARY01 font-medium text-center whitespace-nowrap">
                          {new Date(notif.createdAt).toLocaleString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center text-gray-400 py-10">Tidak ada notifikasi yang tersedia.</div>
                )}
              </div>
              <div className="flex justify-center">
                {notifications && notificationList?.length > 0 && (
                  <button onClick={handleChangeLimit} className="mt-6 mx-auto px-6 py-2 hover:bg-gray-200 active:bg-gray-400 flex flex-row items-center gap-2 justify-center   rounded  transition">
                    Lihat Lebih Banyak
                    <IoIosArrowDown />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
