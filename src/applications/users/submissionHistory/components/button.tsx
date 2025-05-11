type ButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const Button = ({ label, isActive, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`px-4 py-2 border-b-2 font-medium ${isActive ? "border-PRIMARY01 text-PRIMARY01" : "border-GREY01 text-gray-600"}`}>
      {label}
    </button>
  );
};

export default Button;
