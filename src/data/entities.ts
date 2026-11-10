import { SC2Entity } from '../types/starcraft';

export const SC2_ENTITIES: SC2Entity[] = [
  // ==========================================
  // TERRAN - UNITS
  // ==========================================
  {
    id: 'marine',
    name: 'Marine',
    title: 'Infantería Ligera Blindada CMC-400',
    race: 'terran',
    category: 'units',
    tier: 1,
    role: 'Asalto Rápido / Multipropósito',
    attributeTypes: ['Biológico', 'Ligero'],
    quote: "¿Quieres un pedazo de mí, muchacho?",
    quotes: [
      "¿Quieres un pedazo de mí, muchacho?",
      "¡Fuego a discreción!",
      "Armadura sellada y lista.",
      "¡Sírveme otro cargador!"
    ],
    portraitPath: '/portraits/marine.jpg',
    audioClips: [
      '/sounds/marine_commander.mp3',
      '/sounds/marine_shoot.mp3',
      '/sounds/marine_jacked.mp3',
      '/sounds/marine_standin.mp3',
      '/sounds/marine_pieceme.mp3',
      '/sounds/marine_stimpack.mp3'
    ],
    backgroundScene: '/backgrounds/hyperion_armory.jpg',
    description: "La columna vertebral del ejército Terran. Soldados equipados con servoarmaduras CMC y rifles de Gauss C-14 que disparan púas de metal a velocidades hipersónicas.",
    lore: "Reclutados a menudo de las colonias penales de la Confederación y reacondicionados neuralmente por el Dominio Terran, los marines enfrentan las peores pesadillas del sector Koprulu armados con poco más que coraje blindado y adrenalina sintética.",
    stats: {
      hp: 45,
      armor: 0,
      speed: 2.25,
      sight: 9,
      damageGround: 6,
      damageAir: 6,
      attacksGround: true,
      attacksAir: true,
      range: 5,
      attackSpeed: 0.61
    },
    cost: {
      minerals: 50,
      vespene: 0,
      supply: 1,
      time: 18
    },
    counters: {
      strongAgainst: ['Hydralisk', 'Mutalisk', 'Zealot'],
      weakAgainst: ['Siege Tank Crucio', 'Baneling', 'Colossus']
    },
    abilities: [
      {
        id: 'stimpack',
        name: 'Estimulantes (Stimpack)',
        hotkey: 'T',
        icon: '💉',
        iconImg: '/icons/stimpack.png',
        description: "Inyecta un cóctel sintético de adrenalina que aumenta la velocidad de movimiento y disparo un 50% a costa de 10 puntos de vida.",
        cooldown: 11,
        animationTrigger: 'stim',
        soundType: 'stim',
        vfx: 'sparks'
      },
      {
        id: 'fire_gauss',
        name: 'Ráfaga de Gauss C-14',
        hotkey: 'A',
        icon: '💥',
        iconImg: '/icons/attack.png',
        description: "Dispara ráfagas continuas de proyectiles de uranio empobrecido de 8 mm.",
        animationTrigger: 'attack',
        soundType: 'laser',
        vfx: 'beam'
      }
    ],
    modelConfig: {
      meshType: 'marine',
      glbPath: '/models/marine.glb',
      texturePath: '/models/marine_diffuse.png',
      primaryColor: '#2563eb',
      secondaryColor: '#475569',
      glowColor: '#38bdf8',
      scale: 1.1,
      yOffset: -0.1,
      glowIntensity: 1.2
    }
  },
  {
    id: 'siege_tank',
    name: 'Siege Tank Crucio',
    title: 'Tanque de Asedio Pesado',
    race: 'terran',
    category: 'units',
    tier: 2,
    role: 'Artillería de Asedio Pesada',
    attributeTypes: ['Mecánico', 'Blindado'],
    quote: "Listo para rodar.",
    quotes: [
      "Listo para rodar.",
      "Destrucción absoluta garantizada.",
      "¡Objetivo fijado, disparando cañón de choque!",
      "¿Quién quiere fuegos artificiales?"
    ],
    portraitPath: '/portraits/siege_tank.jpg',
    audioClips: [
      '/sounds/siegetank_what00.ogg',
      '/sounds/siegetank_what01.ogg',
      '/sounds/siegetank_what02.ogg',
      '/sounds/siegetank_ready.ogg'
    ],
    backgroundScene: '/backgrounds/hyperion_armory.jpg',
    description: "La joya de la artillería Terran. Capaz de patrullar en modo tanque y anclarse al suelo en modo asedio para desatar devastadores cañones de choque de plasma a distancias extremas.",
    lore: "El Crucio reemplazó al antiguo modelo Arclight tras la Guerra de Especies. Con un blindaje de torreta reforzado y una suspensión hidráulica estabilizada, este monstruo puede pulverizar regimientos enteros antes de que puedan divisarlo.",
    stats: {
      hp: 175,
      armor: 1,
      speed: 2.25,
      sight: 11,
      damageGround: 70,
      damageAir: 0,
      attacksGround: true,
      attacksAir: false,
      range: 13,
      attackSpeed: 2.14
    },
    cost: {
      minerals: 150,
      vespene: 125,
      supply: 3,
      time: 32
    },
    counters: {
      strongAgainst: ['Marine', 'Hydralisk', 'Stalker', 'Roach'],
      weakAgainst: ['Mutalisk', 'Immortal', 'Carrier']
    },
    abilities: [
      {
        id: 'siege_mode',
        name: 'Modo Asedio / Crucio',
        hotkey: 'E',
        icon: '🎯',
        iconImg: '/icons/siege_mode.png',
        description: "Ancla el tanque mecánicamente al terreno, desplegando el cañón de choque de 120 mm con un alcance colosal de 13 casillas y daño de área.",
        cooldown: 4,
        animationTrigger: 'siege',
        soundType: 'mechanical',
        vfx: 'burst'
      },
      {
        id: 'tank_mode',
        name: 'Modo Tanque Móvil',
        hotkey: 'D',
        icon: '🛡️',
        iconImg: '/icons/tank_mode.png',
        description: "Repliega los estabilizadores hidráulicos para recuperar movilidad táctica en el campo de batalla.",
        cooldown: 3,
        animationTrigger: 'special',
        soundType: 'mechanical',
        vfx: 'sparks'
      }
    ],
    modelConfig: {
      meshType: 'tank',
      glbPath: '/models/tank.glb',
      texturePath: '/models/siegetank_diffuse.png',
      primaryColor: '#3b82f6',
      secondaryColor: '#1e293b',
      glowColor: '#0284c7',
      scale: 1.25,
      yOffset: 0.15,
      hasTurret: true,
      hasTreads: true
    }
  },
  {
    id: 'battlecruiser',
    name: 'Crucero de Batalla Behemoth',
    title: 'Nave Insignia Clase Behemoth / Minotauro',
    race: 'terran',
    category: 'units',
    tier: 3,
    role: 'Acorazado Capital Volador',
    attributeTypes: ['Mecánico', 'Blindado', 'Masivo'],
    quote: "¿Quién llamó a la flota?",
    quotes: [
      "¿Quién llamó a la flota?",
      "Cargando cañón Yamato.",
      "Sistemas de armamento a plena potencia.",
      "Coordenadas de salto recibidas."
    ],
    portraitPath: '/portraits/battlecruiser.gif',
    audioClips: [
      '/sounds/marine_commander.mp3',
      '/sounds/marine_standin.mp3'
    ],
    backgroundScene: '/backgrounds/hyperion_armory.jpg',
    description: "La fortaleza celestial del Dominio. Equipado con baterías de láser antiblindaje y el temible Cañón Yamato, capaz de evaporar naves nodrizas o colmenas enteras de un solo disparo nuclear concentrado.",
    lore: "El crucero de batalla representa la cúspide de la ingeniería aeroespacial terran. Naves legendarias como el Hyperion o el Bucephalus han cambiado el destino de la galaxia capitaneadas por héroes y tiranos por igual.",
    stats: {
      hp: 550,
      armor: 3,
      energy: 200,
      maxEnergy: 200,
      speed: 1.88,
      sight: 12,
      damageGround: 8,
      damageAir: 6,
      attacksGround: true,
      attacksAir: true,
      range: 6,
      attackSpeed: 0.16
    },
    cost: {
      minerals: 400,
      vespene: 300,
      supply: 6,
      time: 64
    },
    counters: {
      strongAgainst: ['Mutalisk', 'Hydralisk', 'Carrier', 'Thor'],
      weakAgainst: ['Corruptor', 'Viper', 'Tempest', 'Void Ray']
    },
    abilities: [
      {
        id: 'yamato_cannon',
        name: 'Cañón Yamato',
        hotkey: 'Y',
        icon: '⚡',
        iconImg: '/icons/yamato_cannon.png',
        description: "Canaliza un potente campo magnético para disparar un haz de plasma termonuclear de 300 puntos de daño concentrado.",
        energyCost: 125,
        cooldown: 71,
        animationTrigger: 'yamato',
        soundType: 'laser',
        vfx: 'beam'
      },
      {
        id: 'tactical_jump',
        name: 'Salto Hiperespacial Táctico',
        hotkey: 'J',
        icon: '🌀',
        iconImg: '/icons/move.png',
        description: "Teletransporta inmediatamente el crucero a cualquier punto del mapa sin requerir visión directa.",
        cooldown: 71,
        animationTrigger: 'special',
        soundType: 'teleport',
        vfx: 'teleport'
      }
    ],
    modelConfig: {
      meshType: 'battlecruiser',
      glbPath: '/models/battlecruiser.glb',
      primaryColor: '#1d4ed8',
      secondaryColor: '#334155',
      glowColor: '#38bdf8',
      scale: 1.45,
      yOffset: 0.8,
      hasWings: true,
      glowIntensity: 2.0
    }
  },
  {
    id: 'scv',
    name: 'VCE (SCV T-280)',
    title: 'Vehículo de Construcción Espacial',
    race: 'terran',
    category: 'units',
    tier: 1,
    role: 'Recolección / Reparación / Construcción',
    attributeTypes: ['Mecánico', 'Biológico', 'Ligero'],
    quote: "VCE listo para la acción.",
    quotes: [
      "VCE listo para la acción.",
      "¡A la orden, capitán!",
      "¿Trabajo terminado?",
      "No puedo construir sobre eso."
    ],
    portraitPath: '/portraits/scv.png',
    audioClips: [
      '/sounds/scv_goodtogo.mp3',
      '/sounds/scv_reportin.mp3',
      '/sounds/scv_order.mp3'
    ],
    backgroundScene: '/backgrounds/hyperion_armory.jpg',
    description: "Unidad obrera multiuso. Equipado con taladros de fusión magnética y tenazas hidráulicas para minar minerales, extraer vespeno y reparar maquinaria bajo fuego enemigo.",
    lore: "El caballo de batalla silencioso que forjó la civilización Terran entre las estrellas. Los pilotos de los VCE arriesgan sus vidas en la primera línea de combate levantando búnkeres y bases de operaciones en mundos hostiles.",
    stats: {
      hp: 45,
      armor: 0,
      speed: 2.81,
      sight: 8,
      damageGround: 5,
      damageAir: 0,
      attacksGround: true,
      attacksAir: false,
      range: 0.1,
      attackSpeed: 1.07
    },
    cost: {
      minerals: 50,
      vespene: 0,
      supply: 1,
      time: 12
    },
    counters: {
      strongAgainst: ['Drone', 'Probe'],
      weakAgainst: ['Zergling', 'Reaper', 'Zealot']
    },
    abilities: [
      {
        id: 'repair',
        name: 'Reparación de Fusión',
        hotkey: 'R',
        icon: '🔧',
        iconImg: '/icons/defensive_matrix.png',
        description: "Repara estructuras mecánicas y vehículos dañados a cambio de una pequeña cantidad de minerales.",
        animationTrigger: 'special',
        soundType: 'mechanical',
        vfx: 'sparks'
      }
    ],
    modelConfig: {
      meshType: 'scv',
      glbPath: '/models/scv.glb',
      texturePath: '/models/scv_diffuse.png',
      primaryColor: '#eab308',
      secondaryColor: '#334155',
      glowColor: '#38bdf8',
      scale: 1.15,
      yOffset: 0.1
    }
  },
  {
    id: 'goliath',
    name: 'Goliat Mark IV',
    title: 'Bípode Blindado Antiaéreo / Asalto Terrestre',
    race: 'terran',
    category: 'units',
    tier: 2,
    role: 'Antiaéreo Pesado / Apoyo Mecanizado',
    attributeTypes: ['Mecánico', 'Blindado'],
    quote: "Sistemas Goliat en línea.",
    quotes: [
      "Sistemas Goliat en línea.",
      "Misiles Hellfire bloqueados.",
      "Reconocimiento confirmado.",
      "¡Objetivo aéreo en la mira!"
    ],
    portraitPath: '/portraits/goliath.png',
    audioClips: [
      '/sounds/siegetank_what00.ogg',
      '/sounds/siegetank_what01.ogg'
    ],
    backgroundScene: '/backgrounds/hyperion_armory.jpg',
    description: "Caminante bípode acorazado con dos cañones automáticos de 30 mm para objetivos terrestres y una batería dorsal de misiles Hellfire guiados de largo alcance contra cazas y bestias voladoras.",
    lore: "Desarrollado por Kel-Morian Combine y adoptado con entusiasmo por el Dominio, el Goliat es un símbolo de poderío industrial mecanizado capaz de derribar flotas aéreas zerg o protoss a gran distancia.",
    stats: {
      hp: 125,
      armor: 1,
      speed: 2.62,
      sight: 10,
      damageGround: 12,
      damageAir: 16,
      attacksGround: true,
      attacksAir: true,
      range: 8,
      attackSpeed: 1.18
    },
    cost: {
      minerals: 150,
      vespene: 50,
      supply: 2,
      time: 28
    },
    counters: {
      strongAgainst: ['Mutalisk', 'Wraith', 'Carrier', 'Phoenix'],
      weakAgainst: ['Immortal', 'Ultralisk', 'Siege Tank Crucio']
    },
    abilities: [
      {
        id: 'hellfire_salvo',
        name: 'Salva Hellfire',
        hotkey: 'F',
        icon: '🚀',
        iconImg: '/icons/attack.png',
        description: "Lanza una descarga concentrada de misiles guiados que penetran el blindaje aéreo enemigo.",
        animationTrigger: 'attack',
        soundType: 'explosion',
        vfx: 'burst'
      }
    ],
    modelConfig: {
      meshType: 'goliath',
      glbPath: '/models/goliath.glb',
      primaryColor: '#2563eb',
      secondaryColor: '#1e293b',
      glowColor: '#38bdf8',
      scale: 1.3,
      yOffset: 0.2
    }
  },
  {
    id: 'wraith',
    name: 'Espectro CF/A-17 (Wraith)',
    title: 'Caza Espacial de Superioridad Aérea',
    race: 'terran',
    category: 'units',
    tier: 2,
    role: 'Incursión Sigilosa / Interceptación Aérea',
    attributeTypes: ['Mecánico', 'Ligero'],
    quote: "Vector listo.",
    quotes: [
      "Vector listo.",
      "Camuflaje activo, no saben qué los golpeó.",
      "Rumbo fijado.",
      "¡Fuego de láseres Gemini!"
    ],
    portraitPath: '/portraits/wraith.png',
    audioClips: [
      '/sounds/marine_standin.mp3'
    ],
    backgroundScene: '/backgrounds/hyperion_armory.jpg',
    description: "Caza interceptor atmosférico y orbital dotado de generadores de camuflaje de distorsión lumínica y láseres Gemini.",
    lore: "Los pilotos de Wraith son ases del combate aéreo entrenados para penetrar las defensas enemigas en modo sigiloso y aniquilar objetivos estratégicos antes de que se activen las alarmas.",
    stats: {
      hp: 120,
      armor: 0,
      energy: 200,
      maxEnergy: 200,
      speed: 3.84,
      sight: 9,
      damageGround: 8,
      damageAir: 20,
      attacksGround: true,
      attacksAir: true,
      range: 5,
      attackSpeed: 0.86
    },
    cost: {
      minerals: 150,
      vespene: 100,
      supply: 2,
      time: 35
    },
    counters: {
      strongAgainst: ['Mutalisk', 'Dropship', 'Observer', 'Overlord'],
      weakAgainst: ['Valkyrie', 'Scourge', 'Corsair', 'Stalker']
    },
    abilities: [
      {
        id: 'cloak',
        name: 'Camuflaje Óptico',
        hotkey: 'C',
        icon: '👻',
        iconImg: '/icons/cloak.png',
        description: "Activa el generador de sigilo haciendo invisible la nave a menos que esté en el rango de un detector.",
        energyCost: 25,
        animationTrigger: 'special',
        soundType: 'mechanical',
        vfx: 'cloud'
      }
    ],
    modelConfig: {
      meshType: 'wraith',
      glbPath: '/models/wraith.glb',
      primaryColor: '#1d4ed8',
      secondaryColor: '#0f172a',
      glowColor: '#38bdf8',
      scale: 1.35,
      yOffset: 0.6
    }
  },
  {
    id: 'ghost',
    name: 'Fantasma Terran (Ghost)',
    title: 'Operativo Psiónico Encubierto',
    race: 'terran',
    category: 'units',
    tier: 3,
    role: 'Francotirador / Guerra Psiónica / Designación Nuclear',
    attributeTypes: ['Biológico', 'Psiónico'],
    quote: "¿Alguien me llamó?",
    quotes: [
      "¿Alguien me llamó?",
      "Nunca me verán venir.",
      "Bomba nuclear lista.",
      "Silencio en la frecuencia."
    ],
    portraitPath: '/portraits/ghost.png',
    audioClips: [
      '/sounds/marine_standin.mp3'
    ],
    backgroundScene: '/backgrounds/hyperion_armory.jpg',
    description: "Asesinos criados bajo implantes neuronales que canalizan poderes psiónicos mortales. Portan rifles de francotirador C-10 Canister y guiado láser para bombardeos nucleares tácticos.",
    lore: "El programa Ghost del Dominio toma individuos sensibles a la energía psiónica desde la infancia, borra sus recuerdos y los convierte en el instrumento supremo de asesinatos políticos y reconocimiento táctico.",
    stats: {
      hp: 100,
      armor: 0,
      energy: 200,
      maxEnergy: 200,
      speed: 2.81,
      sight: 11,
      damageGround: 10,
      damageAir: 10,
      attacksGround: true,
      attacksAir: true,
      range: 6,
      attackSpeed: 1.07
    },
    cost: {
      minerals: 150,
      vespene: 125,
      supply: 2,
      time: 29
    },
    counters: {
      strongAgainst: ['High Templar', 'Infestor', 'Raven', 'Zergling'],
      weakAgainst: ['Siege Tank Crucio', 'Stalker', 'Ultralisk']
    },
    abilities: [
      {
        id: 'nuke',
        name: 'Golpe Nuclear Táctico',
        hotkey: 'N',
        icon: '☢️',
        iconImg: '/icons/nuke_strike.png',
        description: "Guía un misil nuclear balístico de 300 (+200 a estructuras) de daño catastrófico en un área masiva tras 14 segundos de canalización láser.",
        cooldown: 20,
        animationTrigger: 'special',
        soundType: 'explosion',
        vfx: 'burst'
      },
      {
        id: 'emp',
        name: 'Disparo EMP',
        hotkey: 'E',
        icon: '⚡',
        iconImg: '/icons/emp_shockwave.png',
        description: "Dispara un pulso electromagnético que drena hasta 100 puntos de energía y destruye escudos de plasma Protoss al instante.",
        energyCost: 75,
        animationTrigger: 'special',
        soundType: 'lightning',
        vfx: 'lightning'
      }
    ],
    modelConfig: {
      meshType: 'ghost',
      glbPath: '/models/ghost.glb',
      texturePath: '/models/ghost_diffuse.png',
      primaryColor: '#1e293b',
      secondaryColor: '#dc2626',
      glowColor: '#ef4444',
      scale: 1.1,
      yOffset: 0
    }
  },

  // ==========================================
  // TERRAN - HEROES & BUILDINGS
  // ==========================================
  {
    id: 'jim_raynor',
    name: 'Jim Raynor',
    title: 'Comandante de los Raiders de Raynor',
    race: 'terran',
    category: 'heroes',
    tier: 4,
    role: 'Héroe Legendario / Comandante de la Rebelión',
    attributeTypes: ['Biológico', 'Blindado', 'Héroe'],
    quote: "Este no es el final. Esto apenas comienza.",
    quotes: [
      "Este no es el final. Esto apenas comienza.",
      "Todo hombre tiene su precio... el mío es la libertad.",
      "¡Fuego de cobertura, muchachos!",
      "Por Sarah... y por todos los que cayeron."
    ],
    portraitPath: '/portraits/raynor.jpg',
    audioClips: [
      '/sounds/marine_commander.mp3',
      '/sounds/marine_shoot.mp3',
      '/sounds/marine_pieceme.mp3'
    ],
    backgroundScene: '/backgrounds/marsara_desert.jpg',
    description: "Antiguo alguacil de Mar Sara y líder legendario de la rebelión armada contra Mengsk y el Enjambre. Lucha con su rifle Gauss experimental y su legendaria determinación.",
    lore: "Raynor ha sido testigo del apogeo y la caída de imperios estelares. De un modesto oficial de policía colonial a convertirse en la esperanza suprema del Sector Koprulu, su valentía inspiró a millones a levantarse.",
    stats: {
      hp: 450,
      armor: 3,
      energy: 150,
      maxEnergy: 150,
      speed: 3.15,
      sight: 12,
      damageGround: 35,
      damageAir: 35,
      attacksGround: true,
      attacksAir: true,
      range: 7,
      attackSpeed: 0.55
    },
    cost: {
      minerals: 500,
      vespene: 250,
      supply: 4,
      time: 60
    },
    counters: {
      strongAgainst: ['Zeratul', 'Hydralisk', 'Zealot', 'Thor'],
      weakAgainst: ['Kerrigan Reina de Espadas', 'Colossus', 'Archon']
    },
    abilities: [
      {
        id: 'hyperion_strike',
        name: 'Bombardeo Orbital del Hyperion',
        hotkey: 'H',
        icon: '🚀',
        iconImg: '/icons/yamato_cannon.png',
        description: "Ordena a la nave capitana Hyperion bombardear la zona con salvas de cañones Yamato de precisión devastadora.",
        cooldown: 45,
        animationTrigger: 'special',
        soundType: 'explosion',
        vfx: 'beam'
      }
    ],
    modelConfig: {
      meshType: 'raynor',
      glbPath: '/models/marine.glb',
      texturePath: '/models/marine_diffuse.png',
      primaryColor: '#0f172a',
      secondaryColor: '#dc2626',
      glowColor: '#f97316',
      scale: 1.25,
      yOffset: -0.1
    }
  },
  {
    id: 'command_center',
    name: 'Centro de Mando Orbital',
    title: 'Estructura Central de Operaciones y Minería',
    race: 'terran',
    category: 'buildings',
    tier: 1,
    role: 'Cuartel General / Estación Orbital',
    attributeTypes: ['Mecánico', 'Blindado', 'Estructura'],
    quote: "Centro de Mando listo para aterrizaje.",
    quotes: [
      "Centro de Mando listo para aterrizaje.",
      "Escaneo orbital disponible.",
      "Despegue atmosférico completado.",
      "Procesando suministros de minerales."
    ],
    portraitPath: '/portraits/command_center.png',
    audioClips: [
      '/sounds/siegetank_what00.ogg'
    ],
    backgroundScene: '/backgrounds/hyperion_armory.jpg',
    description: "El corazón de cada base Terran. Puede despegar del suelo con sus turbinas para reubicarse y mejorarse a Fortaleza Planetaria o Comando Orbital.",
    lore: "Equipado con propulsores vectoriales de despegue vertical, el Centro de Mando permite a las fuerzas del Dominio establecer enclaves operacionales en cualquier planeta en cuestión de minutos.",
    stats: {
      hp: 1500,
      armor: 1,
      energy: 200,
      maxEnergy: 200,
      speed: 1.31,
      sight: 11,
      attacksGround: false,
      attacksAir: false
    },
    cost: {
      minerals: 400,
      vespene: 0,
      supply: 0,
      time: 71
    },
    counters: {
      strongAgainst: [],
      weakAgainst: ['Mutalisk', 'Siege Tank Crucio', 'Carrier']
    },
    abilities: [
      {
        id: 'scanner_sweep',
        name: 'Escaneo Orbital de Satélite',
        hotkey: 'C',
        icon: '📡',
        iconImg: '/icons/scanner_sweep.png',
        description: "Revela cualquier área del mapa durante 12 segundos, detectando unidades invisibles o enterradas.",
        energyCost: 50,
        animationTrigger: 'special',
        soundType: 'mechanical',
        vfx: 'cloud'
      }
    ],
    modelConfig: {
      meshType: 'command_center',
      glbPath: '/models/command_center.glb',
      primaryColor: '#1e40af',
      secondaryColor: '#334155',
      glowColor: '#38bdf8',
      scale: 1.6,
      yOffset: 0.2
    }
  },
  {
    id: 'supply_depot',
    name: 'Depósito de Suministros',
    title: 'Estructura Logística Retráctil',
    race: 'terran',
    category: 'buildings',
    tier: 1,
    role: 'Logística / Control de Acceso Táctico',
    attributeTypes: ['Mecánico', 'Blindado', 'Estructura'],
    quote: "Suministros asegurados.",
    quotes: [
      "Suministros asegurados.",
      "Plataforma descendida.",
      "Puerta sellada."
    ],
    portraitPath: '/portraits/supply_depot.png',
    audioClips: [
      '/sounds/siegetank_what01.ogg'
    ],
    backgroundScene: '/backgrounds/hyperion_armory.jpg',
    description: "Proporciona combustible, munición y soporte de vida para 8 unidades de suministro. Puede sumergirse bajo tierra para permitir el paso de tropas amigas.",
    lore: "El diseño retráctil del depósito resolvió el antiguo dilema de cuellos de botella en bases amuralladas, convirtiéndose en el estándar militar en todo el Dominio.",
    stats: {
      hp: 400,
      armor: 1,
      speed: 0,
      sight: 9,
      attacksGround: false,
      attacksAir: false
    },
    cost: {
      minerals: 100,
      vespene: 0,
      supply: 0,
      time: 21
    },
    counters: {
      strongAgainst: [],
      weakAgainst: ['Baneling', 'Siege Tank Crucio', 'Roach']
    },
    abilities: [
      {
        id: 'lower_depot',
        name: 'Sumergir / Emerger Depósito',
        hotkey: 'R',
        icon: '⬇️',
        iconImg: '/icons/tank_mode.png',
        description: "Baja la estructura a ras de suelo para permitir el paso de unidades terrestres aliadas.",
        animationTrigger: 'special',
        soundType: 'mechanical',
        vfx: 'sparks'
      }
    ],
    modelConfig: {
      meshType: 'supply_depot',
      glbPath: '/models/supply-depot.glb',
      primaryColor: '#3b82f6',
      secondaryColor: '#1e293b',
      glowColor: '#38bdf8',
      scale: 1.25,
      yOffset: 0.1
    }
  },
  {
    id: 'terran_turret',
    name: 'Torreta de Misiles Terran',
    title: 'Defensa Estática Antiaérea / Radar Detector',
    race: 'terran',
    category: 'buildings',
    tier: 1,
    role: 'Defensa Antiaérea / Detección de Sigilo',
    attributeTypes: ['Mecánico', 'Blindado', 'Estructura'],
    quote: "Radar de largo alcance operativo.",
    quotes: [
      "Radar de largo alcance operativo.",
      "Blanco aéreo detectado.",
      "Batería de misiles cargada."
    ],
    portraitPath: '/portraits/missile_turret.png',
    audioClips: [
      '/sounds/siegetank_what02.ogg'
    ],
    backgroundScene: '/backgrounds/hyperion_armory.jpg',
    description: "Torreta automatizada equipada con radares de detección de sigilo y lanzadores de misiles Hellfire antiaéreos gemelos.",
    lore: "Esencial para salvaguardar enclaves mineros y fábricas de ataques sorpresa de Mutalisks zerg o naves de desembarco Protoss.",
    stats: {
      hp: 250,
      armor: 1,
      speed: 0,
      sight: 11,
      damageAir: 24,
      attacksGround: false,
      attacksAir: true,
      range: 7,
      attackSpeed: 0.86
    },
    cost: {
      minerals: 100,
      vespene: 0,
      supply: 0,
      time: 25
    },
    counters: {
      strongAgainst: ['Mutalisk', 'Wraith', 'Banshee', 'Observer'],
      weakAgainst: ['Siege Tank Crucio', 'Roach', 'Stalker']
    },
    abilities: [
      {
        id: 'anti_air_barrage',
        name: 'Fuego Antiaéreo Continuo',
        hotkey: 'A',
        icon: '🚀',
        iconImg: '/icons/attack.png',
        description: "Dispara salvas continuas de misiles rastreadores contra amenazas aéreas.",
        animationTrigger: 'attack',
        soundType: 'explosion',
        vfx: 'burst'
      }
    ],
    modelConfig: {
      meshType: 'terran-turret',
      glbPath: '/models/terran-turret.glb',
      primaryColor: '#2563eb',
      secondaryColor: '#1e293b',
      glowColor: '#38bdf8',
      scale: 1.2,
      yOffset: 0.1
    }
  },

  // ==========================================
  // ZERG - UNITS & HEROES
  // ==========================================
  {
    id: 'zergling',
    name: 'Zergling',
    title: 'Bestia de Asalto Veloz del Enjambre',
    race: 'zerg',
    category: 'units',
    tier: 1,
    role: 'Enjambre / Flanqueo / Destrucción Rápida',
    attributeTypes: ['Biológico', 'Ligero'],
    quote: "*Gruñidos feroces y chasquido de garras*",
    quotes: [
      "*Gruñidos feroces y chasquido de garras*",
      "*Siseo venenoso del Enjambre*",
      "*Golpeteo veloz de pezuñas queratinizadas*"
    ],
    portraitPath: '/portraits/zergling.jpg',
    audioClips: [
      '/sounds/zergling_attack.wav'
    ],
    backgroundScene: '/backgrounds/char_volcano.jpg',
    description: "Nacidos de dos en dos por cada huevo de larva. Bestias hiperrápidas dotadas de garras afiladas con diamantes capaces de destrozar blindaje en segundos.",
    lore: "Criados originalmente a partir de los dóciles carnívoros Zz'gashi del desierto, el Enjambre absorbió y alteró genéticamente su estructura hasta convertirlos en los más implacables y numerosos cazadores del cosmos.",
    stats: {
      hp: 35,
      armor: 0,
      speed: 4.13,
      sight: 8,
      damageGround: 5,
      damageAir: 0,
      attacksGround: true,
      attacksAir: false,
      range: 0.1,
      attackSpeed: 0.49
    },
    cost: {
      minerals: 50,
      vespene: 0,
      supply: 1,
      time: 17
    },
    counters: {
      strongAgainst: ['Stalker', 'Marauder', 'Hydralisk'],
      weakAgainst: ['Colossus', 'Hellion', 'Baneling']
    },
    abilities: [
      {
        id: 'adrenal_frenzy',
        name: 'Frenesí Suprarrenal',
        hotkey: 'Z',
        icon: '🩸',
        iconImg: '/icons/attack.png',
        description: "Glándulas modificadas aceleran el ritmo cardíaco aumentando la velocidad de ataque un 40%.",
        cooldown: 8,
        animationTrigger: 'special',
        soundType: 'bio',
        vfx: 'sparks'
      },
      {
        id: 'burrow',
        name: 'Enterrarse en el Suelo',
        hotkey: 'R',
        icon: '🕳️',
        iconImg: '/icons/hold.png',
        description: "Se sumerge bajo tierra para emboscadas ocultas y regeneración acelerada de tejido.",
        cooldown: 3,
        animationTrigger: 'burrow',
        soundType: 'bio',
        vfx: 'cloud'
      }
    ],
    modelConfig: {
      meshType: 'zergling',
      glbPath: '/models/zergling.glb',
      texturePath: '/models/zergling_diffuse.png',
      primaryColor: '#7c3aed',
      secondaryColor: '#4c1d95',
      glowColor: '#c084fc',
      scale: 1.1,
      yOffset: 0.05
    }
  },
  {
    id: 'hydralisk',
    name: 'Hydralisk',
    title: 'Guerrero de Espinas Perforantes',
    race: 'zerg',
    category: 'units',
    tier: 2,
    role: 'Fuego Antiaéreo y Terrestre de Rango',
    attributeTypes: ['Biológico', 'Ligero'],
    quote: "*Siseo gutural y chasquido de placas*",
    quotes: [
      "*Siseo gutural y chasquido de placas*",
      "*Tensión muscular de placas disparadoras*",
      "*Rugido del Enjambre hambriento*"
    ],
    portraitPath: '/portraits/hydralisk.gif',
    audioClips: [
      '/sounds/hydralisk_attack.wav'
    ],
    backgroundScene: '/backgrounds/char_volcano.jpg',
    description: "La columna ofensiva a distancia del Enjambre. Dispara espinas densas y ranuradas impulsadas por contracciones musculares que atraviesan aleaciones de titanio.",
    lore: "Evolucionados a partir de los pacíficos herbívoros Slothien, los hydralisks fueron metamorfoseados en terroríficas serpientes de combate bípedas con una musculatura superior implacable.",
    stats: {
      hp: 90,
      armor: 0,
      speed: 3.15,
      sight: 9,
      damageGround: 12,
      damageAir: 12,
      attacksGround: true,
      attacksAir: true,
      range: 6,
      attackSpeed: 0.59
    },
    cost: {
      minerals: 100,
      vespene: 50,
      supply: 2,
      time: 24
    },
    counters: {
      strongAgainst: ['Mutalisk', 'Void Ray', 'Valkyrie', 'Immortal'],
      weakAgainst: ['Siege Tank Crucio', 'Colossus', 'Storm Psiónica']
    },
    abilities: [
      {
        id: 'grooved_spines',
        name: 'Espinas Ranuradas',
        hotkey: 'G',
        icon: '🏹',
        iconImg: '/icons/attack.png',
        description: "Espinas modificadas genéticamente que incrementan el alcance de ataque de 5 a 6 casillas.",
        animationTrigger: 'attack',
        soundType: 'bio',
        vfx: 'beam'
      }
    ],
    modelConfig: {
      meshType: 'hydralisk',
      glbPath: '/models/hydralisk.glb',
      texturePath: '/models/hydralisk_diffuse.png',
      primaryColor: '#9333ea',
      secondaryColor: '#3b0764',
      glowColor: '#a855f7',
      scale: 1.2,
      yOffset: 0.1
    }
  },
  {
    id: 'mutalisk',
    name: 'Mutalisk',
    title: 'Volador Orgánico de Ataque Rápido',
    race: 'zerg',
    category: 'units',
    tier: 2,
    role: 'Hostigamiento Aéreo / Golpe y Fuga',
    attributeTypes: ['Biológico', 'Ligero'],
    quote: "*Chillido supersónico de alas orgánicas*",
    quotes: [
      "*Chillido supersónico de alas orgánicas*",
      "*Eco resonante de gusanos glaive*",
      "*Aleteo hipersónico del enjambre volador*"
    ],
    portraitPath: '/portraits/hydralisk.gif',
    audioClips: [
      '/sounds/mutalisk_attack.wav'
    ],
    backgroundScene: '/backgrounds/char_volcano.jpg',
    description: "Caza biológico capaz de maniobrar en el vacío espacial y atmósferas densas. Dispara gusanos Glaive voraces que rebotan entre múltiples enemigos.",
    lore: "Originarios de la Mantis Espacial del Sector Dinares, estas criaturas pueden desplazarse en nubes oscurecedoras del cielo diezmando líneas de suministros sin dejar rastro.",
    stats: {
      hp: 120,
      armor: 0,
      speed: 4.0,
      sight: 11,
      damageGround: 9,
      damageAir: 9,
      attacksGround: true,
      attacksAir: true,
      range: 3,
      attackSpeed: 1.09
    },
    cost: {
      minerals: 100,
      vespene: 100,
      supply: 2,
      time: 24
    },
    counters: {
      strongAgainst: ['Siege Tank Crucio', 'VCE (SCV T-280)', 'Vulture', 'Carrier'],
      weakAgainst: ['Marine', 'Goliat Mark IV', 'Phoenix', 'Archon']
    },
    abilities: [
      {
        id: 'glaive_wurm',
        name: 'Gusano Glaive Rebotador',
        hotkey: 'G',
        icon: '🪱',
        iconImg: '/icons/attack.png',
        description: "Dispara un parásito que rebota en hasta 3 objetivos consecutivos infligiendo daño en cadena.",
        animationTrigger: 'attack',
        soundType: 'bio',
        vfx: 'burst'
      }
    ],
    modelConfig: {
      meshType: 'mutalisk',
      glbPath: '/models/mutalisk.glb',
      texturePath: '/models/mutalisk_diffuse.png',
      primaryColor: '#7e22ce',
      secondaryColor: '#1e1b4b',
      glowColor: '#c084fc',
      scale: 1.3,
      yOffset: 0.65,
      hasWings: true
    }
  },
  {
    id: 'ultralisk',
    name: 'Ultralisk',
    title: 'Monstruosidad de Asedio del Enjambre',
    race: 'zerg',
    category: 'units',
    tier: 3,
    role: 'Ariete Terrestre Masivo / Rompelíneas',
    attributeTypes: ['Biológico', 'Blindado', 'Masivo'],
    quote: "*Bramido ensordecedor que hace temblar la tierra*",
    quotes: [
      "*Bramido ensordecedor que hace temblar la tierra*",
      "*Chasquido demoledor de cuchillas Kaiser*",
      "*Crujido sísmico de corazas quitinosas pesadas*"
    ],
    portraitPath: '/portraits/ultralisk.jpg',
    audioClips: [
      '/sounds/zergling_attack.wav'
    ],
    backgroundScene: '/backgrounds/char_volcano.jpg',
    description: "El coloso viviente del Enjambre. Cuatro gigantescas cuchillas Kaiser de monomolécula cortan tanques de asedio y fortificaciones como si fueran papel.",
    lore: "Evolucionados del pacífico Taurenodonte, estas bestias del tamaño de edificios caminan sobre tormentas de fuego láser casi imperturbables gracias a su coraza quitinosa multicapa.",
    stats: {
      hp: 500,
      armor: 2,
      speed: 4.13,
      sight: 9,
      damageGround: 35,
      damageAir: 0,
      attacksGround: true,
      attacksAir: false,
      range: 1,
      attackSpeed: 0.61
    },
    cost: {
      minerals: 300,
      vespene: 200,
      supply: 6,
      time: 55
    },
    counters: {
      strongAgainst: ['Marine', 'Stalker', 'Zealot', 'Hydralisk'],
      weakAgainst: ['Immortal', 'Ghost', 'Liberator', 'Void Ray']
    },
    abilities: [
      {
        id: 'kaiser_cleave',
        name: 'Tajo Hendidor Kaiser',
        hotkey: 'K',
        icon: '⚔️',
        iconImg: '/icons/attack.png',
        description: "Bandea sus cuchillas monomoleculares en un arco de 180 grados dañando a todos los enemigos adyacentes.",
        animationTrigger: 'attack',
        soundType: 'bio',
        vfx: 'burst'
      }
    ],
    modelConfig: {
      meshType: 'ultralisk',
      glbPath: '/models/roach.glb',
      texturePath: '/models/roach_diffuse.png',
      primaryColor: '#581c87',
      secondaryColor: '#172554',
      glowColor: '#a855f7',
      scale: 1.6,
      yOffset: 0.1
    }
  },
  {
    id: 'kerrigan_queen',
    name: 'Sarah Kerrigan',
    title: 'La Reina de Espadas / Gobernanta Suprema del Enjambre',
    race: 'zerg',
    category: 'heroes',
    tier: 4,
    role: 'Deidad Psiónica Zerg / Soberana del Enjambre',
    attributeTypes: ['Biológico', 'Psiónico', 'Héroe'],
    quote: "Yo soy el Enjambre. Los mundos arderán a mi paso.",
    quotes: [
      "Yo soy el Enjambre. Los mundos arderán a mi paso.",
      "No hay salvación, solo obediencia.",
      "Mi furia no conoce límites.",
      "El Sector Koprulu me pertenecerá."
    ],
    portraitPath: '/portraits/kerrigan.jpg',
    audioClips: [
      '/sounds/hydralisk_attack.wav'
    ],
    backgroundScene: '/backgrounds/char_volcano.jpg',
    description: "Antigua agente Ghost terran traicionada por Arcturus Mengsk y renacida en la crisálida de Char como la Reina de Espadas, la entidad psiónica más poderosa del universo.",
    lore: "Con una mezcla inigualable de intelecto humano y voracidad zerg, Kerrigan doblegó al Cerebrado Supremo, derrotó las flotas unidas del Directorio de la Tierra y dominó Koprulu.",
    stats: {
      hp: 1000,
      armor: 4,
      energy: 300,
      maxEnergy: 300,
      speed: 3.5,
      sight: 12,
      damageGround: 50,
      damageAir: 50,
      attacksGround: true,
      attacksAir: true,
      range: 6,
      attackSpeed: 0.7
    },
    cost: {
      minerals: 600,
      vespene: 400,
      supply: 6,
      time: 90
    },
    counters: {
      strongAgainst: ['Jim Raynor', 'Artanis', 'Thor', 'Archon'],
      weakAgainst: ['Flotas masivas concentradas', 'Bombardeo nuclear simultáneo']
    },
    abilities: [
      {
        id: 'kinetic_blast',
        name: 'Explosión Cinética Psiónica',
        hotkey: 'Q',
        icon: '💥',
        iconImg: '/icons/emp_shockwave.png',
        description: "Concentra energía psiónica destructiva en un solo blanco infringiendo 300 de daño inmediato.",
        energyCost: 50,
        cooldown: 8,
        animationTrigger: 'special',
        soundType: 'lightning',
        vfx: 'beam'
      },
      {
        id: 'apocalypse',
        name: 'Apocalipsis Psiónico',
        hotkey: 'R',
        icon: '🌋',
        iconImg: '/icons/nuke_strike.png',
        description: "Desata una conflagración psiónica masiva que vaporiza todas las unidades enemigas en un radio colosal.",
        energyCost: 100,
        cooldown: 60,
        animationTrigger: 'special',
        soundType: 'explosion',
        vfx: 'burst'
      }
    ],
    modelConfig: {
      meshType: 'kerrigan',
      glbPath: '/models/queen.glb',
      texturePath: '/models/queen_diffuse.png',
      primaryColor: '#6b21a8',
      secondaryColor: '#09090b',
      glowColor: '#e11d48',
      scale: 1.25,
      yOffset: 0.1
    }
  },

  // ==========================================
  // PROTOSS - UNITS, HEROES & BUILDINGS
  // ==========================================
  {
    id: 'zealot',
    name: 'Fanático (Zealot)',
    title: 'Guerrero de la Orden Templaria',
    race: 'protoss',
    category: 'units',
    tier: 1,
    role: 'Vanguardia Cuerpo a Cuerpo / Armadura de Plasma',
    attributeTypes: ['Biológico', 'Ligero'],
    quote: "¡Mi vida por Aiur!",
    quotes: [
      "¡Mi vida por Aiur!",
      "Honor a los Primeros Nacidos.",
      "Sentirás la furia de las cuchillas psiónicas.",
      "El Khala nos guía."
    ],
    portraitPath: '/portraits/zealot.png',
    audioClips: [
      '/sounds/marine_standin.mp3'
    ],
    backgroundScene: '/backgrounds/aiur_golden.jpg',
    description: "Los campeones templarios del Khala. Portan servoarmaduras doradas de aleación fotónica y dos cuchillas psiónicas condensadas de energía pura que brotan de sus muñecas.",
    lore: "Entrenados desde milenios en las artes marciales del Khala, los fanáticos no conocen el miedo ni la duda. Marchan hacia el combate dispuestos a inmolarse por la gloria de su gente.",
    stats: {
      hp: 100,
      shields: 50,
      armor: 1,
      speed: 3.15,
      sight: 9,
      damageGround: 16,
      damageAir: 0,
      attacksGround: true,
      attacksAir: false,
      range: 0.1,
      attackSpeed: 0.86
    },
    cost: {
      minerals: 100,
      vespene: 0,
      supply: 2,
      time: 27
    },
    counters: {
      strongAgainst: ['Marine', 'Zergling', 'Marauder', 'Immortal'],
      weakAgainst: ['Hellion', 'Baneling', 'Colossus', 'Mutalisk']
    },
    abilities: [
      {
        id: 'charge',
        name: 'Carga Psiónica',
        hotkey: 'C',
        icon: '⚡',
        iconImg: '/icons/train_zealot.png',
        description: "Acelera instantáneamente a velocidad supersónica hacia el enemigo, asestando un golpe inicial potenciado.",
        cooldown: 7,
        animationTrigger: 'charge',
        soundType: 'teleport',
        vfx: 'sparks'
      }
    ],
    modelConfig: {
      meshType: 'zealot',
      glbPath: '/models/zealot.glb',
      texturePath: '/models/zealot_diffuse.png',
      primaryColor: '#eab308',
      secondaryColor: '#1e3a8a',
      glowColor: '#38bdf8',
      scale: 1.2,
      yOffset: 0.05
    }
  },
  {
    id: 'stalker',
    name: 'Acechador (Stalker)',
    title: 'Caminante Bípode de los Templarios Tétricos',
    race: 'protoss',
    category: 'units',
    tier: 1,
    role: 'Movilidad Táctica / Teletransporte Blink',
    attributeTypes: ['Mecánico', 'Blindado'],
    quote: "Servimos desde las sombras.",
    quotes: [
      "Servimos desde las sombras.",
      "El Vacío responderá.",
      "Un paso en las tinieblas.",
      "Parpadeo posicional completado."
    ],
    portraitPath: '/portraits/stalker.png',
    audioClips: [
      '/sounds/marine_standin.mp3'
    ],
    backgroundScene: '/backgrounds/aiur_golden.jpg',
    description: "Chasis cuadrúpedo tripulado por la esencia de los Templarios Tétricos de Shakuras. Proyecta haces de partículas desintegradoras a tierra y aire con la capacidad de teletransportarse.",
    lore: "Basado en la tecnología de los antiguos Dragones de Aiur pero imbuido de la energía del Vacío Nerazim, el Acechador es la máxima expresión de guerra relámpago e infiltración táctica.",
    stats: {
      hp: 80,
      shields: 80,
      armor: 1,
      speed: 4.13,
      sight: 10,
      damageGround: 14,
      damageAir: 14,
      attacksGround: true,
      attacksAir: true,
      range: 6,
      attackSpeed: 0.96
    },
    cost: {
      minerals: 125,
      vespene: 50,
      supply: 2,
      time: 30
    },
    counters: {
      strongAgainst: ['Mutalisk', 'Reaper', 'Roach', 'Valkyrie'],
      weakAgainst: ['Marauder', 'Zergling', 'Immortal', 'Siege Tank Crucio']
    },
    abilities: [
      {
        id: 'blink',
        name: 'Traslación (Blink)',
        hotkey: 'B',
        icon: '🌌',
        iconImg: '/icons/train_stalker.png',
        description: "Teletransporta instantáneamente al Acechador a una distancia corta cruzando acantilados y barreras defensivas.",
        cooldown: 8,
        animationTrigger: 'blink',
        soundType: 'teleport',
        vfx: 'teleport'
      }
    ],
    modelConfig: {
      meshType: 'stalker',
      glbPath: '/models/stalker.glb',
      texturePath: '/models/stalker_diffuse.png',
      primaryColor: '#0284c7',
      secondaryColor: '#0f172a',
      glowColor: '#38bdf8',
      scale: 1.25,
      yOffset: 0.15
    }
  },
  {
    id: 'colossus',
    name: 'Coloso de Aiur (Colossus)',
    title: 'Andador de Asedio de Cuatro Patas',
    race: 'protoss',
    category: 'units',
    tier: 3,
    role: 'Aniquilación Masiva Terrestre / Láser Termal',
    attributeTypes: ['Mecánico', 'Blindado', 'Masivo'],
    quote: "*Zumbido ominoso de reactores de haz termal*",
    quotes: [
      "*Zumbido ominoso de reactores de haz termal*",
      "*Paso titánico sobre acantilados*",
      "*Focalización de lentes de plasma gemelos*"
    ],
    portraitPath: '/portraits/colossus.jpg',
    audioClips: [
      '/sounds/marine_standin.mp3'
    ],
    backgroundScene: '/backgrounds/aiur_golden.jpg',
    description: "Titán bípedo ancestral que camina sobre elevaciones geográficas sin esfuerzo. Sus lanzas termales dobles barren franjas enteras de infantería enemiga convirtiéndola en ceniza.",
    lore: "Creados durante la era de la discordia y sellados por el Cónclave debido a su destructividad excesiva, los Colosos fueron desenterrados nuevamente cuando el Enjambre amenazó con extinguir la raza.",
    stats: {
      hp: 200,
      shields: 150,
      armor: 1,
      speed: 3.15,
      sight: 10,
      damageGround: 30,
      damageAir: 0,
      attacksGround: true,
      attacksAir: false,
      range: 9,
      attackSpeed: 1.07
    },
    cost: {
      minerals: 300,
      vespene: 200,
      supply: 6,
      time: 54
    },
    counters: {
      strongAgainst: ['Marine', 'Zergling', 'Hydralisk', 'Zealot'],
      weakAgainst: ['Viking', 'Corruptor', 'Tempest', 'Carrier']
    },
    abilities: [
      {
        id: 'thermal_lance',
        name: 'Barrido de Lanza Térmica Extendido',
        hotkey: 'T',
        icon: '🔥',
        iconImg: '/icons/attack.png',
        description: "Emite un haz lineal continuado de calor estelar que incinera múltiples unidades a lo largo de 9 casillas.",
        animationTrigger: 'attack',
        soundType: 'laser',
        vfx: 'beam'
      }
    ],
    modelConfig: {
      meshType: 'colossus',
      glbPath: '/models/colossus.glb',
      texturePath: '/models/colossus_diffuse.png',
      primaryColor: '#eab308',
      secondaryColor: '#1e3a8a',
      glowColor: '#38bdf8',
      scale: 1.6,
      yOffset: 0.6
    }
  },
  {
    id: 'carrier',
    name: 'Nave Portanaves (Carrier)',
    title: 'Acorazado Capital de la Armada Dorada',
    race: 'protoss',
    category: 'units',
    tier: 3,
    role: 'Superioridad Aérea Estratégica / Enjambre de Interceptores',
    attributeTypes: ['Mecánico', 'Blindado', 'Masivo'],
    quote: "La Portanaves ha llegado.",
    quotes: [
      "La Portanaves ha llegado.",
      "Lanzando interceptores robóticos.",
      "Justicia para el Khala.",
      "El cielo pertenece a Aiur."
    ],
    portraitPath: '/portraits/carrier.jpg',
    audioClips: [
      '/sounds/marine_standin.mp3'
    ],
    backgroundScene: '/backgrounds/aiur_golden.jpg',
    description: "El buque insignia de la Armada Dorada. No dispara directamente, sino que fabrica y despliega hasta 8 interceptores no tripulados que saturan las defensas enemigas.",
    lore: "Un símbolo indiscutible de grandeza. Cuando una flota de Carriers desciende sobre la órbita de un planeta, el espectáculo de cientos de cazas solares tejiendo patrones de fuego es la última vista de los enemigos de Aiur.",
    stats: {
      hp: 300,
      shields: 150,
      armor: 2,
      speed: 2.62,
      sight: 12,
      damageGround: 8,
      damageAir: 8,
      attacksGround: true,
      attacksAir: true,
      range: 8,
      attackSpeed: 0.5
    },
    cost: {
      minerals: 350,
      vespene: 250,
      supply: 6,
      time: 64
    },
    counters: {
      strongAgainst: ['Mutalisk', 'Thor', 'Siege Tank Crucio', 'Roach'],
      weakAgainst: ['Corruptor', 'Viking', 'Tempest', 'Battlecruiser']
    },
    abilities: [
      {
        id: 'launch_interceptors',
        name: 'Lanzar Interceptores',
        hotkey: 'I',
        icon: '🛩️',
        iconImg: '/icons/attack.png',
        description: "Envía una nube de 8 cazas autónomos que rodean al objetivo y disparan láseres duales continuamente.",
        animationTrigger: 'attack',
        soundType: 'laser',
        vfx: 'beam'
      }
    ],
    modelConfig: {
      meshType: 'carrier',
      glbPath: '/models/immortal.glb',
      texturePath: '/models/immortal_diffuse.png',
      primaryColor: '#ca8a04',
      secondaryColor: '#172554',
      glowColor: '#67e8f9',
      scale: 1.55,
      yOffset: 0.4
    }
  },
  {
    id: 'pylon',
    name: 'Pilón Protoss (Pylon)',
    title: 'Nodo de Matriz Psiónica y Cristal Khaydarin',
    race: 'protoss',
    category: 'buildings',
    tier: 1,
    role: 'Suministro Energético / Teletransporte Warp-in',
    attributeTypes: ['Mecánico', 'Blindado', 'Estructura'],
    quote: "Debes construir pilones adicionales.",
    quotes: [
      "Debes construir pilones adicionales.",
      "Matriz psiónica estabilizada.",
      "Canalizando energía de la red de Aiur."
    ],
    portraitPath: '/portraits/probe.png',
    audioClips: [
      '/sounds/not_enough_minerals.wav'
    ],
    backgroundScene: '/backgrounds/aiur_golden.jpg',
    description: "Proyecta un campo de energía psiónica para alimentar edificios protoss y provee 8 puntos de suministro. Sirve como ancla dimensional para el teletransporte Warp de tropas.",
    lore: "Tallados con cristales Khaydarin puros y armonizados con la frecuencia del Khala, los Pilones tejen la red invisible que mantiene operando a toda la civilización Protoss.",
    stats: {
      hp: 200,
      shields: 200,
      armor: 1,
      speed: 0,
      sight: 9,
      attacksGround: false,
      attacksAir: false
    },
    cost: {
      minerals: 100,
      vespene: 0,
      supply: 0,
      time: 18
    },
    counters: {
      strongAgainst: [],
      weakAgainst: ['Zergling', 'Baneling', 'Reaper']
    },
    abilities: [
      {
        id: 'power_field',
        name: 'Campo de Energía Psiónica',
        hotkey: 'P',
        icon: '⚡',
        iconImg: '/icons/train_probe.png',
        description: "Suministra energía fotónica a todas las estructuras adyacentes y habilita la invocación Warp de guerreros.",
        animationTrigger: 'special',
        soundType: 'lightning',
        vfx: 'shield'
      }
    ],
    modelConfig: {
      meshType: 'nexus',
      glbPath: '/models/nexus.glb',
      texturePath: '/models/nexus_diffuse.png',
      primaryColor: '#eab308',
      secondaryColor: '#1e3a8a',
      glowColor: '#38bdf8',
      scale: 1.3,
      yOffset: 0.1
    }
  },
  {
    id: 'photon_cannon',
    name: 'Cañón de Fotones Protoss',
    title: 'Defensa Estática Automatizada de Plasma',
    race: 'protoss',
    category: 'buildings',
    tier: 1,
    role: 'Defensa Base Multipropósito / Detección',
    attributeTypes: ['Mecánico', 'Blindado', 'Estructura'],
    quote: "Cañón de fotones activado y en guardia.",
    quotes: [
      "Cañón de fotones activado y en guardia.",
      "Focalizando antimateria de plasma.",
      "Intruso detectado en el perímetro."
    ],
    portraitPath: '/portraits/zealot.png',
    audioClips: [
      '/sounds/marine_standin.mp3'
    ],
    backgroundScene: '/backgrounds/aiur_golden.jpg',
    description: "Plataforma defensiva automatizada de alta cadencia. Dispara orbes de plasma concentrado a tierra y aire, dotado de sensores detectores de unidades camufladas.",
    lore: "Alimentado por el campo psiónico de un pilón, el Cañón de Fotones es capaz de vaporizar tanto infantería blindada como enjambres aéreos antes de que alcancen el núcleo colonial.",
    stats: {
      hp: 150,
      shields: 150,
      armor: 1,
      speed: 0,
      sight: 11,
      damageGround: 20,
      damageAir: 20,
      attacksGround: true,
      attacksAir: true,
      range: 7,
      attackSpeed: 0.89
    },
    cost: {
      minerals: 150,
      vespene: 0,
      supply: 0,
      time: 29
    },
    counters: {
      strongAgainst: ['Mutalisk', 'Zergling', 'Marine', 'Banshee'],
      weakAgainst: ['Siege Tank Crucio', 'Swarm Host', 'Brood Lord', 'Colossus']
    },
    abilities: [
      {
        id: 'plasma_burst',
        name: 'Ráfaga de Fotones Concentrada',
        hotkey: 'A',
        icon: '💥',
        iconImg: '/icons/attack.png',
        description: "Dispara esferas de antimateria a objetivos aéreos o terrestres a gran velocidad.",
        animationTrigger: 'attack',
        soundType: 'laser',
        vfx: 'beam'
      }
    ],
    modelConfig: {
      meshType: 'assimilator',
      glbPath: '/models/assimilator.glb',
      texturePath: '/models/assimilator_diffuse.png',
      primaryColor: '#eab308',
      secondaryColor: '#1e3a8a',
      glowColor: '#38bdf8',
      scale: 1.25,
      yOffset: 0.1
    }
  },
  {
    id: 'artanis',
    name: 'Artanis',
    title: 'Jerarca de los Daelaam / Líder Supremo Protoss',
    race: 'protoss',
    category: 'heroes',
    tier: 4,
    role: 'Jerarca Supremo / Guerrero de Luz y Sombra',
    attributeTypes: ['Biológico', 'Blindado', 'Héroe'],
    quote: "¡Por Aiur, unidos venceremos!",
    quotes: [
      "¡Por Aiur, unidos venceremos!",
      "La lanza de Adun responderá a mi llamado.",
      "No descansaremos hasta que nuestro hogar sea libre.",
      "El honor es nuestro mayor escudo."
    ],
    portraitPath: '/portraits/artanis.jpg',
    audioClips: [
      '/sounds/marine_standin.mp3'
    ],
    backgroundScene: '/backgrounds/aiur_golden.jpg',
    description: "El joven líder que unió a los Templarios de Aiur y a los Nerazim en los Daelaam. Empuña la legendaria Lanza de Adun y dos cuchillas de luz solar y energía del Vacío.",
    lore: "Ascendido al rango de Jerarca en los momentos más oscuros de la historia Protoss, Artanis lideró la reconquista de Aiur, cortó su cordón neural para liberarse de Amon y salvó a su especie del olvido.",
    stats: {
      hp: 500,
      shields: 500,
      armor: 4,
      energy: 200,
      maxEnergy: 200,
      speed: 3.38,
      sight: 12,
      damageGround: 40,
      damageAir: 40,
      attacksGround: true,
      attacksAir: true,
      range: 2,
      attackSpeed: 0.55
    },
    cost: {
      minerals: 600,
      vespene: 400,
      supply: 6,
      time: 80
    },
    counters: {
      strongAgainst: ['Jim Raynor', 'Ultralisk', 'Thor', 'Colossus'],
      weakAgainst: ['Kerrigan Reina de Espadas', 'Amon']
    },
    abilities: [
      {
        id: 'orbital_strike',
        name: 'Ataque Orbital de la Lanza de Adun',
        hotkey: 'O',
        icon: '☀️',
        iconImg: '/icons/yamato_cannon.png',
        description: "Descarga 5 rayos solares abrasadores desde la órbita sobre las posiciones enemigas.",
        energyCost: 100,
        cooldown: 50,
        animationTrigger: 'special',
        soundType: 'laser',
        vfx: 'beam'
      }
    ],
    modelConfig: {
      meshType: 'artanis',
      glbPath: '/models/zealot.glb',
      texturePath: '/models/zealot_diffuse.png',
      primaryColor: '#facc15',
      secondaryColor: '#1e40af',
      glowColor: '#38bdf8',
      scale: 1.35,
      yOffset: 0.05
    }
  },
  {
    id: 'zeratul',
    name: 'Zeratul',
    title: 'Prelado Tétrico Nerazim / Profeta del Vacío',
    race: 'protoss',
    category: 'heroes',
    tier: 4,
    role: 'Asesino de las Sombras / Guerrero Psiónico Secreto',
    attributeTypes: ['Biológico', 'Psiónico', 'Héroe'],
    quote: "Viajo por las sombras para que otros vean la luz.",
    quotes: [
      "Viajo por las sombras para que otros vean la luz.",
      "Las profecías Xel'Naga deben cumplirse.",
      "Soy el viento frío de la noche.",
      "¡Por el Vacío!"
    ],
    portraitPath: '/portraits/zeratul.jpg',
    audioClips: [
      '/sounds/marine_standin.mp3'
    ],
    backgroundScene: '/backgrounds/aiur_golden.jpg',
    description: "El legendario guerrero Nerazim que descubrió la verdad sobre los híbridos y la profecía de Amon. Camuflado perpetuamente, ataca con su Warp Blade verde esmeralda.",
    lore: "Cargando con la culpa de la caída de Aiur, Zeratul vagó por las estrellas buscando respuestas sobre el destino del universo. Su sacrificio permitió a Artanis despertar y liderar la resistencia final.",
    stats: {
      hp: 300,
      shields: 250,
      armor: 3,
      energy: 150,
      maxEnergy: 150,
      speed: 3.75,
      sight: 12,
      damageGround: 85,
      damageAir: 0,
      attacksGround: true,
      attacksAir: false,
      range: 0.1,
      attackSpeed: 0.75
    },
    cost: {
      minerals: 450,
      vespene: 300,
      supply: 4,
      time: 60
    },
    counters: {
      strongAgainst: ['Ghost', 'Jim Raynor', 'Siege Tank Crucio', 'Hydralisk'],
      weakAgainst: ['Kerrigan Reina de Espadas', 'Detectores masivos']
    },
    abilities: [
      {
        id: 'shadow_strike',
        name: 'Golpe de las Sombras',
        hotkey: 'W',
        icon: '🗡️',
        iconImg: '/icons/train_darktemplar.png',
        description: "Se teleporta a la espalda del enemigo y asesta un golpe crítico instantáneo de 150 de daño.",
        energyCost: 50,
        cooldown: 8,
        animationTrigger: 'special',
        soundType: 'teleport',
        vfx: 'teleport'
      }
    ],
    modelConfig: {
      meshType: 'zeratul',
      glbPath: '/models/stalker.glb',
      texturePath: '/models/stalker_diffuse.png',
      primaryColor: '#0f172a',
      secondaryColor: '#059669',
      glowColor: '#10b981',
      scale: 1.25,
      yOffset: 0.05
    }
  }
];
