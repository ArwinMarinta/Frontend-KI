import { useState } from "react";
import BackgroundITK from "../../../assets/background_itk.webp";
import Logo from "../components/logo";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../service/store";
import useLoadingProses from "../../../hooks/useLoadingProses";
import FieldPassword from "../../../components/input/fieldPassword";
import { resetPassword } from "../../../service/actions/authAction";

const RessetPassword = () => {
  const location = useLocation();
  const message = location.state?.message ?? "";
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useParams();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoadingProses();
  const [formRegister, setFormRegister] = useState({
    password: "",
    confPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validate = () => {
      const newErrors: typeof errors = {};
      const { password, confPassword } = formRegister;

      if (!password) newErrors.password = "Password tidak boleh kosong";
      else if (password.length < 8) newErrors.password = "Password minimal 8 karakter";
      // else if (!/[A-Z]/.test(password)) newErrors.password = "Password harus mengandung huruf besar";
      // else if (!/[a-z]/.test(password)) newErrors.password = "Password harus mengandung huruf kecil";
      // else if (!/[0-9]/.test(password)) newErrors.password = "Password harus mengandung angka";
      // else if (!/[^A-Za-z0-9]/.test(password)) newErrors.password = "Password harus mengandung simbol";

      if (!confPassword) newErrors.confPassword = "Konfirmasi password tidak boleh kosong";
      else if (password !== confPassword) newErrors.confPassword = "Konfirmasi password tidak cocok";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    if (!validate()) return;

    setLoading(true);

    try {
      await dispatch(resetPassword(token, formRegister.password, formRegister.confPassword, navigate));

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormRegister((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Hapus error saat user mengisi ulang field yang sebelumnya error
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const [errors, setErrors] = useState<{ password?: string; confPassword?: string }>({});
  return (
    <main id="section-1" className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <img src={BackgroundITK} alt="Background" className="w-full h-full object-cover" loading="lazy" />

        <div className="absolute inset-0 bg-gradient bg-black/30  z-10" />
      </div>

      <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-GREY03 p-8 rounded-md shadow-lg w-[90%] max-w-xl">
        <div className="mb-6">
          <Logo />
        </div>

        <h1 className="text-[28px] font-bold mb-4">Ganti Kata Sandi</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          {message && message !== "Password berhasil diubah." && <div className="bg-red-300 font-medium py-3 px-4 rounded-md text-red-900">{message}</div>}
          {message && message === "Password berhasil diubah." && <div className="bg-green-300 font-medium py-3 px-4 rounded-md text-green-900">{message}</div>}
          <p className="text-gray-600 mb-2">Kata sandi baru harus memiliki minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan simbol.</p>

          <FieldPassword value={formRegister.password} name="password" type="password" placeholder="password" onChange={handleChange} error={errors?.password} />
          <FieldPassword value={formRegister.confPassword} name="confPassword" type="password" placeholder="Konfirmasi Password" onChange={handleChange} error={errors?.confPassword} />

          <button type="submit" className="bg-PRIMARY01  text-white p-2 rounded-md transition">
            {loading ? "Loading..." : "Ubah Kata Sandi"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default RessetPassword;
