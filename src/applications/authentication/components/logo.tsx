import LogoKI from "../../../assets/logo_ki.webp";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex flex-row justify-center items-center w-full gap-2">
      <div>
        <img src={LogoKI} alt="Logo KI" className="h-14" loading="lazy" />
      </div>
      <h1 className="font-semibold text-PRIMARY01 text-[28px]">Sentra KI ITK</h1>
    </Link>
  );
};

export default Logo;
