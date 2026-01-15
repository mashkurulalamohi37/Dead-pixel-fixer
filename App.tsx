
import React, { useState, useEffect, useRef } from 'react';
import { RepairMode, RepairSettings, TRANSLATIONS, Language } from './types';
import { HealerBox } from './components/HealerBox';
import { NoiseWiper } from './components/NoiseWiper';
import { ScreenTest } from './components/ScreenTest';
import { Sidebar } from './components/Sidebar';
import { EpilepsyWarning } from './components/EpilepsyWarning';
import { DiagnosticScan } from './components/DiagnosticScan';

const App: React.FC = () => {
  const [mode, setMode] = useState<RepairMode>(RepairMode.IDLE);
  const [settings, setSettings] = useState<RepairSettings>({
    duration: 10,
    frequency: 60,
    isActive: false,
    language: 'EN',
    extremeMode: false
  });
  const [showWarning, setShowWarning] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const t = TRANSLATIONS[settings.language];

  useEffect(() => {
    if (settings.isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            stopRepair();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [settings.isActive, timeLeft]);

  const handleStartRequest = (newMode: RepairMode) => {
    // Directly start repair without ad delay
    startRepair(newMode);
  };

  const startRepair = (newMode: RepairMode) => {
    setMode(newMode);
    setTimeLeft(settings.duration * 60);
    setSettings(prev => ({ ...prev, isActive: true }));
    if ('vibrate' in navigator) navigator.vibrate(50);
  };

  const stopRepair = () => {
    setMode(RepairMode.IDLE);
    setSettings(prev => ({ ...prev, isActive: false }));
  };

  if (showWarning) {
    return <EpilepsyWarning onAccept={() => setShowWarning(false)} />;
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <Sidebar 
        currentMode={mode} 
        settings={settings} 
        onModeChange={handleStartRequest} 
        onStop={stopRepair}
        onSettingsChange={(s) => setSettings(prev => ({ ...prev, ...s }))}
        onScan={() => setMode(RepairMode.SCAN)}
      />

      <main className="flex-1 relative flex flex-col items-center justify-center p-0">
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-40"></div>
        
        <div className="absolute top-12 right-6 z-50">
          {settings.isActive && (
            <div className="bg-red-500/10 border border-red-500/40 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-3 animate-pulse">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="font-mono font-bold text-red-400 text-sm">
                REPAIR: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}
        </div>

        {mode === RepairMode.IDLE && (
          <div className="text-center px-6 max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
              <i className="fas fa-certificate"></i> Verified for Android 14+
            </div>
            <h1 className="text-4xl sm:text-6xl font-black mb-6 leading-tight tracking-tight">
              Pixel <span className="text-cyan-400 underline decoration-cyan-500/30">Doctor</span>
            </h1>
            <p className="text-slate-400 text-base mb-10 leading-relaxed font-light">
              {t.diagnostic_hook}. Our AI-powered flashing algorithms target specific transistor bottlenecks.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setMode(RepairMode.SCAN)}
                className="group relative bg-white text-slate-950 font-extrabold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-white/10"
              >
                <i className="fas fa-wand-magic-sparkles text-cyan-500 group-hover:rotate-12 transition-transform"></i>
                RUN FULL DIAGNOSTIC SCAN
              </button>
            </div>
          </div>
        )}

        {mode === RepairMode.SCAN && <DiagnosticScan onComplete={() => startRepair(RepairMode.SURGICAL)} />}
        {mode === RepairMode.SURGICAL && (
          <HealerBox 
            frequency={settings.extremeMode ? 120 : settings.frequency} 
            extremeMode={settings.extremeMode} 
          />
        )}
        {mode === RepairMode.WIPER && <NoiseWiper />}
        {mode === RepairMode.TEST && <ScreenTest />}
      </main>
    </div>
  );
};

export default App;
