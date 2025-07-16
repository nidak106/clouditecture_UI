import React, { useEffect, useState } from 'react';
import useFlowStore from '../canvasstore';
import { useReactFlow } from 'reactflow';

export default function FloatingLabelEditor({ flowWrapperRef }) {
  const selectedNodeId = useFlowStore((state) => state.selectedNodeId);
  const nodes = useFlowStore((state) => state.nodes);
  const updateNodeLabel = useFlowStore((state) => state.updateNodeLabel);
  const { project } = useReactFlow();

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setInputValue(selectedNode.data.label);
    }
  }, [selectedNode]);

  // Prevent backspace key from deleting node
  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') {
        e.stopPropagation();
      }
    };

    document.addEventListener('keydown', handler, true);
    return () => document.removeEventListener('keydown', handler, true);
  }, []);

  if (!selectedNode || !flowWrapperRef.current) return null;

  const { x, y } = project(selectedNode.position);
  const wrapperRect = flowWrapperRef.current.getBoundingClientRect();

  return (
    <div
      style={{
        position: 'absolute',
        top: y + wrapperRect.top + 40,
        left: x + wrapperRect.left,
        zIndex: 1000,
        background: 'white',
        padding: '8px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }}
    >
      <input
        className="border p-1 text-sm w-40"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
        onKeyDown={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
      />
      <button
        className="ml-2 bg-blue-500 text-white px-2 py-1 text-sm rounded"
        onClick={(e) => {
          e.stopPropagation();
          updateNodeLabel(selectedNodeId, inputValue);
        }}
      >
        Save
      </button>
    </div>
  );
}
