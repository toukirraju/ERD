"use client";
import Diagram, { createSchema, useSchema } from "beautiful-react-diagrams";
import { useEffect } from "react";
// import erdData from "../../erd.json";
import erdData from "../../newERD.json";

const ReactDiagram = ({ demo }) => {
  function convertGivenDataToGraphData(givenData) {
    const graphData = {
      nodes: [],
      links: [],
    };
    for (
      let parentEntity = 0;
      parentEntity <= Object.keys(givenData).length - 1;
      parentEntity++
    ) {
      const coodinet = Math.round(Math.random(parentEntity + 90) * 80);
      graphData.nodes.push({
        id: parentEntity,
        content: Object.keys(givenData)[parentEntity],
        coordinates: [100 + coodinet, 150 + coodinet],
        outputs: [
          { id: "port-1", alignment: "right" },
          { id: "port-2", alignment: "right" },
        ],
        disableDrag: false,
        data: Object.values(givenData)[parentEntity],
      });
    }
    return graphData;
  }

  // const convertedGraphData = convertGivenDataToGraphData(erdData);

  function organizeData(givenData) {
    const graphData = {
      nodes: [],
      links: [],
    };

    // Helper function to generate a unique ID for nodes
    const generateNodeId = () => {
      return `node-${Math.random().toString(16).substr(2, 8)}`;
    };

    // Iterate over the auth array and organize the data
    givenData.auth.forEach((auth, index) => {
      const mTm = Object.values(auth.fields).find(
        (item) => item.type === "ManyToManyField"
      );
      // console.log("many2many", mTm);
      // Create a node for each auth object
      const authNode = {
        id: index.toString(),
        content: auth.name,
        coordinates: [100 + index * 50, 150 + index * 50],
        // inputs: [{ content: mTm.reference_field }],
        // outputs: [{ id: 1, content: mTm.reference_field }],
        // outputs: [{ content: auth.name }],
        disableDrag: false,
        data: auth.fields,
      };
      // Add the auth node to the nodes array
      graphData.nodes.push(authNode);

      //   // // Create a link between the auth node and the field node
      const link = {
        input: "0",
        output: "1",
      };

      // Add the link to the links array
      graphData.links.push(link);
      // }
    });

    return graphData;
  }

  // const graphData = organizeData(erdData);

  function organizeData2(givenData) {
    const nodes = [];
    const links = [];

    // Helper function to generate a unique ID for nodes
    const generateNodeId = () => {
      return `node-${Math.random().toString(16).substr(2, 8)}`;
    };

    // Iterate over the auth array and organize the data
    givenData.auth.forEach((auth, index) => {
      const mTm = Object.values(auth.fields).find(
        (item) => item.type === "ManyToManyField"
      );

      // Create a node for each auth object
      const authNode = {
        id: generateNodeId(),
        content: auth.name,
        coordinates: [100 + index * 50, 150 + index * 50],
        // inputs: [{ id: generateNodeId(), alignment: "left" }],
        // outputs: [{ id: generateNodeId(), alignment: "right" }],

        disableDrag: false,
        data: auth.fields,
      };

      nodes.push(authNode);

      // Create a link between the auth node and the input node
      // const inputLink = {
      //   input: authNode.inputs[0].id,
      //   output: authNode.id,
      // };

      // links.push(inputLink);
      // console.log(auth.name);
      // console.log(nodes);
      // // // Create a link between the auth node and the output node
      // const outputLink = {
      //   input: authNode.id,
      //   output: authNode.id,
      // };

      // links.push(outputLink);
    });

    // const schema = createSchema({
    //   nodes,
    //   links,
    // });

    return {
      nodes,
      links,
    };
  }

  const sch = organizeData2(erdData);

  // console.log(sch);

  const [schema, { onChange, addNode, connect }] = useSchema(demo);

  const getChildNode = () => {
    schema?.nodes?.map((childNode, idx) => {
      if (childNode.data) {
        childNode?.data?.forEach((element, inxt) => {
          console.log(element);
          const coodinet = Math.round(Math.random(50 + 20) * 50);
          const nextNode = {
            id: inxt + 1,
            content: element.name,
            coordinates: [coodinet + 100, coodinet],
            // render: CustomRender,
            data: element.fields,
            // inputs: [{ id: `port-${Math.random()}`}],
            // outputs: [{ id: `port-${Math.random()}`}],
          };
          // addNode(nextNode);
          // console.log(element.fields);
        });
      }
    });
  };
  // getChildNode();
  // console.log(schema);

  //   id: `node-${schema.nodes.length+1}`,
  //        content: `Node ${schema.nodes.length+1}`,
  //        coordinates: [
  //          schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
  //          schema.nodes[schema.nodes.length - 1].coordinates[1],
  //        ],
  //        render: CustomRender,
  //        data: {onClick: deleteNodeFromSchema},
  //        inputs: [{ id: `port-${Math.random()}`}],
  //        outputs: [{ id: `port-${Math.random()}`}],

  // useEffect(() => {
  //   schema?.nodes?.map((childNode, idx) => {
  //     console.log(childNode.data);
  //     if (childNode.data) {
  //       childNode?.data?.forEach((element, inxt) => {
  //         const coodinet = Math.round(Math.random(50 + 20) * 50);
  //         const nextNode = {
  //           id: inxt + 1,
  //           content: element.name,
  //           coordinates: [coodinet + 100, coodinet],
  //           // render: CustomRender,
  //           data: element.fields,
  //           // inputs: [{ id: `port-${Math.random()}`}],
  //           // outputs: [{ id: `port-${Math.random()}`}],
  //         };

  //         addNode(nextNode);

  //         // console.log(element.fields);
  //       });
  //     }
  //   });
  // }, []);

  return (
    <div style={{ height: "52.5rem" }}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

export default ReactDiagram;
