import BackgroundITK from "../../../assets/background_itk.webp";
import Logo from "../components/logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { forgotPassword } from "../../../service/actions/authAction";
import { useState } from "react";
import useLoadingProses from "../../../hooks/useLoadingProses";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../service/store";

const ForgotPassword = () => {
  const location = useLocation();
  const message = location.state?.message ?? "";
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>("");
  const { loading, setLoading } = useLoadingProses();

  const isValidEmail = (email: string) => {
    // regex sederhana untuk cek format email
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() === "") {
      setError("Email tidak boleh kosong");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Format email tidak valid");
      return;
    }
    setLoading(true);
    try {
      await dispatch(forgotPassword(email, navigate));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError(null);
    }
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
        {message === "Pengguna tidak ditemukan" && <div className="bg-red-300 font-medium py-3 px-4 rounded-md text-red-900">{message}</div>}

        {message === "Link reset password telah dikirim ke email kamu." && <div className="bg-green-300 font-medium py-3 px-4 rounded-md text-green-900">{message}</div>}

        <form onSubmit={handleForgotPassword} className="flex flex-col gap-4 mt-2">
          <p className="text-gray-600 mb-2">Masukan email anda yang terhubung dengan akun Sentra KI ITK. Kami akan mengirimkan intruksi merubah kata sandi anda.</p>

          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`bg-gray-50 border ${error ? "border-RED01 ring-RED01 focus:ring-RED01 focus:border-RED01" : "border-BORDER01 focus:ring-PRIMARY01 focus:border-PRIMARY01"} text-base rounded-md block w-full p-2 pr-10`}
              value={email}
              onChange={handleChange}
            />
            {error && <p className="text-sm text-RED01 mt-1">{error}</p>}
          </div>

          <button type="submit" disabled={loading} className="bg-PRIMARY01 text-white p-2 rounded-md transition">
            {loading ? "Loading..." : "Konfirmasi Email"}
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
