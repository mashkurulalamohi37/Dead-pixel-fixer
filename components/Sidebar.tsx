
import React from 'react';
import { RepairMode, RepairSettings, Language, TRANSLATIONS } from '../types';

interface SidebarProps {
  currentMode: RepairMode;
  settings: RepairSettings;
  onModeChange: (mode: RepairMode) => void;
  onStop: () => void;
  onScan: () => void;
  onSettingsChange: (settings: Partial<RepairSettings>) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentMode, settings, onModeChange, onStop, onScan, onSettingsChange }) => {
  const t = TRANSLATIONS[settings.language];

  return (
    <aside className="hidden lg:flex w-80 border-r border-slate-900 bg-slate-950 flex-col p-8 z-50">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
          <i className="fas fa-stethoscope text-slate-950 text-2xl"></i>
        </div>
        <div>
          <h2 className="font-extrabold text-2xl tracking-tighter">PixelDoc</h2>
          <div className="flex gap-1">
            {(['EN', 'PT', 'HI', 'RU'] as Language[]).map(lang => (
              <button 
                key={lang}
                onClick={() => onSettingsChange({ language: lang })}
                className={`text-[9px] font-bold px-1 rounded ${settings.language === lang ? 'bg-cyan-500 text-black' : 'text-slate-600'}`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8 flex-1 overflow-auto no-scrollbar">
        <div>
          <div className="flex justify-between items-center mb-4">
             <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">{t.scan}</label>
             <div className="h-px bg-slate-900 flex-1 ml-4"></div>
          </div>
          <button 
            onClick={onScan}
            className="w-full bg-slate-900/50 border border-slate-800 p-4 rounded-2xl text-left hover:border-cyan-500/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <i className="fas fa-bolt-lightning text-yellow-500 group-hover:animate-bounce"></i>
              <span className="text-sm font-bold">{t.diagnostic_hook}</span>
            </div>
          </button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
             <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Treatment</label>
             <div className="h-px bg-slate-900 flex-1 ml-4"></div>
          </div>
          <div className="space-y-3">
            {[
              { id: RepairMode.SURGICAL, label: t.surgical, icon: 'fa-crosshairs', color: 'cyan' },
              { id: RepairMode.WIPER, label: t.wiper, icon: 'fa-wind', color: 'purple' },
              { id: RepairMode.TEST, label: t.test, icon: 'fa-eye', color: 'green' },
            ].map(m => (
              <button 
                key={m.id}
                onClick={() => onModeChange(m.id)}
                className={`w-full p-4 rounded-2xl flex items-center gap-3 transition-all border-2 ${
                  currentMode === m.id 
                  ? `bg-${m.color}-500 border-${m.color}-400 text-slate-950` 
                  : 'bg-slate-900 border-transparent text-slate-400 hover:border-slate-800'
                }`}
              >
                <i className={`fas ${m.icon} text-lg`}></i>
                <span className="font-bold text-sm">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
             <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Settings</label>
             <div className="h-px bg-slate-900 flex-1 ml-4"></div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400 font-medium">{t.extreme}</span>
              <button 
                onClick={() => onSettingsChange({ extremeMode: !settings.extremeMode })}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.extremeMode ? 'bg-red-500' : 'bg-slate-800'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.extremeMode ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
            <div>
              <div className="flex justify-between mb-3">
                <span className="text-xs text-slate-500 font-bold uppercase">{t.duration}</span>
                <span className="text-xs text-white font-mono">{settings.duration} min</span>
              </div>
              <input 
                type="range" min="1" max="60" value={settings.duration}
                onChange={(e) => onSettingsChange({ duration: parseInt(e.target.value) })}
                className="w-full accent-cyan-500 h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {settings.isActive ? (
          <button 
            onClick={onStop}
            className="w-full bg-red-500 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-red-500/20 active:scale-[0.98] transition-transform"
          >
            <i className="fas fa-power-off"></i>
            {t.abort.toUpperCase()}
          </button>
        ) : (
          <div className="bg-slate-900 p-4 rounded-2xl text-[10px] text-slate-500 leading-relaxed font-medium">
            <i className="fas fa-lock text-cyan-500 mr-2"></i>
            PRO TIP: Fixing burned pixels can take 1-4 hours. Keep charger connected.
          </div>
        )}
      </div>
    </aside>
  );
};
