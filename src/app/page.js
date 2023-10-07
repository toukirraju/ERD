"use client";
import EntityRelationDiagram from "@/components/EntityRelationDiagram";
import erdData from "../../erd.json";

export default function Home() {
  // console.log(erdData);

  function convertGivenDataToGraphData(givenData) {
    const graphData = {
      nodes: [],
      edges: [],
    };

    // Iterate through the models in givenData and map them to nodes
    for (const app in givenData) {
      console.log(app);
      graphData.nodes.push({
        data: {
          id: app,
          label: app,
          type: "model",
        },
      });
      // for (const model of givenData[app]) {
      //   graphData.nodes.push({
      //     data: {
      //       id: model.name,
      //       label: model.name,
      //       type: "model",
      //     },
      //   });
      // }
    }

    // Iterate again to map relationships (edges) between models
    for (const app in givenData) {
      for (const model of givenData[app]) {
        const fields = model.fields;
        for (const fieldName in fields) {
          const field = fields[fieldName];
          if (field.type === "ForeignKey" || field.type === "ManyToManyField") {
            // Add an edge between models
            graphData.edges.push({
              data: {
                source: model.name,
                target: field.reference_field,
                label: fieldName,
              },
            });
          }
        }
      }
    }

    return graphData;
  }

  const convertedGraphData = convertGivenDataToGraphData(erdData);

  // console.log(convertedGraphData);

  return (
    <div>
      <EntityRelationDiagram convertedGraphData={convertedGraphData} />
    </div>
  );
}
