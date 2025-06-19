import { Dropdown } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { IoIosSettings, IoMdNotificationsOutline } from "react-icons/io";
import profileImage from "../../assets/images/profile_blank.svg";
import { FiLogOut } from "react-icons/fi";
import useProfile from "../../hooks/useProfile";
import { FaCaretDown } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import useNotifications from "../../applications/users/notifications/hooks/useNotifications";
import { truncateText2 } from "../../utils/caracterLength";
import { useEffect, useState } from "react";
import Button from "./buttonSideNavigation";
import { MdOutlineCategory, MdOutlineDashboard, MdOutlineMarkChatUnread, MdOutlineQuestionAnswer } from "react-icons/md";
import { HiOutlineMusicNote } from "react-icons/hi";
import { LuAtom, LuFileSliders, LuSettings } from "react-icons/lu";
import { LiaTagSolid } from "react-icons/lia";
import { RxActivityLog, RxCube } from "react-icons/rx";
import { TbBrandGoogleAnalytics, TbContract, TbFileDownload } from "react-icons/tb";
import LogoKI from "../../assets/logo_ki.webp";
import { BiTask } from "react-icons/bi";
import { RiHistoryLine } from "react-icons/ri";
import { FaAnglesLeft } from "react-icons/fa6";
import { API_FILE } from "../../config/config";

