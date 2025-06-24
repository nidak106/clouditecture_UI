import React from 'react';
import Navbar from './Pages/Navbar.jsx';
import LeftPanel from './Pages/LeftPanel.jsx';
import Canvas from './Pages/Canvas.jsx';
import RightPanel from "./Pages/RightPanel.jsx";
import useStore from './store.js'; 

export default function App() {
  const { 
    navbarExpanded, 
    showLeftPanel, 
    showRightPanel 
  } = useStore();

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16">
        {showLeftPanel && <LeftPanel />}
        <div className="flex-1 bg-white">
          <Canvas />
        </div>
        {showRightPanel && <RightPanel />}
      </div>
    </div>
  );
}
