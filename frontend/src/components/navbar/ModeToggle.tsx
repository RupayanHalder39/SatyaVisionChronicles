import { Database, Sparkles } from 'lucide-react';

type ModeToggleProps = {
  mode: 'journey' | 'dashboard';
  onChange: (mode: 'journey' | 'dashboard') => void;
};

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex gap-2 rounded-full bg-white/80 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl">
        <button
          onClick={() => onChange('journey')}
          className={`rounded-full px-6 py-3 font-medium transition-all duration-300 ${
            mode === 'journey'
              ? 'bg-gradient-to-r from-[#6c9eff] to-[#a78bfa] text-white shadow-[0_4px_16px_rgba(108,158,255,0.4)]'
              : 'text-gray-600 hover:bg-white/50'
          }`}
        >
          <span className="flex items-center gap-2">
            <Sparkles size={18} />
            Journey Mode
          </span>
        </button>
        <button
          onClick={() => onChange('dashboard')}
          className={`rounded-full px-6 py-3 font-medium transition-all duration-300 ${
            mode === 'dashboard'
              ? 'bg-gradient-to-r from-[#6c9eff] to-[#a78bfa] text-white shadow-[0_4px_16px_rgba(108,158,255,0.4)]'
              : 'text-gray-600 hover:bg-white/50'
          }`}
        >
          <span className="flex items-center gap-2">
            <Database size={18} />
            Dashboard Mode
          </span>
        </button>
      </div>
    </div>
  );
}
