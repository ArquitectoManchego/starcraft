import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SC2Entity } from '../types/starcraft';

interface MiniPortrait3DProps {
  entity: SC2Entity;
  isSpeaking: boolean;
}

export const MiniPortrait3D: React.FC<MiniPortrait3DProps> = ({ entity, isSpeaking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const headGroupRef = useRef<THREE.Group | null>(null);
  const jawRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 160;
    const height = container.clientHeight || 160;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 10);
    camera.position.set(0, 0, 2.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(
      entity.race === 'terran' ? 0x38bdf8 : entity.race === 'zerg' ? 0xa855f7 : 0xfacc15,
      2.5
    );
    dirLight.position.set(2, 3, 2);
    scene.add(dirLight);

    // Build Character 3D Head
    const headGroup = new THREE.Group();
    const primaryColor = new THREE.Color(entity.modelConfig.primaryColor);
    const glowColor = new THREE.Color(entity.modelConfig.glowColor);

    const headMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      roughness: 0.4,
      metalness: entity.race === 'terran' ? 0.8 : 0.2
    });

    const glowMat = new THREE.MeshBasicMaterial({
      color: glowColor
    });

    if (entity.race === 'terran') {
      // Marine / Pilot Helmet with glowing visor
      const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), headMat);
      const visor = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.35, 0.5), glowMat);
      visor.position.set(0, 0.05, 0.5);
      const chin = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.4), headMat);
      chin.position.set(0, -0.45, 0.3);
      jawRef.current = chin;

      // Comm headset microphone
      const mic = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5), headMat);
      mic.rotateZ(Math.PI / 4);
      mic.position.set(0.45, -0.2, 0.4);
      headGroup.add(helmet, visor, chin, mic);
    } else if (entity.race === 'zerg') {
      // Swarm Beast Head with Clicking Mandibles
      const headGeom = new THREE.ConeGeometry(0.65, 1.4, 8);
      headGeom.rotateX(Math.PI / 2);
      const skull = new THREE.Mesh(headGeom, headMat);

      // Multiple compound eyes
      const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), glowMat);
      eyeL.position.set(-0.25, 0.2, 0.4);
      const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), glowMat);
      eyeR.position.set(0.25, 0.2, 0.4);

      // Mandibles
      const mandible = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 0.3), glowMat);
      mandible.position.set(0, -0.35, 0.5);
      jawRef.current = mandible;
      headGroup.add(skull, eyeL, eyeR, mandible);
    } else {
      // Protoss Warrior Head (Telepathic, glowing eyes, nerve cords)
      const headCrest = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.2, 6), headMat);
      headCrest.rotateX(-0.3);
      const eyes = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 0.2), glowMat);
      eyes.position.set(0, 0.1, 0.45);

      // Nerve Cords
      const cordL = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.8), glowMat);
      cordL.position.set(-0.35, -0.4, -0.2);
      const cordR = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.8), glowMat);
      cordR.position.set(0.35, -0.4, -0.2);

      headGroup.add(headCrest, eyes, cordL, cordR);
    }

    scene.add(headGroup);
    headGroupRef.current = headGroup;

    // Animation loop
    let animId: number;
    let clock = 0;

    const render = () => {
      clock += 0.03;

      if (headGroupRef.current) {
        // Natural head idle sway
        headGroupRef.current.rotation.y = Math.sin(clock * 1.2) * 0.15;
        headGroupRef.current.rotation.x = Math.sin(clock * 0.8) * 0.08;

        // Talking mouth / mandible movements when speaking
        if (jawRef.current) {
          if (isSpeaking) {
            jawRef.current.position.y = -0.45 + Math.sin(clock * 18) * 0.08;
          } else {
            jawRef.current.position.y = -0.45;
          }
        }
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [entity, isSpeaking]);

  return (
    <div className="relative w-28 h-28 md:w-36 md:h-36 bg-slate-950/90 rounded border border-slate-700/80 overflow-hidden flex flex-col justify-between shadow-2xl">
      <div ref={containerRef} className="w-full h-full" />

      {/* Hologram CRT Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none" />

      {/* Status Header Badge */}
      <div className="absolute top-1 left-1 right-1 flex justify-between items-center text-[9px] font-sc2-mono text-slate-300 pointer-events-none px-1 bg-black/40 rounded">
        <span className="text-emerald-400 font-bold uppercase truncate max-w-[70%]">{entity.name}</span>
        <span className="text-cyan-400 animate-pulse">● LIVE</span>
      </div>

      {/* Real-time Voice Waveform Equalizer Bars */}
      <div className="absolute bottom-1 left-2 right-2 flex justify-between items-end h-3 gap-0.5 pointer-events-none">
        {[40, 70, 95, 60, 85, 30, 90, 50, 80, 65, 45, 95].map((baseHeight, idx) => {
          const height = isSpeaking
            ? `${Math.max(15, (baseHeight * (idx % 2 === 0 ? 1 : 0.6)))}%`
            : '20%';
          return (
            <div
              key={idx}
              className={`w-1 rounded-t-sm transition-all duration-75 ${
                entity.race === 'terran'
                  ? 'bg-cyan-400'
                  : entity.race === 'zerg'
                  ? 'bg-purple-400'
                  : 'bg-yellow-400'
              }`}
              style={{ height }}
            />
          );
        })}
      </div>
    </div>
  );
};
