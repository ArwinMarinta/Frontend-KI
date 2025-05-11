import React from "react";
import BackgroundITK from "../../../assets/background_itk.webp";
import Logo from "../components/logo";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import FormLogin from "./components/formLogin";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../service/hooks";
import { useLogin } from "../../../hooks/useLogin";
import { login } from "../../../service/actions/authAction";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { formLogin, setFormLogin } = useLogin();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(formLogin.email, formLogin.password, navigate));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

        <h1 className="text-[28px] font-bold mb-4">Masuk</h1>

        <FormLogin formLogin={formLogin} handleChange={handleChange} handleLogin={handleLogin} />

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
