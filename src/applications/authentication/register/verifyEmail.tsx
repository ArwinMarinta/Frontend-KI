import BackgroundITK from "../../../assets/background_itk.webp";
import Logo from "../components/logo";
import { MdOutlineEmail } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const VerifyEmail = () => {
  const location = useLocation();
  const { email } = location.state || {};
  return (
    <main id="section-1" className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 ">
        <img src={BackgroundITK} alt="Background" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 w-full min-h-screen flex items-center justify-end  ">
        <div className="bg-GREY03 w-full px-6 lg:w-[40%] min-h-screen flex justify-center items-center flex-col">
          <div className="mb-10">
            <Logo />
          </div>
          <div>
            <MdOutlineEmail className="text-4xl mb-2 text-YELLOW03" />
          </div>

          <div className="text-center gap-4">
            <h1 className="font-medium text-2xl mb-2">Konfirmasikan alamat email Anda</h1>
            <span className="text-base mb-10 block">Kami telah mengirimkan tautan ke {email}</span>
            <Link to="/login" className="w-full">
              <button type="button" className="bg-white border border-PRIMARY01 w-full p-2 rounded-md transition flex flex-row justify-center items-center gap-2">
                <IoArrowBackCircleOutline className="text-xl font-medium" />
                <span className="font-medium">Kembali Masuk</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerifyEmail;
