import React from "react";

interface FielProps {
  label: string;
  value: string;
}

const Field = ({ label, value }: FielProps) => {
  return (
    <div className="w-full">
      <label htmlFor="first_name" className="block mb-2 text-lg font-medium">
        {label}
      </label>
      <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required value={value} disabled />
    </div>
  );
};

export default Field;
