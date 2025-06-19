import { Link } from "react-router-dom";
import Logo from "../../assets/logo_ki.webp";
// import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full flex justify-center bg-PRIMARY01">
      <div className="container flex flex-col py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full pb-4">
          <div className="px-4 lg:px-0">
            <img src={Logo} alt="Sentra KI ITK" />
          </div>
          <div className="flex flex-col text-white px-4">
            <h2 className="text-xl font-semibold">Alamat Kampus</h2>
            <p className="mt-1">Jl. Soekarno Hatta No.KM 15, Karang Joang, Kec. Balikpapan Utara, Kota Balikpapan, Kalimantan Timur 76127</p>
            <h2 className="text-xl font-semibold mt-2">Gedung</h2>
            <span className="block mt-1">Laboratorium 1, Lantai 2, Ruang LPPM</span>
            <h2 className="text-xl font-semibold mt-2">Call Center</h2>
            <span>081255444730</span>
            <h2 className="text-xl font-semibold mt-2">Email</h2>
            <span className="mt-1">lppm@itk.ac.id</span>
          </div>
          <div className="flex flex-col text-white px-4 mt-8 lg:mt-0 min-w">
            <h2 className="text-xl font-semibold">Permohonan</h2>
            <ul className="mt-2 flex flex-col gap-2">
              <li>
                <Link to="/pengajuan/hak-cipta" className="hover:underline">
                  Hak Cipta
                </Link>
              </li>
              <li>
                <Link to="/pengajuan/paten" className="hover:underline">
                  Paten
                </Link>
              </li>
              <li>
                <Link to="/pengajuan/merek" className="hover:underline">
                  Merek
                </Link>
              </li>
              <li>
                <Link to="/pengajuan/desain-industri" className="hover:underline">
                  Desain Industri
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col text-white px-4  mt-8 lg:mt-0 ">
            <h2 className="text-xl font-semibold">Menu</h2>

            <ul className="mt-2 flex flex-col gap-2">
              <li>
                <Link to="/" className="hover:underline">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/unduhan" className="hover:underline">
                  Unduhan
                </Link>
              </li>
              <li>
                <Link to="/frequently-asked-question" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/hubungi-kami" className="hover:underline">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t-2 w-full pt-4 flex items-center text-white">
          <span className="">© Institut Teknologi Kalimantan 2025. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
