import { Link } from "react-router-dom";

interface ButtonManageProps {
  url: string;
}

const ManageButton = ({ url }: ButtonManageProps) => {
  return (
    <Link to={url}>
      <button className="py-1 px-2 border border-PRIMARY01 rounded-md text-PRIMARY01 font-medium">Kelola</button>
    </Link>
  );
};

export default ManageButton;
