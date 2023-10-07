"use client";
import Diagram, { useSchema, createSchema } from "beautiful-react-diagrams";
import "beautiful-react-diagrams/styles.css";
import erdData from "../../../erd.json";

const MainJsone = erdData;

const initialSchema = createSchema({
  nodes: [
    {
      id: "node-1",
      content: "Start",
      coordinates: [100, 150],
      outputs: [
        { id: "port-1", alignment: "right" },
        { id: "port-2", alignment: "right" },
      ],
      disableDrag: true,
      data: {
        foo: "bar",
        count: 0,
      },
    },
    {
      id: "node-2",
      content: "Middle",
      coordinates: [300, 150],
      inputs: [
        { id: "port-3", alignment: "left" },
        { id: "port-4", alignment: "left" },
      ],
      outputs: [
        { id: "port-5", alignment: "right" },
        { id: "port-6", alignment: "right" },
      ],
      data: {
        bar: "foo",
      },
    },
    {
      id: "node-3",
      content: "End",
      coordinates: [600, 150],
      inputs: [
        { id: "port-7", alignment: "left" },
        { id: "port-8", alignment: "left" },
      ],
      data: {
        foo: true,
        bar: false,
        some: {
          deep: {
            object: true,
          },
        },
      },
    },
  ],
  links: [
    { input: "node-2", output: "port-4" },
    { input: "port-2", output: "port-6" },
  ],
});

const UncontrolledDiagram = () => {
  // create diagrams schema
  const [schema, { onChange }] = useSchema(initialSchema);

  return (
    <div style={{ height: "22.5rem" }}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

export default UncontrolledDiagram;
