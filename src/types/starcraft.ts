export type Race = 'terran' | 'zerg' | 'protoss';
export type Category = 'units' | 'heroes' | 'buildings';

export interface Ability {
  id: string;
  name: string;
  hotkey: string;
  icon: string;
  iconImg?: string;
  description: string;
  energyCost?: number;
  cooldown?: number;
  animationTrigger: 'attack' | 'special' | 'stim' | 'siege' | 'blink' | 'storm' | 'yamato' | 'burrow' | 'charge' | 'transform';
  soundType: 'laser' | 'explosion' | 'stim' | 'teleport' | 'lightning' | 'engine' | 'bio' | 'mechanical' | 'siren';
  vfx: 'beam' | 'burst' | 'sparks' | 'lightning' | 'teleport' | 'cloud' | 'shield';
}

export interface ModelConfig {
  meshType: string;
  glbPath?: string;
  texturePath?: string;
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
  portraitPath: string;
  audioClips?: string[];
  backgroundScene: string;
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

export type EnvironmentTheme = 'hyperion' | 'char' | 'aiur' | 'marsara' | 'shakuras' | 'space' | 'braxis';

export interface ViewportSettings {
  autoRotate: boolean;
  rotateSpeed: number;
  wireframe: boolean;
  showPostProcessing: boolean;
  theme: EnvironmentTheme;
  lightingIntensity: number;
  cameraPreset: 'isometric' | 'front' | 'top' | 'cinematic';
  showBackgroundScene: boolean;
}
