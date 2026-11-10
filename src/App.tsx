import React, { useState, useEffect } from 'react';
import { SC2_ENTITIES } from './data/entities';
import { Race, Category, SC2Entity, ViewportSettings, Ability } from './types/starcraft';
import { TopBar } from './components/TopBar';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { TurntableScene } from './components/TurntableScene';
import { RaceHUD } from './components/RaceHUD';
import { DeployModal } from './components/DeployModal';
import { soundEngine } from './services/soundEngine';

export const App: React.FC = () => {
  const [selectedRace, setSelectedRace] = useState<Race>('terran');
  const [selectedCategory, setSelectedCategory] = useState<Category>('units');
  const [selectedEntity, setSelectedEntity] = useState<SC2Entity>(SC2_ENTITIES[0]); // Marine default
  const [activeAnimation, setActiveAnimation] = useState<string>('idle');
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);

  const [viewportSettings, setViewportSettings] = useState<ViewportSettings>({
    autoRotate: true,
    rotateSpeed: 1.0,
    wireframe: false,
    showPostProcessing: true,
    theme: 'marsara',
    lightingIntensity: 1.0,
    cameraPreset: 'isometric',
    showBackgroundScene: true
  });

  // When race changes, update active entity to the first one of that race and switch theme & ambient
  const handleSelectRace = (race: Race) => {
    setSelectedRace(race);
    const firstOfRace = SC2_ENTITIES.find(e => e.race === race && e.category === selectedCategory) 
      || SC2_ENTITIES.find(e => e.race === race)
      || SC2_ENTITIES[0];
    setSelectedEntity(firstOfRace);

    // Switch planetary theme to match race
    if (race === 'terran') {
      setViewportSettings(prev => ({ ...prev, theme: 'marsara' }));
    } else if (race === 'zerg') {
      setViewportSettings(prev => ({ ...prev, theme: 'char' }));
    } else {
      setViewportSettings(prev => ({ ...prev, theme: 'aiur' }));
    }
  };

  // When category changes, select first unit in category if current isn't in it
  const handleSelectCategory = (cat: Category) => {
    setSelectedCategory(cat);
    const match = SC2_ENTITIES.find(e => e.race === selectedRace && e.category === cat);
    if (match) {
      setSelectedEntity(match);
    }
  };

  // Execute ability from command card
  const handleExecuteAbility = (ability: Ability) => {
    setActiveAnimation(ability.animationTrigger);
    // Reset to idle after 2.5s
    setTimeout(() => {
      setActiveAnimation('idle');
    }, 2500);
  };

  // Select entity by name (from counters chips)
  const handleSelectByName = (name: string) => {
    const match = SC2_ENTITIES.find(e => e.name.toLowerCase().includes(name.toLowerCase()));
    if (match) {
      setSelectedRace(match.race);
      setSelectedCategory(match.category);
      setSelectedEntity(match);
      soundEngine.playUIClick(match.race);
      soundEngine.playVoiceQuote(match.quote, match.race);
    }
  };

  // Update viewport settings
  const handleUpdateSettings = (partial: Partial<ViewportSettings>) => {
    setViewportSettings(prev => ({ ...prev, ...partial }));
  };

  // Keyboard shortcut listener for SC2 Hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      const key = e.key.toUpperCase();
      const abilityMatch = selectedEntity.abilities.find(a => a.hotkey.toUpperCase() === key);
      if (abilityMatch) {
        handleExecuteAbility(abilityMatch);
      } else if (key === 'A') {
        setActiveAnimation('attack');
        setTimeout(() => setActiveAnimation('idle'), 1500);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEntity]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-black text-slate-100 select-none">
      {/* TOP RESOURCE & SYSTEM BAR */}
      <TopBar
        currentRace={selectedRace}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
      />

      {/* MAIN VIEWPORT WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT PANEL: RACE, CATEGORY & ROSTER SELECTOR */}
        <LeftSidebar
          selectedRace={selectedRace}
          onSelectRace={handleSelectRace}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          selectedEntity={selectedEntity}
          onSelectEntity={setSelectedEntity}
          entities={SC2_ENTITIES}
        />

        {/* CENTER VIEWPORT: 3D THREE.JS TURNTABLE */}
        <main className="flex-1 relative flex flex-col justify-between overflow-hidden bg-slate-950">
          <div className="flex-1 relative w-full h-full">
            <TurntableScene
              entity={selectedEntity}
              settings={viewportSettings}
              activeAnimation={activeAnimation}
              onAnimationEnd={() => setActiveAnimation('idle')}
            />
          </div>

          {/* BOTTOM SCREEN: STAR CRAFT 2 IN-GAME RACE HUD */}
          <div className="w-full z-20">
            <RaceHUD
              entity={selectedEntity}
              onExecuteAbility={handleExecuteAbility}
              activeAnimation={activeAnimation}
            />
          </div>
        </main>

        {/* RIGHT PANEL: LORE, STATS & 3D CONTROLS */}
        <RightSidebar
          entity={selectedEntity}
          settings={viewportSettings}
          onUpdateSettings={handleUpdateSettings}
          onSelectEntityByName={handleSelectByName}
        />
      </div>

      {/* VERCEL & GITHUB DEPLOYMENT MODAL */}
      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />
    </div>
  );
};

export default App;
