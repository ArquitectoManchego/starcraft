import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
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
  const textureLoaderRef = useRef<THREE.TextureLoader>(new THREE.TextureLoader());
  const gltfLoaderRef = useRef<GLTFLoader>(new GLTFLoader());

  const animTimeRef = useRef<number>(0);
  const isInteractingRef = useRef<boolean>(false);
  const prevMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraAngleRef = useRef<{ phi: number; theta: number; distance: number }>({
    phi: 0.35,
    theta: 0.5,
    distance: 7.5
  });

  const [isLoading, setIsLoading] = useState(false);

  // Initialize Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    cameraRef.current = camera;
    updateCameraPosition();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

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

  // Update Camera presets
  useEffect(() => {
    if (settings.cameraPreset === 'front') {
      cameraAngleRef.current = { phi: 0.05, theta: 0, distance: 6.5 };
    } else if (settings.cameraPreset === 'top') {
      cameraAngleRef.current = { phi: 1.45, theta: 0, distance: 9.0 };
    } else if (settings.cameraPreset === 'cinematic') {
      cameraAngleRef.current = { phi: 0.18, theta: 0.8, distance: 5.2 };
    } else {
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

  // Environment Scene Background & Cinematic Lighting
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Load authentic StarCraft 2 cinematic background
    if (settings.showBackgroundScene && entity.backgroundScene) {
      textureLoaderRef.current.load(entity.backgroundScene, (bgTex) => {
        bgTex.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = bgTex;
      });
    } else {
      scene.background = null;
    }

    // Lights
    const toRemove: THREE.Object3D[] = [];
    scene.children.forEach(obj => {
      if (obj.type.includes('Light') || obj === particlesRef.current) {
        toRemove.push(obj);
      }
    });
    toRemove.forEach(obj => scene.remove(obj));

    const lightColor = entity.race === 'terran' ? 0x38bdf8 : entity.race === 'zerg' ? 0xc084fc : 0xfacc15;
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3 * settings.lightingIntensity);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5 * settings.lightingIntensity);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(lightColor, 2.8 * settings.lightingIntensity);
    rimLight.position.set(-5, 4, -5);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(lightColor, 2.5, 12);
    pointLight.position.set(0, 0.4, 0);
    scene.add(pointLight);

    // Particles
    const pCount = 180;
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
      color: lightColor,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(pGeom, pMat);
    scene.add(particles);
    particlesRef.current = particles;
  }, [entity.race, entity.backgroundScene, settings.showBackgroundScene, settings.lightingIntensity]);

  // Build Turntable Platform
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (platformGroupRef.current) {
      scene.remove(platformGroupRef.current);
    }

    const platformGroup = new THREE.Group();
    const ringColor = entity.race === 'terran' ? 0x0284c7 : entity.race === 'zerg' ? 0xa855f7 : 0xeab308;

    // Base cylinder
    const baseGeom = new THREE.CylinderGeometry(2.8, 3.2, 0.4, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: settings.wireframe
    });
    const baseMesh = new THREE.Mesh(baseGeom, baseMat);
    baseMesh.position.y = -0.2;
    baseMesh.receiveShadow = true;
    platformGroup.add(baseMesh);

    // Glowing Concentric Ring
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

    scene.add(platformGroup);
    platformGroupRef.current = platformGroup;
  }, [entity.race, settings.wireframe]);

  // Load Model: Authentic Ripped GLB if available, or procedural mesh
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    setIsLoading(true);

    if (modelGroupRef.current) {
      scene.remove(modelGroupRef.current);
      modelGroupRef.current = null;
    }

    const modelGroup = new THREE.Group();
    const config = entity.modelConfig;

    if (config.glbPath) {
      // Load the authentic converted GLB model!
      gltfLoaderRef.current.load(
        config.glbPath,
        (gltf) => {
          const loadedModel = gltf.scene;

          // If diffuse texture is provided, load and assign it
          if (config.texturePath) {
            textureLoaderRef.current.load(config.texturePath, (tex) => {
              tex.flipY = false;
              loadedModel.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                  const m = child as THREE.Mesh;
                  m.material = new THREE.MeshStandardMaterial({
                    map: tex,
                    roughness: 0.5,
                    metalness: entity.race === 'terran' ? 0.8 : 0.3,
                    wireframe: settings.wireframe
                  });
                  m.castShadow = true;
                  m.receiveShadow = true;
                }
              });
            });
          } else {
            loadedModel.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const m = child as THREE.Mesh;
                m.castShadow = true;
                m.receiveShadow = true;
                if (settings.wireframe && m.material) {
                  (m.material as THREE.MeshStandardMaterial).wireframe = true;
                }
              }
            });
          }

          // Compute bounding box and normalize scale & center
          const box = new THREE.Box3().setFromObject(loadedModel);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z) || 1;
          const targetScale = (2.6 / maxDim) * config.scale;

          loadedModel.position.x = -center.x * targetScale;
          loadedModel.position.y = -box.min.y * targetScale + config.yOffset;
          loadedModel.position.z = -center.z * targetScale;
          loadedModel.scale.setScalar(targetScale);

          modelGroup.add(loadedModel);
          setIsLoading(false);
        },
        undefined,
        (err) => {
          console.error("Error loading GLB, falling back to procedural:", err);
          buildFallbackMesh(modelGroup, config);
          setIsLoading(false);
        }
      );
    } else {
      buildFallbackMesh(modelGroup, config);
      setIsLoading(false);
    }

    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;
  }, [entity, settings.wireframe]);

  const buildFallbackMesh = (group: THREE.Group, config: SC2Entity['modelConfig']) => {
    const primaryColor = new THREE.Color(config.primaryColor);
    const glowColor = new THREE.Color(config.glowColor);
    const primaryMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      metalness: 0.8,
      roughness: 0.3,
      wireframe: settings.wireframe
    });
    const glowMat = new THREE.MeshBasicMaterial({ color: glowColor });

    if (config.meshType === 'battlecruiser') {
      const bow = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.7, 1.2), primaryMat);
      bow.position.set(0, 1.4, 1.6);
      const spine = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 2.8), primaryMat);
      spine.position.set(0, 1.4, -0.4);
      const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 0.8), glowMat);
      bridge.position.set(0, 2.0, -0.6);
      group.add(bow, spine, bridge);
    } else if (config.meshType === 'carrier') {
      const hull = new THREE.Mesh(new THREE.ConeGeometry(1.1, 3.2, 8), primaryMat);
      hull.rotateX(Math.PI / 2);
      hull.position.set(0, 1.4, 0);
      const crystalNode = new THREE.Mesh(new THREE.OctahedronGeometry(0.5), glowMat);
      crystalNode.position.set(0, 1.6, 0.2);
      group.add(hull, crystalNode);
    } else {
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.6, 1.0), primaryMat);
      body.position.set(0, 1.2, 0);
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 12), glowMat);
      eye.position.set(0, 1.8, 0.4);
      group.add(body, eye);
    }
    group.scale.setScalar(config.scale);
  };

  // Render & Animation Loop
  useEffect(() => {
    let animId: number;

    const render = () => {
      animTimeRef.current += 0.016;
      const t = animTimeRef.current;

      if (platformGroupRef.current && settings.autoRotate && !isInteractingRef.current) {
        platformGroupRef.current.rotation.y += 0.008 * settings.rotateSpeed;
      }

      if (modelGroupRef.current) {
        if (settings.autoRotate && !isInteractingRef.current) {
          modelGroupRef.current.rotation.y += 0.008 * settings.rotateSpeed;
        }

        const hoverOffset = Math.sin(t * 2.5) * 0.04;
        modelGroupRef.current.position.y = entity.modelConfig.yOffset + hoverOffset;

        if (activeAnimation === 'stim') {
          modelGroupRef.current.position.x = (Math.random() - 0.5) * 0.08;
          modelGroupRef.current.position.z = (Math.random() - 0.5) * 0.08;
        } else if (activeAnimation === 'siege') {
          modelGroupRef.current.position.y = entity.modelConfig.yOffset - 0.15;
        } else if (activeAnimation === 'attack') {
          modelGroupRef.current.position.z = Math.sin(t * 30) * 0.1;
        } else {
          modelGroupRef.current.position.x = 0;
          modelGroupRef.current.position.z = 0;
        }
      }

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

      {/* Loading banner */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center font-sc2-display text-cyan-400 text-sm tracking-widest animate-pulse pointer-events-none">
          CARGANDO MODELO 3D RIPEADO ORIGINAL...
        </div>
      )}

      {/* CRT Scanline Overlay if enabled */}
      {settings.showPostProcessing && <div className="absolute inset-0 crt-overlay pointer-events-none" />}

      {/* Tactical Hologram Reticles */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
        <div className="flex justify-between items-start text-xs font-sc2-mono text-slate-400">
          <div className="bg-slate-900/80 px-3 py-1.5 rounded border border-slate-700/60 backdrop-blur flex items-center gap-2">
            <span>MODELO ORIGINAL: </span>
            <span className="text-emerald-400 font-bold uppercase">{entity.name}</span>
            <span className="text-cyan-400">
              {entity.modelConfig.glbPath ? '[3D RIPPED GLB]' : '[PBR MESH]'}
            </span>
          </div>
          <div className="bg-slate-900/80 px-3 py-1.5 rounded border border-slate-700/60 backdrop-blur">
            <span>ESCENA: </span>
            <span className="text-yellow-400 font-bold">
              {entity.backgroundScene ? entity.backgroundScene.split('/').pop() : 'ESTÁNDAR'}
            </span>
          </div>
        </div>

        {activeAnimation !== 'idle' && (
          <div className="self-center bg-cyan-950/90 text-cyan-300 border border-cyan-400 px-4 py-1 rounded text-sm font-sc2-display tracking-widest uppercase animate-pulse">
            EJECUTANDO: {activeAnimation}
          </div>
        )}

        <div className="flex justify-between items-end text-xs font-sc2-mono text-slate-400">
          <div className="text-slate-500">
            ARRÁSTRALO 360° • SCROLL PARA ACERCAR / ALEJAR
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
