import BackgroundITK from "../../../assets/background_itk.webp";
import Logo from "../components/logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useAppDispatch } from "../../../service/hooks";
import { forgotPassword } from "../../../service/actions/authAction";
import { useState } from "react";

const ForgotPassword = () => {
  const location = useLocation();
  const message = location.state?.message ?? "";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(forgotPassword(email, navigate));
  };

  return (
    <main id="section-1" className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <img src={BackgroundITK} alt="Background" className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient bg-black/30  z-10" />
      </div>

      <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-GREY03 p-8 rounded-md shadow-lg w-[90%] max-w-xl">
        <div className="mb-6">
          <Logo />
        </div>

        <h1 className="text-[28px] font-bold mb-4">Lupa Sandi</h1>
        {message && <div className="bg-green-300 py-3 px-4 rounded-md ">{message}</div>}
        <form onSubmit={handleForgotPassword} className="flex flex-col gap-4 ">
          <p className="text-gray-600 mb-2">Masukan email anda yang terhubung dengan akun Sentra KI ITK. Kami akan mengirimkan intruksi merubah kata sandi anda.</p>

          <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="Email" className="p-2 border mb-4 border-BORDER01 text-base rounded-md focus:outline-none focus:ring-0 focus:ring-PRIMARY01" />

          <button type="submit" className="bg-blue-600  hover:bg-PRIMARY01 text-white p-2 rounded-md transition">
            Konfirmasi Email
          </button>
          <Link to="/login" className="w-full">
            <button type="submit" className="bg-white border border-PRIMARY01 w-full p-2 rounded-md transition flex flex-row justify-center items-center gap-2">
              <IoArrowBackCircleOutline className="text-xl font-medium" />
              <span className="font-medium">Kembali Masuk</span>
            </button>
          </Link>
        </form>
      </div>
    </main>
  );
};

export default ForgotPassword;
