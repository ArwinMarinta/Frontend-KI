import { Datepicker } from "flowbite-react";

interface FieldDatepickerProps {
  label: string;
  name?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  error?: boolean | undefined;
  need?: boolean;
}

const FieldDatepicker = ({ label, name, value, onChange, error = false, need = false }: FieldDatepickerProps) => {
  return (
    <div className="w-full">
      <label htmlFor={name || label} className="block mb-2 text-lg font-medium">
        {label}
        {need && <span className="text-RED01 ml-1">*</span>}
      </label>
      <Datepicker
        language="id"
        name={name}
        value={value}
        onChange={onChange}
        theme={{
          root: {
            input: {
              field: {
                input: {
                  base: `!bg-gray-50 !border ${error ? "!border-RED01 focus:!ring-RED01 focus:!border-RED01" : "!border-BORDER01 focus:!ring-PRIMARY01 focus:!border-PRIMARY01"} !text-base !rounded-md block !w-full p-2`,
                },
              },
            },
          },
        }}
      />
      {error && <p className="text-sm text-RED01 mt-1">Field tidak boleh kosong!</p>}
    </div>
  );
};
export default FieldDatepicker;
