import Navbar from "../../../components/navigations/navbar";
import useNotifications from "./hooks/useNotifications";
import { HiSpeakerphone } from "react-icons/hi";

const Notification = () => {
  const { notifications, handleRead } = useNotifications();
  const notificationList = notifications?.notifications ?? [];
  return (
    <>
      <Navbar />
      <main className="w-full justify-center flex">
        <section className="container flex flex-col py-32 ">
          <div className="flex flex-row justify-between ">
            <h1 className="text-[32px] font-medium">Notifikasi</h1>
            <button onClick={handleRead} className="text-PRIMARY01 font-semibold text-lg">
              Sudah dibaca
            </button>
          </div>
          <div className="flex flex-col mt-8 border-b border-BORDER01">
            {notifications && notificationList?.length > 0 ? (
              notifications?.notifications?.map((notif) => (
                <div key={notif.id} className={`flex flex-row justify-between ${notif.isRead ? "bg-white" : "bg-PRIMARY04"} px-4 items-center border-t border-r border-l border-BORDER01`}>
                  <div className="flex flex-row gap-4 py-4 items-center flex-grow">
                    <div>
                      <HiSpeakerphone className="text-3xl text-PRIMARY01" />
                    </div>
                    <div className="flex-grow">
                      <h1 className="text-lg font-semibold">{notif.title}</h1>
                      <span>{notif.descripton}</span>
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
              ))
            ) : (
              <div className="text-center text-gray-400 py-10">Tidak ada notifikasi yang tersedia.</div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Notification;
