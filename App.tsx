import React, { useState } from 'react';
import PixelWater from './components/PixelWater';
import ScatterLayout from './components/ScatterLayout';
import DetailView from './components/DetailView';
import { PROJECTS } from './constants';
import { Project } from './types';

function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <div className="relative w-full h-screen font-sans overflow-hidden">
      {/* Background Layer - z-index handled in component (0) */}
      <PixelWater />
      
      {/* Main Content Layer */}
      <main className="relative z-10 w-full h-full">
        <ScatterLayout 
          projects={PROJECTS} 
          onSelect={setActiveProject} 
        />
      </main>

      {/* Modal/Detail Layer */}
      {activeProject && (
        <DetailView 
          project={activeProject} 
          onClose={() => setActiveProject(null)} 
        />
      )}

      {/* Persistent UI Overlay */}
      <div className="fixed top-4 left-4 z-40 hidden md:block">
        <div className="px-3 py-1 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-full text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-help shadow-lg">
          STATUS: OPEN FOR WORK
        </div>
      </div>

      <footer className="fixed bottom-4 w-full text-center z-40 pointer-events-none">
        <p className="text-[10px] uppercase tracking-widest text-white/90 font-bold bg-slate-900/70 backdrop-blur inline-block px-4 py-2 rounded-full border border-slate-700 shadow-xl">
           Mouse Move to Ripple • Click Card to View
        </p>
      </footer>
    </div>
  );
}

export default App;