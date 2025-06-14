interface NumberFieldProps {
  label: string;
  value: number;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

const FieldNumber = ({ label, value, name, placeholder, readOnly = false, required = false, onChange, error = false }: NumberFieldProps) => {
  return (
    <div className="w-full">
      <label htmlFor={name || label} className="block mb-2 text-base font-medium">
        {label}
      </label>
      <input
        type="number"
        id={name || label}
        min="0"
        name={name}
        className={`bg-gray-50 border ${error ? "border-RED01 ring-RED01 focus:ring-RED01 focus:border-RED01" : "border-BORDER01 focus:ring-PRIMARY01 focus:border-PRIMARY01"} text-base rounded-md block w-full p-2`}
        placeholder={placeholder}
        value={value}
        readOnly={!onChange && readOnly}
        required={required}
        onChange={onChange}
        onKeyDown={(e) => {
          if (["-", "e", "+", "."].includes(e.key)) {
            e.preventDefault();
          }
        }}
      />
      {error && <p className="text-sm text-RED01 mt-1">Field Tidak Boleh Kosong!</p>}
    </div>
  );
};

export default FieldNumber;
