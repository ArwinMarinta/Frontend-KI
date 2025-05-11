import { Dropdown, DropdownItem } from "flowbite-react"; // atau sesuaikan import Dropdown kamu
import { FaAngleDown } from "react-icons/fa";

interface DropdownLimitProps {
  value: number;
  onChange: (value: number) => void;
}

const DropdownLimit = ({ value, onChange }: DropdownLimitProps) => {
  const options = [2, 3, 5, 7];

  return (
    <Dropdown
      label=""
      dismissOnClick={false}
      renderTrigger={() => (
        <button className="relative rounded-md border border-GREY02 px-3 py-2">
          <div className="flex flex-row items-center gap-1">
            <span>{value}</span>
            <FaAngleDown className="text-[10px]" />
          </div>
        </button>
      )}
      className="w-max-fit"
    >
      {options.map((option) => (
        <DropdownItem key={option} value={option || 2} onClick={() => onChange(option)} className="text-gray-900 hover:bg-gray-100">
          {option}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default DropdownLimit;
