import { Link } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const BackButton = () => {
  return (
    <Link to="">
      <button className="flex flex-row items-center gap-2 bg-GREY01 py-2 px-3 rounded-md">
        <IoArrowBackCircleOutline className="text-2xl" />
        <span className="text-base font-medium">Kembali</span>
      </button>
    </Link>
  );
};

export default BackButton;
