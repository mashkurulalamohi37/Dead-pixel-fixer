
import React, { useState, useEffect } from 'react';

const TEST_COLORS = [
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Pure Black', hex: '#000000' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'Green', hex: '#00FF00' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Grey (50%)', hex: '#808080' }
];

export const ScreenTest: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % TEST_COLORS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-0 flex items-center justify-center"
      style={{ backgroundColor: TEST_COLORS[index].hex }}
    >
      <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
        <span className="text-white font-mono font-bold tracking-widest text-lg">
          TEST MODE: {TEST_COLORS[index].name}
        </span>
      </div>
    </div>
  );
};
