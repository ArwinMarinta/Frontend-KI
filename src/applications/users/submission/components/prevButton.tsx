import { FiArrowLeftCircle } from "react-icons/fi";

type PrevButtonProps = {
  onClick: () => void;
};

const prevButton = ({ onClick }: PrevButtonProps) => {
  return (
    <button onClick={onClick} className="bg-GREY01 px-4 py-2 flex flex-row items-center gap-2 text-GREY02 font-medium rounded-md">
      <FiArrowLeftCircle className="text-xl" />
      Kembali
    </button>
  );
};

export default prevButton;
