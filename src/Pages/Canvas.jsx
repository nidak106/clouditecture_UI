import React from 'react';
import ReactFlow, { Background, BackgroundVariant, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import useFlowStore from '../canvasstore';
import RightPanel from './RightPanel'; // ✅ Make sure this is imported

export default function Canvas() {
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const onNodesChange = useFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange);
  const onConnect = useFlowStore((state) => state.onConnect);
  const setSelectedNodeId = useFlowStore((state) => state.setSelectedNodeId);

  const nodeTypes = { custom: CustomNode };

  return (
    <div className="w-full h-screen flex">
      <div className="flex-1">
        <ReactFlow
  nodes={nodes}
  edges={edges}
  nodeTypes={nodeTypes}
  onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
  onConnect={onConnect}
  onSelectionChange={(elements) => {
    if (elements?.nodes?.length > 0) {
      setSelectedNodeId(elements.nodes[0].id);
    } else {
      setSelectedNodeId(null);
    }
  }}
  fitView
  className="w-full h-full"
  connectionMode="loose"
  defaultEdgeOptions={{ type: 'smoothstep' }}
/>

      </div>

    </div>
  );
}
