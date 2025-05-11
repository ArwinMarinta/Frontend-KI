import Logo from "../../assets/logo_ki.webp";
import { NavbarData } from "../../data/navigation";
import ProfileImage from "../../assets/images/profile.webp";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Dropdown } from "flowbite-react";
import { IoIosSettings } from "react-icons/io";
import { BiTask } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { RiHistoryLine } from "react-icons/ri";
import useProfile from "../../hooks/useProfile";

const Navbar = () => {
  const location = useLocation();

  const { user } = useProfile();

  return (
    <nav className="w-full flex justify-center fixed top-0  z-50 bg-white">
      <div className="container w-full flex flex-row justify-between py-4 items-center">
        <div className="flex flex-row justify-center items-center gap-24">
          <Link to="/" className="flex flex-row justify-center items-center gap-[6px]">
            <img src={Logo} alt="Logo KI" className=" h-14" />
            <h1 className="font-bold text-xl text-PRIMARY01 hidden md:block">Sentra KI ITK</h1>
          </Link>
          <div className="hidden lg:block">
            <ul className="flex flex-row gap-6">
              {NavbarData.map((data) => (
                <li key={data.id} className={`${location.pathname === data.url ? "underline underline-offset-8 decoration-[3px] decoration-PRIMARY01" : ""}`}>
                  <a className="text-base font-medium" href={data.url}>
                    {data.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {user === null && (
          <div className="flex flex-row">
            <Link to="/login">
              <button className="bg-PRIMARY01 py-2 px-4 rounded-md text-white ">Masuk</button>
            </Link>
          </div>
        )}

        {user?.role && (
          <>
            {(user.role === "superAdmin" || user.role === "admin") && (
              <Link to="/dashboard">
                <button className="py-2 px-4 bg-PRIMARY01 rounded-md text-white font-medium">Dashboard</button>
              </Link>
            )}

            {user?.role !== "superAdmin" && user?.role !== "admin" && (
              <div className="hidden lg:block">
                <div className="flex flex-row gap-6 ">
                  {/* <button onClick={() => setNotificationOpen(!notificationOpen)} className="relative">
                <IoMdNotificationsOutline className="text-3xl" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center ">3</span>
              </button> */}

                  <Dropdown
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <button className="relative">
                        <IoMdNotificationsOutline className="text-3xl" />
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center ">3</span>
                      </button>
                    )}
                    className="w-[300px]"
                  >
                    <div className="flex flex-col w-full ">
                      <div className="flex w-full flex-row justify-between items-center py-2 px-4">
                        <h3 className="text-gray-700 font-semibold text-xl">Notifikasi</h3>
                        <button>
                          <IoClose />
                        </button>
                      </div>
                      <div className="flex flex-col ">
                        <div className="border-b border-t py-3">
                          <div className="px-4 flex flex-row justify-between gap-4">
                            <span>Logo</span>
                            <div className="flex flex-col gap-2">
                              <h2 className="text-base text-black font-semibold">Pengajuan Hak Cipta</h2>
                              <p className="text-sm text-[#B2B2B2]">Penganjuan anda berhasil di kirim saat ini </p>
                              <span className="text-sm text-PRIMARY01 font-medium">15 Nov 2024, 16:23</span>
                            </div>
                          </div>
                        </div>
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

                  <Dropdown
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <button className="flex flex-row">
                        <img src={ProfileImage} alt="image" className="h-10  rounded-full" />
                      </button>
                    )}
                    className="w-[250px] "
                  >
                    <div className="flex flex-col w-full ">
                      <div className="flex w-full flex-row  items-center py-2 px-4 gap-4">
                        <img src={ProfileImage} alt="image" className="h-10 rounded-full" />
                        <div className="flex flex-col ">
                          <span className="font-semibold text-black">{user?.fullname}</span>
                          <span className="text-sm text-[#B2B2B2]">{user?.email}</span>
                        </div>
                      </div>
                      <div className="flex flex-col ">
                        <Link to="/profile" className="flex flex-row py-3 hover:bg-gray-100 px-4 gap-4 items-center">
                          <IoIosSettings className="text-xl text-[#B2B2B2]" />
                          <span className="text-[#111B29] font-medium">Pengaturan Akun</span>
                        </Link>
                        <Link to="/profile" className="flex flex-row py-3 hover:bg-gray-100 px-4 gap-4 items-center">
                          <RiHistoryLine className="text-xl text-[#B2B2B2]" />
                          <span className="text-[#111B29] font-medium">Histori Pengajuan</span>
                        </Link>
                        <button className="flex flex-row py-3 hover:bg-gray-100 px-4 gap-4 items-center">
                          <BiTask className="text-xl text-[#B2B2B2]" />
                          <span className="text-[#111B29] font-medium">Penugasan</span>
                        </button>
                        <button className="flex flex-row py-3 hover:bg-gray-100 px-4 gap-4 items-center">
                          <FiLogOut className="text-xl text-PRIMARY03" />
                          <span className="font-medium text-PRIMARY03">Keluar</span>
                        </button>
                      </div>
                    </div>
                  </Dropdown>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
