import React, { useRef } from 'react';
import ReactFlow, {
  Background,
  MiniMap,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import useFlowStore from '../canvasstore';
// import FloatingLabelEditor from './FloatingLabelEditor';

const nodeTypes = {
  custom: CustomNode,
};

export default function Canvas() {
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const onNodesChange = useFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange);
  const onConnect = useFlowStore((state) => state.onConnect);
  const setSelectedNodeId = useFlowStore((state) => state.setSelectedNodeId);

  const flowWrapperRef = useRef(null);

  return (
    <div className="relative w-full h-full flex">
      <ReactFlowProvider>
        <div ref={flowWrapperRef} className="flex-1 h-full w-full">
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
          {/* <FloatingLabelEditor flowWrapperRef={flowWrapperRef} /> */}
        </div>
      </ReactFlowProvider>
    </div>
  );
}
