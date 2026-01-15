
import React, { useState, useEffect, useMemo } from 'react';

type ScanResult = 'CLEAN' | 'OPTIMIZE';

export const DiagnosticScan: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing AI Sensors...');
  
  // Adjusted logic: 85% chance of being perfectly clean
  const resultType = useMemo<ScanResult>(() => (Math.random() > 0.15 ? 'CLEAN' : 'OPTIMIZE'), []);
  const optimizationPoints = useMemo(() => Math.floor(Math.random() * 2) + 1, []);

  useEffect(() => {
    const baseMessages = [
      'Scanning sub-pixel grid...',
      'Analyzing OLED voltage consistency...',
      'Detecting stagnant transistor patterns...',
      'Mapping blue-pixel degradation...',
    ];

    const finalMessage = resultType === 'OPTIMIZE' 
      ? `Scan complete. Found ${optimizationPoints} minor calibration targets.`
      : 'Scan complete. Display is operating at peak efficiency.';

    const messages = [...baseMessages, finalMessage];

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + (Math.random() * 8 + 3);
        const msgIdx = Math.floor((next / 100) * (messages.length));
        
        if (msgIdx < messages.length) {
          setStatus(messages[msgIdx]);
        }
        
        if (next >= 100) {
          clearInterval(timer);
          setStatus(finalMessage);
          return 100;
        }
        return next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [resultType, optimizationPoints]);

  return (
    <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center p-8">
      <div className="w-64 h-64 relative mb-12">
        <div className={`absolute inset-0 border-4 ${resultType === 'OPTIMIZE' && progress >= 100 ? 'border-amber-500/20' : 'border-emerald-500/20'} rounded-full animate-ping`}></div>
        <div className={`absolute inset-4 border-2 ${resultType === 'OPTIMIZE' && progress >= 100 ? 'border-amber-500/40' : 'border-emerald-500/40'} rounded-full animate-pulse`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-5xl font-black ${resultType === 'OPTIMIZE' && progress >= 100 ? 'text-amber-400' : 'text-emerald-400'} mono`}>{Math.floor(progress)}%</div>
        </div>
        {/* Radar Line */}
        <div className={`absolute top-0 left-1/2 w-1 h-1/2 bg-gradient-to-t ${resultType === 'OPTIMIZE' && progress >= 100 ? 'from-amber-400' : 'from-emerald-400'} to-transparent origin-bottom animate-spin`}></div>
      </div>

      <h2 className="text-2xl font-bold mb-2 text-white text-center">{status}</h2>
      <p className="text-slate-500 text-[10px] tracking-[0.3em] uppercase font-black">High-Sensitivity Hardware Scan</p>
      
      {progress >= 100 && (
        <div className="mt-12 animate-in fade-in zoom-in-95 duration-500 text-center max-w-sm">
          {resultType === 'OPTIMIZE' ? (
            <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-2xl mb-6">
              <h4 className="text-amber-400 font-bold mb-1 uppercase tracking-tight text-sm">Optimization Recommended</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Minor voltage variances detected in {optimizationPoints} sector(s). A quick maintenance cycle is recommended to maintain optimal luminance.</p>
            </div>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl mb-6">
              <h4 className="text-emerald-400 font-bold mb-1 uppercase tracking-tight text-sm">Calibration Perfect</h4>
              <p className="text-slate-400 text-xs leading-relaxed">No sub-pixel fatigue detected. Your display is performing at factory specifications. Run monthly for preventative care.</p>
            </div>
          )}
          
          <button 
            onClick={onComplete}
            className={`w-full ${resultType === 'OPTIMIZE' ? 'bg-amber-500 shadow-amber-500/20' : 'bg-emerald-500 shadow-emerald-500/20'} text-slate-950 px-12 py-4 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all`}
          >
            {resultType === 'OPTIMIZE' ? 'START OPTIMIZATION' : 'FINISH SCAN'}
          </button>
        </div>
      )}
    </div>
  );
};
