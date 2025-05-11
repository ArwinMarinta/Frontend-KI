import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  icon?: ReactNode;
  url: string;
}

const Button = ({ text, icon, url }: ButtonProps) => {
  return (
    <Link to={url} className="w-full">
      <button className="py-2 px-4 bg-PRIMARY01 w-full flex gap-2 text-white font-medium rounded-md items-center">
        <div>{icon}</div>
        <span>{text}</span>
      </button>
    </Link>
  );
};

export default Button;
