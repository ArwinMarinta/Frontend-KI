interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  label: string;
  className?: string;
}

const CreateButton = ({ type = "button", onClick, label, className }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className={`bg-PRIMARY01 px-4 py-2 text-white font-medium rounded-md ${className}`}>
      {label}
    </button>
  );
};

export default CreateButton;
