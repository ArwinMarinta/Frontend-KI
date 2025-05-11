import BackgroundITK from "../../../assets/background_itk.webp";
import Logo from "../components/logo";

const RessetPassword = () => {
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
        <h1 className="text-[28px] font-bold mb-4">Ganti Kata Sandi</h1>
        <form className="flex flex-col gap-4 ">
          <p className="text-gray-600 mb-2">Kata sandi baru harus memiliki minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan simbol.</p>
          <input type="password" placeholder="Password Baru" className="p-2 border  border-BORDER01 text-base rounded-md focus:outline-none focus:ring-0 focus:ring-PRIMARY01" />
          <input type="password" placeholder="Konfirmasi Password Baru" className="p-2 border mb-4 border-BORDER01 text-base rounded-md focus:outline-none focus:ring-0 focus:ring-PRIMARY01" />

          <button type="submit" className="bg-blue-600  hover:bg-PRIMARY01 text-white p-2 rounded-md transition">
            Ubah Kata Sandi
          </button>
        </form>
      </div>
    </main>
  );
};

export default RessetPassword;
