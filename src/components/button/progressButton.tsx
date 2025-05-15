import { Link } from "react-router-dom";

interface ProgressButtonState {
  type: string;
  submissionType?: string;
  submissionId: number;
}

interface ProgressButtonProps {
  label: string | number;
  url: string;
  state?: ProgressButtonState;
}

const ProgressButton = ({ label, url, state }: ProgressButtonProps) => {
  return (
    <Link to={url} state={state}>
      <button title="Klik untuk mengubah progres" className="py-1 px-4 w-full bg-white border border-GREY04 hover:bg-GREY04 hover:text-white rounded-md flex items-center justify-center whitespace-nowrap">
        {label}
      </button>
    </Link>
  );
};

export default ProgressButton;
