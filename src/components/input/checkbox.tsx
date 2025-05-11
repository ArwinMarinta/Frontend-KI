import React from "react";

interface CheckBox {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const CheckBox = ({ id, label, checked, onChange }: CheckBox) => {
  return (
    <div className={`flex items-center mb-4`}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md focus:ring-PRIMARY010 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1" />
      <label htmlFor={id} className="ms-2 text-sm text-gray-900">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
