import React, { useState } from 'react';
import { SC2Entity, ViewportSettings, EnvironmentTheme } from '../types/starcraft';
import { soundEngine } from '../services/soundEngine';
import { 
  Volume2, 
  Layers, 
  RotateCw, 
  Camera, 
  Sliders, 
  BookOpen, 
  Zap, 
  ShieldCheck, 
  Crosshair,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface RightSidebarProps {
  entity: SC2Entity;
  settings: ViewportSettings;
  onUpdateSettings: (settings: Partial<ViewportSettings>) => void;
  onSelectEntityByName?: (name: string) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  entity,
  settings,
  onUpdateSettings,
  onSelectEntityByName
}) => {
  const [activeTab, setActiveTab] = useState<'lore' | 'stats' | 'turntable'>('lore');

  const themes: { id: EnvironmentTheme; label: string; icon: string }[] = [
    { id: 'marsara', label: 'Mar Sara', icon: '🏜️' },
    { id: 'char', label: 'Planeta Char', icon: '🌋' },
    { id: 'shakuras', label: 'Shakuras', icon: '🌌' },
    { id: 'aiur', label: 'Aiur Dorado', icon: '🏛️' },
    { id: 'braxis', label: 'Braxis Glacial', icon: '❄️' },
    { id: 'space', label: 'Espacio Profundo', icon: '✨' },
  ];

  return (
    <aside className="w-80 md:w-96 h-full bg-slate-950/95 border-l border-slate-800/80 flex flex-col z-20 backdrop-blur-md select-none overflow-hidden">
      {/* 1. HEADER PROFILE */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/40">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] font-sc2-mono text-cyan-400 uppercase tracking-widest">
              EXPEDIENTE DE INTELIGENCIA
            </div>
            <h2 className="font-sc2-display text-lg font-black text-white tracking-wider uppercase mt-0.5">
              {entity.name}
            </h2>
            <div className="text-xs text-slate-400 font-sc2-mono">
              {entity.title}
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playUIClick(entity.race);
              soundEngine.playVoiceQuote(entity.quote, entity.race);
            }}
            title="Reproducir frase clásica"
            className="p-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition"
          >
            <Volume2 className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        {/* Attribute Pills */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {entity.attributeTypes.map((attr, idx) => (
            <span
              key={idx}
              className="text-[10px] font-sc2-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700"
            >
              {attr}
            </span>
          ))}
          <span className="text-[10px] font-sc2-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800">
            {entity.role}
          </span>
        </div>
      </div>

      {/* 2. SUBTABS (Historia, Estadísticas, Tornamesa 3D) */}
      <div className="flex border-b border-slate-800 bg-slate-900/60 text-xs font-sc2-mono">
        <button
          onClick={() => {
            soundEngine.playUIClick(entity.race);
            setActiveTab('lore');
          }}
          className={`flex-1 py-2 text-center transition flex items-center justify-center gap-1.5 border-b-2 ${
            activeTab === 'lore'
              ? 'text-cyan-400 border-cyan-400 bg-slate-800/40'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Historia</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playUIClick(entity.race);
            setActiveTab('stats');
          }}
          className={`flex-1 py-2 text-center transition flex items-center justify-center gap-1.5 border-b-2 ${
            activeTab === 'stats'
              ? 'text-cyan-400 border-cyan-400 bg-slate-800/40'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Estadísticas</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playUIClick(entity.race);
            setActiveTab('turntable');
          }}
          className={`flex-1 py-2 text-center transition flex items-center justify-center gap-1.5 border-b-2 ${
            activeTab === 'turntable'
              ? 'text-cyan-400 border-cyan-400 bg-slate-800/40'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>3D & Entorno</span>
        </button>
      </div>

      {/* 3. TAB CONTENTS */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
        {/* TAB 1: LORE & BACKSTORY */}
        {activeTab === 'lore' && (
          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-sc2-mono text-cyan-400 uppercase tracking-widest mb-1">
                REGISTRO OPERATIVO
              </div>
              <p className="text-slate-300 leading-relaxed font-normal">
                {entity.description}
              </p>
            </div>

            <div className="p-3 rounded bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] font-sc2-mono text-amber-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                <span>HISTORIA & TRASFONDO (CANON SC2)</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs">
                {entity.lore}
              </p>
            </div>

            {/* Quotes list */}
            <div>
              <div className="text-[10px] font-sc2-mono text-slate-400 uppercase tracking-widest mb-2">
                FRASES Y DIÁLOGOS CLÁSICOS
              </div>
              <div className="space-y-1.5">
                {entity.quotes.map((q, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      soundEngine.playUIClick(entity.race);
                      soundEngine.playVoiceQuote(q, entity.race);
                    }}
                    className="p-2 rounded bg-slate-900/40 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs italic cursor-pointer flex items-center justify-between group transition"
                  >
                    <span>"{q}"</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Tactical Counters */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <div>
                <div className="text-[10px] font-sc2-mono text-emerald-400 flex items-center gap-1 mb-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>VENTAJA CONTRA:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {entity.counters.strongAgainst.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSelectEntityByName && onSelectEntityByName(item)}
                      className="text-[10px] font-sc2-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-800/80 hover:bg-emerald-900 transition"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-sc2-mono text-red-400 flex items-center gap-1 mb-1">
                  <TrendingDown className="w-3 h-3" />
                  <span>VULNERABLE A:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {entity.counters.weakAgainst.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSelectEntityByName && onSelectEntityByName(item)}
                      className="text-[10px] font-sc2-mono px-2 py-0.5 rounded bg-red-950/40 text-red-300 border border-red-800/80 hover:bg-red-900 transition"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DETAILED STATS */}
        {activeTab === 'stats' && (
          <div className="space-y-4">
            {/* Vitals Summary */}
            <div className="grid grid-cols-2 gap-2 text-xs font-sc2-mono">
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <div className="text-slate-400 text-[10px]">PUNTOS DE VIDA</div>
                <div className="text-emerald-400 text-lg font-bold">{entity.stats.hp}</div>
              </div>

              {entity.stats.shields !== undefined && (
                <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">ESCUDOS DE PLASMA</div>
                  <div className="text-cyan-400 text-lg font-bold">{entity.stats.shields}</div>
                </div>
              )}

              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <div className="text-slate-400 text-[10px]">BLINDAJE BASE</div>
                <div className="text-slate-200 text-lg font-bold">{entity.stats.armor} (+1)</div>
              </div>

              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <div className="text-slate-400 text-[10px]">VELOCIDAD MOV.</div>
                <div className="text-slate-200 text-lg font-bold">{entity.stats.speed}</div>
              </div>
            </div>

            {/* Combat Specifications */}
            <div className="p-3 rounded bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-[10px] font-sc2-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1">
                <Crosshair className="w-3 h-3" />
                <span>ESPECIFICACIONES DE ARMAMENTO</span>
              </div>

              <div className="space-y-1.5 text-xs font-sc2-mono">
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-slate-400">Daño a Tierra:</span>
                  <span className="text-white font-bold">{entity.stats.damageGround || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-slate-400">Daño a Aire:</span>
                  <span className="text-white font-bold">{entity.stats.damageAir || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-slate-400">Alcance de Fuego:</span>
                  <span className="text-white font-bold">{entity.stats.range ? `${entity.stats.range} casillas` : 'Cuerpo a cuerpo'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Rango de Visión:</span>
                  <span className="text-white font-bold">{entity.stats.sight} casillas</span>
                </div>
              </div>
            </div>

            {/* Resource Cost Matrix */}
            <div className="p-3 rounded bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-[10px] font-sc2-mono text-yellow-400 uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>COSTE DE PRODUCCIÓN</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs font-sc2-mono">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <div className="text-cyan-400 text-sm">💎</div>
                  <div className="text-slate-300 font-bold">{entity.cost.minerals}</div>
                  <div className="text-[9px] text-slate-500">Minerales</div>
                </div>

                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <div className="text-emerald-400 text-sm">🟢</div>
                  <div className="text-slate-300 font-bold">{entity.cost.vespene}</div>
                  <div className="text-[9px] text-slate-500">Vespeno</div>
                </div>

                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <div className="text-amber-400 text-sm">⚡</div>
                  <div className="text-slate-300 font-bold">{entity.cost.supply}</div>
                  <div className="text-[9px] text-slate-500">Suministro</div>
                </div>

                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <div className="text-purple-400 text-sm">⏱️</div>
                  <div className="text-slate-300 font-bold">{entity.cost.time}s</div>
                  <div className="text-[9px] text-slate-500">Tiempo</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 3D TURNTABLE & ENVIRONMENT CONTROLS */}
        {activeTab === 'turntable' && (
          <div className="space-y-4">
            {/* Planetary Environment selector */}
            <div>
              <div className="text-[10px] font-sc2-mono text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                <Layers className="w-3 h-3" />
                <span>ENTORNO PLANETARIO & ILUMINACIÓN</span>
              </div>
              <div className="grid grid-cols-2 gap-2 font-sc2-mono text-xs">
                {themes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      soundEngine.playUIClick(entity.race);
                      onUpdateSettings({ theme: t.id });
                    }}
                    className={`p-2 rounded flex items-center gap-2 border transition ${
                      settings.theme === t.id
                        ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span className="truncate">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Camera Presets */}
            <div>
              <div className="text-[10px] font-sc2-mono text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                <Camera className="w-3 h-3" />
                <span>ÁNGULOS DE CÁMARA TÁCTICOS</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 font-sc2-mono text-xs">
                {(['isometric', 'front', 'top', 'cinematic'] as const).map(preset => (
                  <button
                    key={preset}
                    onClick={() => {
                      soundEngine.playUIClick(entity.race);
                      onUpdateSettings({ cameraPreset: preset });
                    }}
                    className={`py-1.5 px-2 rounded border capitalize transition ${
                      settings.cameraPreset === preset
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {preset === 'isometric' ? 'Isométrica' : preset === 'front' ? 'Frontal' : preset === 'top' ? 'Cenital' : 'Cinemática'}
                  </button>
                ))}
              </div>
            </div>

            {/* Turntable Auto-rotate */}
            <div className="p-3 rounded bg-slate-900/60 border border-slate-800 space-y-3 font-sc2-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Auto-rotación Tornamesa</span>
                </span>
                <input
                  type="checkbox"
                  checked={settings.autoRotate}
                  onChange={(e) => onUpdateSettings({ autoRotate: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500 cursor-pointer"
                />
              </div>

              {settings.autoRotate && (
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Velocidad de Giro:</span>
                    <span className="text-cyan-400">{settings.rotateSpeed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={settings.rotateSpeed}
                    onChange={(e) => onUpdateSettings({ rotateSpeed: parseFloat(e.target.value) })}
                    className="w-full accent-cyan-500"
                  />
                </div>
              )}
            </div>

            {/* Holographic Wireframe Toggle */}
            <div className="p-3 rounded bg-slate-900/60 border border-slate-800 space-y-3 font-sc2-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Modo Malla Wireframe 3D</span>
                </span>
                <input
                  type="checkbox"
                  checked={settings.wireframe}
                  onChange={(e) => onUpdateSettings({ wireframe: e.target.checked })}
                  className="w-4 h-4 accent-yellow-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <span>📺</span>
                  <span>Filtro CRT Scanlines HUD</span>
                </span>
                <input
                  type="checkbox"
                  checked={settings.showPostProcessing}
                  onChange={(e) => onUpdateSettings({ showPostProcessing: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
