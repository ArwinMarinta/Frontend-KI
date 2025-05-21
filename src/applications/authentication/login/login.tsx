import BackgroundITK from "../../../assets/background_itk.webp";
import Logo from "../components/logo";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import FormLogin from "./components/formLogin";
import { useLogin } from "../../../hooks/useLogin";

const Login = () => {
  const { formLogin, handleChange, handleLogin, loading, errors, message } = useLogin();

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

        <h1 className="text-[28px] font-bold mb-4">Masuk</h1>
        <div className="mb-6">
          {message && message !== "Password berhasil diubah." && message !== "Email belum diverifikasi" && <div className="bg-red-300 py-3 px-4 font-medium rounded-md text-red-900">{message}</div>}
          {message && message === "Email belum diverifikasi" && <div className="bg-yellow-200 py-3 px-4 font-medium rounded-md text-yellow-800">{message}</div>}
        </div>
        <FormLogin formLogin={formLogin} handleChange={handleChange} handleLogin={handleLogin} loading={loading} errors={errors} />

        <div className="relative w-full my-8">
          <hr className="border-black" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-GREY03 px-3 text-gray-600 text-sm">atau</span>
        </div>

        <div className="w-full mb-6">
          <button type="submit" className="bg-white border flex justify-center items-center gap-2 border-PRIMARY01 w-full  p-2 rounded-md transition">
            <FcGoogle className="text-2xl" />
            <span>Masuk dengan akun Google</span>
          </button>
        </div>

        <div className="text-center font-medium">
          Tidak punya akun ?{" "}
          <Link to="/register" className="text-PRIMARY01 hover:underline ">
            Daftar
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
