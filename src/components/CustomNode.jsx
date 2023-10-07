import React from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data }) => {
  console.log("Node data : ", data.fields);
  return (
    <div className="bg-gray-900 w-full flex flex-col gap-2 rounded-md border border-white p-2 text-white">
      <div className="bg-gray-600 px-2 py-1 text-center w-full rounded-sm">
        {data.name}
      </div>
      {Object.keys(data.fields).map((fieldKey, idx) => (
        <div
          key={idx}
          className="grid grid-cols-6 gap-2 bg-gray-700/50 px-2 py-1 text-center w-full rounded-sm"
        >
          <span className="col-span-3">{fieldKey}</span>
          <span className="col-span-2">int</span>
          {data.fields[fieldKey].primary_key && (
            <span className="col-span-1 w-6 h-6 rounded-full bg-gray-600 text-xs flex items-center justify-center">
              PK
            </span>
          )}

          {data.fields[fieldKey].primary_key === "ForeignKey" && (
            <span className="col-span-1 w-6 h-6 rounded-full bg-gray-600 text-xs flex items-center justify-center">
              FK
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomNode;
