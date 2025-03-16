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

const Navbar = () => {
  const location = useLocation();

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
                    <h3 className="text-gray-700 font-medium text-lg">Lihat Semua</h3>
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
                    <span className="font-semibold text-black">Arwin Marinta</span>
                    <span className="text-sm text-[#B2B2B2]">11211019@student.itk.ac.id</span>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <button className="flex flex-row py-3 hover:bg-gray-100 px-4 gap-4 items-center">
                    <IoIosSettings className="text-xl text-[#B2B2B2]" />
                    <span className="text-[#111B29] font-medium">Pengaturan Akun</span>
                  </button>
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

            {/* {notificationOpen && (
              <div className="absolute xl:right-[350px] lg:right-[200px] border rounded-md top-20 w-[300px] bg-white shadow-lg  p-4 z-50 ">
                <div className="flex flex-row justify-between items-center">
                  <h3 className="text-gray-700 font-semibold">Notifikasi</h3>
                  <button>
                    <IoClose />
                  </button>
                </div>
                <ul className="mt-2 text-gray-600 text-sm">
                  <li className="border-b py-2">Notifikasi 1</li>
                  <li className="border-b py-2">Notifikasi 2</li>
                  <li className="py-2">Notifikasi 3</li>
                </ul>
              </div>
            )} */}
            {/* <button className="flex flex-row">
              <img src={ProfileImage} alt="image" className="h-10  rounded-full" />
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
