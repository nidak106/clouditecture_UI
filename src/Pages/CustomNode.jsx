import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import useFlowStore from '../canvasstore';

export default function CustomNode({ id, data }) {
  const selectedNodeId = useFlowStore((state) => state.selectedNodeId);
  const updateNodeLabel = useFlowStore((state) => state.updateNodeLabel);
  const setSelectedNodeId = useFlowStore((state) => state.setSelectedNodeId);

  const [editing, setEditing] = useState(false);
  const [tempLabel, setTempLabel] = useState(data.label);

  const handleSave = () => {
    updateNodeLabel(id, tempLabel);
    setEditing(false);
  };

  return (
    <div
      className="relative text-center"
      onMouseDown={() => setSelectedNodeId(id)}
      onDoubleClick={(e) => {
        e.stopPropagation(); // prevent triggering canvas events
        setEditing(true);
      }}
    >
      {/* Transparent space to maintain handle layout */}
      <div className="flex flex-col items-center opacity-0 pointer-events-none">
        <div className="w-28 h-20" />
        <div className="mt-2 h-6" />
      </div>

      {/* Visible node box and label */}
      <div className="absolute inset-0 flex flex-col items-center pointer-events-auto">
        {/* Node box */}
        <div className="relative bg-white border rounded shadow w-16 h-8">
          <Handle type="target" position={Position.Top} id="topTarget" />
          <Handle type="source" position={Position.Top} id="topSource" />
          <Handle type="target" position={Position.Bottom} id="bottomTarget" />
          <Handle type="source" position={Position.Bottom} id="bottomSource" />
          <Handle type="target" position={Position.Left} id="leftTarget" />
          <Handle type="source" position={Position.Left} id="leftSource" />
          <Handle type="target" position={Position.Right} id="rightTarget" />
          <Handle type="source" position={Position.Right} id="rightSource" />
        </div>

        {/* Label area */}
        <div className="mt-2">
          {editing ? (
            <input
              value={tempLabel}
              onChange={(e) => setTempLabel(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              autoFocus
              className="border text-sm px-2 py-1 rounded w-24"
            />
          ) : (
            <span className="text-sm font-medium">{data.label}</span>
          )}
        </div>
      </div>
    </div>
  );
}
