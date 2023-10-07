import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ERD_Flow_Data: [],
  nodes: [],
};

function transformJson(jsonData) {
  // Initialize an empty array to store the transformed data
  const transformedData = [];

  let parentIdCounter = 1;
  let childIdCounter = 1;

  // Iterate through the original JSON data
  for (const key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      // Create a new object with an 'id' property
      const newObj = {
        id: `parent-id-${parentIdCounter++}`,
        name: key,
        type: "group",
        children: [],
      };

      // Check if the current key has an array of objects
      if (Array.isArray(jsonData[key])) {
        // Iterate through the array and assign IDs to objects
        for (const item of jsonData[key]) {
          const childObj = {
            id: `child-id-${childIdCounter++}`,
            parentId: newObj.id,
            ...item,
          };
          newObj.children.push(childObj);
        }
      }

      // Push the new object to the transformed data array
      transformedData.push(newObj);
    }
  }

  return transformedData;
}

function convertNodes(graphData) {
  const resultArray = [];

  // Function to recursively extract graphData
  function extractData(graphData, x, y) {
    let distY = 0;
    let distX = 1;
    for (const item of graphData) {
      const id = item.id;
      const content = item.name;
      const data = { ...item };
      const type = item.type ? item.type : "custom";
      const parentNode = item.parentId;
      const extent = "parent";
      if (item.parentId) {
        //childs
        // console.log(item);
        const position = { x: x, y: y * distY };
        resultArray.push({
          id,
          content,
          position,
          type,
          data: { ...item },
          parentNode,
          extent,
        });
      } else {
        const position = { x: x * distX, y: y };

        //parents
        resultArray.push({
          id,
          content,
          position,
          type,
          data,
          // style: {
          //   width: 152,
          //   height: 50 * item.children.length,
          // },
        });
      }

      if (item.children && item.children.length > 0) {
        // Increase x to space elements horizontally
        // Increase y to space elements vertically
        extractData(item.children, x, y); // Adjust the spacing as needed
      }
      distY = distY + 50;
      distX = distX + 190;
    }
  }

  // Call the recursive function to extract data starting at coordinates [400, 200]
  extractData(graphData, 1, 1);

  // Return the result array
  return resultArray;
}

const react_flow_slice = createSlice({
  name: "ERD",
  initialState,
  reducers: {
    setErdData: (state, action) => {
      const trnsdata = transformJson(action.payload);
      state.ERD_Flow_Data = trnsdata;
    },
    setNodes: (state, action) => {
      const trnsNodes = convertNodes(action.payload);
      state.nodes = trnsNodes;
    },
  },
});

export const { setErdData, setNodes } = react_flow_slice.actions;
export default react_flow_slice.reducer;
