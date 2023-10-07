import React from "react";
const getTotalFieldCount = (childData) => {
  let totalFieldCount = 1;

  // Iterate through the objects and count the fields
  childData.forEach((obj) => {
    if (obj.fields) {
      totalFieldCount += Object.keys(obj.fields).length;
    }
  });

  return totalFieldCount;
};

const CustomGroup = ({ data }) => {
  const childrenLength = data?.children.length;
  const childrenFieldsCount = getTotalFieldCount(data?.children);
  //   console.log(childrenFieldsCount);
  return (
    <div
      //   className="w-full h-auto"
      style={{
        // width: 152,
        height: 50 * childrenFieldsCount,
      }}
    >
      {data.name}
    </div>
  );
};

export default CustomGroup;
