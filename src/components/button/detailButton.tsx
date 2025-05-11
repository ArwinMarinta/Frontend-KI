import { useNavigate } from "react-router-dom";

interface DetailButtonProps {
  url: string;
  state?: { id: string | number };
}

const DetailButton = ({ url, state }: DetailButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(state ? url : url, { state: state || undefined });
  };
  return (
    <button onClick={handleClick} className="py-1 px-2 border border-PRIMARY01 rounded-md text-PRIMARY01 font-medium">
      Detail
    </button>
  );
};

export default DetailButton;
