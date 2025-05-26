// ExcelReader.tsx
import React, { useState } from "react";
import * as XLSX from "xlsx";

interface DataRow {
  [key: string]: string | number | boolean;
}

const ExcelReader: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target?.result;
      if (typeof binaryStr !== "string" && !(binaryStr instanceof ArrayBuffer)) return;

      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData: DataRow[] = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ExcelReader;
