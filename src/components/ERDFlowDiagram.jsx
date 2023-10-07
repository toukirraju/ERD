"use client";
import { setNodes } from "@/redux/react_flow_slice";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactFlow, {
  Background,
  applyNodeChanges,
  useNodesState,
} from "reactflow";
import CustomNode from "./CustomNode";
import CustomGroup from "./CustomGroup";
const nodeTypes = {
  custom: CustomNode,
  group: CustomGroup,
};

const ERDFlowDiagram = () => {
  const dispatch = useDispatch();
  //redux start here
  const { ERD_Flow_Data, nodes: initNodes } = useSelector(
    (state) => state.flowData
  );
  //   console.log(ERD_Flow_Data);
  //   console.log(nodes);

  useEffect(() => {
    if (ERD_Flow_Data.length > 0) {
      dispatch(setNodes(ERD_Flow_Data));
    }
  }, [ERD_Flow_Data]);

  const [nodes, setnewNodes] = useState(initNodes);
  //   const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setnewNodes((nds) => applyNodeChanges(changes, nds)),
    [setnewNodes]
  );
  //   const onEdgesChange = useCallback(
  //     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  //     [setEdges]
  //   );
  //   const onConnect = useCallback(
  //     (connection) => setEdges((eds) => addEdge(connection, eds)),
  //     [setEdges]
  //   );
  useEffect(() => {
    setnewNodes(initNodes);
  }, [initNodes]);
  //   console.log(nodes);

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        // edges={edges}
        onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        fitView
        style={{
          backgroundColor: "#D0C0F7",
        }}
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default ERDFlowDiagram;
