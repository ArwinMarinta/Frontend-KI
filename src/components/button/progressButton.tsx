import { Link } from "react-router-dom";

interface ProgressButtonProps {
  label: string | number;
  url: string;
}

const ProgressButton = ({ label, url }: ProgressButtonProps) => {
  return (
    <Link to={url}>
      <button title="Klik untuk mengubah progres" className="py-1 px-4 w-full bg-white border border-GREY04 hover:bg-GREY04 hover:text-white rounded-md flex items-center justify-center whitespace-nowrap">
        {label}
      </button>
    </Link>
  );
};

export default ProgressButton;
