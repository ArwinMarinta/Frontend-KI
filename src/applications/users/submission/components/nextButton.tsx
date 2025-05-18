import { FiArrowRightCircle } from "react-icons/fi";

interface NextButtonProps {
  onClick: () => void;
  // disabled: boolean; // Menambahkan properti disabled
}

const NextButton = ({ onClick }: NextButtonProps) => {
  return (
    <button onClick={onClick} className="bg-PRIMARY01 px-4 py-2 flex flex-row items-center  gap-2 text-white font-medium rounded-md cursor-pointer">
      Selanjutnya
      <FiArrowRightCircle className="text-xl" />
    </button>
  );
};

export default NextButton;
