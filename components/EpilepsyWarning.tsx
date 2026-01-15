
import React from 'react';

export const EpilepsyWarning: React.FC<{ onAccept: () => void }> = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 p-6">
      <div className="max-w-md w-full bg-slate-900 border-2 border-red-500/50 rounded-2xl p-8 shadow-2xl shadow-red-500/10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center animate-pulse">
            <i className="fas fa-exclamation-triangle text-3xl"></i>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Photosensitivity Warning</h2>
        <p className="text-slate-400 text-center text-sm leading-relaxed mb-8">
          This application contains high-speed color cycling and flickering lights which may trigger seizures for people with photosensitive epilepsy. 
          <br /><br />
          If you have a history of seizures or epilepsy, please consult a medical professional before using this tool.
        </p>
        <button 
          onClick={onAccept}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-500/30 active:scale-[0.98]"
        >
          I UNDERSTAND AND AGREE
        </button>
        <p className="text-center text-[10px] text-slate-600 mt-6 uppercase tracking-widest font-bold">
          Developer is not liable for health consequences
        </p>
      </div>
    </div>
  );
};
