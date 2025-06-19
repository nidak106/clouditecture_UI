import React from 'react';
import ReactFlow, { Background, BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';

export default function Canvas() {
  return (
    <div className="w-full h-full">
      <ReactFlow nodes={[]} edges={[]} className="w-full h-full">
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
}
