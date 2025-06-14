import React from "react";
import { getHrefByFileName } from "../../../../../utils/detecdtedFile";

interface FileProps {
  label: string;
  value: File | null | undefined;
  name: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  placeholder?: string;
  accept?: string;
  need?: boolean;
  message?: string;
  url?: string | undefined | null;
  edite?: string;
}
const InputFile = ({ label, value, name, required = false, onChange, error, placeholder, accept = ".pdf, .doc, .docx", need = false, message, url, edite }: FileProps) => {
  return (
    <div className="w-full relative">
      <label className="block mb-2 text-base font-medium">
        {label}
        {need && <span className="text-RED01 ml-1">*</span>}
      </label>

      <div className="flex items-center gap-2">
        {/* Tombol Pilih File menggunakan absolute positioning */}
        <label htmlFor={name} className="cursor-pointer bg-[#1F2A37] hover:bg-[#1F2A37] text-white text-sm px-4 py-2 rounded-md absolute left-0">
          Pilih File
        </label>

        {/* Input untuk nama file */}
        <input type="text" readOnly value={value?.name || ""} className={`flex-1 pl-[90px] px-3 py-2 text-sm border rounded-md bg-gray-100 ${error ? "border-RED01" : "border-BORDER01"}`} placeholder={placeholder || "Belum Ada File"} required={required} />

        {/* Input file tersembunyi */}
        <input id={name} name={name} type="file" className="hidden" required={required} onChange={onChange} accept={accept} />
      </div>
      {error && <p className="text-sm text-RED01 mt-1">{error}</p>}
      {(edite === "Ubah" || edite === "Revisi" || edite === "Menunggu") && url && (
        <div className="mt-1 ">
          File lama :
          <a href={getHrefByFileName(url)} className="underline text-PRIMARY01" target="_blank">
            {url}
          </a>{" "}
        </div>
      )}
      <div className="mt-1 text-GREY04 text-sm font-medium">{message}</div>
    </div>
  );
};

export default InputFile;
