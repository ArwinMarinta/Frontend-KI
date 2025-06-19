import Logo from "../../assets/logo_ki.webp";
import { NavbarData } from "../../data/navigation";
import LogoKI from "../../assets/logo_ki.webp";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAnglesLeft } from "react-icons/fa6";

const Navbar = () => {
  const location = useLocation();
  const { user, token } = useProfile();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);
  const closePopup = () => setIsPopupOpen(false);

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
    <nav className="w-full flex justify-center fixed top-0  z-50 bg-white shadow-sm">
      <div className="container w-full flex flex-row justify-between py-4 items-center">
        <div className="hidden lg:block">
          <div className="flex flex-row justify-center items-center gap-24 ">
            <Link to="/" className="flex flex-row justify-center items-center gap-[6px]">
              <img src={Logo} alt="Logo KI" className=" h-14" loading="lazy" />
              <h1 className="font-bold text-xl text-PRIMARY01 hidden md:block">Sentra KI ITK</h1>
            </Link>
            <div className="">
              <ul className="flex flex-row gap-6">
                {NavbarData.map((data) => (
                  <li key={data.id} className={`${location.pathname === data.url ? "underline underline-offset-8 decoration-[3px] decoration-PRIMARY02" : ""}`}>
                    <Link to={data.url} className={`text-lg ${location.pathname === data.url ? "text-PRIMARY01  font-bold" : "text-black font-medium"}`}>
                      {data.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="lg:hidden">
          <button onClick={togglePopup}>
            <GiHamburgerMenu className="text-3xl" />
          </button>
        </div>

        {token === null && (
          <div className="flex flex-row">
            <Link to="/login">
              <button className="bg-PRIMARY01 py-2 px-4 rounded-md font-semibold text-white ">Masuk</button>
            </Link>
          </div>
        )}

        {user?.role && (
          <>
            {(user.role === "superAdmin" || user.role === "admin") && (
              <Link to="/dashboard">
                <button className="py-2 px-4 bg-PRIMARY01 rounded-md text-white font-semibold">Dashboard</button>
              </Link>
            )}
            {user.role !== "superAdmin" && user.role !== "admin" && (
              <Link to="/dashboard/pengajuan">
                <button className="py-2 px-4 bg-PRIMARY01 rounded-md text-white font-semibold">Dashboard</button>
              </Link>
            )}
          </>
        )}
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-start">
          <div className="w-[60%] bg-white shadow-lg h-full px-2 py-4">
            <div className="flex flex-row items-center justify-between">
              <Link to="/" className="flex items-center p-4 gap-1">
                <img src={LogoKI} alt="image" className="h-10 rounded-full" />
                <span className="font-bold text-PRIMARY01 text-sm">Sentra KI ITK</span>
              </Link>

              <button onClick={closePopup} className="h-8 px-2 bg-gray-100 active:bg-gray-300 rounded-md border border-BORDER01 text-gray-500 font-bold">
                <FaAnglesLeft />
              </button>
            </div>
            <div className="flex flex-col px-2 pb-20  w-full h-screen  overflow-y-auto">
              <div className="flex flex-col gap-2 mt-8 ">
                <div className="mb-2 flex flex-col gap-1">
                  <h1 className="font-bold text-GREY02 mb-4">MENU</h1>
                  <div className="w-full">
                    <ul className="flex flex-col gap-4">
                      {NavbarData.map((data) => (
                        <li key={data.id} className={`${location.pathname === data.url ? "underline underline-offset-8 decoration-[3px] decoration-PRIMARY01" : ""}`}>
                          <Link to={data.url} className="text-base font-medium">
                            {data.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
