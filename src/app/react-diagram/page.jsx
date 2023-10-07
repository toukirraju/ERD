"use client";
import ReactDiagram from "@/components/ReactDiagram";
import React from "react";
import "beautiful-react-diagrams/styles.css";
import erdData from "../../../erd.json";

const Page = () => {
  const demo = {
    nodes: [
      { id: "1", content: "Node 1", coordinates: [250, 50] },
      {
        id: "2",
        content: "Node 2",
        coordinates: [100, 200],
        // outputs: [{ id: "port-1" }],
      },
      {
        id: "node-3",
        content: "Node 3",
        coordinates: [250, 220],
        inputs: [{ id: "port-2" }],
      },
      { id: "node-4", content: "Node 4", coordinates: [400, 200] },
    ],
    links: [
      { input: "1", output: "2" },
      // { input: "node-1", output: "node-3" },
      // { input: "node-1", output: "node-4" },
      // { input: "port-1", output: "port-2" },
    ],
  };

  function transformJson(jsonData) {
    // Initialize an empty array to store the transformed data
    const transformedData = [];

    // Initialize an array to store the field mappings
    const fieldMappings = [];

    // Initialize a counter for generating unique IDs
    let parentIdCounter = 1;
    let childIdCounter = 1;

    // Create a mapping of reference_field values to child objects
    const referenceFieldMap = {};

    // Iterate through the original JSON data
    for (const key in jsonData) {
      if (jsonData.hasOwnProperty(key)) {
        // Create a new object with an 'id' property
        const newObj = {
          id: `parent-id-${parentIdCounter++}`,
          name: key,
          children: [],
        };

        // Check if the current key has an array of objects
        if (Array.isArray(jsonData[key])) {
          // Iterate through the array and assign IDs to objects
          for (const item of jsonData[key]) {
            const childObj = {
              id: `child-id-${childIdCounter++}`,
              ...item,
            };
            newObj.children.push(childObj);

            // Check if the child object has a 'fields' object
            if (childObj.fields) {
              for (const fieldKey in childObj.fields) {
                const field = childObj.fields[fieldKey];

                if (field && field.reference_field) {
                  // Check if the field object has a 'reference_field' key
                  // Extract the reference_field value from the field object
                  const referenceFieldValue = field.reference_field;

                  // Store child objects by their reference_field value
                  if (!referenceFieldMap[referenceFieldValue]) {
                    referenceFieldMap[referenceFieldValue] = [];
                  }
                  referenceFieldMap[referenceFieldValue].push(childObj);
                }
              }
            }
          }
        }

        // Push the new object to the transformed data array
        transformedData.push(newObj);
      }
    }

    // Create field mappings for ForeignKey and matching reference_field
    for (const key in referenceFieldMap) {
      if (referenceFieldMap.hasOwnProperty(key)) {
        const childrenWithForeignKey = referenceFieldMap[key].filter(
          (child) => {
            // console.log(child);
          }
        );

        for (const foreignKeyChild of childrenWithForeignKey) {
          fieldMappings.push({
            input: referenceFieldMap[key].map((child) => child.id),
            output: foreignKeyChild.id,
          });
        }
      }
    }

    return { transformedData, fieldMappings };
  }

  const transformedJson = transformJson(erdData);
  // console.log(transformedJson);

  function extractDataFromArray(data) {
    const resultArray = [];

    // Function to recursively extract data
    function extractData(data, x, y) {
      for (const item of data) {
        const id = item.id;
        const content = item.name;
        const coordinates = [x, y];
        const data = item;
        resultArray.push({ id, content, coordinates, data });

        if (item.children && item.children.length > 0) {
          // Increase x to space elements horizontally
          // Increase y to space elements vertically
          extractData(item.children, x + 180, y + 50); // Adjust the spacing as needed
        }
      }
    }

    // Call the recursive function to extract data starting at coordinates [400, 200]
    extractData(data, 400, 200);

    // Return the result array
    return resultArray;
  }

  function extractReferenceFieldPairs(data, graphNodes) {
    const referenceFieldPairs = [];
    // console.log(graphNodes);
    function traverseData(node) {
      if (node.children) {
        for (const child of node.children) {
          traverseData(child);
        }
      }

      if (node.fields) {
        for (const fieldName in node.fields) {
          const fieldInfo = node.fields[fieldName];

          if (fieldInfo.reference_field) {
            let neid;
            graphNodes.forEach((item) => {
              if (item.content === fieldInfo.reference_field) {
                return (neid = item.id);
              }
            });
            // console.log(neid);
            referenceFieldPairs.push({
              // input: fieldInfo.reference_field,
              input: neid,
              output: node.id,
            });
          }
        }
      }
    }

    // Assuming your JSON data is stored in a variable named 'transformedData'
    const transformedData = data;

    // Start the traversal
    traverseData({ children: transformedData });

    return referenceFieldPairs;
  }

  const result = extractDataFromArray(transformedJson.transformedData);

  const referenceFieldPairs = extractReferenceFieldPairs(
    transformedJson.transformedData,
    result
  );
  // console.log(result);
  // console.log(referenceFieldPairs);
  const grp = {
    nodes: result,
    links: referenceFieldPairs,
  };

  return (
    <div>
      <ReactDiagram demo={grp} />
    </div>
  );
};

export default Page;
