import { Link } from "react-router-dom";
interface ButtonLinkProps {
  url: string;
}

const ReplyButton = ({ url }: ButtonLinkProps) => {
  return (
    <Link to={url}>
      <button className="py-1 px-2 border border-PRIMARY01 rounded-md text-PRIMARY01 font-medium">Balas</button>
    </Link>
  );
};

export default ReplyButton;
