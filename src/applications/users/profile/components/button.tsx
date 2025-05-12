import { Link, useLocation } from "react-router-dom";

const NavLinkButton = ({ url, icon, text }: { url: string; icon: React.ReactNode; text: string }) => {
  const location = useLocation();
  const isActive = location.pathname === url;

  return (
    <Link to={url} className="w-full">
      <button
        className={`py-2 px-4 w-full flex gap-2 font-medium rounded-md items-center
          ${isActive ? "bg-PRIMARY01 text-white" : "bg-white text-PRIMARY01 border border-PRIMARY01"}`}
      >
        <div>{icon}</div>
        <span>{text}</span>
      </button>
    </Link>
  );
};

export default NavLinkButton;
