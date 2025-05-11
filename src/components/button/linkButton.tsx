import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
interface ButtonLinkProps {
  url: string;
}

const LinkButton = ({ url }: ButtonLinkProps) => {
  return (
    <Link to={url}>
      <button className="flex flex-row items-center gap-1 bg-white border-2 border-PRIMARY01 hover:border-0  text-PRIMARY01 rounded-md hover:bg-PRIMARY01 hover:text-white px-3 py-1 font-medium">
        <FaPlus />
        <span>Tambah</span>
      </button>
    </Link>
  );
};

export default LinkButton;
