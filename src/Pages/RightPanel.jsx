import React, { useState, useEffect } from "react";
import useFlowStore from "../canvasstore";

const RightPanel = () => {
  const selectedNodeId = useFlowStore((state) => state.selectedNodeId);
  const nodes = useFlowStore((state) => state.nodes);
  const updateNodeLabel = useFlowStore((state) => state.updateNodeLabel);

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);
  const [inputValue, setInputValue] = useState("");

 useEffect(() => {
  if (selectedNode) {
    setInputValue(selectedNode.data.label);
  }
}, [selectedNode?.id]);

  if (!selectedNode) {
    return (
      <div className="mt-10 w-64 bg-white shadow h-full p-4">
        <h2 className="text-lg font-bold mb-4">AI Panel</h2>
        <p>Select a node to edit</p>
      </div>
    );
  }

  return (
    <div className="mt-10 w-64 bg-white shadow h-full p-4">
      <h2 className="text-lg font-bold mb-4">AI Panel</h2>
      <h3 className="font-semibold mb-2">Edit Node Label:</h3>
      <input
  className="border p-2 w-full"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}  // only update local state while typing
/>
<button
  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
  onClick={() => updateNodeLabel(selectedNodeId, inputValue)}  // update global store only when clicking Save
>
  Save
</button>
    </div>
  );
};

export default RightPanel;
