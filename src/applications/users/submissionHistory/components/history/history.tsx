import { useState } from "react";
import Button from "../button";
import TabelHistori from "./tableHistori";

const History = () => {
  const [currentStatus, setCurrentStatus] = useState("Hak Cipta");

  return (
    <div className="flex flex-col p-8 border rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-14">History Pengajuan</h1>
      <div className="flex flex-row w-full">
        <Button label={"Hak Cipta"} isActive={currentStatus === "Hak Cipta"} onClick={() => setCurrentStatus("Hak Cipta")} />
        <Button label={"Paten"} isActive={currentStatus === "Paten"} onClick={() => setCurrentStatus("Paten")} />
        <Button label={"Merek"} isActive={currentStatus === "Merek"} onClick={() => setCurrentStatus("Merek")} />
        <Button label={"Desain Industri"} isActive={currentStatus === "Desain Industri"} onClick={() => setCurrentStatus("Desain Industri")} />
      </div>
      <div className="mt-14">
        <TabelHistori />
      </div>
    </div>
  );
};

export default History;
