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
      weakAgainst: ['Siege Tank', 'Baneling', 'Colossus']
    },
    abilities: [
      {
        id: 'stimpack',
        name: 'Paquete de Estimulantes (Stimpack)',
        hotkey: 'T',
        icon: '💉',
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
        description: "Dispara ráfagas continuas de proyectiles de uranio empobrecido de 8 mm.",
        animationTrigger: 'attack',
        soundType: 'laser',
        vfx: 'beam'
      }
    ],
    modelConfig: {
      meshType: 'marine',
      primaryColor: '#2563eb', // Dominion Blue
      secondaryColor: '#475569',
      glowColor: '#38bdf8',
      scale: 1.0,
      yOffset: 0,
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
    description: "La joya de la artillería Terran. Capaz de patrullar en modo tanque y anclarse al suelo en modo asedio para desatar devastadores cañones de choque de plasma a distancias extremas.",
    lore: "El Crucio reemplazó al antiguo modelo Arclight tras la Guerra de Especies. Con un blindaje de torreta reforzado y una suspensión hidráulica estabilizada, este monstruo puede pulverizar regimientos enteros antes de que puedan divisarlo.",
    stats: {
      hp: 175,
      armor: 1,
      speed: 2.25,
      sight: 11,
      damageGround: 70, // Siege mode
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
      weakAgainst: ['Mutalisk', 'Immortal', 'Viper', 'Carrier']
    },
    abilities: [
      {
        id: 'siege_mode',
        name: 'Modo Asedio / Tanque',
        hotkey: 'E',
        icon: '🎯',
        description: "Ancla el tanque mecánicamente al terreno, desplegando el cañón de choque de 120 mm con un alcance colosal de 13 casillas y daño de área.",
        cooldown: 4,
        animationTrigger: 'siege',
        soundType: 'mechanical',
        vfx: 'burst'
      },
      {
        id: 'shock_cannon',
        name: 'Cañón de Choque Arclight',
        hotkey: 'F',
        icon: '💣',
        description: "Dispara un proyectil masivo de alto explosivo que destruye armaduras pesadas con daño de dispersión radial.",
        cooldown: 3,
        animationTrigger: 'attack',
        soundType: 'explosion',
        vfx: 'burst'
      }
    ],
    modelConfig: {
      meshType: 'siege_tank',
      primaryColor: '#334155',
      secondaryColor: '#f97316',
      glowColor: '#38bdf8',
      scale: 1.25,
      yOffset: 0.1,
      hasTurret: true,
      hasTreads: true,
      glowIntensity: 1.5
    }
  },
  {
    id: 'battlecruiser',
    name: 'Battlecruiser Behemoth',
    title: 'Crucero de Batalla Insignia',
    race: 'terran',
    category: 'units',
    tier: 3,
    role: 'Fortaleza Voladora Masiva',
    attributeTypes: ['Mecánico', 'Blindado', 'Masivo'],
    quote: "Crucero de batalla operativo.",
    quotes: [
      "Crucero de batalla operativo.",
      "Cañón Yamato cargado y calibrado.",
      "Todos los sistemas a plena potencia.",
      "¡Abandonar la nave? ¡Jamás!"
    ],
    description: "La nave capital indiscutible de las flotas del Dominio. Equipado con baterías láser automáticas, blindaje de titanio neosteel y el legendario cañón Yamato capaz de vaporizar bases enemigas.",
    lore: "Construidos en los astilleros orbitales de Korhal y Dylar, los cruceros de batalla son ciudades fortificadas voladoras. Durante la Segunda Gran Guerra, naves como el Hyperion lideraron la rebelión contra el Dominio de Mengsk.",
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
      strongAgainst: ['Mutalisk', 'Colossus', 'Carrier', 'Hydralisk'],
      weakAgainst: ['Corruptor', 'Void Ray', 'Tempest', 'Viking']
    },
    abilities: [
      {
        id: 'yamato_cannon',
        name: 'Cañón Yamato',
        hotkey: 'Y',
        icon: '⚡',
        description: "Concentra el núcleo de fusión magnético para disparar un haz de plasma superdenso que causa 300 de daño devastador instantáneo a cualquier objetivo.",
        energyCost: 100,
        cooldown: 71,
        animationTrigger: 'yamato',
        soundType: 'explosion',
        vfx: 'beam'
      },
      {
        id: 'tactical_jump',
        name: 'Salto Táctico Hiperespacial',
        hotkey: 'J',
        icon: '🌌',
        description: "Abre una fisura hiperespacial momentánea que teletransporta instantáneamente al crucero a cualquier punto del cuadrante.",
        cooldown: 60,
        animationTrigger: 'blink',
        soundType: 'teleport',
        vfx: 'teleport'
      }
    ],
    modelConfig: {
      meshType: 'battlecruiser',
      primaryColor: '#1e293b',
      secondaryColor: '#0284c7',
      glowColor: '#38bdf8',
      scale: 1.45,
      yOffset: 0.8,
      hasWings: true,
      glowIntensity: 2.0
    }
  },
  {
    id: 'ghost',
    name: 'Ghost',
    title: 'Agente Psiónico de Operaciones Negras',
    race: 'terran',
    category: 'units',
    tier: 3,
    role: 'Francotirador / Asesinato Psiónico',
    attributeTypes: ['Biológico', 'Psiónico'],
    quote: "Llegó el fantasma.",
    quotes: [
      "Llegó el fantasma.",
      "Nunca me verán venir.",
      "Lanzamiento nuclear detectado.",
      "Objetivo eliminado limpiamente."
    ],
    description: "Asesinos criados bajo condicionamiento neural del Dominio. Portan trajes de camuflaje hostil que los hacen invisibles a simple vista y rifles de francotirador C-10 con munición penetrante.",
    lore: "Los Fantasmas poseen un potencial psiónico de índice PI de 5 o superior. Fueron la fuerza clandestina más temida del Emperador Mengsk y produjeron leyendas como Nova Terra y la propia Sarah Kerrigan antes de su infestación.",
    stats: {
      hp: 100,
      armor: 0,
      energy: 200,
      maxEnergy: 200,
      speed: 2.25,
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
      strongAgainst: ['High Templar', 'Infestor', 'Zealot', 'Ultralisk'],
      weakAgainst: ['Stalker', 'Roach', 'Siege Tank']
    },
    abilities: [
      {
        id: 'nuke',
        name: 'Ataque Nuclear Táctico',
        hotkey: 'N',
        icon: '☢️',
        description: "Guía un misil termonuclear de 20 megatones desde el silo orbital hacia las coordenadas del objetivo. Provoca 300 (+200 a estructuras) de daño catastrófico.",
        cooldown: 20,
        animationTrigger: 'special',
        soundType: 'siren',
        vfx: 'burst'
      },
      {
        id: 'emp',
        name: 'Ronda de Pulso Electromagnético (EMP)',
        hotkey: 'E',
        icon: '⚡',
        description: "Dispara un proyectil que drena 100 de energía y 100 de escudos a todas las unidades en el área de impacto, además de desvelar unidades invisibles.",
        energyCost: 75,
        animationTrigger: 'attack',
        soundType: 'lightning',
        vfx: 'lightning'
      }
    ],
    modelConfig: {
      meshType: 'ghost',
      primaryColor: '#0f172a',
      secondaryColor: '#38bdf8',
      glowColor: '#ef4444', // Red sniper laser sight
      scale: 1.0,
      yOffset: 0,
      glowIntensity: 1.5
    }
  },

  // ==========================================
  // TERRAN - HEROES
  // ==========================================
  {
    id: 'jim_raynor',
    name: 'Jim Raynor',
    title: 'Comandante de los Incursores de Raynor',
    race: 'terran',
    category: 'heroes',
    tier: 4,
    role: 'Líder Revolucionario / Tirador Experto',
    attributeTypes: ['Biológico', 'Héroe', 'Ligero'],
    quote: "Este hombrecito acaba de empezar a pelear.",
    quotes: [
      "Este hombrecito acaba de empezar a pelear.",
      "¡Por el Hyperion!",
      "No dejamos a nadie atrás.",
      "Algún día Mengsk pagará por cada una de sus mentiras."
    ],
    description: "Ex-mariscal de Mar Sara y líder indiscutible de la resistencia rebelde. Lucha en primera línea portando su servoarmadura personalizada y un rifle Gauss modificado con mira de penetración.",
    lore: "Traicionado por Arcturus Mengsk y marcado por la pérdida de Sarah Kerrigan en Nueva Gettysburg, Jim Raynor se convirtió en el faro de esperanza para la humanidad frente a la tiranía del Dominio y el avance del Enjambre Zerg.",
    stats: {
      hp: 350,
      armor: 3,
      speed: 2.75,
      sight: 11,
      damageGround: 35,
      damageAir: 35,
      attacksGround: true,
      attacksAir: true,
      range: 7,
      attackSpeed: 0.65
    },
    cost: {
      minerals: 300,
      vespene: 100,
      supply: 4,
      time: 50
    },
    counters: {
      strongAgainst: ['Hydralisk', 'Zealot', 'Roach'],
      weakAgainst: ['Ultralisk', 'Immortal', 'Colossus']
    },
    abilities: [
      {
        id: 'hyperion_strike',
        name: 'Ataque Orbital Hyperion',
        hotkey: 'H',
        icon: '🚀',
        description: "Ordena al crucero de batalla Hyperion que descargue una andanada de cazas de combate y misiles balísticos guiados sobre el sector.",
        cooldown: 45,
        animationTrigger: 'special',
        soundType: 'explosion',
        vfx: 'beam'
      },
      {
        id: 'inspire',
        name: 'Inspiración de Combate',
        hotkey: 'I',
        icon: '🛡️',
        description: "Aumenta la cadencia de fuego y la velocidad de movimiento de todas las tropas aliadas cercanas un 30% durante 15 segundos.",
        cooldown: 25,
        animationTrigger: 'stim',
        soundType: 'stim',
        vfx: 'sparks'
      }
    ],
    modelConfig: {
      meshType: 'raynor',
      primaryColor: '#1e3a8a',
      secondaryColor: '#d97706',
      glowColor: '#60a5fa',
      scale: 1.15,
      yOffset: 0,
      glowIntensity: 1.8
    }
  },
  {
    id: 'tychus',
    name: 'Tychus Findlay',
    title: 'Convencido y Armado hasta los Dientes',
    race: 'terran',
    category: 'heroes',
    tier: 4,
    role: 'Furia Acribilladora Pesada',
    attributeTypes: ['Biológico', 'Héroe', 'Blindado'],
    quote: "Ya era maldita hora.",
    quotes: [
      "Ya era maldita hora.",
      "Si sangra, podemos convertirlo en carne picada.",
      "¡Abre paso a la vieja confiable!",
      "Trato hecho, Jimmy."
    ],
    description: "Mercenario convicto atrapado en una servoarmadura presurizada de la que no puede salir. Porta una minigun rotativa de varios cañones capaz de picar metal y carne en segundos.",
    lore: "Viejo camarada de Raynor en los Diablos del Cielo. Condenado a criogenia perpetua, Mengsk le ofreció su libertad a cambio de una misión secreta: matar a la Reina de Espadas en el planeta Char.",
    stats: {
      hp: 500,
      armor: 2,
      speed: 2.25,
      sight: 10,
      damageGround: 40,
      damageAir: 25,
      attacksGround: true,
      attacksAir: true,
      range: 6,
      attackSpeed: 0.35
    },
    cost: {
      minerals: 350,
      vespene: 150,
      supply: 4,
      time: 55
    },
    counters: {
      strongAgainst: ['Zergling', 'Zealot', 'Roach'],
      weakAgainst: ['Siege Tank', 'High Templar', 'Lurker']
    },
    abilities: [
      {
        id: 'grenade',
        name: 'Granada de Fragmentación Trituradora',
        hotkey: 'G',
        icon: '💣',
        description: "Lanza una granada masiva que repele enemigos y causa 150 de daño explosivo en el radio de impacto.",
        cooldown: 12,
        animationTrigger: 'attack',
        soundType: 'explosion',
        vfx: 'burst'
      },
      {
        id: 'odin_call',
        name: 'Despliegue del Mecha Odín',
        hotkey: 'O',
        icon: '🤖',
        description: "Llama desde la órbita al mecha prototipo Odín, aumentando su blindaje y dotándolo de cañones nucleares dobles.",
        cooldown: 80,
        animationTrigger: 'special',
        soundType: 'mechanical',
        vfx: 'sparks'
      }
    ],
    modelConfig: {
      meshType: 'tychus',
      primaryColor: '#0f766e',
      secondaryColor: '#b45309',
      glowColor: '#2dd4bf',
      scale: 1.25,
      yOffset: 0,
      glowIntensity: 1.6
    }
  },

  // ==========================================
  // TERRAN - BUILDINGS
  // ==========================================
  {
    id: 'command_center',
    name: 'Command Center',
    title: 'Centro de Mando Móvil',
    race: 'terran',
    category: 'buildings',
    tier: 1,
    role: 'Extracción de Recursos / Base Operativa',
    attributeTypes: ['Estructura', 'Blindado', 'Mecánico'],
    quote: "Centro de mando listo para recibir órdenes.",
    quotes: [
      "Centro de mando listo para recibir órdenes.",
      "Motores de despegue encendidos.",
      "Descarga de minerales procesada.",
      "Base en peligro, solicitando refuerzos."
    ],
    description: "El epicentro de cualquier colonia o expedición minera Terran. Entrena VCEs, procesa minerales y gas vespeno, y posee potentes propulsores térmicos que le permiten despegar y reubicarse en nuevos yacimientos.",
    lore: "Fabricados con aleaciones estándar de las corporaciones confederadas, estos cuarteles generales modulares pueden ser actualizados a Fortaleza Planetaria o Mando Orbital.",
    stats: {
      hp: 1500,
      armor: 1,
      speed: 0.94, // when flying
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
      weakAgainst: ['Mutalisk', 'Siege Tank', 'Void Ray']
    },
    abilities: [
      {
        id: 'lift_off',
        name: 'Despegue / Aterrizaje Atmosférico',
        hotkey: 'L',
        icon: '🛫',
        description: "Enciende los retropropulsores ventrales para elevar el edificio por los cielos, evitando ataques terrestres y permitiendo reubicación sobre riscos o expansiones.",
        cooldown: 5,
        animationTrigger: 'transform',
        soundType: 'engine',
        vfx: 'sparks'
      },
      {
        id: 'calldown_mule',
        name: 'Lanzamiento de MULA Minera',
        hotkey: 'E',
        icon: '🤖',
        description: "Envía una cápsula con un robot MULA automatizado desde la órbita que extrae minerales a velocidad cuádruple durante 64 segundos.",
        energyCost: 50,
        animationTrigger: 'special',
        soundType: 'mechanical',
        vfx: 'burst'
      }
    ],
    modelConfig: {
      meshType: 'command_center',
      primaryColor: '#334155',
      secondaryColor: '#f59e0b',
      glowColor: '#38bdf8',
      scale: 1.5,
      yOffset: 0.4,
      glowIntensity: 1.4
    }
  },

  // ==========================================
  // ZERG - UNITS
  // ==========================================
  {
    id: 'zergling',
    name: 'Zergling',
    title: 'Engendro Depredador del Enjambre',
    race: 'zerg',
    category: 'units',
    tier: 1,
    role: 'Enjambre Masivo / Hostigamiento',
    attributeTypes: ['Biológico', 'Ligero'],
    quote: "*Gruñidos feroces y chasquidos de mandíbulas quitinosas*",
    quotes: [
      "*Chasquidos de garras sobre el metal*",
      "*Siseo visceral de adrenalina*",
      "*Chillido del Enjambre hambriento*"
    ],
    description: "La forma de vida más rápida y numerosa del Enjambre. Nacen de dos en dos desde una sola larva. Armados con garras afiladas con hojas de diamante capaces de despedazar el blindaje de aleación.",
    lore: "Asimilados de los dóciles carnívoros 'Dune-Runners' de Zz'gash, el ADN del zergling fue hipermutado por el Supercerebro para convertirlos en la fuerza de asalto de choque definitiva del cosmos.",
    stats: {
      hp: 35,
      armor: 0,
      speed: 4.13, // Fast creep
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
      supply: 0.5,
      time: 17
    },
    counters: {
      strongAgainst: ['Stalker', 'Marauder', 'Siege Tank (sin modo)'],
      weakAgainst: ['Colossus', 'Baneling', 'Hellion', 'Zealot']
    },
    abilities: [
      {
        id: 'adrenal_frenzy',
        name: 'Glándulas Suprarrenales Hiperactivas',
        hotkey: 'Z',
        icon: '⚡',
        description: "Sobrecarga el sistema hormonal del zergling, acelerando su velocidad de desgarro con las garras un 43%.",
        cooldown: 8,
        animationTrigger: 'attack',
        soundType: 'bio',
        vfx: 'burst'
      },
      {
        id: 'burrow',
        name: 'Enterrarse (Burrow)',
        hotkey: 'R',
        icon: '🕳️',
        description: "Se entierra bajo la superficie del suelo, volviéndose invisible y regenerando salud rápidamente hasta desenterrarse para una emboscada.",
        cooldown: 2,
        animationTrigger: 'burrow',
        soundType: 'bio',
        vfx: 'cloud'
      }
    ],
    modelConfig: {
      meshType: 'zergling',
      primaryColor: '#7e22ce',
      secondaryColor: '#831843',
      glowColor: '#a855f7',
      scale: 0.85,
      yOffset: -0.1,
      glowIntensity: 1.2
    }
  },
  {
    id: 'hydralisk',
    name: 'Hydralisk',
    title: 'Guerrero Espinoso del Enjambre',
    race: 'zerg',
    category: 'units',
    tier: 2,
    role: 'Tirador de Largo Alcance Antiaéreo/Terrestre',
    attributeTypes: ['Biológico', 'Ligero'],
    quote: "*Siseo venenoso y percusión de placas dérmicas*",
    quotes: [
      "*Siseo gutural profundo*",
      "*Chasquido de espinas dorsales*",
      "*Rugido territorial amenazante*"
    ],
    description: "Un imponente organismo ofidio cubierto de placas de quitina acorazada. Dispara miles de espinas densas y afiladas por presión muscular que atraviesan blindajes de tanques y alas de cazas aéreos.",
    lore: "Originalmente pacíficos herbívoros llamados Slothiens. Tras ser mutados genéticamente por el Enjambre, se convirtieron en uno de los cazadores más letales y versátiles de toda la galaxia.",
    stats: {
      hp: 90,
      armor: 0,
      speed: 2.81,
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
      strongAgainst: ['Mutalisk', 'Void Ray', 'Banshee', 'Immortal'],
      weakAgainst: ['Siege Tank', 'Colossus', 'Storm', 'Baneling']
    },
    abilities: [
      {
        id: 'grooved_spines',
        name: 'Andanada de Espinas Acanaladas',
        hotkey: 'A',
        icon: '🏹',
        description: "Contrae los sacos musculares de la espalda para disparar una salva de proyectiles de queratina de alta penetración.",
        animationTrigger: 'attack',
        soundType: 'bio',
        vfx: 'sparks'
      },
      {
        id: 'morph_lurker',
        name: 'Mutar en Acechador (Lurker)',
        hotkey: 'L',
        icon: '🦂',
        description: "El Hydralisk se envuelve en una crisálida biológica para emerger como un temible Acechador con espinas subterráneas.",
        cooldown: 25,
        animationTrigger: 'transform',
        soundType: 'bio',
        vfx: 'cloud'
      }
    ],
    modelConfig: {
      meshType: 'hydralisk',
      primaryColor: '#6b21a8',
      secondaryColor: '#f59e0b',
      glowColor: '#e11d48',
      scale: 1.15,
      yOffset: 0.1,
      glowIntensity: 1.5
    }
  },
  {
    id: 'ultralisk',
    name: 'Ultralisk',
    title: 'Monstruosidad Masiva de Ruptura',
    race: 'zerg',
    category: 'units',
    tier: 3,
    role: 'Tanque Biológico Terrestre Devastador',
    attributeTypes: ['Biológico', 'Blindado', 'Masivo'],
    quote: "*Rugido titánico que hace temblar la corteza planetaria*",
    quotes: [
      "*Rugido titánico estremecedor*",
      "*Impacto de colmillos Kaiser contra el suelo*",
      "*Avance implacable de toneladas de quitina*"
    ],
    description: "El ápice de la evolución terrestre del Enjambre. Un coloso acorazado con dos pares de cuchillas Kaiser de mono-moléculas capaces de cercenar mechas y tanques de un solo tajo.",
    lore: "Nacidos de los pacíficos herbívoros Brontolith, los ultraliscos poseen un exoesqueleto tan denso que rechaza fuego de artillería pesada y se regenera constantemente en el campo de batalla.",
    stats: {
      hp: 500,
      armor: 2, // Up to 6+
      speed: 4.13,
      sight: 9,
      damageGround: 35, // Cleave AoE
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
      strongAgainst: ['Marine', 'Stalker', 'Hydralisk', 'Zealot'],
      weakAgainst: ['Immortal', 'Ghost', 'Liberator', 'Void Ray']
    },
    abilities: [
      {
        id: 'kaiser_cleave',
        name: 'Hojas Kaiser Hendidoras',
        hotkey: 'K',
        icon: '⚔️',
        description: "Blandir las cuatro espadas de hueso en un arco de 180 grados, despedazando a todas las unidades enemigas en un área frontal masiva.",
        cooldown: 5,
        animationTrigger: 'attack',
        soundType: 'bio',
        vfx: 'burst'
      },
      {
        id: 'burrow_charge',
        name: 'Carga de Embate Subterránea',
        hotkey: 'C',
        icon: '💥',
        description: "Se sumerge bajo tierra y embiste violentamente a gran velocidad hacia la formación enemiga, levantándolos por los aires.",
        cooldown: 20,
        animationTrigger: 'charge',
        soundType: 'bio',
        vfx: 'burst'
      }
    ],
    modelConfig: {
      meshType: 'ultralisk',
      primaryColor: '#581c87',
      secondaryColor: '#991b1b',
      glowColor: '#ec4899',
      scale: 1.6,
      yOffset: 0.2,
      glowIntensity: 1.8
    }
  },

  // ==========================================
  // ZERG - HEROES
  // ==========================================
  {
    id: 'kerrigan_queen',
    name: 'Sarah Kerrigan',
    title: 'La Reina de Espadas / Reina Primigenia',
    race: 'zerg',
    category: 'heroes',
    tier: 4,
    role: 'Monarca del Enjambre / Deidad Psiónica',
    attributeTypes: ['Biológico', 'Psiónico', 'Héroe'],
    quote: "Yo soy el Enjambre. Los ejércitos caerán, los mundos arderán.",
    quotes: [
      "Yo soy el Enjambre. Los ejércitos caerán, los mundos arderán.",
      "Mi venganza es inevitable.",
      "El poder que corre por mis venas desafía a los mismos dioses.",
      "Siente la furia de mil millones de criaturas."
    ],
    description: "Antigua fantasma terran capturada y transmutada en el planeta Char por el Supercerebro. Tras su transformación en Zerus en la Reina Primigenia, sus poderes psiónicos rivalizan con los de los Xel'Naga.",
    lore: "Kerrigan es la figura más temida del universo conocido. Con alas óseas letales y tormentas psiónicas de energía púrpura, doblegó tanto al Dominio de Mengsk como a las flotas de Amon para salvar la galaxia.",
    stats: {
      hp: 1000,
      armor: 3,
      energy: 250,
      maxEnergy: 250,
      speed: 3.5,
      sight: 12,
      damageGround: 60,
      damageAir: 60,
      attacksGround: true,
      attacksAir: true,
      range: 6,
      attackSpeed: 0.75
    },
    cost: {
      minerals: 500,
      vespene: 300,
      supply: 6,
      time: 60
    },
    counters: {
      strongAgainst: ['Marine', 'Hydralisk', 'Stalker', 'Thor'],
      weakAgainst: ['Colossus', 'Tempest', 'Battlecruiser']
    },
    abilities: [
      {
        id: 'kinetic_blast',
        name: 'Explosión Cinética Psiónica',
        hotkey: 'Q',
        icon: '💥',
        description: "Canaliza un rayo de choque de energía psiónica pura concentrada que causa 300 de daño letal a un solo objetivo a distancia extrema.",
        energyCost: 50,
        cooldown: 8,
        animationTrigger: 'special',
        soundType: 'lightning',
        vfx: 'beam'
      },
      {
        id: 'psionic_shift',
        name: 'Desplazamiento Psiónico Sombrío',
        hotkey: 'W',
        icon: '🌪️',
        description: "Se propulsa a través de las líneas enemigas con sus alas de hueso envueltas en llamas violetas, dañando a todos los enemigos en su trayectoria.",
        energyCost: 50,
        cooldown: 10,
        animationTrigger: 'attack',
        soundType: 'bio',
        vfx: 'burst'
      },
      {
        id: 'apocalypse',
        name: 'Apocalipsis del Enjambre',
        hotkey: 'R',
        icon: '🌋',
        description: "Desata una detonación psíquica apocalíptica que arrasa toda la zona con 500 de daño masivo continuo.",
        energyCost: 100,
        cooldown: 90,
        animationTrigger: 'storm',
        soundType: 'explosion',
        vfx: 'lightning'
      }
    ],
    modelConfig: {
      meshType: 'kerrigan_queen',
      primaryColor: '#3b0764',
      secondaryColor: '#be185d',
      glowColor: '#c084fc',
      scale: 1.25,
      yOffset: 0.1,
      hasWings: true,
      glowIntensity: 2.2
    }
  },
  {
    id: 'abathur',
    name: 'Abathur',
    title: 'Maestro de la Evolución',
    race: 'zerg',
    category: 'heroes',
    tier: 4,
    role: 'Ingeniero Genético / Asimilador de ADN',
    attributeTypes: ['Biológico', 'Héroe'],
    quote: "Secuencias de ADN imperfectas. Requieren optimización.",
    quotes: [
      "Secuencias de ADN imperfectas. Requieren optimización.",
      "Girar hebras. Mejorar quitina. Más dientes.",
      "Sin desperdicio. Todo organismo consumido sirve al Enjambre.",
      "Evolución nunca termina."
    ],
    description: "El genio biológico detrás de cada mutación del Enjambre. Diseñado por el Supercerebro para manipular hebras de ADN y asimilar rasgos ventajosos de todas las especies del cosmos.",
    lore: "Abathur habita en el pozo de evolución del Leviatán. Habla en frases fragmentadas y precisas, guiado por una obsesión implacable hacia la pureza genética y la eficiencia de matar.",
    stats: {
      hp: 600,
      armor: 2,
      energy: 200,
      maxEnergy: 200,
      speed: 2.0,
      sight: 11,
      damageGround: 25,
      damageAir: 0,
      attacksGround: true,
      attacksAir: false,
      range: 5,
      attackSpeed: 1.2
    },
    cost: {
      minerals: 350,
      vespene: 200,
      supply: 4,
      time: 50
    },
    counters: {
      strongAgainst: ['Infestor', 'High Templar'],
      weakAgainst: ['Siege Tank', 'Carrier']
    },
    abilities: [
      {
        id: 'toxic_nest',
        name: 'Nido Tóxico Venenoso',
        hotkey: 'T',
        icon: '☣️',
        description: "Coloca una trampa biológica subterránea que estalla en humo ácido al paso del enemigo, reduciendo su armadura y ralentizándolo.",
        energyCost: 25,
        animationTrigger: 'special',
        soundType: 'bio',
        vfx: 'cloud'
      },
      {
        id: 'biomass_evolution',
        name: 'Asimilación de Biomasa',
        hotkey: 'B',
        icon: '🧬',
        description: "Recolecta biomasa residual de caídos para mutar instantáneamente a las tropas aliadas con escamas más gruesas y regeneración.",
        cooldown: 30,
        animationTrigger: 'stim',
        soundType: 'bio',
        vfx: 'sparks'
      }
    ],
    modelConfig: {
      meshType: 'abathur',
      primaryColor: '#365314',
      secondaryColor: '#14532d',
      glowColor: '#84cc16',
      scale: 1.3,
      yOffset: 0.1,
      glowIntensity: 1.7
    }
  },

  // ==========================================
  // ZERG - BUILDINGS
  // ==========================================
  {
    id: 'hatchery',
    name: 'Criadero (Hatchery)',
    title: 'Nido Central y Productor de Larvas',
    race: 'zerg',
    category: 'buildings',
    tier: 1,
    role: 'Engendrador Principal / Expansor de Biomateria',
    attributeTypes: ['Estructura', 'Biológico', 'Blindado'],
    quote: "*Pulsaciones orgánicas del corazón de la colmena*",
    quotes: [
      "*Latidos sordos de arterias gigantes*",
      "*Exudación de biomateria viviente*",
      "*Siseo de larvas recién nacidas*"
    ],
    description: "El organismo corazón de cualquier base Zerg. Genera biomateria viviente sobre la cual crecen las estructuras y produce larvas constantes que mutan en cualquier unidad del Enjambre.",
    lore: "Los criaderos están vivos; respiran, sangran y se curan por sí mismos. Conforme la colonia acumula nutrientes, el criadero puede mutar en Guarida (Lair) y posteriormente en Colmena (Hive).",
    stats: {
      hp: 1500,
      armor: 1,
      speed: 0,
      sight: 10,
      attacksGround: false,
      attacksAir: false
    },
    cost: {
      minerals: 300,
      vespene: 0,
      supply: 0,
      time: 71
    },
    counters: {
      strongAgainst: [],
      weakAgainst: ['Siege Tank', 'Battlecruiser', 'Carrier']
    },
    abilities: [
      {
        id: 'inject_larva',
        name: 'Inyectar Larvas Nutricionales',
        hotkey: 'V',
        icon: '🐛',
        description: "Inyecta un fluido celular de Reina que genera 3 larvas adicionales en 29 segundos.",
        cooldown: 29,
        animationTrigger: 'special',
        soundType: 'bio',
        vfx: 'sparks'
      },
      {
        id: 'mutate_lair',
        name: 'Mutar en Guarida (Lair)',
        hotkey: 'L',
        icon: '🏰',
        description: "Engrosa las paredes orgánicas y desbloquea el acceso a tecnologías de nivel 2.",
        cooldown: 57,
        animationTrigger: 'transform',
        soundType: 'bio',
        vfx: 'cloud'
      }
    ],
    modelConfig: {
      meshType: 'hatchery',
      primaryColor: '#4a044e',
      secondaryColor: '#831843',
      glowColor: '#d946ef',
      scale: 1.5,
      yOffset: 0.3,
      glowIntensity: 1.6
    }
  },

  // ==========================================
  // PROTOSS - UNITS
  // ==========================================
  {
    id: 'zealot',
    name: 'Zealot',
    title: 'Guerrero Templario de Aiur',
    race: 'protoss',
    category: 'units',
    tier: 1,
    role: 'Vanguardia de Asalto Cuerpo a Cuerpo',
    attributeTypes: ['Biológico', 'Ligero', 'Psiónico'],
    quote: "¡Mi vida por Aiur!",
    quotes: [
      "¡Mi vida por Aiur!",
      "El honor me guía.",
      "¡Que el Khala purifique sus almas!",
      "Luchamos hasta el final."
    ],
    description: "Guerreros veteranos imbuidos de la energía del Khala. Equipados con exoesqueletos ceremoniales dorados y brazaletes de enfoque que canalizan su poder psiónico en filos gemelos de energía pura.",
    lore: "Los fanáticos de la orden Templaria han dedicado siglos enteros a la meditación bélica. Cuando desatan la habilidad de Carga, acortan distancias a velocidades sobrehumanas para cercenar a los enemigos de la Primera Dinastía.",
    stats: {
      hp: 100,
      shields: 50,
      armor: 1,
      speed: 3.15,
      sight: 9,
      damageGround: 16, // 8 x 2
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
      strongAgainst: ['Zergling', 'Marauder', 'Immortal'],
      weakAgainst: ['Roach', 'Hellion', 'Colossus', 'Baneling']
    },
    abilities: [
      {
        id: 'charge',
        name: 'Carga Psiónica de Asalto',
        hotkey: 'C',
        icon: '⚡',
        description: "Se propulsa hacia el enemigo a velocidad hipersónica con un estallido psíquico que inflige un golpe inicial demoledor.",
        cooldown: 7,
        animationTrigger: 'charge',
        soundType: 'teleport',
        vfx: 'beam'
      },
      {
        id: 'psi_blades',
        name: 'Corte de Hojas Psiónicas',
        hotkey: 'A',
        icon: '⚔️',
        description: "Descarga dos tajos cruzados de plasma psiónico puro que atraviesan escudos y carne viva.",
        animationTrigger: 'attack',
        soundType: 'laser',
        vfx: 'beam'
      }
    ],
    modelConfig: {
      meshType: 'zealot',
      primaryColor: '#ca8a04',
      secondaryColor: '#0284c7',
      glowColor: '#38bdf8',
      scale: 1.05,
      yOffset: 0,
      glowIntensity: 1.7
    }
  },
  {
    id: 'stalker',
    name: 'Stalker',
    title: 'Caminante Cibernético Nerazim',
    race: 'protoss',
    category: 'units',
    tier: 2,
    role: 'Hostigamiento Táctico / Teletransporte Corto',
    attributeTypes: ['Mecánico', 'Blindado', 'Psiónico'],
    quote: "Servimos desde las sombras.",
    quotes: [
      "Servimos desde las sombras.",
      "El Vacío me concede movimiento.",
      "Frío y certero.",
      "Destino alcanzado."
    ],
    description: "Máquinas cuadrúpedas tripuladas por la esencia sombría de los guerreros Nerazim (Templarios Tétricos). Disparan haces de partículas concentradas y dominan el arte del parpadeo dimensional.",
    lore: "Inspirados en los antiguos Dragones de Aiur, los Nerazim diseñaron el Stalker para operar en sigilo y golpear las retaguardias enemigas antes de desaparecer sin dejar rastro en el Vacío.",
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
      attackSpeed: 1.03
    },
    cost: {
      minerals: 125,
      vespene: 50,
      supply: 2,
      time: 30
    },
    counters: {
      strongAgainst: ['Roach', 'Mutalisk', 'Reaper'],
      weakAgainst: ['Immortal', 'Marauder', 'Zergling']
    },
    abilities: [
      {
        id: 'blink',
        name: 'Parpadeo Dimensional (Blink)',
        hotkey: 'B',
        icon: '🌀',
        description: "Se desmaterializa instantáneamente para reaparecer en cualquier posición visible a hasta 8 casillas de distancia, subiendo o bajando riscos.",
        cooldown: 14,
        animationTrigger: 'blink',
        soundType: 'teleport',
        vfx: 'teleport'
      },
      {
        id: 'particle_disrupter',
        name: 'Disruptor de Partículas del Vacío',
        hotkey: 'A',
        icon: '✨',
        description: "Dispara un rayo de plasma cargado eficaz tanto contra amenazas terrestres como cazas aéreos.",
        animationTrigger: 'attack',
        soundType: 'laser',
        vfx: 'beam'
      }
    ],
    modelConfig: {
      meshType: 'stalker',
      primaryColor: '#334155',
      secondaryColor: '#047857',
      glowColor: '#34d399',
      scale: 1.15,
      yOffset: 0.1,
      hasTurret: true,
      glowIntensity: 1.9
    }
  },
  {
    id: 'high_templar',
    name: 'High Templar',
    title: 'Maestro de las Tormentas Psiónicas',
    race: 'protoss',
    category: 'units',
    tier: 3,
    role: 'Lanzador Psiónico de Área / Manipulador de Energía',
    attributeTypes: ['Biológico', 'Psiónico', 'Ligero'],
    quote: "Sentimos tu presencia.",
    quotes: [
      "Sentimos tu presencia.",
      "El Khala es infinito.",
      "¡Que el relámpago de Aiur caiga sobre ti!",
      "Dos mentes se volverán una."
    ],
    description: "Los pensadores y místicos más veteranos de la casta Templaria. Flotan levitando sobre el suelo y pueden convocar una tormenta de relámpagos psiónicos que incinera ejércitos enteros.",
    lore: "Capaces de sentir las fluctuaciones mentales a años luz de distancia. En situaciones extremas, dos Templarios pueden sacrificar su individualidad física para fusionarse en un colosal Arconte de pura energía psíquica.",
    stats: {
      hp: 40,
      shields: 40,
      armor: 0,
      energy: 200,
      maxEnergy: 200,
      speed: 2.62,
      sight: 10,
      damageGround: 4,
      damageAir: 0,
      attacksGround: true,
      attacksAir: false,
      range: 6,
      attackSpeed: 1.14
    },
    cost: {
      minerals: 50,
      vespene: 150,
      supply: 2,
      time: 39
    },
    counters: {
      strongAgainst: ['Marine', 'Hydralisk', 'Zergling', 'Mutalisk'],
      weakAgainst: ['Ghost (EMP)', 'Colossus', 'Stalker']
    },
    abilities: [
      {
        id: 'psionic_storm',
        name: 'Tormenta Psiónica (Psi Storm)',
        hotkey: 'T',
        icon: '🌩️',
        description: "Desata un torbellino eléctrico de energía pura que inflige 80 de daño continuo a todas las unidades enemigas en el área a lo largo de 3 segundos.",
        energyCost: 75,
        animationTrigger: 'storm',
        soundType: 'lightning',
        vfx: 'lightning'
      },
      {
        id: 'feedback',
        name: 'Retroalimentación (Feedback)',
        hotkey: 'F',
        icon: '⚡',
        description: "Drena instantáneamente toda la energía de un taumaturgo o nave enemiga, infligiéndole daño directo proporcional a la energía consumida.",
        energyCost: 50,
        animationTrigger: 'attack',
        soundType: 'lightning',
        vfx: 'beam'
      },
      {
        id: 'archon_merge',
        name: 'Fusión de Arconte',
        hotkey: 'C',
        icon: '🔥',
        description: "Dos templarios combinan sus almas en un vórtice llameante para reencarnar en un Arconte devastador.",
        cooldown: 12,
        animationTrigger: 'transform',
        soundType: 'teleport',
        vfx: 'burst'
      }
    ],
    modelConfig: {
      meshType: 'high_templar',
      primaryColor: '#b45309',
      secondaryColor: '#3b82f6',
      glowColor: '#60a5fa',
      scale: 1.05,
      yOffset: 0.15,
      glowIntensity: 2.0
    }
  },
  {
    id: 'colossus',
    name: 'Colossus',
    title: 'Andador de Guerra Purificador',
    race: 'protoss',
    category: 'units',
    tier: 3,
    role: 'Destructor Antimasas Terrestre',
    attributeTypes: ['Mecánico', 'Blindado', 'Masivo'],
    quote: "*Zumbido de armónicos psiónicos resonando en frecuencia ultra baja*",
    quotes: [
      "*Zumbido de armónicos psiónicos*",
      "*Focalización de lentes de calor térmico*",
      "*Paso titánico sobre el acantilado*"
    ],
    description: "Un coloso robótico con cuatro patas estilizadas tan altas que puede subir y bajar riscos sin esfuerzo. Barre el campo de batalla con dos haces de calor térmico superconcentrados que vaporizan infantería en masa.",
    lore: "Construidos originalmente durante la era de la Discordia para purificar civilizaciones rebeldes, fueron prohibidos por el Cónclave debido a su brutal poder letal, y reactivados solo cuando el Enjambre amenazó con extinguir a Aiur.",
    stats: {
      hp: 200,
      shields: 150,
      armor: 1,
      speed: 3.15,
      sight: 10,
      damageGround: 30, // Sweeping dual laser
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
      weakAgainst: ['Corruptor', 'Viking', 'Viper', 'Immortal']
    },
    abilities: [
      {
        id: 'thermal_lance',
        name: 'Lanza Térmica Extendida',
        hotkey: 'L',
        icon: '🔥',
        description: "Dispara dos rayos láser incandescentes paralelos que barren en arco horizontal, quemando una hilera completa de tropas terrestres.",
        animationTrigger: 'attack',
        soundType: 'laser',
        vfx: 'beam'
      },
      {
        id: 'cliff_walk',
        name: 'Zancada Escarpada (Cliff Walk)',
        hotkey: 'W',
        icon: '🧗',
        description: "Sus cuatro extremidades articuladas le permiten ignorar desniveles topográficos y caminar sobre cualquier acantilado.",
        cooldown: 0,
        animationTrigger: 'special',
        soundType: 'mechanical',
        vfx: 'sparks'
      }
    ],
    modelConfig: {
      meshType: 'colossus',
      primaryColor: '#eab308',
      secondaryColor: '#0369a1',
      glowColor: '#38bdf8',
      scale: 1.5,
      yOffset: 0.5,
      glowIntensity: 2.1
    }
  },
  {
    id: 'carrier',
    name: 'Carrier',
    title: 'Nave Nodriza de Cazas Interceptores',
    race: 'protoss',
    category: 'units',
    tier: 3,
    role: 'Nave Capital de Despliegue Aéreo',
    attributeTypes: ['Mecánico', 'Blindado', 'Masivo'],
    quote: "Llegó el portanaves.",
    quotes: [
      "Llegó el portanaves.",
      "Lanzad a los interceptores.",
      "Justicia desde los cielos.",
      "Por la gloria de la flota."
    ],
    description: "El orgullo de la Gran Flota Protoss. Una nave capital masiva que no ataca directamente, sino que despliega enjambres de hasta 8 cazas interceptores automatizados ultrarrápidos que asedian al enemigo.",
    lore: "Equipado con bahías de ensamblaje en tiempo real, un solo Carrier puede sitiar una fortaleza entera manteniendo a raya a las fuerzas de defensa aérea gracias a sus densos escudos de plasma.",
    stats: {
      hp: 300,
      shields: 150,
      armor: 2,
      speed: 2.62,
      sight: 12,
      damageGround: 40, // 8 interceptors
      damageAir: 40,
      attacksGround: true,
      attacksAir: true,
      range: 8,
      attackSpeed: 0.25
    },
    cost: {
      minerals: 350,
      vespene: 250,
      supply: 6,
      time: 64
    },
    counters: {
      strongAgainst: ['Thor', 'Hydralisk', 'Mutalisk', 'Roach'],
      weakAgainst: ['Corruptor', 'Viper', 'Battlecruiser']
    },
    abilities: [
      {
        id: 'launch_interceptors',
        name: 'Desplegar Enjambre de Interceptores',
        hotkey: 'I',
        icon: '🛸',
        description: "Lanza 8 cazas autónomos de alta velocidad que orbitan al objetivo y bombardean simultáneamente con rayos láser de plasma.",
        cooldown: 8,
        animationTrigger: 'attack',
        soundType: 'laser',
        vfx: 'beam'
      },
      {
        id: 'graviton_catapult',
        name: 'Catapulta Gravitatoria',
        hotkey: 'G',
        icon: '⚡',
        description: "Lanza a todos los interceptores en menos de 0.5 segundos, maximizando la sorpresa táctica.",
        cooldown: 30,
        animationTrigger: 'special',
        soundType: 'teleport',
        vfx: 'sparks'
      }
    ],
    modelConfig: {
      meshType: 'carrier',
      primaryColor: '#facc15',
      secondaryColor: '#1e293b',
      glowColor: '#38bdf8',
      scale: 1.45,
      yOffset: 0.7,
      hasWings: true,
      glowIntensity: 2.0
    }
  },

  // ==========================================
  // PROTOSS - HEROES
  // ==========================================
  {
    id: 'artanis',
    name: 'Artanis',
    title: 'Jerarca de los Daelaam',
    race: 'protoss',
    category: 'heroes',
    tier: 4,
    role: 'Líder Supremo / Espadachín Dual de Aiur y Nerazim',
    attributeTypes: ['Biológico', 'Héroe', 'Psiónico'],
    quote: "¡Por Aiur! ¡Por todos nosotros!",
    quotes: [
      "¡Por Aiur! ¡Por todos nosotros!",
      "Nuestra gente no será destruida.",
      "Porto las hojas de Tassadar y Zeratul.",
      "Unidos nos mantenemos, divididos caemos."
    ],
    description: "Jerarca supremo de la sociedad unificada Protoss. Porta simultáneamente una espada psiónica de luz azul del Khala y una espada verde sombría de los Nerazim en honor a su amigo caído Zeratul.",
    lore: "Comandó la reconquista de Aiur durante Legacy of the Void al timón de la Lanza de Adun. Logró unir a las facciones fracturadas de Templarios, Purificadores y Tal'darim para expulsar al dios oscuro Amon.",
    stats: {
      hp: 600,
      shields: 400,
      armor: 3,
      speed: 3.5,
      sight: 12,
      damageGround: 50,
      damageAir: 0,
      attacksGround: true,
      attacksAir: false,
      range: 0.2,
      attackSpeed: 0.65
    },
    cost: {
      minerals: 450,
      vespene: 200,
      supply: 5,
      time: 60
    },
    counters: {
      strongAgainst: ['Hydralisk', 'Marauder', 'Zealot', 'Roach'],
      weakAgainst: ['Colossus', 'Battlecruiser', 'Ultralisk']
    },
    abilities: [
      {
        id: 'astral_wind',
        name: 'Viento Astral Restaurador',
        hotkey: 'Q',
        icon: '✨',
        description: "Emite una onda de energía cósmica que restaura 300 puntos de escudo y 150 de salud a Artanis y a todas las tropas aliadas cercanas.",
        cooldown: 20,
        animationTrigger: 'stim',
        soundType: 'teleport',
        vfx: 'shield'
      },
      {
        id: 'orbital_strike',
        name: 'Bombardeo Orbital de la Lanza de Adun',
        hotkey: 'E',
        icon: '🌟',
        description: "Dispara cinco haces de plasma solar orbitales concentrados que vaporizan todo en la zona objetivo con 400 de daño.",
        cooldown: 60,
        animationTrigger: 'special',
        soundType: 'lightning',
        vfx: 'beam'
      }
    ],
    modelConfig: {
      meshType: 'artanis',
      primaryColor: '#eab308',
      secondaryColor: '#059669',
      glowColor: '#34d399',
      scale: 1.25,
      yOffset: 0,
      glowIntensity: 2.2
    }
  },
  {
    id: 'zeratul',
    name: 'Zeratul',
    title: 'Prelado Tétrico de los Nerazim',
    race: 'protoss',
    category: 'heroes',
    tier: 4,
    role: 'Asesino Sombrío / Profeta del Vacío',
    attributeTypes: ['Biológico', 'Héroe', 'Psiónico'],
    quote: "Golpeo desde las sombras más profundas.",
    quotes: [
      "Golpeo desde las sombras más profundas.",
      "El Vacío me revela las verdades prohibidas.",
      "Amon se alza, pero su victoria no está escrita.",
      "Mi espada es la justicia silenciosa."
    ],
    description: "Legendario prelado de los Templarios Tétricos. Portador de la Hojadel Vacío esmeralda, Zeratul se desplaza permanentemente envuelto en el sigilo dimensional, investigando profecías milenarias de los Xel'Naga.",
    lore: "Fue quien reveló la amenaza de Amon a James Raynor y Sarah Kerrigan. Dio su vida en Aiur para salvar a su discípulo Artanis de la corrupción mental del Khala.",
    stats: {
      hp: 450,
      shields: 450,
      armor: 2,
      speed: 3.94,
      sight: 12,
      damageGround: 70,
      damageAir: 0,
      attacksGround: true,
      attacksAir: false,
      range: 0.1,
      attackSpeed: 0.75
    },
    cost: {
      minerals: 400,
      vespene: 250,
      supply: 4,
      time: 55
    },
    counters: {
      strongAgainst: ['Marine', 'Hydralisk', 'Siege Tank', 'High Templar'],
      weakAgainst: ['Colossus', 'Archon', 'Infestor']
    },
    abilities: [
      {
        id: 'shadow_strike',
        name: 'Golpe Sombrío de la Hoja del Vacío',
        hotkey: 'Q',
        icon: '🗡️',
        description: "Se desliza detrás de la víctima y asesta un golpe letal con su hoja de energía esmeralda que ignora armaduras y causa 200 de daño crítico.",
        cooldown: 8,
        animationTrigger: 'attack',
        soundType: 'laser',
        vfx: 'beam'
      },
      {
        id: 'void_prison',
        name: 'Prisión del Vacío Temporal',
        hotkey: 'W',
        icon: '🔮',
        description: "Encapsula un área en una burbuja de estasis temporal durante 12 segundos, congelando en el tiempo a todas las unidades y estructuras atrapadas.",
        cooldown: 45,
        animationTrigger: 'special',
        soundType: 'teleport',
        vfx: 'shield'
      }
    ],
    modelConfig: {
      meshType: 'zeratul',
      primaryColor: '#0f172a',
      secondaryColor: '#047857',
      glowColor: '#10b981',
      scale: 1.15,
      yOffset: 0,
      glowIntensity: 2.3
    }
  },

  // ==========================================
  // PROTOSS - BUILDINGS
  // ==========================================
  {
    id: 'nexus',
    name: 'Nexus',
    title: 'Núcleo Conductor de la Base',
    race: 'protoss',
    category: 'buildings',
    tier: 1,
    role: 'Coordinador Psiónico / Extracción de Recursos',
    attributeTypes: ['Estructura', 'Blindado', 'Psiónico'],
    quote: "*Pulsación de la matriz sagrada de Aiur*",
    quotes: [
      "*Resonancia del cristal sagrado*",
      "*Campo de teletransporte alineado*",
      "*Sondas enlazadas a la red de recolección*"
    ],
    description: "La estructura más sagrada y vital de cualquier asentamiento Protoss. Canaliza la energía psíquica para deformar sondas desde el planeta natal y proyecta escudos de sobrecarga fotónica.",
    lore: "Construidos alrededor de cristales Khaydarin purificados, los Nexus mantienen el anclaje dimensional necesario para desplegar edificios mediante deformación warp en mundos lejanos.",
    stats: {
      hp: 1000,
      shields: 1000,
      armor: 1,
      energy: 200,
      maxEnergy: 200,
      speed: 0,
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
      weakAgainst: ['Mutalisk', 'Siege Tank', 'Battlecruiser']
    },
    abilities: [
      {
        id: 'chrono_boost',
        name: 'Impulso Cronos (Chrono Boost)',
        hotkey: 'C',
        icon: '⏩',
        description: "Acelera el flujo temporal de un edificio aliado, incrementando su velocidad de investigación o producción en un 100% durante 20 segundos.",
        energyCost: 50,
        animationTrigger: 'special',
        soundType: 'teleport',
        vfx: 'sparks'
      },
      {
        id: 'strategic_recall',
        name: 'Rellamada Estratégica Masiva',
        hotkey: 'R',
        icon: '🌀',
        description: "Teletransporta a todo un ejército aliado directamente hacia la ubicación del Nexus desde cualquier punto del mapa.",
        energyCost: 100,
        animationTrigger: 'transform',
        soundType: 'teleport',
        vfx: 'shield'
      }
    ],
    modelConfig: {
      meshType: 'nexus',
      primaryColor: '#eab308',
      secondaryColor: '#0284c7',
      glowColor: '#38bdf8',
      scale: 1.5,
      yOffset: 0.4,
      glowIntensity: 2.0
    }
  },
  {
    id: 'pylon',
    name: 'Pilón (Pylon)',
    title: 'Canalizador del Campo Psiónico',
    race: 'protoss',
    category: 'buildings',
    tier: 1,
    role: 'Suministro y Matriz de Energía Psiónica',
    attributeTypes: ['Estructura', 'Ligero', 'Psiónico'],
    quote: "*Zumbido continuo del campo de energía de Khaydarin*",
    quotes: [
      "*Zumbido continuo del campo de energía de Khaydarin*",
      "*Alimentando estructuras colindantes*",
      "*Transmisión de teletransportación activa*"
    ],
    description: "Proyecta un campo de energía psiónica indispensable para energizar todos los edificios circundantes y otorgar suministro para sostener tropas.",
    lore: "Sin el campo de un pilón, las estructuras Protoss quedan inertes y apagadas. Además, permite a los Warp Gates teletransportar tropas instantáneamente a cualquier parte donde se proyecte su campo.",
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
      weakAgainst: ['Mutalisk', 'Zergling', 'Reaper']
    },
    abilities: [
      {
        id: 'matrix_field',
        name: 'Matriz Psiónica de Warp',
        hotkey: 'P',
        icon: '🔷',
        description: "Proyecta un domo de resonancia de cristal que alimenta a las estructuras vecinas y permite la deformación instantánea de tropas de puerta de acceso.",
        cooldown: 0,
        animationTrigger: 'special',
        soundType: 'teleport',
        vfx: 'shield'
      }
    ],
    modelConfig: {
      meshType: 'pylon',
      primaryColor: '#facc15',
      secondaryColor: '#38bdf8',
      glowColor: '#67e8f9',
      scale: 1.15,
      yOffset: 0.2,
      glowIntensity: 2.4
    }
  }
];