const HeaderNavigation = () => {
  const { user, handleLogout, token } = useProfile();
  const { unreadNotifications, notifications, handleRead } = useNotifications();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);
  const closePopup = () => setIsPopupOpen(false);
  const location = useLocation();

  useEffect(() => {
    if (isPopupOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isPopupOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closePopup();
      }
    };

    if (isPopupOpen) {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isPopupOpen]);

  return (
    <nav className="w-full sticky py-6 border-b z-50 top-0 bg-white">
      <div className="px-4 lg:px-12 flex flex-row justify-between items-center">
        <div className="lg:hidden">
          <button onClick={togglePopup}>
            <GiHamburgerMenu className="text-3xl" />
          </button>
        </div>
        <div className="lg:block hidden">{/* <h1 className="font-semibold text-PRIMARY01 text-2xl">Hi, Admin</h1> */}</div>
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
                <img src={user?.image ? `${API_FILE}/image/${user.image}` : profileImage} alt="image" className="h-10  rounded-full" />
                <span className="font-medium hidden  lg:block">{truncateText2(user?.fullname)}</span>
                <FaCaretDown />
              </button>
            )}
            className="w-[250px] "
          >
            <div className="flex flex-col w-full ">
              <div className="flex w-full flex-row items-center py-2 px-4 gap-4">
                <img src={user?.image ? `${API_FILE}/image/${user.image}` : profileImage} alt="image" className="h-10 rounded-full" />
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
      {token && (user?.role === "admin" || user?.role === "superAdmin") && isPopupOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-start">
          <div className="w-[60%] bg-white shadow-lg h-full px-2 py-4">
            <div className="flex justify-end">
              <button onClick={closePopup} className="text-right h-8 px-2 bg-gray-100 active:bg-gray-300 rounded-md w-full border max-w-fit text-gray-500 font-bold border-BORDER01">
                <FaAnglesLeft />
              </button>
            </div>
            <div className="flex flex-col px-2 pb-20  w-full h-screen  overflow-y-auto">
              <Link to="/" className="flex w-full flex-col items-center p-4 gap-4">
                <img src={LogoKI} alt="image" className="h-28 rounded-full" />
                <span className="font-bold text-PRIMARY01 text-2xl">
                  Sentra <br /> KI ITK
                </span>
              </Link>
              <div className="flex flex-col gap-2 mt-8 ">
                <div className="mb-2 flex flex-col gap-1">
                  <h1 className="font-bold text-GREY02 mb-2">MENU</h1>
                  <Button text={"Dashboard"} icon={<MdOutlineDashboard className={`text-lg`} />} url={"/dashboard"} location={location} />
                </div>
                <div className="mb-2 flex flex-col gap-1">
                  <h1 className="font-bold text-GREY02 mb-2">PERMOHONAN</h1>
                  <Button text={"Hak Cipta"} icon={<HiOutlineMusicNote className="text-lg" />} url={"/permohonan/hak-cipta"} location={location} />
                  <Button text={"Paten"} icon={<LuAtom className="text-lg" />} url={"/permohonan/paten"} location={location} />
                  <Button text={"Merek"} icon={<LiaTagSolid className="text-lg" />} url={"/permohonan/merek"} location={location} />
                  <Button text={"Desain Industri"} icon={<RxCube className="text-lg" />} url={"/permohonan/desain-industri"} location={location} />
                </div>
                <div className="mb-2 flex flex-col gap-1">
                  <h1 className="font-bold text-GREY02 mb-2">KATEGORI</h1>
                  <Button text={"Kategori KI"} icon={<MdOutlineCategory className="text-lg" />} url={"/kategori/kekayaan-intelektual"} location={location} />
                  <Button text={"Ketegori H.Cipta"} icon={<HiOutlineMusicNote className="text-lg" />} url={"/kategori/hak-cipta"} location={location} />
                  <Button text={"Kategori Paten"} icon={<LuAtom className="text-lg" />} url={"/kategori/paten"} location={location} />
                  <Button text={"Kategori Merek"} icon={<LiaTagSolid className="text-lg" />} url={"/kategori/merek"} location={location} />
                  <Button text={"Kategori D.Industri"} icon={<RxCube className="text-lg" />} url={"/kategori/desain-industri"} location={location} />
                </div>
                <div className="mb-2 flex flex-col gap-1">
                  <h1 className="font-bold text-GREY02 mb-2">MANAJEMEN</h1>
                  <Button text={"FAQ"} icon={<MdOutlineQuestionAnswer className="text-lg" />} url={"/manajemen/kategori/faq"} location={location} />
                  <Button text={"Unduhan"} icon={<TbFileDownload className="text-lg" />} url={"/manajemen/kategori/unduhan"} location={location} />
                  <Button text={"Pendanaan"} icon={<LuFileSliders className="text-lg" />} url={"/manajemen/tahun/pendanaan"} location={location} />
                  <Button text={"S&K Pendanaan"} icon={<TbContract className="text-lg" />} url={"/manajemen/syarat-ketentuan-pendanaan"} location={location} />
                </div>
                <div className="mb-2 flex flex-col gap-1">
                  <h1 className="font-bold text-GREY02 mb-2">INFORMASI</h1>
                  <Button text={"Laporan & Analisis"} icon={<TbBrandGoogleAnalytics className="text-lg" />} url={"/informasi/laporan-analisis"} location={location} />
                  <Button text={"Pusat Bantuan"} icon={<MdOutlineMarkChatUnread className="text-lg" />} url={"/informasi/pusat-bantuan"} location={location} />
                  <Button text={"Log Aktivitas"} icon={<RxActivityLog className="text-lg" />} url={"/informasi/log-aktivitas"} location={location} />
                </div>
                <div className="mb-2 flex flex-col gap-1">
                  <h1 className="font-bold text-GREY02 mb-2">PENGATURAN</h1>
                  <Button text={"Akun"} icon={<LuSettings className="text-lg" />} url={"/pengaturan/akun"} location={location} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {token && (user?.role === "user" || user?.role === "reviewer") && isPopupOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-start">
          <div className="w-[60%] bg-white shadow-lg h-full px-2 py-4">
            <div className="flex justify-end">
              <button onClick={closePopup} className="text-right h-8 px-2 bg-gray-100 active:bg-gray-300 rounded-md w-full border max-w-fit text-gray-500 font-bold border-BORDER01">
                <FaAnglesLeft />
              </button>
            </div>
            <div className="flex flex-col px-2 pb-20  w-full h-screen  overflow-y-auto">
              <Link to="/" className="flex w-full flex-col items-center p-4 gap-4">
                <img src={LogoKI} alt="image" className="h-28 rounded-full" />
                <span className="font-bold text-PRIMARY01 text-2xl">
                  Sentra <br /> KI ITK
                </span>
              </Link>
              <div className="flex flex-col gap-2 mt-8 ">
                <div className="mb-2 flex flex-col gap-1">
                  <h1 className="font-bold text-GREY02 mb-2">MENU</h1>
                  <Button text={"Dashboard"} icon={<MdOutlineDashboard className={`text-lg`} />} url={"/dashboard/pengajuan"} location={location} />
                </div>
                <div className="mb-2 flex flex-col gap-1">
                  <h1 className="font-bold text-GREY02 mb-2">PENGAJUAN</h1>
                  <Button text={"Hak Cipta"} icon={<HiOutlineMusicNote className="text-lg" />} url={"/pengajuan/hak-cipta"} location={location} />
                  <Button text={"Paten"} icon={<LuAtom className="text-lg" />} url={"/pengajuan/paten"} location={location} />
                  <Button text={"Merek"} icon={<LiaTagSolid className="text-lg" />} url={"/pengajuan/merek"} location={location} />
                  <Button text={"Desain Industri"} icon={<RxCube className="text-lg" />} url={"/pengajuan/desain-industri"} location={location} />
                </div>
                {user?.role === "reviewer" && (
                  <div className="mb-2 flex flex-col gap-1">
                    <h1 className="font-bold text-GREY02 mb-2">REVIEWER</h1>
                    <Button text={"Penugasan"} icon={<BiTask className="text-lg" />} url={"/penugasan"} location={location} />
                  </div>
                )}

                <div className="mb-2 flex flex-col gap-1">
                  <h1 className="font-bold text-GREY02 mb-2">PANGAJUAN SAYA</h1>
                  <Button text={"Progres Pengajuan"} icon={<RiHistoryLine className="text-lg" />} url={`/histori-pengajuan/${"hak-cipta"}`} location={location} />
                  {/* <Button text={"Riwayat"} icon={<RiHistoryLine className="text-lg" />} url={"/histori-pengajuan/hak-cipta"} location={location} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default HeaderNavigation;
