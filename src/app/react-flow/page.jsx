"use client";
import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

import erdData from "../../../erd.json";

import initialNodes from "./nodes.js";
import initialEdges from "./edges.js";
import { useDispatch, useSelector } from "react-redux";
import ERDFlowDiagram from "@/components/ERDFlowDiagram";
import { setErdData } from "@/redux/react_flow_slice";

const rfStyle = {
  backgroundColor: "#D0C0F7",
};

const Page = () => {
  const dispatch = useDispatch();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  useEffect(() => {
    dispatch(setErdData(erdData));
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      {/* <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        style={rfStyle}
        attributionPosition="top-right"
      >
        <Background />
      </ReactFlow> */}
      <ERDFlowDiagram />
    </div>
  );
};

export default Page;
