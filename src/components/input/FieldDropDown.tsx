import React from "react";

interface Option {
  label: string;
  value: string | number;
}

interface FieldProps {
  label: string;
  value: string;
  name?: string;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string | null;
  options?: Option[];
  need?: boolean;
}

const FieldDropdown = ({ label, value, name, type = "text", placeholder, readOnly = false, required = false, onChange, error, options = [], need = false }: FieldProps) => {
  const inputId = name || label;

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="block mb-2 text-base font-medium">
        {label}
        {need && <span className="text-RED01 ml-1">*</span>}
      </label>

      {type === "select" ? (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={options.length === 0}
          className={`bg-gray-50 border ${error ? "border-RED01 ring-RED01 focus:ring-RED01 focus:border-RED01" : "border-BORDER01 focus:ring-PRIMARY01 focus:border-PRIMARY01"} text-base rounded-md block w-full p-2`}
        >
          <option value="" hidden>
            Pilih {label}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={inputId}
          name={name}
          className={`bg-gray-50 border ${error ? "border-RED01 ring-RED01 focus:ring-RED01 focus:border-RED01" : "border-BORDER01 focus:ring-PRIMARY01 focus:border-PRIMARY01"} text-base rounded-md block w-full p-2`}
          placeholder={placeholder}
          value={value}
          readOnly={!onChange && readOnly}
          required={required}
          onChange={onChange}
        />
      )}

      {error && <p className="text-sm text-RED01 mt-1">{error}</p>}
    </div>
  );
};

export default FieldDropdown;
