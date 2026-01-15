
import React from 'react';

export const AdSimulator: React.FC<{ type: 'banner' | 'interstitial' }> = ({ type }) => {
  if (type === 'banner') {
    return (
      <div className="w-full h-14 bg-slate-900 border-t border-slate-800 flex items-center justify-center px-4 safe-pb">
        <div className="flex items-center gap-3">
          <div className="bg-slate-800 px-1 text-[8px] font-bold rounded text-slate-500 border border-slate-700">AD</div>
          <span className="text-xs text-slate-400 font-medium">Protect your device with <span className="text-cyan-400">Pixel Pro Max</span></span>
        </div>
        <button className="ml-auto text-[10px] bg-cyan-500 text-slate-950 px-3 py-1 rounded-full font-bold">INSTALL</button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-8">
      <div className="absolute top-8 right-8 text-white/30 text-xs font-mono animate-pulse">
        AD WILL CLOSE IN 3s...
      </div>
      <div className="w-full max-w-sm bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center">
          <i className="fas fa-shield-halved text-6xl text-white"></i>
        </div>
        <div className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Device Shield AI</h3>
          <p className="text-slate-400 text-sm mb-6">Prevent burn-in before it starts. Get real-time heat alerts and pixel monitoring.</p>
          <div className="bg-white text-black font-black py-3 rounded-xl">CHECK FOR FREE</div>
        </div>
      </div>
    </div>
  );
};
