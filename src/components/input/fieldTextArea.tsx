interface FieldTextareaProps {
  label: string;
  value: string;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  row: number;
  error?: string | null;
  need?: boolean;
}

const FieldTextarea = ({ label, value, name, placeholder, readOnly = false, required = false, onChange, row, error, need = false }: FieldTextareaProps) => {
  return (
    <div className="w-full">
      <label htmlFor={name || label} className="block mb-2 text-base font-medium">
        {label}
        {need && <span className="text-RED01 ml-1">*</span>}
      </label>
      <textarea
        id={name || label}
        name={name}
        className={`bg-gray-50 border text-base rounded-md block w-full p-2 ${error ? "border-RED01 focus:ring-RED01 focus:border-RED01" : "border-BORDER01 focus:ring-PRIMARY01 focus:border-PRIMARY01"}`}
        placeholder={placeholder}
        value={value}
        readOnly={!onChange && readOnly}
        required={required}
        onChange={onChange}
        rows={row}
      />{" "}
      {error && <p className="text-sm text-RED01 mt-1">{error}</p>}
    </div>
  );
};

export default FieldTextarea;
