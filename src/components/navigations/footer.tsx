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
            <h2 className="text-xl font-semibold mt-2">Call Center</h2>
            <span>081255444730</span>
            <h2 className="text-xl font-semibold mt-2">Email</h2>
            <span className="mt-1">lppm@itk.ac.id</span>
          </div>
          <div className="flex flex-col text-white px-4 mt-8 lg:mt-0 min-w">
            <h2 className="text-xl font-semibold">Permohonan</h2>
            <ul className="mt-2 flex flex-col gap-2">
              <ol>Hak Cipta</ol>
              <ol>Paten</ol>
              <ol>Merek</ol>
              <ol>Desain Industri</ol>
            </ul>
          </div>
          <div className="flex flex-col text-white px-4  mt-8 lg:mt-0 ">
            <h2 className="text-xl font-semibold">Menu</h2>
            <ul className="mt-2 flex flex-col gap-2">
              <ol>Beranda</ol>
              <ol>Permohonan</ol>
              <ol>Unduhan</ol>
              <ol>FAQ</ol>
              <ol>Hubungin Kami</ol>
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
