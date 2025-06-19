import React from "react";
import { ArrowLeft, Save, Upload, Download, ChevronDown, ChevronUp, Scissors, Copy, Clipboard, Trash2 ,Redo,Undo} from 'lucide-react';
import useStore from '../store.js';  // import Zustand store

const Navbar = () => {
  const { navbarExpanded, toggleNavbar, toggleLeftPanel, toggleRightPanel } = useStore();

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
          <button className="flex items-center px-1 py-0.5 border rounded text-xs">
            <Save className="w-4 h-4 mr-1" />
            Save
          </button>

          <button className="flex items-center px-1 py-0.5 border rounded text-xs">
            <Download className="w-4 h-4 mr-1" />
            Import
          </button>

          <button className="flex items-center px-1 py-0.5 border rounded text-xs">
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
            <button><Copy size={14}/></button>
            <button><Scissors size={14}/></button>
            <button><Clipboard size={14}/></button>
            <button><Trash2 size={14}/></button>
            <button><Undo size={14}/></button>
            <button><Redo size={14}/></button>
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
