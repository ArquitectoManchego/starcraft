import React, { useState } from 'react';
import { Race } from '../types/starcraft';
import { soundEngine } from '../services/soundEngine';
import { Volume2, VolumeX, Cloud, Maximize } from 'lucide-react';

interface TopBarProps {
  currentRace: Race;
  onOpenDeployModal: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ currentRace, onOpenDeployModal }) => {
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setMuted(next);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header className="h-13 bg-slate-950 border-b border-slate-800/80 px-4 flex items-center justify-between z-30 select-none">
      {/* Brand & Race Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center font-sc2-display font-black text-black text-xs shadow-[0_0_10px_rgba(56,189,248,0.4)]">
            SC2
          </div>
          <div>
            <h1 className="font-sc2-display font-black text-sm tracking-wider text-white uppercase flex items-center gap-2">
              <span>StarCraft II</span>
              <span className="text-[10px] font-sc2-mono font-normal text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800">
                ARMORY 3D
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Center: In-game Classic SC2 Resource Display */}
      <div className="hidden md:flex items-center gap-6 font-sc2-mono text-xs">
        <div className="flex items-center gap-1.5 text-cyan-300">
          <span className="text-sm">💎</span>
          <span className="font-bold tracking-wider">1,450</span>
          <span className="text-[10px] text-slate-500">MINERALS</span>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="text-sm">🟢</span>
          <span className="font-bold tracking-wider">825</span>
          <span className="text-[10px] text-slate-500">VESPENE</span>
        </div>

        <div className="flex items-center gap-1.5 text-amber-300">
          <span className="text-sm">⚡</span>
          <span className="font-bold tracking-wider">182 / 200</span>
          <span className="text-[10px] text-slate-500">SUPPLY</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="text-xs">⏱️</span>
          <span className="font-bold tracking-wider text-slate-300">14:52</span>
        </div>
      </div>

      {/* Right Controls: Audio, Fullscreen, GitHub / Vercel Deploy */}
      <div className="flex items-center gap-2 text-xs font-sc2-mono">
        {/* Vercel / GitHub Info button */}
        <button
          onClick={onOpenDeployModal}
          className="flex items-center gap-1.5 bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-700 hover:border-cyan-400 px-3 py-1.5 rounded transition shadow-sm"
        >
          <Cloud className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold">Vercel & GitHub</span>
        </button>

        {/* Audio Mute / Unmute */}
        <button
          onClick={toggleMute}
          title={isMuted ? 'Activar Sonido SC2' : 'Silenciar'}
          className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
        </button>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          title="Pantalla Completa"
          className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition hidden sm:block"
        >
          <Maximize className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
