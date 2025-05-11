import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FieldProps {
  label: string;
  value: string;
  name?: string;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  need?: boolean;
}

const FieldPassword = ({ label, value, name, type = "text", placeholder, readOnly = false, required = false, onChange, error = null, need = false }: FieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      <label htmlFor={name || label} className="block mb-2 text-base font-medium">
        {label}
        {need && <span className="text-RED01 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type={type === "password" && !showPassword ? "password" : "text"}
          id={name || label}
          name={name}
          className={`bg-gray-50 border ${error ? "border-RED01 ring-RED01 focus:ring-RED01 focus:border-RED01" : "border-BORDER01 focus:ring-PRIMARY01 focus:border-PRIMARY01"} text-base rounded-md block w-full p-2 pr-10`}
          placeholder={placeholder}
          value={value}
          readOnly={!onChange && readOnly}
          required={required}
          onChange={onChange}
        />
        {type === "password" && (
          <button type="button" onClick={togglePasswordVisibility} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            {showPassword ? (
              <span role="img" aria-label="Hide Password">
                <FaEye />
              </span>
            ) : (
              <span role="img" aria-label="Show Password">
                <FaEyeSlash />
              </span>
            )}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-RED01 mt-1">{error}</p>}
    </div>
  );
};

export default FieldPassword;
