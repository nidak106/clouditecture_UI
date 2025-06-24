import React from 'react';
import { Handle, Position } from 'reactflow';

export default function CustomNode({ data }) {
  return (
    <div className="p-4 bg-white border rounded shadow text-center">
      <div>{data.label}</div>

      <Handle type="target" position={Position.Top} id="topTarget" />
      <Handle type="source" position={Position.Top} id="topSource" />
      <Handle type="target" position={Position.Bottom} id="bottomTarget" />
      <Handle type="source" position={Position.Bottom} id="bottomSource" />
      <Handle type="target" position={Position.Left} id="leftTarget" />
      <Handle type="source" position={Position.Left} id="leftSource" />
      <Handle type="target" position={Position.Right} id="rightTarget" />
      <Handle type="source" position={Position.Right} id="rightSource" />
    </div>
  );
}
