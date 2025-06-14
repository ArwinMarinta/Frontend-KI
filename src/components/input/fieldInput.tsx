interface FieldProps {
  label?: string;
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

const Field = ({ label, value, name, type, placeholder, readOnly = false, required = false, onChange, error, need = false }: FieldProps) => {
  return (
    <div className="w-full">
      <label htmlFor={name || label} className="block mb-2 text-base font-medium">
        {label}
        {need && <span className="text-RED01 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name || label}
        name={name}
        className={`bg-gray-50 border ${error ? "border-RED01 ring-RED01 focus:ring-RED01 focus:border-RED01" : "border-BORDER01 focus:ring-PRIMARY01 focus:border-PRIMARY01"} text-base rounded-md block w-full p-2`}
        placeholder={placeholder}
        value={value}
        readOnly={!onChange && readOnly}
        required={required}
        onChange={onChange}
      />
      {error && <p className="text-sm text-RED01 mt-1">{error}</p>}
    </div>
  );
};

export default Field;
