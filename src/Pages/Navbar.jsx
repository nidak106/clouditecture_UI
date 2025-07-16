import React, { useRef } from "react";
import {
  ArrowLeft,
  Save,
  Upload,
  Download,
  ChevronDown,
  ChevronUp,
  Scissors,
  Copy,
  Clipboard,
  Trash2,
  Redo,
  Undo
} from 'lucide-react';

import useStore from '../store.js';            
import useFlowStore from "../canvasstore";      

const Navbar = () => {
  const { navbarExpanded, toggleNavbar, toggleLeftPanel, toggleRightPanel } = useStore();

  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
//adding these
const {
  selectedNodeId,
  deleteNode,
  copyNode,
  cutNode,
  pasteNode,
  duplicateNode,
  redo,undo
} = useFlowStore();


  const handleExport = () => {
    try {
      const flowData = { nodes, edges };
      const json = JSON.stringify(flowData, null, 2);
      const blob = new Blob([json], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "my-flow.pdf"; 
      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Something went wrong during export.");
    }
  };


  const handleSaveAs = async () => {
  const data = { nodes, edges };
  const fileHandle = await window.showSaveFilePicker({
    suggestedName: "my-flow.json",
    types: [
      {
        description: "JSON Files",
        accept: { "application/pdf": [".pdf"] },
      },
    ],
  });

  const writableStream = await fileHandle.createWritable();
  await writableStream.write(JSON.stringify(data, null, 2));
  await writableStream.close();
};


  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-40">
      <div className="relative flex items-center justify-between p-4">

        <div className="flex items-center space-x-2">
          <ArrowLeft className="inline w-4 h-4" />
          <span className="text-sm font-bold text-gray-800 mr-5">Untitled project</span>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
          <span className="text-sm font-bold text-gray-800">Clouditecture</span>
        </div>

        <div className="flex items-center space-x-2">
        <button onClick={handleSaveAs} className="flex items-center px-1 py-0.5 border rounded text-xs">
  <Save className="w-4 h-4 mr-1" />
  Save As
</button>

      
          <button
            className="flex items-center px-1 py-0.5 border rounded text-xs "
          >
            <Download className="w-4 h-4 mr-1" />
            Import
          </button>

          <button onClick={handleExport} className="flex items-center px-1 py-0.5 border rounded text-xs">
            <Upload className="w-4 h-4 mr-1" />
            Export
          </button>

          <button onClick={toggleNavbar} className="px-2 py-0.5 border rounded text-xs">
            {navbarExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {navbarExpanded && (
        <div className="flex justify-between items-center bg-white px-4 py-2 shadow">
          <div className="flex items-center space-x-4">
            <button onClick={toggleLeftPanel} className="px-3 py-1 rounded text-xs shadow mr-3">
              Shapes Panel
            </button>
          <button onClick={copyNode} disabled={!selectedNodeId}><Copy size={14} /></button>
<button onClick={cutNode} disabled={!selectedNodeId}><Scissors size={14} /></button>
<button onClick={pasteNode}><Clipboard size={14} /></button>
<button onClick={() => deleteNode(selectedNodeId)} disabled={!selectedNodeId}><Trash2 size={14} /></button>
            <button onClick={undo}><Undo size={14} /></button>
<button onClick={redo}><Redo size={14} /></button>
          </div>

          <div>
            <button onClick={toggleRightPanel} className="px-3 py-1 rounded text-xs shadow">
              AI Panel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
