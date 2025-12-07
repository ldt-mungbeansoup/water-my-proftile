import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import PixelCard from './PixelCard';
import { FileText, Gamepad2, Scroll, Search, Terminal } from 'lucide-react';

interface ScatterLayoutProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

const ScatterLayout: React.FC<ScatterLayoutProps> = ({ projects, onSelect }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'Resume': return <FileText size={24} />;
      case 'Game Design Doc': return <Scroll size={24} />;
      case 'Game Analysis': return <Search size={24} />;
      case 'System Design': return <Terminal size={24} />;
      default: return <Gamepad2 size={24} />;
    }
  };

  // Pre-calculated random scatter positions for desktop
  // We use a fixed seed-like approach by hardcoding indices logic or random-within-bounds
  // to ensure they don't jump around on re-renders unless we want them to.
  // For this demo, we'll position them in a radial fan.
  
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4 md:p-10 overflow-hidden">
      
      {/* Central "Character" or "Desk" Hub */}
      <div className={`
        z-20 flex flex-col items-center justify-center text-center 
        transition-all duration-1000 ease-out
        ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
      `}>
        <div className="w-32 h-32 md:w-48 md:h-48 bg-slate-800 border-4 border-white shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] mb-6 overflow-hidden relative group">
             <img 
                src="https://picsum.photos/id/64/200/200" 
                alt="Avatar" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                style={{ imageRendering: 'pixelated' }}
             />
        </div>
        <h1 className="font-['VT323'] text-4xl md:text-6xl text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] bg-slate-900/50 px-4 py-1">
          ALEX DEV
        </h1>
        <p className="mt-2 font-['VT323'] text-xl md:text-2xl text-cyan-300 drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)] bg-slate-900/50 px-2">
          LEVEL 24 GAME DESIGNER
        </p>
        <p className="mt-4 text-sm text-slate-300 max-w-xs md:max-w-md bg-black/40 p-2 rounded backdrop-blur-sm border border-white/10">
          Crafting systems, balancing economies, and building worlds one pixel at a time.
        </p>
      </div>

      {/* Orbiting Projects */}
      <div className="absolute inset-0 pointer-events-none">
        {projects.map((project, index) => {
          // Calculate position for radial layout
          // Desktop: Radial scatter. Mobile: Just ignore and let CSS grid handle it in a separate view?
          // Let's do responsive absolute for desktop, normal flow for mobile logic if we were strict, 
          // but strictly adhering to "scattered" implies absolute.
          
          const angle = (index / projects.length) * 2 * Math.PI;
          const radius = 350; // Distance from center
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          // Add some randomness
          const randomRot = (index % 2 === 0 ? 3 : -3) * (index + 1);
          
          return (
            <div
              key={project.id}
              className={`
                absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                pointer-events-auto
                transition-all duration-700 ease-out
                w-64 h-40 md:w-72 md:h-48
                hidden md:block
              `}
              style={{
                marginTop: mounted ? y : 0,
                marginLeft: mounted ? x : 0,
                rotate: `${randomRot}deg`,
                opacity: mounted ? 1 : 0,
              }}
            >
              <PixelCard 
                onClick={() => onSelect(project)} 
                borderColor={project.color}
                className="h-full"
              >
                <div className="flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                        <span className={`p-1.5 rounded bg-slate-800 ${project.color.replace('border', 'text')}`}>
                            {getIcon(project.category)}
                        </span>
                        <span className="font-['VT323'] text-lg text-slate-400">{project.date}</span>
                    </div>
                    <div>
                        <h3 className="font-['VT323'] text-2xl leading-none mb-1 text-white">{project.title}</h3>
                        <p className="text-xs text-slate-400 line-clamp-2 font-sans">{project.description}</p>
                    </div>
                </div>
              </PixelCard>
            </div>
          );
        })}
      </div>

      {/* Mobile Grid Fallback (Visible only on small screens) */}
      <div className="absolute inset-0 pt-[400px] px-4 pb-10 overflow-y-auto md:hidden pointer-events-auto z-30">
        <div className="grid grid-cols-1 gap-6">
            {projects.map((project) => (
                 <PixelCard 
                 key={`mobile-${project.id}`}
                 onClick={() => onSelect(project)} 
                 borderColor={project.color}
                 className="h-32"
               >
                 <div className="flex items-center gap-4 h-full">
                     <div className={`p-3 rounded bg-slate-800 ${project.color.replace('border', 'text')}`}>
                         {getIcon(project.category)}
                     </div>
                     <div>
                         <h3 className="font-['VT323'] text-2xl text-white">{project.title}</h3>
                         <p className="text-xs text-slate-400 font-sans">{project.description}</p>
                     </div>
                 </div>
               </PixelCard>
            ))}
        </div>
      </div>

    </div>
  );
};

export default ScatterLayout;