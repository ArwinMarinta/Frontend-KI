import { FiArrowRightCircle } from "react-icons/fi";

interface NextButtonProps {
  onClick: () => void;
  // disabled: boolean; // Menambahkan properti disabled
  type?: boolean;
}

const NextButton = ({ onClick, type }: NextButtonProps) => {
  return (
    <button onClick={onClick} className="bg-PRIMARY01 px-4 py-2 flex flex-row items-center  gap-2 text-white font-medium rounded-md cursor-pointer">
      {type === true ? "Ubah" : "Selanjutnya"}
      {!type && <FiArrowRightCircle className="text-xl" />}
    </button>
  );
};

export default NextButton;
