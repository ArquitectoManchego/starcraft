import React, { useState } from 'react';
import { Race, Category, SC2Entity } from '../types/starcraft';
import { soundEngine } from '../services/soundEngine';
import { Shield, Sparkles, Building2, Swords, Crown, Search, Filter } from 'lucide-react';

interface LeftSidebarProps {
  selectedRace: Race;
  onSelectRace: (race: Race) => void;
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  selectedEntity: SC2Entity;
  onSelectEntity: (entity: SC2Entity) => void;
  entities: SC2Entity[];
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  selectedRace,
  onSelectRace,
  selectedCategory,
  onSelectCategory,
  selectedEntity,
  onSelectEntity,
  entities
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<number | 'all'>('all');

  // Filter entities
  const filteredEntities = entities.filter(e => {
    if (e.race !== selectedRace) return false;
    if (e.category !== selectedCategory) return false;
    if (selectedTier !== 'all' && e.tier !== selectedTier) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        e.name.toLowerCase().includes(q) ||
        e.role.toLowerCase().includes(q) ||
        e.title.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Calculate counts for categories in active race
  const countUnits = entities.filter(e => e.race === selectedRace && e.category === 'units').length;
  const countHeroes = entities.filter(e => e.race === selectedRace && e.category === 'heroes').length;
  const countBuildings = entities.filter(e => e.race === selectedRace && e.category === 'buildings').length;

  const handleRaceChange = (race: Race) => {
    soundEngine.playUIClick(race);
    soundEngine.setRaceAmbient(race);
    onSelectRace(race);
  };

  const handleCategoryChange = (category: Category) => {
    soundEngine.playUIClick(selectedRace);
    onSelectCategory(category);
  };

  const handleEntityClick = (entity: SC2Entity) => {
    soundEngine.playUIClick(selectedRace);
    soundEngine.playVoiceQuote(entity.quote, entity.race);
    onSelectEntity(entity);
  };

  return (
    <aside className="w-80 md:w-88 h-full bg-slate-950/95 border-r border-slate-800/80 flex flex-col z-20 backdrop-blur-md select-none">
      {/* 1. RACE SELECTOR HEADER TABS */}
      <div className="p-3 border-b border-slate-800 bg-slate-900/60">
        <div className="text-[10px] font-sc2-mono text-slate-400 mb-2 tracking-widest uppercase flex items-center justify-between">
          <span>SELECCIONAR RAZA</span>
          <span className="text-cyan-400">FACTION PROTOCOL</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {/* Terran Button */}
          <button
            onClick={() => handleRaceChange('terran')}
            className={`py-2 px-1 rounded flex flex-col items-center justify-center transition border ${
              selectedRace === 'terran'
                ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Shield className="w-5 h-5 mb-1 text-cyan-400" />
            <span className="font-sc2-display font-bold text-xs uppercase">Terran</span>
            <span className="text-[9px] font-sc2-mono text-cyan-500/80">DOMINIO</span>
          </button>

          {/* Zerg Button */}
          <button
            onClick={() => handleRaceChange('zerg')}
            className={`py-2 px-1 rounded flex flex-col items-center justify-center transition border ${
              selectedRace === 'zerg'
                ? 'bg-purple-950/80 border-purple-400 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Sparkles className="w-5 h-5 mb-1 text-purple-400" />
            <span className="font-sc2-display font-bold text-xs uppercase">Zerg</span>
            <span className="text-[9px] font-sc2-mono text-purple-500/80">ENJAMBRE</span>
          </button>

          {/* Protoss Button */}
          <button
            onClick={() => handleRaceChange('protoss')}
            className={`py-2 px-1 rounded flex flex-col items-center justify-center transition border ${
              selectedRace === 'protoss'
                ? 'bg-amber-950/80 border-yellow-400 text-yellow-300 shadow-[0_0_12px_rgba(250,204,21,0.3)]'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Crown className="w-5 h-5 mb-1 text-yellow-400" />
            <span className="font-sc2-display font-bold text-xs uppercase">Protoss</span>
            <span className="text-[9px] font-sc2-mono text-yellow-500/80">DAELAAM</span>
          </button>
        </div>
      </div>

      {/* 2. CATEGORY SELECTOR (Unidades, Héroes, Edificios) */}
      <div className="p-3 border-b border-slate-800/80 bg-slate-900/30">
        <div className="text-[10px] font-sc2-mono text-slate-400 mb-2 tracking-widest uppercase">
          CATEGORÍA TÁCTICA
        </div>

        <div className="flex gap-1.5">
          <button
            onClick={() => handleCategoryChange('units')}
            className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 border transition ${
              selectedCategory === 'units'
                ? 'bg-slate-800 text-white border-cyan-400'
                : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Swords className="w-3.5 h-3.5 text-cyan-400" />
            <span>Unidades</span>
            <span className="text-[10px] px-1 bg-slate-800 rounded font-sc2-mono text-slate-400">
              {countUnits}
            </span>
          </button>

          <button
            onClick={() => handleCategoryChange('heroes')}
            className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 border transition ${
              selectedCategory === 'heroes'
                ? 'bg-slate-800 text-white border-yellow-400'
                : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-yellow-400" />
            <span>Héroes</span>
            <span className="text-[10px] px-1 bg-slate-800 rounded font-sc2-mono text-slate-400">
              {countHeroes}
            </span>
          </button>

          <button
            onClick={() => handleCategoryChange('buildings')}
            className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 border transition ${
              selectedCategory === 'buildings'
                ? 'bg-slate-800 text-white border-emerald-400'
                : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Edificios</span>
            <span className="text-[10px] px-1 bg-slate-800 rounded font-sc2-mono text-slate-400">
              {countBuildings}
            </span>
          </button>
        </div>
      </div>

      {/* 3. SEARCH & TIER FILTER */}
      <div className="p-3 border-b border-slate-800/80 flex flex-col gap-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, rol o título..."
            className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-500 rounded pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none font-sc2-mono"
          />
        </div>

        {/* Tier filter pill buttons */}
        <div className="flex items-center gap-1 text-[11px] font-sc2-mono text-slate-400">
          <Filter className="w-3 h-3 text-slate-500" />
          <span>Tier:</span>
          {(['all', 1, 2, 3, 4] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                selectedTier === tier
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tier === 'all' ? 'TODOS' : `T${tier}`}
            </button>
          ))}
        </div>
      </div>

      {/* 4. ROSTER LIST / CARDS */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {filteredEntities.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500 font-sc2-mono">
            No se encontraron personajes o unidades con los criterios actuales.
          </div>
        ) : (
          filteredEntities.map((entity) => {
            const isSelected = entity.id === selectedEntity.id;
            return (
              <div
                key={entity.id}
                onClick={() => handleEntityClick(entity)}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? selectedRace === 'terran'
                      ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.25)]'
                      : selectedRace === 'zerg'
                      ? 'bg-purple-950/60 border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.25)]'
                      : 'bg-amber-950/60 border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.25)]'
                    : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Color-coded Icon Box */}
                  <div
                    className="w-9 h-9 rounded flex items-center justify-center text-base font-bold shadow"
                    style={{
                      backgroundColor: `${entity.modelConfig.primaryColor}33`,
                      border: `1px solid ${entity.modelConfig.glowColor}`
                    }}
                  >
                    <span>{entity.abilities[0]?.icon || '🛡️'}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-sc2-display text-xs font-bold text-slate-100 group-hover:text-white">
                        {entity.name}
                      </span>
                      <span className="text-[9px] font-sc2-mono px-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        T{entity.tier}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 font-sc2-mono truncate max-w-[150px]">
                      {entity.role}
                    </div>
                  </div>
                </div>

                {/* Vitals Preview */}
                <div className="flex flex-col items-end text-[10px] font-sc2-mono text-slate-400">
                  <span className="text-emerald-400 font-bold">{entity.stats.hp} HP</span>
                  {entity.stats.shields !== undefined && (
                    <span className="text-cyan-400">{entity.stats.shields} ESC</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
