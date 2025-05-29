import BackgroundITK from "../../../assets/background_itk.webp";
import Logo from "../components/logo";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../service/store";
import { activationAccount } from "../../../service/actions/authAction";
import { useState } from "react";

const VerifySuccess = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message ?? "";

  const [loading, setLoading] = useState(false);

  const handleVerifyEmail = async () => {
    if (token) {
      setLoading(true);
      try {
        await dispatch(activationAccount(token, navigate));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main id="section-1" className="relative w-full min-h-screen overflow-hidden">
      {/* Background Gambar */}
      <div className="absolute inset-0 z-0">
        <img src={BackgroundITK} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Konten Form di kanan */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-end  ">
        <div className="bg-GREY03 w-[40%] min-h-screen flex justify-center items-center flex-col">
          <div className="mb-10">
            <Logo />
          </div>
          <div className="mb-4">{message === "Token tidak valid atau telah kedaluwarsa." && <div className="bg-red-300 py-3 px-4 font-medium rounded-md text-red-900">{message} silahkan login kembali untuk mendapatkan email verifikasi baru</div>}</div>
          <div>
            <MdOutlineMarkEmailRead className={`text-4xl mb-2 ${message === "berhasil" ? "text-green-500" : "text-gray-400"}`} />
          </div>

          <div className="text-center gap-4">
            {(message === "" || message === "gagal") && (
              <>
                <h1 className="font-medium text-2xl mb-2">Verifikasi Email Kamu</h1>
                <span className="text-base mb-10 block">Klik tombol di bawah untuk memverifikasi akunmu</span>
                <div className="w-full">
                  <button onClick={handleVerifyEmail} disabled={loading} className={`bg-PRIMARY01 w-full text-white p-2 font-semibold rounded-md transition ${loading ? "cursor-not-allowed opacity-70" : ""}`}>
                    {loading ? "Loading..." : "Verifikasi Akun"}
                  </button>
                </div>
              </>
            )}
            {(message === "berhasil" || message === "Token tidak valid atau telah kedaluwarsa.") && (
              <>
                <h1 className="font-medium text-2xl mb-2">Yeay! Email kamu sudah diverifikasi</h1>
                <span className="text-base mb-10 block">Sekarang kamu bisa login ke akunmu.</span>
                <Link to="/login" className="w-full">
                  <button type="button" className="bg-white border border-PRIMARY01 w-full p-2 rounded-md transition flex flex-row justify-center items-center gap-2">
                    <IoArrowBackCircleOutline className="text-xl font-medium" />
                    <span className="font-medium">Kembali Masuk</span>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerifySuccess;
