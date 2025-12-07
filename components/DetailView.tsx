import React from 'react';
import { Project } from '../types';
import { X, Calendar, Tag } from 'lucide-react';

interface DetailViewProps {
  project: Project;
  onClose: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Main Content Card - Apple style animation would be scale-up, here we do a simple fade/slide */}
      <div className={`
        relative w-full max-w-4xl max-h-full md:h-[85vh] 
        bg-slate-900 
        border-4 ${project.color}
        shadow-[0_20px_50px_rgba(0,0,0,0.7)]
        flex flex-col md:flex-row overflow-hidden
        animate-[slideUp_0.3s_ease-out]
      `}>
        {/* Pixel Corners (Decoration) */}
        <div className={`absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 ${project.color} z-20`}></div>
        <div className={`absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 ${project.color} z-20`}></div>
        <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 ${project.color} z-20`}></div>
        <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 ${project.color} z-20`}></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 bg-slate-800 hover:bg-red-500/80 hover:text-white rounded border-2 border-slate-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left Side: Visuals (Hidden on small mobile if you want, but we'll keep it) */}
        <div className="w-full md:w-1/3 bg-slate-800 relative overflow-hidden">
             {project.image && (
                 <>
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-64 md:h-full object-cover opacity-80 mix-blend-overlay"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-90`}></div>
                 </>
             )}
             
             <div className="absolute bottom-0 left-0 p-6">
                <h2 className="font-['VT323'] text-5xl md:text-6xl text-white drop-shadow-md leading-none mb-2">
                    {project.title}
                </h2>
                <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-700/80 border border-slate-500 text-xs font-mono uppercase tracking-wider text-slate-300">
                            {tag}
                        </span>
                    ))}
                </div>
             </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-2/3 bg-slate-900/95 p-6 md:p-10 overflow-y-auto scrollbar-thin">
            <div className="flex items-center gap-6 text-slate-400 text-sm font-mono mb-8 pb-4 border-b border-slate-700">
                <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{project.date}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Tag size={14} />
                    <span>{project.category}</span>
                </div>
            </div>

            <div 
                className="prose prose-invert prose-lg max-w-none font-sans"
                dangerouslySetInnerHTML={{ __html: project.content }} 
            />
            
            {/* Action Bar (Apple Style Sticky Bottom) */}
            <div className="mt-10 pt-6 border-t border-slate-700 flex justify-end">
                <button 
                    onClick={() => alert("Mock: Downloading PDF...")}
                    className={`
                        px-6 py-3 font-['VT323'] text-xl bg-white text-slate-900 
                        hover:bg-cyan-400 hover:scale-105 transition-all
                        border-b-4 border-slate-400 active:border-b-0 active:translate-y-1
                    `}
                >
                    DOWNLOAD DOC
                </button>
            </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default DetailView;