import React from 'react';

interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  borderColor?: string;
}

const PixelCard: React.FC<PixelCardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  borderColor = 'border-slate-400' 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative group cursor-pointer transition-transform duration-200 active:scale-95
        ${className}
      `}
    >
      {/* Pixel Border Effect - using multiple box shadows or borders to simulate 8-bit corners isn't scalable in Tailwind easily, 
          so we use a thick border with a pseudo-element for the shadow to give depth */}
      <div className={`
        relative z-10 bg-slate-900/80 backdrop-blur-md 
        border-4 ${borderColor}
        shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]
        hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)]
        hover:-translate-y-1 transition-all
        p-1
      `}>
        {/* Inner Border for that "inset" screen look */}
        <div className="border-2 border-slate-700/50 h-full w-full p-4 overflow-hidden">
          {children}
        </div>
      </div>
      
      {/* Corner decorations (optional for Stardew UI feel) */}
      <div className={`absolute -top-1 -left-1 w-2 h-2 bg-slate-900 ${borderColor} border-t-4 border-l-4 z-20`}></div>
      <div className={`absolute -top-1 -right-1 w-2 h-2 bg-slate-900 ${borderColor} border-t-4 border-r-4 z-20`}></div>
      <div className={`absolute -bottom-1 -left-1 w-2 h-2 bg-slate-900 ${borderColor} border-b-4 border-l-4 z-20`}></div>
      <div className={`absolute -bottom-1 -right-1 w-2 h-2 bg-slate-900 ${borderColor} border-b-4 border-r-4 z-20`}></div>
    </div>
  );
};

export default PixelCard;