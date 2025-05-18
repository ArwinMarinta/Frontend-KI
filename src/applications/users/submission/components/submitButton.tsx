interface NextButtonProps {
  onClick: () => void;
}
const SubmitButton = ({ onClick }: NextButtonProps) => {
  return (
    <button onClick={onClick} className="bg-PRIMARY01 px-4 py-2 flex flex-row items-center  gap-2 text-white font-medium rounded-md cursor-pointer">
      Kirim
    </button>
  );
};

export default SubmitButton;
