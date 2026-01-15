
import React, { useState, useEffect, useRef } from 'react';

const COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFFFF', '#000000'];

interface HealerBoxProps {
  frequency: number;
  extremeMode?: boolean;
}

export const HealerBox: React.FC<HealerBoxProps> = ({ frequency, extremeMode = false }) => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 40, y: window.innerHeight / 2 - 40 });
  const [colorIndex, setColorIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const requestRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);

  const animate = (time: number) => {
    if (extremeMode) {
      // In extreme mode, change color on every single frame provided by the OS
      setColorIndex(prev => (prev + 1) % COLORS.length);
    } else {
      // In standard mode, adhere to the specified frequency
      const interval = 1000 / frequency;
      if (time - lastUpdateRef.current >= interval) {
        setColorIndex(prev => (prev + 1) % COLORS.length);
        lastUpdateRef.current = time;
      }
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [frequency, extremeMode]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - 40,
      y: e.clientY - 40
    });
  };

  return (
    <div 
      className="absolute inset-0 z-10" 
      onPointerMove={handlePointerMove}
      onPointerUp={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
    >
      <style>
        {`
          @keyframes soft-pulse-glow {
            0% { 
              box-shadow: 0 0 8px rgba(255, 255, 255, 0.4), inset 0 0 4px rgba(255, 255, 255, 0.2); 
              border-color: rgba(255, 255, 255, 0.4);
            }
            50% { 
              box-shadow: 0 0 20px rgba(255, 255, 255, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.5); 
              border-color: rgba(255, 255, 255, 0.9);
            }
            100% { 
              box-shadow: 0 0 8px rgba(255, 255, 255, 0.4), inset 0 0 4px rgba(255, 255, 255, 0.2); 
              border-color: rgba(255, 255, 255, 0.4);
            }
          }
          .dragging-glow {
            animation: soft-pulse-glow 2s infinite ease-in-out;
          }
        `}
      </style>
      <div
        onPointerDown={() => setIsDragging(true)}
        style={{
          left: position.x,
          top: position.y,
          backgroundColor: COLORS[colorIndex],
          width: '80px',
          height: '80px',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        className={`fixed rounded-sm border-2 transition-all duration-300 z-50 flex items-center justify-center overflow-hidden ${isDragging ? 'dragging-glow scale-110' : 'border-white/30'}`}
      >
        {extremeMode && (
          <div className="absolute top-1 right-1 bg-black/80 px-1 rounded-[2px] border border-white/20 pointer-events-none">
            <span className="text-[8px] font-mono font-bold text-white tracking-tighter uppercase">MAX</span>
          </div>
        )}
      </div>
      <div className="absolute inset-0 pointer-events-none border border-cyan-500/10 bg-cyan-500/5 backdrop-blur-[0.5px]"></div>
    </div>
  );
};
