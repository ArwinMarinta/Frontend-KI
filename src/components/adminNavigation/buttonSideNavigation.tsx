import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { Location } from "react-router-dom";

interface ButtonProps {
  text: string;
  icon?: ReactNode;
  url: string;
  location: Location;
}

const ButtonSideNavigation = ({ text, icon, url, location }: ButtonProps) => {
  const active = location.pathname.startsWith(url);

  return (
    <Link to={url} className="w-full">
      <button
        title={text}
        className={`py-2 px-3 w-full flex gap-2 overflow-hidden  flex-nowrap active:bg-gray-200  text-white font-medium rounded-md items-center transition-colors duration-200 
        ${active ? "bg-PRIMARY01" : "bg-white  border-GREY02 hover:bg-GREY01"}`}
      >
        <div className={`${active ? "text-white" : "text-GREY02"}`}>{icon}</div>
        <span className={`truncate max-w-[120px]  ${active ? "text-white" : "text-GREY02"}`}>{text}</span>
      </button>
    </Link>
  );
};

export default ButtonSideNavigation;
