import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Button = ({ url }: { url: string }) => {
  return (
    <Link to={url} target="_blank" rel="noopener noreferrer">
      <button className="px-6 py-3 bg-PRIMARY01 mt-8 rounded-md">
        <div className="flex flex-row gap-2 justify-center items-center">
          <span className="text-white font-semibold">Pengajuan</span>
          <div className="rounded-full bg-white w-5 h-5 flex justify-center items-center">
            <FaArrowRight className="text-PRIMARY01 text-sm" />
          </div>
        </div>
      </button>
    </Link>
  );
};

export default Button;
