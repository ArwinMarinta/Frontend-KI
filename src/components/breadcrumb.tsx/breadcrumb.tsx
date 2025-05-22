import { Link } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";

interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  title?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, title }) => {
  return (
    <nav className="text-sm text-PRIMARY01 flex flex-col gap-2">
      {title && (
        <>
          <span className="font-bold text-BLACK text-3xl">{title}</span>
        </>
      )}

      <div className="flex flex-row items-center text-base">
        <MdChevronRight />
        {items.map((item, index) => (
          <span key={index} className="flex items-center flex-row gap-1">
            {item.url ? (
              <Link to={item.url} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-PRIMARY01 font-semibold">{item.label}</span>
            )}
            {index !== items.length - 1 && <MdChevronRight />}
          </span>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumb;
