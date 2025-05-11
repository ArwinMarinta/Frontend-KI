import React from "react";
import TableAssignment from "./tableAssignment";

const Assignment = () => {
  return (
    <div className="flex flex-col p-8 border rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-14">Penugasan Review</h1>
      <div className="mt-8">
        <TableAssignment />
      </div>
    </div>
  );
};

export default Assignment;
