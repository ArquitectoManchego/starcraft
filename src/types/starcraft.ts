export type Race = 'terran' | 'zerg' | 'protoss';
export type Category = 'units' | 'heroes' | 'buildings';

export interface Ability {
  id: string;
  name: string;
  hotkey: string;
  icon: string;
  description: string;
  energyCost?: number;
  cooldown?: number;
  animationTrigger: 'attack' | 'special' | 'stim' | 'siege' | 'blink' | 'storm' | 'yamato' | 'burrow' | 'charge' | 'transform';
  soundType: 'laser' | 'explosion' | 'stim' | 'teleport' | 'lightning' | 'engine' | 'bio' | 'mechanical' | 'siren';
  vfx: 'beam' | 'burst' | 'sparks' | 'lightning' | 'teleport' | 'cloud' | 'shield';
}

export interface ModelConfig {
  meshType: 
    | 'marine' | 'siege_tank' | 'battlecruiser' | 'thor' | 'ghost' | 'banshee' | 'reaper' | 'viking'
    | 'raynor' | 'tychus' | 'nova' | 'kerrigan_ghost' | 'swann' | 'horner' | 'mengsk'
    | 'command_center' | 'barracks' | 'factory' | 'starport' | 'bunker'
    | 'zergling' | 'hydralisk' | 'ultralisk' | 'mutalisk' | 'roach' | 'baneling' | 'brood_lord' | 'infestor'
    | 'kerrigan_queen' | 'abathur' | 'dehaka' | 'zagara' | 'stukov' | 'overmind'
    | 'hatchery' | 'spawning_pool' | 'spire' | 'evolution_chamber' | 'ultralisk_cavern'
    | 'zealot' | 'stalker' | 'colossus' | 'carrier' | 'high_templar' | 'dark_templar' | 'archon' | 'immortal' | 'void_ray'
    | 'artanis' | 'zeratul' | 'alarak' | 'fenix' | 'tassadar' | 'karax'
    | 'nexus' | 'pylon' | 'gateway' | 'stargate' | 'photon_cannon';
  primaryColor: string;
  secondaryColor: string;
  glowColor: string;
  scale: number;
  yOffset: number;
  hasTurret?: boolean;
  hasWings?: boolean;
  hasTreads?: boolean;
  glowIntensity?: number;
  animSpeed?: number;
}

export interface SC2Entity {
  id: string;
  name: string;
  title: string;
  race: Race;
  category: Category;
  tier: number;
  role: string;
  attributeTypes: string[];
  quote: string;
  quotes: string[];
  description: string;
  lore: string;
  stats: {
    hp: number;
    shields?: number;
    armor: number;
    energy?: number;
    maxEnergy?: number;
    speed: number;
    sight: number;
    damageGround?: number;
    damageAir?: number;
    attacksGround: boolean;
    attacksAir: boolean;
    range?: number;
    attackSpeed?: number;
  };
  cost: {
    minerals: number;
    vespene: number;
    supply: number;
    time: number;
  };
  counters: {
    strongAgainst: string[];
    weakAgainst: string[];
  };
  abilities: Ability[];
  modelConfig: ModelConfig;
}

export type EnvironmentTheme = 'marsara' | 'char' | 'shakuras' | 'aiur' | 'braxis' | 'space';

export interface ViewportSettings {
  autoRotate: boolean;
  rotateSpeed: number;
  wireframe: boolean;
  showPostProcessing: boolean;
  theme: EnvironmentTheme;
  lightingIntensity: number;
  cameraPreset: 'isometric' | 'front' | 'top' | 'cinematic';
}
