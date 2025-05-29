import BackgroundITK from "../../../assets/background_itk.webp";
import Logo from "../components/logo";
import { Link } from "react-router-dom";

import { useRegister } from "../../../hooks/useRegister";

import FormRegister from "./components/formRegister";
import GoogleLogin from "../login/components/signInGoogle";

const Register = () => {
  const { formRegister, handleChange, handleRegister, loading, errors, message } = useRegister();

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

        <h1 className="text-[28px] font-bold mb-4">Daftar</h1>
        <div className="mb-4">{message && message !== "Password berhasil diubah." && message !== "Email belum diverifikasi" && <div className="bg-red-300 py-3 px-4 font-medium rounded-md text-red-900">{message}</div>}</div>
        <FormRegister formRegister={formRegister} handleChange={handleChange} handleRegister={handleRegister} errors={errors} loading={loading} />

        <div className="relative w-full my-8">
          <hr className="border-black" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-GREY03 px-3 text-gray-600 text-sm">atau</span>
        </div>

        <div className="w-full mb-6">
          <GoogleLogin />
        </div>

        <div className="text-center font-medium">
          Sudah punya akun ?{" "}
          <Link to="/login" className="text-PRIMARY01 hover:underline ">
            Masuk
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
