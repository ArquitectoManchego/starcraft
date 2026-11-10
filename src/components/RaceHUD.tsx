import React, { useState } from 'react';
import { SC2Entity, Ability } from '../types/starcraft';
import { MiniPortrait3D } from './MiniPortrait3D';
import { soundEngine } from '../services/soundEngine';
import confetti from 'canvas-confetti';

interface RaceHUDProps {
  entity: SC2Entity;
  onExecuteAbility: (ability: Ability) => void;
  activeAnimation: string;
}

export const RaceHUD: React.FC<RaceHUDProps> = ({
  entity,
  onExecuteAbility,
  activeAnimation
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [cooldowns, setCooldowns] = useState<Record<string, number>>({});
  const [floatingText, setFloatingText] = useState<string | null>(null);

  // Trigger ability execution
  const handleAbilityClick = (ability: Ability) => {
    if (cooldowns[ability.id] && cooldowns[ability.id] > 0) return;

    soundEngine.playAbilitySound(ability.soundType);
    setIsSpeaking(true);
    soundEngine.playEntityVoice(entity);
    setTimeout(() => setIsSpeaking(false), 2500);

    // Floating combat text
    setFloatingText(`¡${ability.name.toUpperCase()} ACTIVADO!`);
    setTimeout(() => setFloatingText(null), 2000);

    // If victory/epic ability
    if (ability.id === 'hyperion_strike' || ability.id === 'apocalypse' || ability.id === 'orbital_strike') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Set cooldown timer
    if (ability.cooldown) {
      setCooldowns(prev => ({ ...prev, [ability.id]: ability.cooldown || 5 }));
      const timer = setInterval(() => {
        setCooldowns(prev => {
          const current = prev[ability.id];
          if (current <= 1) {
            clearInterval(timer);
            const copy = { ...prev };
            delete copy[ability.id];
            return copy;
          }
          return { ...prev, [ability.id]: current - 1 };
        });
      }, 1000);
    }

    onExecuteAbility(ability);
  };

  // Trigger basic action (Attack, Move, Stop, Hold, Patrol)
  const handleBasicAction = (name: string, anim: 'attack' | 'special') => {
    soundEngine.playUIClick(entity.race);
    setFloatingText(`ORDEN: ${name}`);
    setTimeout(() => setFloatingText(null), 1500);
    onExecuteAbility({
      id: name.toLowerCase(),
      name,
      hotkey: name[0],
      icon: '⚔️',
      description: `Ejecuta la acción táctica ${name}`,
      animationTrigger: anim,
      soundType: 'laser',
      vfx: 'beam'
    });
  };

  // Race-specific thematic styling classes
  const getHudContainerStyle = () => {
    if (entity.race === 'terran') {
      return 'bg-gradient-to-t from-slate-950 via-slate-900 to-slate-900/90 border-t-2 border-cyan-500/80 shadow-[0_-10px_30px_rgba(2,132,199,0.3)]';
    }
    if (entity.race === 'zerg') {
      return 'bg-gradient-to-t from-purple-950 via-zinc-950 to-purple-950/80 border-t-2 border-purple-600/80 shadow-[0_-10px_30px_rgba(147,51,234,0.3)]';
    }
    // Protoss
    return 'bg-gradient-to-t from-yellow-950/90 via-stone-950 to-amber-950/80 border-t-2 border-yellow-500/80 shadow-[0_-10px_30px_rgba(234,179,8,0.3)]';
  };

  return (
    <div className={`relative w-full px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-4 select-none ${getHudContainerStyle()}`}>
      {/* Floating combat prompt */}
      {floatingText && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-cyan-500/90 text-black font-sc2-display font-black px-4 py-1 rounded shadow-lg text-sm tracking-wider uppercase animate-bounce pointer-events-none">
          {floatingText}
        </div>
      )}

      {/* LEFT SECTION: 3D Animated Mini Portrait & Status Info */}
      <div className="flex items-center gap-3">
        <MiniPortrait3D entity={entity} isSpeaking={isSpeaking} />

        <div className="flex flex-col text-xs font-sc2-mono">
          <div className="flex items-center gap-2">
            <span className="font-sc2-display font-black text-sm text-white tracking-wider uppercase">
              {entity.name}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Nv.{entity.tier}
            </span>
          </div>

          <div className="text-slate-400 text-[11px] truncate max-w-[200px]">
            {entity.title}
          </div>

          {/* Health & Shields Bars */}
          <div className="mt-1 flex flex-col gap-1 w-44">
            {/* Shields (Protoss) */}
            {entity.stats.shields !== undefined && (
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-cyan-400 font-bold w-6">ESC:</span>
                <div className="flex-1 h-2 bg-slate-900 rounded-sm overflow-hidden border border-cyan-800">
                  <div className="h-full bg-cyan-400 transition-all duration-300" style={{ width: '100%' }} />
                </div>
                <span className="text-[10px] text-cyan-300">{entity.stats.shields}</span>
              </div>
            )}

            {/* HP Bar */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-emerald-400 font-bold w-6">VID:</span>
              <div className="flex-1 h-2 bg-slate-900 rounded-sm overflow-hidden border border-emerald-800">
                <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: '100%' }} />
              </div>
              <span className="text-[10px] text-emerald-300">{entity.stats.hp}</span>
            </div>

            {/* Energy Bar if applicable */}
            {entity.stats.energy !== undefined && (
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-purple-400 font-bold w-6">ENE:</span>
                <div className="flex-1 h-2 bg-slate-900 rounded-sm overflow-hidden border border-purple-800">
                  <div className="h-full bg-purple-500 transition-all duration-300" style={{ width: '100%' }} />
                </div>
                <span className="text-[10px] text-purple-300">{entity.stats.energy}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CENTER SECTION: Tactical Quote & Audio Trigger */}
      <div className="hidden lg:flex flex-col items-center justify-center max-w-md px-4 py-1 bg-black/40 rounded border border-slate-800/80">
        <div className="text-[11px] font-sc2-mono text-slate-400 flex items-center gap-2 mb-1">
          <span className="text-amber-400">TRANSMISIÓN DE AUDIO:</span>
          <button
            onClick={() => {
              setIsSpeaking(true);
              soundEngine.playEntityVoice(entity);
              setTimeout(() => setIsSpeaking(false), 2500);
            }}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-2 py-0.5 rounded border border-slate-600 transition"
          >
            🔊 REPRODUCIR VOZ
          </button>
        </div>
        <p className="text-xs italic text-slate-200 text-center font-serif leading-tight">
          "{entity.quote}"
        </p>
      </div>

      {/* RIGHT SECTION: SC2 COMMAND CARD GRID (3x5 authentic buttons) */}
      <div className="flex flex-col items-end">
        <div className="text-[10px] font-sc2-mono text-slate-400 mb-1 flex items-center gap-2">
          <span>TARJETA DE MANDOS TÁCTICA:</span>
          <span className="text-emerald-400">[HOTKEYS ACTIVOS]</span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 bg-slate-950/80 p-1.5 rounded border border-slate-800">
          {/* Row 1: Basic SC2 Commands */}
          <button
            onClick={() => handleBasicAction('Mover', 'special')}
            title="Mover (M)"
            className="w-10 h-10 md:w-11 md:h-11 bg-slate-900 hover:bg-slate-800 active:scale-95 border border-slate-700 hover:border-cyan-400 rounded flex flex-col items-center justify-center text-xs transition relative group overflow-hidden"
          >
            <img src="/icons/move.png" alt="Mover" className="w-7 h-7 object-contain" />
            <span className="absolute bottom-0.5 right-1 text-[8px] font-sc2-mono font-bold text-cyan-400 drop-shadow">M</span>
          </button>

          <button
            onClick={() => handleBasicAction('Detener', 'special')}
            title="Detener (S)"
            className="w-10 h-10 md:w-11 md:h-11 bg-slate-900 hover:bg-slate-800 active:scale-95 border border-slate-700 hover:border-cyan-400 rounded flex flex-col items-center justify-center text-xs transition relative group overflow-hidden"
          >
            <img src="/icons/stop.png" alt="Detener" className="w-7 h-7 object-contain" />
            <span className="absolute bottom-0.5 right-1 text-[8px] font-sc2-mono font-bold text-cyan-400 drop-shadow">S</span>
          </button>

          <button
            onClick={() => handleBasicAction('Mantener Posición', 'special')}
            title="Mantener Posición (H)"
            className="w-10 h-10 md:w-11 md:h-11 bg-slate-900 hover:bg-slate-800 active:scale-95 border border-slate-700 hover:border-cyan-400 rounded flex flex-col items-center justify-center text-xs transition relative group overflow-hidden"
          >
            <img src="/icons/hold.png" alt="Mantener" className="w-7 h-7 object-contain" />
            <span className="absolute bottom-0.5 right-1 text-[8px] font-sc2-mono font-bold text-cyan-400 drop-shadow">H</span>
          </button>

          <button
            onClick={() => handleBasicAction('Patrullar', 'special')}
            title="Patrullar (P)"
            className="w-10 h-10 md:w-11 md:h-11 bg-slate-900 hover:bg-slate-800 active:scale-95 border border-slate-700 hover:border-cyan-400 rounded flex flex-col items-center justify-center text-xs transition relative group overflow-hidden"
          >
            <img src="/icons/patrol.png" alt="Patrullar" className="w-7 h-7 object-contain" />
            <span className="absolute bottom-0.5 right-1 text-[8px] font-sc2-mono font-bold text-cyan-400 drop-shadow">P</span>
          </button>

          <button
            onClick={() => handleBasicAction('Atacar', 'attack')}
            title="Atacar (A)"
            className="w-10 h-10 md:w-11 md:h-11 bg-red-950/60 hover:bg-red-900/80 active:scale-95 border border-red-700 hover:border-red-400 rounded flex flex-col items-center justify-center text-xs transition relative group overflow-hidden"
          >
            <img src="/icons/attack.png" alt="Atacar" className="w-7 h-7 object-contain" />
            <span className="absolute bottom-0.5 right-1 text-[8px] font-sc2-mono font-bold text-red-400 drop-shadow">A</span>
          </button>

          {/* Rows 2 & 3: Character Unique Abilities */}
          {entity.abilities.map((ability) => {
            const cd = cooldowns[ability.id];
            const isCoolingDown = cd !== undefined && cd > 0;

            return (
              <button
                key={ability.id}
                onClick={() => handleAbilityClick(ability)}
                disabled={isCoolingDown}
                title={`${ability.name} (${ability.hotkey}) - ${ability.description}`}
                className={`w-10 h-10 md:w-11 md:h-11 relative rounded flex flex-col items-center justify-center text-xs transition border active:scale-95 group overflow-hidden ${
                  isCoolingDown
                    ? 'bg-slate-900/60 border-slate-800 cursor-not-allowed opacity-60'
                    : entity.race === 'terran'
                    ? 'bg-cyan-950/70 hover:bg-cyan-900 border-cyan-700 hover:border-cyan-400 text-white shadow-[0_0_8px_rgba(56,189,248,0.2)]'
                    : entity.race === 'zerg'
                    ? 'bg-purple-950/70 hover:bg-purple-900 border-purple-700 hover:border-purple-400 text-white shadow-[0_0_8px_rgba(168,85,247,0.2)]'
                    : 'bg-amber-950/70 hover:bg-amber-900 border-amber-700 hover:border-amber-400 text-white shadow-[0_0_8px_rgba(250,204,21,0.2)]'
                }`}
              >
                {ability.iconImg ? (
                  <img src={ability.iconImg} alt={ability.name} className="w-7 h-7 object-contain rounded-xs" />
                ) : (
                  <span className="text-sm md:text-base">{ability.icon}</span>
                )}

                {/* Hotkey Letter */}
                <span className="absolute bottom-0.5 right-1 text-[9px] font-sc2-mono font-bold text-yellow-300 drop-shadow">
                  {ability.hotkey}
                </span>

                {/* Cooldown Overlay */}
                {isCoolingDown && (
                  <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-red-400 font-bold font-sc2-mono text-xs rounded">
                    {cd}s
                  </div>
                )}
              </button>
            );
          })}

          {/* Fill empty slots with dummy tactile buttons */}
          {Array.from({ length: Math.max(0, 10 - 5 - entity.abilities.length) }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="w-10 h-10 md:w-11 md:h-11 bg-slate-950/40 border border-slate-900/60 rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
