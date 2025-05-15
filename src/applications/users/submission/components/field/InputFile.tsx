import React from "react";

interface FileProps {
  label: string;
  value: File | null | undefined;
  name: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  placeholder?: string;
  accept?: string;
  need?: boolean;
}
const InputFile = ({ label, value, name, required = false, onChange, error = false, placeholder, accept = ".pdf, .doc, .docx", need = false }: FileProps) => {
  return (
    <div className="w-full relative">
      <label className="block mb-2 text-base font-medium">
        {label}
        {need && <span className="text-RED01 ml-1">*</span>}
      </label>

      <div className="flex items-center gap-2">
        {/* Tombol Pilih File menggunakan absolute positioning */}
        <label htmlFor={name} className="cursor-pointer bg-PRIMARY01 hover:bg-PRIMARY01 text-white text-sm px-4 py-2 rounded-md absolute left-0">
          Pilih File
        </label>

        {/* Input untuk nama file */}
        <input type="text" readOnly value={value?.name || ""} className={`flex-1 pl-[90px] px-3 py-2 text-sm border rounded-md bg-gray-100 ${error ? "border-RED01" : "border-BORDER01"}`} placeholder={placeholder || "Belum Ada File"} required={required} />

        {/* Input file tersembunyi */}
        <input id={name} name={name} type="file" className="hidden" required={required} onChange={onChange} accept={accept} />
      </div>

      {error && <p className="text-sm text-RED01 mt-1">File Tidak Boleh Kosong!</p>}
    </div>
  );
};

export default InputFile;
