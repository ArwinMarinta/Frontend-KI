interface NextButtonProps {
  onClick: () => void;
  // disabled: boolean; // Menambahkan properti disabled
}

const NextButton = ({ onClick }: NextButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-PRIMARY01 px-4 py-2 text-white font-medium rounded-md cursor-pointer"
      // Menambahkan disabled pada button
    >
      Selanjutnya
    </button>
  );
};

export default NextButton;
