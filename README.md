# 🌌 StarCraft II: 3D Holographic Turntable & Tactical Armory

Una aplicación web de última generación construida con **React 19**, **Three.js**, **TypeScript** y **Tailwind CSS v4**, diseñada para ser desplegada en **Vercel** y alojada en **GitHub** como repositorio o subrepositorio.

Permite explorar y visualizar todos los personajes, héroes, unidades y estructuras icónicas de **StarCraft II** organizados por raza (**Terran**, **Zerg**, **Protoss**) en una tornamesa 3D interactiva con HUD fiel a la interfaz del juego, animaciones, efectos de partículas, avatar mini 3D interactivo y sintetizador de audio.

---

## ⚡ Características Principales

1. **Tornamesa 3D Moderna (Estilo StarCraft 2)**:
   - Renderizado en tiempo real con **Three.js** con iluminación PBR cinemática, sombras suaves e iluminación de borde (rim lights).
   - Plataforma holográfica con anillos reactivos a la raza activa (hexágonos Terran, biomateria Zerg, runas doradas Protoss).
   - Partículas atmosféricas y niebla volumétrica según el planeta (Mar Sara, Char, Shakuras, Aiur, Braxis, Espacio Profundo).
   - Controles de cámara orbitales (arrastre para rotar, rueda para zoom, presets de cámara Frontal, Isométrica, Cenital y Cinemática).
   - Modo Malla Holográfica (*Wireframe*) y filtro de pantalla CRT con líneas de escaneo.
   - Botón de captura de pantalla 3D en alta resolución.

2. **Selector Lateral Izquierdo**:
   - **Selector de Raza**: Terran (Dominio), Zerg (Enjambre), Protoss (Daelaam).
   - **Selector de Categoría**:
     - ⚔️ **Unidades**: Marine, Tanque de Asedio Crucio, Crucero de Batalla, Zergling, Hydralisk, Ultralisk, Zealot, Stalker, Coloso, Portanaves Carrier, etc.
     - 👑 **Héroes**: Jim Raynor, Tychus Findlay, Sarah Kerrigan (Reina de Espadas), Abathur, Artanis, Zeratul, etc.
     - 🏢 **Edificios**: Centro de Mando, Criadero Hatchery, Nexo Nexus, Pilón, etc.
   - Buscador en tiempo real por nombre, rol o título.
   - Filtro por Niveles de Tecnología (Tier 1 a Tier 4).

3. **Interfaz Gráfica (HUD) Fiel a Cada Raza**:
   - **Terran**: Acero reforzado remachado, pantallas tácticas CRT verdes y rayas de advertencia industrial.
   - **Zerg**: Quitina púrpura orgánica pulsante, membranas vivientes y bio-indicadores.
   - **Protoss**: Aleaciones doradas de Aiur pulidas con matrices de cristal Khaydarin psiónicas.
   - **Mini Avatar 3D Facial**: Ventana interactiva con cabeza 3D animada que asiente, habla y gesticula en tiempo real con escáner CRT y barra ecualizadora de audio.
   - **Tarjeta de Mandos Táctica (Command Card 3x5)**:
     - Comandos básicos: Mover [M], Detener [S], Mantener [H], Patrullar [P], Atacar [A].
     - Habilidades especiales con iconos y hotkeys (Stimpack [T], Modo Asedio [E], Cañón Yamato [Y], Parpadeo Blink [B], Tormenta Psiónica [T], Enterrarse [R], etc.).
     - Al activarlas, ejecuta la animación correspondiente en el modelo 3D, activa partículas visuales, lanza textos de combate flotantes y emite el sonido original.

4. **Motor de Sonido & Síntesis de Voz**:
   - Creado con **Web Audio API** para síntesis procedural de clics mecánicos Terran, sonidos orgánicos Zerg y resonancias de cristal Protoss.
   - Efectos especiales para inyección de estimulantes, disparos de cañón de choque, relámpagos psiónicos, saltos dimensionales y sirenas nucleares.
   - Reproductor de frases célebres de los personajes con modulación de radio y frecuencias alienígenas.
   - Música y zumbidos de ambiente procedurales para cada raza con control de volumen y silencio.

5. **Panel Lateral Derecho (Dossier Táctico & Lore)**:
   - Registro de inteligencia militar y trasfondo histórico canónico de StarCraft 2.
   - Barras de Vida, Escudos de Plasma, Blindaje y Energía.
   - Especificaciones de armas (daño tierra/aire, cadencia, alcance).
   - Costes en minerales 💎, vespeno 🟢, suministros ⚡ y tiempo ⏱️.
   - Ventajas y debilidades tácticas con enlaces directos para saltar a otras unidades.
   - Controles de iluminación ambiental y velocidad de rotación.

---

## 🚀 Despliegue en Vercel

La aplicación ya contiene el archivo `vercel.json` y la configuración de build con Vite.

### Opción 1: Conectar mediante Vercel Dashboard (Recomendado)
1. Sube el código a tu cuenta de **GitHub** (ver sección siguiente).
2. Entra a [vercel.com/new](https://vercel.com/new).
3. Selecciona tu repositorio `starcraft-3d-armory`.
4. El framework se detectará automáticamente como **Vite**.
5. Haz clic en **Deploy**. ¡Tu aplicación estará en línea en segundos!

### Opción 2: Despliegue directo mediante Vercel CLI
En la terminal dentro de esta carpeta:
```bash
npx vercel --prod
```

---

## 🐙 Subir a GitHub (Repositorio o Subrepositorio)

### Para publicarlo como un repositorio independiente:
```bash
git init
git add .
git commit -m "StarCraft 2 Modern 3D Turntable & Armory"
git branch -M main

# Con GitHub CLI:
gh repo create starcraft-3d-armory --public --source=. --remote=origin --push

# O manualmente añadiendo tu remoto:
# git remote add origin https://github.com/TU_USUARIO/starcraft-3d-armory.git
# git push -u origin main
```

### Para agregarlo como un Submódulo Git dentro de un repositorio padre:
Si ya tienes un repositorio principal (como `GAME ASSETS`):
```bash
git submodule add https://github.com/TU_USUARIO/starcraft-3d-armory.git starcraft
git commit -m "Add starcraft 3D armory submodule"
git push
```

---

## 🛠️ Ejecución Local

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

3. Compilar para producción:
   ```bash
   npm run build
   ```

---

## ⌨️ Atajos de Teclado (Hotkeys)

- **[M]**: Mover
- **[S]**: Detener
- **[H]**: Mantener Posición
- **[P]**: Patrullar
- **[A]**: Atacar
- **[T]**: Stimpack / Tormenta Psiónica
- **[E]**: Modo Asedio / Cañón de Choque
- **[Y]**: Cañón Yamato
- **[B]**: Parpadeo Dimensional (Blink)
- **[R]**: Enterrarse (Burrow)
- **[C]**: Carga / Impulso Cronos
- **[Q] / [W]**: Habilidades de Héroe (Kerrigan, Artanis, Zeratul)
