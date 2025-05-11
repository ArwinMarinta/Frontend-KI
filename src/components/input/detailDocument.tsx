import { BsFillFilePdfFill } from "react-icons/bs";
import { API_FILE } from "../../config/config";

interface FieldProps {
  label: string;
  value: string;
  name?: string;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  need?: boolean;
}

const DetailDocument = ({ label, value, name, need = false }: FieldProps) => {
  const isValid = value && value !== "null" && value !== "undefined" && value.trim() !== "";
  return (
    <div className="w-full">
      <label htmlFor={name || label} className="block mb-2 text-base font-medium">
        {label}
        {need && <span className="text-RED01 ml-1">*</span>}
      </label>
      {isValid ? (
        <a href={`${API_FILE}/${value}`} target="_blank" rel="noopener noreferrer" className="block w-full">
          <div className="bg-gray-50 border text-base rounded-md p-2">
            <div className="flex flex-row items-center gap-2">
              <BsFillFilePdfFill className="text-PRIMARY03" />
              <span className="text-PRIMARY01 font-semibold hover:underline">{value}</span>
            </div>
          </div>
        </a>
      ) : (
        <div className="bg-gray-100 border text-base rounded-md p-2 text-gray-400 cursor-not-allowed">
          <div className="flex flex-row items-center gap-2">
            <BsFillFilePdfFill className="text-gray-400" />
            <span className="font-semibold">Tidak tersedia</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailDocument;
