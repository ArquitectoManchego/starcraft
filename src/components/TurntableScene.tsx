import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SC2Entity, ViewportSettings } from '../types/starcraft';

interface TurntableSceneProps {
  entity: SC2Entity;
  settings: ViewportSettings;
  activeAnimation: string;
  onAnimationEnd?: () => void;
  onTakeScreenshot?: (dataUrl: string) => void;
}

export const TurntableScene: React.FC<TurntableSceneProps> = ({
  entity,
  settings,
  activeAnimation,
  onAnimationEnd,
  onTakeScreenshot
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const platformGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const vfxGroupRef = useRef<THREE.Group | null>(null);
  const animTimeRef = useRef<number>(0);
  const isInteractingRef = useRef<boolean>(false);
  const prevMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraAngleRef = useRef<{ phi: number; theta: number; distance: number }>({
    phi: 0.35,
    theta: 0.5,
    distance: 7.5
  });

  const [isLoading, setIsLoading] = useState(false);

  // Setup Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    cameraRef.current = camera;
    updateCameraPosition();

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // VFX Container
    const vfxGroup = new THREE.Group();
    scene.add(vfxGroup);
    vfxGroupRef.current = vfxGroup;

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Camera preset
  useEffect(() => {
    if (settings.cameraPreset === 'front') {
      cameraAngleRef.current = { phi: 0.05, theta: 0, distance: 6.5 };
    } else if (settings.cameraPreset === 'top') {
      cameraAngleRef.current = { phi: 1.45, theta: 0, distance: 9.0 };
    } else if (settings.cameraPreset === 'cinematic') {
      cameraAngleRef.current = { phi: 0.18, theta: 0.8, distance: 5.2 };
    } else {
      // isometric
      cameraAngleRef.current = { phi: 0.45, theta: 0.65, distance: 7.8 };
    }
  }, [settings.cameraPreset]);

  const updateCameraPosition = () => {
    if (!cameraRef.current) return;
    const { phi, theta, distance } = cameraAngleRef.current;
    const y = distance * Math.sin(phi);
    const radius = distance * Math.cos(phi);
    const x = radius * Math.sin(theta);
    const z = radius * Math.cos(theta);
    cameraRef.current.position.set(x, y + 1.2, z);
    cameraRef.current.lookAt(0, 1.1, 0);
  };

  // Environment Lighting and Fog
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Clear previous lights and fog
    const toRemove: THREE.Object3D[] = [];
    scene.children.forEach(obj => {
      if (obj.type.includes('Light') || obj === particlesRef.current) {
        toRemove.push(obj);
      }
    });
    toRemove.forEach(obj => scene.remove(obj));

    // Theme specifics
    let skyColor = 0x0f172a;
    let groundLight = 0x0284c7;
    let fogColor = 0x050814;
    let particleColor = 0x38bdf8;

    switch (settings.theme) {
      case 'char':
        skyColor = 0x2a0808;
        groundLight = 0xdc2626;
        fogColor = 0x180505;
        particleColor = 0xf97316;
        break;
      case 'shakuras':
        skyColor = 0x1e1035;
        groundLight = 0x8b5cf6;
        fogColor = 0x0e0618;
        particleColor = 0xc084fc;
        break;
      case 'aiur':
        skyColor = 0x1a2e40;
        groundLight = 0xeab308;
        fogColor = 0x0a1622;
        particleColor = 0xfde047;
        break;
      case 'braxis':
        skyColor = 0x082f49;
        groundLight = 0x38bdf8;
        fogColor = 0x031826;
        particleColor = 0xe0f2fe;
        break;
      case 'marsara':
        skyColor = 0x29180b;
        groundLight = 0xd97706;
        fogColor = 0x140c05;
        particleColor = 0xfbbf24;
        break;
      default: // space
        skyColor = 0x030712;
        groundLight = 0x38bdf8;
        fogColor = 0x020617;
        particleColor = 0x93c5fd;
    }

    scene.fog = new THREE.FogExp2(fogColor, 0.055);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(skyColor, 1.2 * settings.lightingIntensity);
    scene.add(ambientLight);

    // Key directional light with shadows
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2 * settings.lightingIntensity);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);

    // Rim backlight for cinematic edge glow
    const rimLight = new THREE.DirectionalLight(groundLight, 2.8 * settings.lightingIntensity);
    rimLight.position.set(-5, 4, -5);
    scene.add(rimLight);

    // Platform glow point light
    const pointLight = new THREE.PointLight(groundLight, 3.0, 10);
    pointLight.position.set(0, 0.3, 0);
    scene.add(pointLight);

    // Floating Atmospheric Particles
    const pCount = 200;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 12;
      pPos[i + 1] = Math.random() * 6;
      pPos[i + 2] = (Math.random() - 0.5) * 12;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.06,
      color: particleColor,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(pGeom, pMat);
    scene.add(particles);
    particlesRef.current = particles;
  }, [settings.theme, settings.lightingIntensity]);

  // Build 3D Turntable Platform according to Race
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (platformGroupRef.current) {
      scene.remove(platformGroupRef.current);
    }

    const platformGroup = new THREE.Group();

    // Base cylinder
    const baseGeom = new THREE.CylinderGeometry(2.8, 3.2, 0.4, 32);
    let baseMat: THREE.Material;
    let ringColor = 0x38bdf8;

    if (entity.race === 'terran') {
      baseMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.85,
        roughness: 0.25,
        wireframe: settings.wireframe
      });
      ringColor = 0x0284c7;
    } else if (entity.race === 'zerg') {
      baseMat = new THREE.MeshStandardMaterial({
        color: 0x3b0764,
        metalness: 0.2,
        roughness: 0.7,
        wireframe: settings.wireframe
      });
      ringColor = 0xa855f7;
    } else {
      // protoss
      baseMat = new THREE.MeshStandardMaterial({
        color: 0x1c1917,
        metalness: 0.9,
        roughness: 0.15,
        wireframe: settings.wireframe
      });
      ringColor = 0xeab308;
    }

    const baseMesh = new THREE.Mesh(baseGeom, baseMat);
    baseMesh.position.y = -0.2;
    baseMesh.receiveShadow = true;
    platformGroup.add(baseMesh);

    // Glowing Concentric Rings
    const ringGeom = new THREE.RingGeometry(2.3, 2.45, 48);
    ringGeom.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: ringColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.position.y = 0.01;
    platformGroup.add(ringMesh);

    // Inner Glowing Hexagon / Rune Grid
    const innerRingGeom = new THREE.RingGeometry(1.2, 1.3, 6);
    innerRingGeom.rotateX(-Math.PI / 2);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: ringColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
    });
    const innerRingMesh = new THREE.Mesh(innerRingGeom, innerRingMat);
    innerRingMesh.position.y = 0.015;
    platformGroup.add(innerRingMesh);

    // Holographic compass ticks
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const tickGeom = new THREE.BoxGeometry(0.08, 0.02, 0.35);
      const tickMesh = new THREE.Mesh(tickGeom, ringMat);
      tickMesh.position.set(Math.cos(angle) * 2.6, 0.01, Math.sin(angle) * 2.6);
      tickMesh.rotation.y = -angle;
      platformGroup.add(tickMesh);
    }

    scene.add(platformGroup);
    platformGroupRef.current = platformGroup;
  }, [entity.race, settings.wireframe]);

  // Build Procedural 3D Model for Entity
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    setIsLoading(true);

    if (modelGroupRef.current) {
      scene.remove(modelGroupRef.current);
    }

    const modelGroup = new THREE.Group();
    const config = entity.modelConfig;

    const primaryColor = new THREE.Color(config.primaryColor);
    const secondaryColor = new THREE.Color(config.secondaryColor);
    const glowColor = new THREE.Color(config.glowColor);

    const primaryMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      metalness: entity.race === 'terran' ? 0.8 : entity.race === 'protoss' ? 0.9 : 0.2,
      roughness: entity.race === 'zerg' ? 0.6 : 0.3,
      wireframe: settings.wireframe
    });

    const secondaryMat = new THREE.MeshStandardMaterial({
      color: secondaryColor,
      metalness: 0.5,
      roughness: 0.5,
      wireframe: settings.wireframe
    });

    const glowMat = new THREE.MeshStandardMaterial({
      color: glowColor,
      emissive: glowColor,
      emissiveIntensity: config.glowIntensity || 1.5,
      roughness: 0.2,
      wireframe: settings.wireframe
    });

    // Procedural geometry dispatch
    buildProceduralMesh(modelGroup, config.meshType, primaryMat, secondaryMat, glowMat);

    // Scale and position
    modelGroup.scale.setScalar(config.scale);
    modelGroup.position.y = config.yOffset;
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    setIsLoading(false);
  }, [entity, settings.wireframe]);

  // Construct Procedural Meshes for each StarCraft 2 Unit / Hero / Building
  const buildProceduralMesh = (
    group: THREE.Group,
    meshType: string,
    matPrimary: THREE.Material,
    matSecondary: THREE.Material,
    matGlow: THREE.Material
  ) => {
    switch (meshType) {
      case 'marine':
      case 'raynor':
      case 'tychus':
      case 'ghost': {
        // Terran Biped Power Suit
        // Torso
        const chest = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.0, 0.7), matPrimary);
        chest.position.y = 1.6;
        chest.castShadow = true;
        group.add(chest);

        // Pauldrons (Shoulders)
        const leftShoulder = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.6), matPrimary);
        leftShoulder.position.set(-0.7, 2.0, 0);
        const rightShoulder = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.6), matPrimary);
        rightShoulder.position.set(0.7, 2.0, 0);
        group.add(leftShoulder, rightShoulder);

        // Helmet & Visor
        const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), matSecondary);
        helmet.position.set(0, 2.3, 0.05);
        const visor = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.16, 0.25), matGlow);
        visor.position.set(0, 2.3, 0.25);
        group.add(helmet, visor);

        // C-14 Gauss Rifle
        const gun = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.3, 1.2), matSecondary);
        gun.position.set(0.55, 1.5, 0.6);
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.8), matGlow);
        barrel.rotateX(Math.PI / 2);
        barrel.position.set(0.55, 1.5, 1.2);
        group.add(gun, barrel);

        // Legs
        const legL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.1, 0.4), matPrimary);
        legL.position.set(-0.35, 0.6, 0);
        const legR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.1, 0.4), matPrimary);
        legR.position.set(0.35, 0.6, 0);
        group.add(legL, legR);
        break;
      }

      case 'siege_tank': {
        // Heavy Chassis
        const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.5, 2.2), matPrimary);
        chassis.position.y = 0.5;
        chassis.castShadow = true;
        group.add(chassis);

        // 4 Heavy Track Pods
        const podGeom = new THREE.BoxGeometry(0.4, 0.6, 1.2);
        const podFL = new THREE.Mesh(podGeom, matSecondary);
        podFL.position.set(-1.1, 0.4, 0.8);
        const podFR = new THREE.Mesh(podGeom, matSecondary);
        podFR.position.set(1.1, 0.4, 0.8);
        const podBL = new THREE.Mesh(podGeom, matSecondary);
        podBL.position.set(-1.1, 0.4, -0.8);
        const podBR = new THREE.Mesh(podGeom, matSecondary);
        podBR.position.set(1.1, 0.4, -0.8);
        group.add(podFL, podFR, podBL, podBR);

        // Rotating Turret
        const turret = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.0, 0.5, 12), matPrimary);
        turret.position.y = 0.95;
        group.add(turret);

        // Arclight / Crucio Twin Long Cannons
        const barrelL = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 2.2), matSecondary);
        barrelL.rotateX(Math.PI / 2);
        barrelL.position.set(-0.25, 1.05, 1.2);
        const barrelR = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 2.2), matSecondary);
        barrelR.rotateX(Math.PI / 2);
        barrelR.position.set(0.25, 1.05, 1.2);

        // Muzzle Energy Rings
        const muzzleGlow = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.04, 8, 16), matGlow);
        muzzleGlow.position.set(0, 1.05, 2.3);
        group.add(barrelL, barrelR, muzzleGlow);
        break;
      }

      case 'battlecruiser': {
        // Hammerhead Bow
        const bow = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.7, 1.2), matPrimary);
        bow.position.set(0, 1.4, 1.6);
        bow.castShadow = true;
        group.add(bow);

        // Yamato Cannon Emitter
        const yamatoCore = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), matGlow);
        yamatoCore.position.set(0, 1.4, 2.2);
        group.add(yamatoCore);

        // Main Spine / Hull
        const spine = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 2.8), matPrimary);
        spine.position.set(0, 1.4, -0.4);
        group.add(spine);

        // Bridge Tower
        const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 0.8), matSecondary);
        bridge.position.set(0, 2.0, -0.6);
        const bridgeWindows = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 0.4), matGlow);
        bridgeWindows.position.set(0, 2.1, -0.2);
        group.add(bridge, bridgeWindows);

        // Wings & Dual Engines
        const wingL = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 1.0), matSecondary);
        wingL.position.set(-1.4, 1.3, -1.2);
        const wingR = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 1.0), matSecondary);
        wingR.position.set(1.4, 1.3, -1.2);

        const engineL = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.8), matGlow);
        engineL.rotateX(Math.PI / 2);
        engineL.position.set(-1.4, 1.3, -1.7);
        const engineR = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.8), matGlow);
        engineR.rotateX(Math.PI / 2);
        engineR.position.set(1.4, 1.3, -1.7);
        group.add(wingL, wingR, engineL, engineR);
        break;
      }

      case 'zergling': {
        // Hunched Quadruped Body
        const body = new THREE.Mesh(new THREE.SphereGeometry(0.6, 12, 12), matPrimary);
        body.scale.set(0.7, 0.6, 1.3);
        body.position.set(0, 0.7, 0);
        group.add(body);

        // Head & Mandibles
        const head = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.7, 8), matSecondary);
        head.rotateX(Math.PI / 2);
        head.position.set(0, 0.85, 0.8);
        const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), matGlow);
        eyeL.position.set(-0.15, 0.95, 0.9);
        const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), matGlow);
        eyeR.position.set(0.15, 0.95, 0.9);
        group.add(head, eyeL, eyeR);

        // Twin Dorsal Scythe Wings
        const scytheGeom = new THREE.CylinderGeometry(0.04, 0.08, 1.2);
        const scytheL = new THREE.Mesh(scytheGeom, matSecondary);
        scytheL.rotateZ(0.5);
        scytheL.position.set(-0.4, 1.2, -0.2);
        const scytheR = new THREE.Mesh(scytheGeom, matSecondary);
        scytheR.rotateZ(-0.5);
        scytheR.position.set(0.4, 1.2, -0.2);
        group.add(scytheL, scytheR);
        break;
      }

      case 'hydralisk': {
        // Serpentine Torso
        const snakeBody = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.7, 1.5, 12), matPrimary);
        snakeBody.position.set(0, 0.8, -0.2);
        group.add(snakeBody);

        // Carapace Crest Head
        const crest = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.3, 0.9), matSecondary);
        crest.position.set(0, 1.9, 0.1);
        const eyes = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 0.2), matGlow);
        eyes.position.set(0, 1.85, 0.5);
        group.add(crest, eyes);

        // Twin Curved Mantis Arms
        const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.05, 1.2), matPrimary);
        armL.rotateZ(0.6);
        armL.position.set(-0.6, 1.4, 0.4);
        const armR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.05, 1.2), matPrimary);
        armR.rotateZ(-0.6);
        armR.position.set(0.6, 1.4, 0.4);
        group.add(armL, armR);
        break;
      }

      case 'ultralisk': {
        // Colossal Carapace Body
        const monster = new THREE.Mesh(new THREE.SphereGeometry(1.3, 16, 16), matPrimary);
        monster.scale.set(1.2, 1.0, 1.8);
        monster.position.set(0, 1.4, 0);
        group.add(monster);

        // 4 Giant Kaiser Blades
        const bladeGeom = new THREE.TorusGeometry(1.2, 0.15, 8, 16, Math.PI * 0.7);
        const bladeL1 = new THREE.Mesh(bladeGeom, matSecondary);
        bladeL1.position.set(-1.1, 1.6, 0.5);
        bladeL1.rotateY(0.4);
        const bladeR1 = new THREE.Mesh(bladeGeom, matSecondary);
        bladeR1.position.set(1.1, 1.6, 0.5);
        bladeR1.rotateY(-0.4);
        group.add(bladeL1, bladeR1);

        // Glowing Spine Ridge
        const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 2.2), matGlow);
        ridge.position.set(0, 2.4, 0);
        group.add(ridge);
        break;
      }

      case 'kerrigan_queen': {
        // Slender Queen Body
        const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 1.2, 12), matPrimary);
        torso.position.set(0, 1.4, 0);
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), matSecondary);
        head.position.set(0, 2.2, 0.05);
        const psiEyes = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, 0.15), matGlow);
        psiEyes.position.set(0, 2.2, 0.22);
        group.add(torso, head, psiEyes);

        // 4 Skeletal Bone Wings
        for (let i = 0; i < 4; i++) {
          const side = i % 2 === 0 ? 1 : -1;
          const height = i < 2 ? 2.3 : 1.7;
          const wingSegment = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.08, 1.5), matSecondary);
          wingSegment.position.set(side * (0.6 + i * 0.2), height, -0.4);
          wingSegment.rotateZ(side * 0.7);
          const wingSpike = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.5, 8), matGlow);
          wingSpike.position.set(side * (1.2 + i * 0.3), height + 0.6, -0.4);
          group.add(wingSegment, wingSpike);
        }
        break;
      }

      case 'zealot':
      case 'artanis': {
        // Golden Protoss Warrior
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.0, 0.5), matPrimary);
        body.position.set(0, 1.5, 0);
        const head = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.6, 8), matSecondary);
        head.position.set(0, 2.2, 0);
        head.rotateX(-0.3);
        const psiEyes = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), matGlow);
        psiEyes.position.set(0, 2.15, 0.25);
        group.add(body, head, psiEyes);

        // Extended Dual Psi-Blades
        const bladeGeom = new THREE.BoxGeometry(0.08, 0.08, 1.3);
        const bladeL = new THREE.Mesh(bladeGeom, matGlow);
        bladeL.position.set(-0.65, 1.3, 0.6);
        const bladeR = new THREE.Mesh(bladeGeom, matGlow);
        bladeR.position.set(0.65, 1.3, 0.6);
        group.add(bladeL, bladeR);
        break;
      }

      case 'stalker': {
        // Nerazim Cybernetic Core
        const core = new THREE.Mesh(new THREE.SphereGeometry(0.6, 12, 12), matPrimary);
        core.position.set(0, 1.4, 0);
        const sensor = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.3), matGlow);
        sensor.rotateX(Math.PI / 2);
        sensor.position.set(0, 1.4, 0.6);
        group.add(core, sensor);

        // 4 Spindly Spider Legs
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2 + Math.PI / 4;
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.04, 1.6), matSecondary);
          leg.position.set(Math.cos(angle) * 0.9, 0.7, Math.sin(angle) * 0.9);
          leg.rotation.z = Math.sin(angle) * 0.4;
          leg.rotation.x = Math.cos(angle) * 0.4;
          group.add(leg);
        }
        break;
      }

      case 'colossus': {
        // High Stilt Legs
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2 + Math.PI / 4;
          const upperLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 2.5), matPrimary);
          upperLeg.position.set(Math.cos(angle) * 1.1, 1.8, Math.sin(angle) * 1.1);
          upperLeg.rotation.z = Math.sin(angle) * 0.35;
          group.add(upperLeg);
        }

        // Elevated Head Chassis
        const head = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 0.6, 8), matPrimary);
        head.position.set(0, 3.1, 0);
        const thermalLens = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 12), matGlow);
        thermalLens.position.set(0, 3.1, 0.6);
        group.add(head, thermalLens);
        break;
      }

      case 'carrier': {
        // Streamlined Protoss Battle Barge
        const hull = new THREE.Mesh(new THREE.ConeGeometry(1.1, 3.2, 8), matPrimary);
        hull.rotateX(Math.PI / 2);
        hull.position.set(0, 1.4, 0);
        const crystalNode = new THREE.Mesh(new THREE.OctahedronGeometry(0.5), matGlow);
        crystalNode.position.set(0, 1.6, 0.2);
        group.add(hull, crystalNode);

        // Orbiting Interceptors (Small Drones)
        for (let i = 0; i < 4; i++) {
          const drone = new THREE.Mesh(new THREE.TetrahedronGeometry(0.18), matSecondary);
          drone.position.set(Math.cos(i * 1.5) * 1.8, 1.5 + Math.sin(i * 1.5) * 0.5, Math.sin(i * 1.5) * 1.8);
          group.add(drone);
        }
        break;
      }

      case 'pylon': {
        // 4 Outer Golden Base Stanchions
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2;
          const stanchion = new THREE.Mesh(new THREE.ConeGeometry(0.25, 1.5, 4), matPrimary);
          stanchion.position.set(Math.cos(angle) * 0.9, 0.7, Math.sin(angle) * 0.9);
          group.add(stanchion);
        }

        // Floating Khaydarin Crystal Core
        const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.75, 1), matGlow);
        crystal.position.set(0, 1.5, 0);
        group.add(crystal);
        break;
      }

      case 'nexus':
      case 'command_center':
      case 'hatchery':
      default: {
        // Massive Headquarters Structure
        const base = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 2.2, 1.2, 8), matPrimary);
        base.position.set(0, 0.7, 0);
        const topDome = new THREE.Mesh(new THREE.SphereGeometry(1.1, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), matSecondary);
        topDome.position.set(0, 1.3, 0);
        const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.8), matGlow);
        beacon.position.set(0, 2.4, 0);
        group.add(base, topDome, beacon);
        break;
      }
    }
  };

  // Render & Animation Loop
  useEffect(() => {
    let animId: number;

    const render = () => {
      animTimeRef.current += 0.016;
      const t = animTimeRef.current;

      // Platform auto-rotate
      if (platformGroupRef.current && settings.autoRotate && !isInteractingRef.current) {
        platformGroupRef.current.rotation.y += 0.008 * settings.rotateSpeed;
      }

      // Model animation logic
      if (modelGroupRef.current) {
        if (settings.autoRotate && !isInteractingRef.current) {
          modelGroupRef.current.rotation.y += 0.008 * settings.rotateSpeed;
        }

        // Idle breathing / hover
        const hoverOffset = Math.sin(t * 2.5) * 0.06;
        modelGroupRef.current.position.y = entity.modelConfig.yOffset + hoverOffset;

        // Ability / Animation VFX
        if (activeAnimation === 'stim') {
          // Rapid vibration
          modelGroupRef.current.position.x = (Math.random() - 0.5) * 0.08;
          modelGroupRef.current.position.z = (Math.random() - 0.5) * 0.08;
        } else if (activeAnimation === 'siege') {
          // Slam down
          modelGroupRef.current.position.y = entity.modelConfig.yOffset - 0.15;
        } else if (activeAnimation === 'attack') {
          // Recoil punch
          modelGroupRef.current.position.z = Math.sin(t * 30) * 0.12;
        } else if (activeAnimation === 'blink') {
          // Shrink / expand
          const s = Math.abs(Math.sin(t * 6));
          modelGroupRef.current.scale.setScalar(entity.modelConfig.scale * (0.3 + 0.7 * s));
        } else {
          modelGroupRef.current.position.x = 0;
          modelGroupRef.current.position.z = 0;
          modelGroupRef.current.scale.setScalar(entity.modelConfig.scale);
        }
      }

      // Atmospheric Particles animation
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += 0.012;
          if (positions[i] > 6) positions[i] = 0;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      updateCameraPosition();

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [settings.autoRotate, settings.rotateSpeed, entity, activeAnimation]);

  // Mouse / Pointer Controls for Orbital Camera
  const handlePointerDown = (e: React.PointerEvent) => {
    isInteractingRef.current = true;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isInteractingRef.current) return;
    const dx = e.clientX - prevMouseRef.current.x;
    const dy = e.clientY - prevMouseRef.current.y;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };

    cameraAngleRef.current.theta -= dx * 0.008;
    cameraAngleRef.current.phi = Math.max(
      -0.2,
      Math.min(Math.PI / 2 - 0.05, cameraAngleRef.current.phi + dy * 0.008)
    );
  };

  const handlePointerUp = () => {
    isInteractingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    cameraAngleRef.current.distance = Math.max(
      3.0,
      Math.min(14.0, cameraAngleRef.current.distance + e.deltaY * 0.008)
    );
  };

  // Screenshot helper
  const captureScreenshot = () => {
    if (rendererRef.current && onTakeScreenshot) {
      const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
      onTakeScreenshot(dataUrl);
    }
  };

  return (
    <div
      className="relative w-full h-full select-none overflow-hidden cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
    >
      <div ref={mountRef} className="w-full h-full" />

      {/* CRT Scanline Overlay if enabled */}
      {settings.showPostProcessing && <div className="absolute inset-0 crt-overlay pointer-events-none" />}

      {/* Tactical Hologram Reticles */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
        <div className="flex justify-between items-start text-xs font-sc2-mono text-slate-400">
          <div className="bg-slate-900/80 px-3 py-1.5 rounded border border-slate-700/60 backdrop-blur">
            <span>TARGET_LOCK: </span>
            <span className="text-emerald-400 font-bold uppercase">{entity.name}</span>
            <span className="ml-2 text-slate-500">[{entity.race.toUpperCase()}]</span>
          </div>
          <div className="bg-slate-900/80 px-3 py-1.5 rounded border border-slate-700/60 backdrop-blur">
            <span>TURNTABLE_FPS: </span>
            <span className="text-cyan-400 font-bold">60.0</span>
          </div>
        </div>

        {/* Center Target Crosshair */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-cyan-500/10 rounded-full flex items-center justify-center pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-cyan-400/30" />
        </div>

        {/* Animation feedback banner */}
        {activeAnimation !== 'idle' && (
          <div className="self-center bg-cyan-950/90 text-cyan-300 border border-cyan-400 px-4 py-1 rounded text-sm font-sc2-display tracking-widest uppercase animate-pulse">
            EJECUTANDO: {activeAnimation}
          </div>
        )}

        <div className="flex justify-between items-end text-xs font-sc2-mono text-slate-400">
          <div className="text-slate-500">
            ARRASTRA PARA ROTAR • SCROLL PARA ZOOM
          </div>
          <button
            onClick={captureScreenshot}
            className="pointer-events-auto bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1 rounded border border-slate-700 text-xs transition"
          >
            📸 CAPTURA 3D
          </button>
        </div>
      </div>
    </div>
  );
};
