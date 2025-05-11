import { Dropdown } from "flowbite-react";
import ProfileImage from "../../assets/images/profile.webp";
import { Link } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
// import { RiHistoryLine } from "react-icons/ri";
// import { BiTask } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import useProfile from "../../hooks/useProfile";
import { FaCaretDown } from "react-icons/fa";

const HeaderNavigation = () => {
  const { user } = useProfile();
  return (
    <nav className="w-full sticky py-6 border-b z-50 top-0 bg-white">
      <div className="container flex flex-row justify-between items-center">
        <div>
          <h1 className="font-semibold text-PRIMARY01 text-2xl">Hi, Admin</h1>
        </div>
        <div>
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
              <div className="flex w-full flex-row  items-center py-2 px-4 gap-4">
                <img src={ProfileImage} alt="image" className="h-10 rounded-full" />
                <div className="flex flex-col ">
                  <span className="font-semibold text-black">{user?.fullname ?? "-"}</span>
                  <span className="text-sm text-[#B2B2B2]">{user?.email ?? "-"}</span>
                </div>
              </div>
              <div className="flex flex-col ">
                <Link to="/profile/admin" className="flex flex-row py-3 hover:bg-gray-100 px-4 gap-4 items-center">
                  <IoIosSettings className="text-xl text-[#B2B2B2]" />
                  <span className="text-[#111B29] font-medium">Profile</span>
                </Link>
                {/* <Link to="/profile" className="flex flex-row py-3 hover:bg-gray-100 px-4 gap-4 items-center">
                  <RiHistoryLine className="text-xl text-[#B2B2B2]" />
                  <span className="text-[#111B29] font-medium">Ubah Password</span>
                </Link>
                <button className="flex flex-row py-3 hover:bg-gray-100 px-4 gap-4 items-center">
                  <BiTask className="text-xl text-[#B2B2B2]" />
                  <span className="text-[#111B29] font-medium">Penugasan</span>
                </button> */}
                <button className="flex flex-row py-3 hover:bg-gray-100 px-4 gap-4 items-center">
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
